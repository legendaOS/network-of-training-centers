import express from 'express'
import authRouter from './auth/authRouter.js'
import settings from './settings.js'
import authInDB from './auth/db_enter.js'

const seqAndModel = await authInDB('postgres://postgres:postgres@localhost:5432/users_centers')

console.log(seqAndModel)

const authApp = express()

authApp.use(express.json())
authApp.use('/auth', authRouter)
authApp.get('/', (req, res) => {res.json('ok')})

authApp.listen(settings.portAuthServer, () => {console.log(`Auth server running on port ${settings.portAuthServer}`)})

export default {user: seqAndModel.modl}