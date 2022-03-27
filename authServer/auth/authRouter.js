import { Router } from 'express'
import authController from './authController.js'


const authRouter = new Router()

authRouter.get('/test', authController.test)
authRouter.post('/registration', authController.registration) 
authRouter.post('/login', authController.login)
authRouter.get('/premissions', authController.getPremissions)
authRouter.get('/find', authController.findUser)


export default authRouter