import { Router } from 'express'
import Controller  from './Controller.js'

const router = new Router()

router.options('/*', Controller.disableCORS)

router.get('/centers', Controller.disableCORS, Controller.getAllCenters)
router.post('/login', Controller.disableCORS, Controller.login)
router.post('/test', Controller.disableCORS, Controller.test)
router.post('/reg', Controller.disableCORS, Controller.reg)
router.get('/data', Controller.disableCORS, Controller.data)




export default router

