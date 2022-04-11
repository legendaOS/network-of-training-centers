import { Router } from 'express'
import Controller  from './Controller.js'

const router = new Router()

router.options('/*', Controller.disableCORS)

router.get('/centers', Controller.disableCORS, Controller.getAllCenters)
router.post('/login', Controller.disableCORS, Controller.login)
router.post('/test', Controller.disableCORS, Controller.test)
router.post('/reg', Controller.disableCORS, Controller.reg)
router.get('/data', Controller.disableCORS, Controller.data)
router.post('/news_delete', Controller.disableCORS, Controller.deleteNews)
router.post('/news', Controller.disableCORS, Controller.addNews)
router.post('/shedules_delete', Controller.disableCORS, Controller.deleteShedlues)
router.post('/shedules', Controller.disableCORS, Controller.addShedlues)




export default router

