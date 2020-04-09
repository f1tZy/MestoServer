const router = require('express').Router();

const users = require('../../data/users');

// возвращаем список пользователей
router.get('/', (req, res) => {
  res.send(users);
});


// возвращаем пользователя с id
router.get('/:id', (req, res) => {
  const idUser = users.find((user) => user._id === req.params.id);
  if (!idUser) {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
    return;
  }
  res.send(idUser);
});


module.exports = router;
