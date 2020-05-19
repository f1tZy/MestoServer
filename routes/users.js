const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { createUser, getAllUsers, getUser } = require('../controllers/users');

router.get('/', getAllUsers);// возвращаем список пользователей
router.post('/', createUser);// создание пользователя

// получения пользователя по id
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), getUser);

module.exports = router;
