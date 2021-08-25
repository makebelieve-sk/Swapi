import jwt from 'jsonwebtoken'

import db from '../db.index'
import {UserDtoType} from '../types/auth.types'

class TokenService {
    generateTokens(payload: UserDtoType) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30m'})

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId: number, refreshToken: string) {
        const tokenData = await db.query('SELECT * FROM token WHERE "user" = $1', [userId])

        if (tokenData && tokenData.rows && tokenData.rows.length) {
            // Обновляем токен
            await db.query('UPDATE token SET refreshToken = $1 WHERE "user" = $2', [refreshToken, userId])
        } else {
            // Создаем токен в бд
            await db.query('INSERT INTO token ("user", refreshToken) VALUES ($1, $2)', [userId, refreshToken])
        }
    }

    validationAccessToken(token: string) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        } catch(error) {
            return null
        }
    }

    validationRefreshToken(token: string) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
        } catch(error) {
            return null
        }
    }

    async findToken(refreshToken: string) {
        const tokenData = await db.query('SELECT * FROM token WHERE refreshToken = $1', [refreshToken])

        if (tokenData && tokenData.rows && tokenData.rows.length) {
            return tokenData.rows[0]
        } else {
            return null
        }
    }
}

export default new TokenService()