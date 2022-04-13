import { Router } from 'express'
import Controller from './Controller.js'
import middlwareAuth from './middleWare.js'


const router = new Router()

router.post('/test', Controller.test)
router.post('/create', middlwareAuth.autorizeUser, Controller.create)
router.get('/applications/:name', middlwareAuth.autorizeAdmin, Controller.getByName)
router.delete('/application', middlwareAuth.autorizeAdmin, Controller.deleteAppl)


export default router