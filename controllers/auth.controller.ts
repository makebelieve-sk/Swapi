import {Request, Response, NextFunction} from 'express'
import * as bcrypt from 'bcrypt'
import * as uuid from 'uuid'
import {validationResult} from 'express-validator'

import db from '../db.index'
// import MailService from '../services/mail-service'
import TokenService from '../services/token-service'
import UserDto from '../dto/user.dto'
import ApiError from "../exceptions/api.error";
import {UserDtoType} from "../types/auth.types";
import {JwtPayload} from "jsonwebtoken";

class AuthController {
    async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors))
            }

            const {login, password} = req.body

            const candidate = await db.query('SELECT * FROM "user" WHERE name = $1', [login])

            if (!candidate || !candidate.rows || !candidate.rows.length) {
                throw ApiError.BadRequest('Wrong user or password')
            }

            const isPassEquals = await bcrypt.compare(password, candidate.rows[0].password)
            if (!isPassEquals) {
                throw ApiError.BadRequest('Wrong user or password')
            }

            const userDto = new UserDto(candidate.rows[0])

            const tokens = TokenService.generateTokens({...userDto})

            await TokenService.saveToken(userDto.id, tokens.refreshToken)

            const data = {
                ...tokens,
                user: candidate.rows[0]
            }

            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.status(200).json(data)
        } catch(error) {
            next(error)
        }
    }

    async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors))
            }

            const {name, email, password} = req.body

            const candidate = await db.query('SELECT * FROM "user" WHERE email = $1', [email])

            if (candidate && candidate.rows && candidate.rows.length) {
                throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
            }

            const hashedPassword = await bcrypt.hash(password, 3)
            const activationLink = uuid.v4()

            const user = await db.query(
                'INSERT INTO "user" (name, email, password, activationLink) VALUES ($1::text, $2::text, $3::text, $4::text) RETURNING *',
                [name, email, hashedPassword, activationLink]
            )

            // await MailService.sendActivationEmail(email, process.env.API_URL + '/api/auth/activate/' + activationLink)

            const userDto = new UserDto(user.rows[0])

            const tokens = TokenService.generateTokens({...userDto})

            await TokenService.saveToken(userDto.id, tokens.refreshToken)

            const data = {
                ...tokens,
                user: user && user.rows && user.rows.length ? user.rows[0] : null
            }

            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.status(201).json(data)
        } catch(error) {
            next(error)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies

            await db.query('DELETE FROM token WHERE refreshToken = $1', [refreshToken])

            res.clearCookie('refreshToken')
            return res.status(200).json()
        } catch(error) {
            next(error)
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies

            if (!refreshToken) {
                throw ApiError.UnauthorizedError()
            }

            const userData: UserDtoType | any | JwtPayload = TokenService.validationRefreshToken(refreshToken)
            const tokenData = await TokenService.findToken(refreshToken)

            if (!userData || !tokenData) {
                throw ApiError.UnauthorizedError()
            }

            const user = await db.query('SELECT * FROM "user" WHERE id = $1', [userData.id])
            if (user && user.rows && user.rows.length) {
                const userDto = new UserDto(user.rows[0])

                const tokens = TokenService.generateTokens({...userDto})

                await TokenService.saveToken(userDto.id, tokens.refreshToken)

                const data = {
                    ...tokens,
                    user: user && user.rows && user.rows.length ? user.rows[0] : null
                }

                res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

                return res.status(201).json(data)
            } else {
                throw ApiError.BadRequest('User does not exist')
            }
        } catch(error) {
            next(error)
        }
    }

    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const activationLink = req.params.link

            const user = await db.query('SELECT * FROM "user" WHERE activationLink = $1', [activationLink])

            if (user && user.rows && user.rows.length) {
                await db.query('UPDATE "user" SET isActivated = $1 WHERE activationLink = $2', [true, activationLink])
            } else {
                throw ApiError.BadRequest('Некорректная ссылка активации')
            }

            return res.redirect(process.env.CLIENT_URL)
        } catch(error) {
            next(error)
        }
    }
}

export default new AuthController()