const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userModel = require('../models/user');
const { JWT_SECRET } = require('../config/config');

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)// хешируем пароль

    .then((hash) => userModel.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      });
    })
    .catch((err) => res.status(500).send({ message: `Ошибка создания пользовотеля. ${err}` }));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  // вытаскиваем функцию проверки юзера, если успешно выдаем токен, если нет-пробрасываем ошибку
  return userModel.findUsersData(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.status(201).cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).send({ message: 'Авторизация прошла успешно' });
    })
    .catch(() => {
      res.status(401).send({ message: 'Неправильные почта и пароль' });
    });
};

module.exports.getAllUsers = (req, res) => {
  userModel.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Пользователи не найдены' }));
};

module.exports.getUser = (req, res) => {
  userModel.findById(req.params.id)
    .then((user) => (user === null ? res.status(404).send({ message: 'Пользователь не найден' }) : res.send({ data: user })))
    .catch(() => res.status(500).send({ message: 'Пользователя с таким id не существует' }));
};
