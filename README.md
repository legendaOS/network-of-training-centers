# Сеть развивающих центров

## Схема сервисов

Система состоит из 8-ми сервисов

1. Session service отвечает за авторизацию, валидацию и выдачу JWT токенов
2. Gateway Service является точкой входа в систему
3. UI Service отвечает за отрисовку пользовательского интерфейса
4. Locations Service отвечает за хранение и выдачу центров (адресов и информации)
5. News Service отвечает за хранение и выдачу новостей и комментариев к новостям для всех центров
6. Schedules Service отвечает за хранение и выдачу расписаний занятий для записей на них для каждого центра
7. Applications Service отвечает за хранение и выдачу записей пользователей на занятия

Клиент обращается к UI для получения контента, UI Service в процессе создания контента для выдачи обращается к Gateway для получения нужной информации

Для авторизации клиента используется Session service, для выдачи необходимого контента и определения возможностей клиента Gateway обращается к Session service


 
## Общее описание работы системы

При заходе на сайт неавторизованный пользователь получает возможность получить информацию о центрах, новости внутри выбранного центра а так же расписание для выбранного центра

Пользователь может зарегистрироваться

Пользователь может авторизироваться и получить одну из трех ролей:

1. superuser - роль позволяет делать все действия роли admin, кроме того может создавать новые центры и удалять старые, назначать роли другим пользователям
2. admin (роль выдает права для одного центра) - роль позволяет:
   1. Добавлять и удалять записи в расписание занятий своего центра
   2. Добавлять и удалять записи в новости своего центра
   3. Просматривать записи на занятия для своего центра и личностей записавшихся
   4. Все действия роли user
3. user - роль позволяет:
   1. Записываться на занятия в любой центр
   2. Оставлять комментарии к новостям любого центра

## ТЗ

ТЗ находится в файле ТЗ.docx


## Макет сайта

На всех страницах сайта в шапке кнопка авторизации \ регистрации

Главная страница - просмотр всех центров (доступна для всех пользователей)

![Главная](/img_readme/index.png)

Страница центра - просмотр новостей и расписания для одного центра (доступна для всех пользователей)

![Страница центра](/img_readme/center.png)

Страница редакции и добавления новостей (доступна для admin и seperuser)

![Страница новостей](/img_readme/admin_news.png)

Страница редакции расписания (доступна для admin и seperuser)

![Страница редакции расписания](/img_readme/create_schedlue.png)

Страница просмотра записей на занятия (доступна для admin и seperuser)

![Страница просмотра записей на занятия](/img_readme/schedule.png)

Страница статистики (доступна для seperuser)
 
![Страница статистики ](/img_readme/stat.png)
