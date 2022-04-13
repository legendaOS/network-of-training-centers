import pkg from 'sequelize';
const { DataTypes} = pkg;

function defineShema(sequelize){

    const Application = sequelize.define(
        'Application',
        {
          // Здесь определяются атрибуты модели
          id_schedules: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          user_name: {
            type: DataTypes.STRING,
            allowNull: false,
          }
          
        },
        {
          createdAt: false,
          updatedAt: false
        }
      )

    return Application
}

export default defineShema