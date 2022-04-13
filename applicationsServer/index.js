import express from 'express'
import authInDB from './db_enter.js'
import router from './Router.js'

const seqAndModel = await authInDB('postgres://postgres:postgres@db_applications/postgres')

const app = express()

app.use(express.json())

app.use('/', router)


app.listen(80, () => {console.log(`applications server running on port ${80}`)})

export default seqAndModel