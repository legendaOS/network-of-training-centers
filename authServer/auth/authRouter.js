import { Router } from 'express'
import authController from './authController.js'
import middlwareController from '../../middleWare/Controller.js'

const authRouter = new Router()

authRouter.get('/test', authController.test)
authRouter.post('/registration', authController.registration) 
authRouter.post('/login', authController.login)
authRouter.get('/premissions', authController.getRole)


export default authRouter