# Mesto project
Версия проекта: v.0.0.3

## Описание:
Создание виртуальной машины и деплой проекта на публичный сервер. В данной работе отрабатываются навыки по взаимодействию с Node.js, Express.js, MongoDB, развертывание сервера на удалённой виртуальной машине. Также добавлен центральный обработчик ошибок и реализована валидация введёных данных с помощью celebrate и Joi.

## Стек: 
Node.js, Express.js, MongoDB.

## Инструкция как развернуть проект:

```sh
Команды для терминала:

git clone https://github.com/f1tZy/MestoServer.git - клонировать проект на локальный компьютер

npm install - установить зависимости.

npm run start - запускает live-server по адресу http://localhost:3000.

npm run dev - запускает live-server с hot-reload(nodemon).
```

* Запрос POST /signup создаёт пользователя;
* Запрос POST /signin вход пользователя;
* Запрос GET /cards возвращает все карточки всех пользователей;
* Запрос POST /cards создаёт карточку;
* Запрос DELETE /cards/:cardId удаляет конкретную карточку;
