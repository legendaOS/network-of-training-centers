import express from 'express'
import authInDB from './db_enter.js'
import router from './Router.js'

const seqAndModel = await authInDB('postgres://postgres:postgres@localhost:5432/centers_centers')

const app = express()

app.use(express.json())

app.use('/', router)


app.listen(3000, () => {console.log(`centers server running on port ${3000}`)})

export default seqAndModel
