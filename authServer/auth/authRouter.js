import { Router } from 'express'
import authController from './authController.js'


const authRouter = new Router()

authRouter.get('/', (req, res) => {res.json('auth ok')})
authRouter.get('/test', authController.test)
authRouter.post('/registration', authController.registration) 
authRouter.post('/login', authController.login)
authRouter.post('/detoken', authController.detoken)

export default authRouter