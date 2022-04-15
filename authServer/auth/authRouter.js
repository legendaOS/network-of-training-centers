import { Router } from 'express'
import authController from './authController.js'
import middleWare from '../middleWare.js'


const authRouter = new Router()

authRouter.get('/test', authController.test)
authRouter.post('/registration', authController.registration) 
authRouter.post('/login', authController.login)
authRouter.get('/premissions', authController.getPremissions)
authRouter.get('/find', authController.findUser)

authRouter.patch('/user', middleWare.autorizeSuperuser, authController.changeUser) //{headrs.token, body.id, body.role}
authRouter.get('/users', middleWare.autorizeSuperuser, authController.findAll)    //{headrs.token}
authRouter.delete('/user', middleWare.autorizeSuperuser, authController.deleteUser) //{headrs.token ,body.id} 

export default authRouter