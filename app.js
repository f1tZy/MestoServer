const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const router = require('./routes/index.js');// роутер карточек и пользователя

const { PORT = 3000 } = process.env;
const app = express();

// временное решение авторизации
app.use((req, res, next) => {
  req.user = {
    _id: '5ea175ee2b6da72500938278',
  };
  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// подключаем bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// общий запрос на роутер
app.use('/', router);

// ошибка на не существующий ресурс
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

// запускаем сервер на 3000 порте
app.listen(PORT);
