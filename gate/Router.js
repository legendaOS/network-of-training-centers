import { Router } from 'express'
import Controller  from './Controller.js'

const router = new Router()

router.get('/centers', Controller.disableCORS, Controller.getAllCenters)
router.post('/login', Controller.disableCORS, Controller.login)


export default router

