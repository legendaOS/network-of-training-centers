import pkg from 'sequelize';
const { DataTypes} = pkg;

function defineShema(sequelize){

    const News = sequelize.define(
        'News',
        {
          // Здесь определяются атрибуты модели
          date: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          time: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          topic:{
            type: DataTypes.STRING,
            allowNull: false,
          },
          center_in:{
            type: DataTypes.STRING,
            allowNull: false,
          }
        },
        {
          createdAt: false,
          updatedAt: false
        }
      )

    return News
}

export default defineShema