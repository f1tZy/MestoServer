# Mesto project
Версия проекта: v.0.0.2

## Описание:
Сервер с подключением к базе данных Mongo.
И обработка запросов на сервер.

## Инструкция как развернуть проект:

npm run start - запускает live-server по адресу http://localhost:3000.

npm run dev - запускает live-server с hot-reload(nodemon).

* Запрос POST /signup создаёт пользователя;
* Запрос POST /signin вход пользователя;
* Запрос GET /cards возвращает все карточки всех пользователей;
* Запрос POST /cards создаёт карточку;
* Запрос DELETE /cards/:cardId удаляет конкретную карточку;
