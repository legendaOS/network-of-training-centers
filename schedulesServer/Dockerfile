#  Основа проекта
FROM node:14
#  Указываем текущую рабочую директорию на виртуальной машине
WORKDIR /app
#  Копирование данных о зависимостях проекта
COPY ./package.json ./package.json
#  Запуск команды для установки библиотек
RUN npm install --only=prod
#  Копируем проект в директорию
COPY . .

EXPOSE 80
#  Установка среды для боевого сервера
ENV NODE_ENV production
#  Запуск приложения
CMD ["npm", "run", "test"]