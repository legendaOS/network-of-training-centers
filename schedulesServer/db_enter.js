import Sequelize from 'sequelize'
import defineShema from './models.js'

async function authInDB(adress){
    const sequelize = new Sequelize(adress)

    try {
        await sequelize.authenticate()
        console.log('Соединение с БД было успешно установлено')
    } catch (e) {
        console.log('Невозможно выполнить подключение к БД: ', e)
        return 0
    }

    const Schedule = defineShema(sequelize)

    await Schedule.sync({ alter: true })

    return {seq: sequelize, modl: Schedule}

}

export default authInDB