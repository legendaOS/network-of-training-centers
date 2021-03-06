import pkg from 'sequelize';
const { DataTypes} = pkg;

function defineShema(sequelize){
    
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
          },
          role:{
            type: DataTypes.STRING,
            defaultValue: 'USER'
          },
          fio: {
            type: DataTypes.STRING
          }
        },
        {
          createdAt: false,
          updatedAt: false
        }
      )

    return User
}



export default defineShema