const router = require('express').Router();

const { createUser, getAllUsers, getUser } = require('../../controllers/users');

router.get('/', getAllUsers);// возвращаем список пользователей
router.post('/', createUser);// создание пользователя
router.get('/:id', getUser);// получения пользователя по id

module.exports = router;
