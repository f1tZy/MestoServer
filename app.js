const express = require('express');

const router = require('./routes/index.js');

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();


// выводим статичный проект
app.use(express.static(`${__dirname}/public`));

// выводим карточки/пользователей по запросу
app.use('/', router);

// ошибка на не существующий ресурс
app.use('*', (req, res, next) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
  next(true);
});

// запускаем сервер на 3000 порте
app.listen(PORT, () => {
  console.log('Ссылка на сервер:');
  console.log(BASE_PATH);
});
