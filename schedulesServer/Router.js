import { Router } from 'express'
import Controller from './Controller.js'
import checkCenter from './middlware.js'

import middlwareAuth from './middleWareAuth.js'

const router = new Router()

router.post('/test', Controller.test)
router.post('/create', middlwareAuth.autorizeAdmin, checkCenter, Controller.create)
router.delete('/delete',middlwareAuth.autorizeAdmin, Controller.delete)
router.post('/', checkCenter, Controller.getAllInCenter)
router.get('/:id', Controller.getOne)

export default router