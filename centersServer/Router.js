import { Router } from 'express'
import Controller from './Controller.js'
import middleWare from './middleWare.js'

const router = new Router()

router.get('/testmiddle', middleWare.autorizeSuperuser, middleWare.printLol)

router.post('/test', Controller.test)
router.post('/create', middleWare.autorizeSuperuser, Controller.createCenter)
router.get('/', Controller.getAll)
router.put('/change', middleWare.autorizeSuperuser , Controller.changeCenter)  
router.get('/find', Controller.getOne)

export default router