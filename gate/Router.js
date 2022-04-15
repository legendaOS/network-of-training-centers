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
router.post('/center', Controller.disableCORS, Controller.addCenter)
router.post('/center_delete', Controller.disableCORS, Controller.deleteCenter)
router.post('/center_change', Controller.disableCORS, Controller.changeCenter)

router.post('/application', Controller.disableCORS, Controller.createApplication) //{header.token{user}, body.id_schedules}
router.get('/applications', Controller.disableCORS, Controller.getApplications) //{header.token(admin+)}
router.delete('/application', Controller.disableCORS, Controller.deleteApplication) //{header.token(admin+), body.id}

router.get('/users', Controller.disableCORS, Controller.getAllUsers)        //{header.token(superuser)
router.patch('/user', Controller.disableCORS, Controller.changeUser)        //{header.token(superuser) body.id,role}
router.delete('/user', Controller.disableCORS, Controller.deleteUser)       //{header.token(superuser) body.id}

export default router

