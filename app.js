require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const router = require('./routes/index.js');// роутер карточек и пользователя
const { PORT, DATA_URL } = require('./config/config');
const { login, createUser } = require('./controllers/users');// авторизация и регистрация пользователя


const app = express();

app.use(cookieParser());

mongoose.connect(DATA_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// подключаем bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// общий запрос на роутер
app.use('/', router);

// запрос на логин
app.post('/signin', login);

// запрос на регистрацию пользовотеля
app.post('/signup', createUser);

// ошибка на не существующий ресурс
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

// запускаем сервер на 3000 порте
app.listen(PORT);
