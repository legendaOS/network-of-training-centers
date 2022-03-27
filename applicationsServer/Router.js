import { Router } from 'express'
import Controller from './Controller.js'
import middle from './middlWare.js'

import middlwareAuth from '../authServer/middleWare.js'

const router = new Router()

router.post('/test', Controller.test)
router.post('/create', middlwareAuth.autorizeUser, Controller.create)


export default router