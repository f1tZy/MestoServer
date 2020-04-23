const userModel = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  userModel.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Ошибка создания пользовотеля. ${err}` }));
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
