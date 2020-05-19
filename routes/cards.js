const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { createCard, getAllCards, deleteCard } = require('../controllers/cards');// вытаскиваем методы карточек

// возвращаем список карточек
router.get('/', getAllCards);

// создание карточки
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().uri().required().regex(/http[s]?:\/\/(((\d{1,3}\.){3}\d{1,3})|(([a-zA-Z/\d-]+\.)?[[a-zA-Z/\d-]+\.[a-zA-Z]+))(:\d{2,5})?(\/[a-zA-Z/\d-]+#?)?/),
  }),
}), createCard);

// удаление карточки
router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), deleteCard);


module.exports = router;
