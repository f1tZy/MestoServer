require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { requestLogger, errorLogger } = require('./middlewares/logs');
const { errorHandler } = require('./middlewares/error-handler');
const NotFoundError = require('./status_errors/not_found');

const router = require('./routes/index.js');// роутер карточек и пользователя
const { PORT, DATA_URL } = require('./config/config');
const { login, createUser } = require('./controllers/users');// авторизация и регистрация пользователя


const app = express();

const limite = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

// подключаем лимит для ограничения запросов nginx
app.use(limite);

// подключаем helmet
app.use(helmet());

app.use(cookieParser());

mongoose.connect(DATA_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// подключаем bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключаем логи запросов
app.use(requestLogger);

// тест для краша сервера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// общий запрос на роутер
app.use('/', router);

// запрос на логин, и тут же валидация через joi
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

// запрос на регистрацию пользователя, и тут же валидация через joi
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2),
    avatar: Joi.string().required().min(2),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

// ошибка на не существующий ресурс
app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

// логи ошибок
app.use(errorLogger);

// делаем ошибки joi в формате json
app.use(errors());

// обработка 500ой ошибки
app.use(errorHandler);

// запускаем сервер на 3000 порте
app.listen(PORT);
