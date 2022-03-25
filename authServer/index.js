import express from 'express'
import authRouter from './auth/authRouter.js'
import settings from './settings.js'
import {Sequelize, DataTypes} from "sequelize"

const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/users_centers')

try {
    await sequelize.authenticate()
    console.log('Соединение с БД было успешно установлено')
  } catch (e) {
    console.log('Невозможно выполнить подключение к БД: ', e)
  }

  const User = sequelize.define(
    'User',
    {
      // Здесь определяются атрибуты модели
      login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      createdAt: false,
      updatedAt: false
    }
  )

User.sync({ alter: true })


const authApp = express()

authApp.use(express.json())
authApp.use('/auth', authRouter)
authApp.get('/', (req, res) => {res.json('ok')})

authApp.listen(settings.portAuthServer, () => {console.log(`Auth server running on port ${settings.portAuthServer}`)})

export default {authseq: sequelize, user: User}