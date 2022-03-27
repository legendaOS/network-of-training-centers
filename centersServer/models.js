import pkg from 'sequelize';
const { DataTypes} = pkg;

function defineShema(sequelize){

    const Center = sequelize.define(
        'Center',
        {
          // Здесь определяются атрибуты модели
          name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
          },
          adress: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          info:{
            type: DataTypes.STRING,
            allowNull: false,
          }
        },
        {
          createdAt: false,
          updatedAt: false
        }
      )

    return Center
}

export default defineShema