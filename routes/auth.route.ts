import Router from 'express'
import AuthController from '../controllers/auth.controller'
import {body} from 'express-validator'

const router = Router()

router.post('/sign-in', body('login').notEmpty(), body('password').notEmpty(), AuthController.signIn)
router.post('/sign-up', body('name').notEmpty(), body('password').notEmpty(), body('email').isEmail(), AuthController.signUp)
router.get('/logout', AuthController.logout)
router.get('/activate/:link', AuthController.activate)
router.get('/refresh', AuthController.refresh)

export default router