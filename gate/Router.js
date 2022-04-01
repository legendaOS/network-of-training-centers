import { Router } from 'express'
import Controller  from './Controller.js'

const router = new Router()

router.get('/centers', Controller.disableCORS, Controller.getAllCenters)


export default router

