const router = require('express').Router();

const { createCard, getAllCards, deleteCard } = require('../controllers/cards');// вытаскиваем методы карточек
const { IdValid, postValid } = require('../middlewares/validation');

// возвращаем список карточек
router.get('/', getAllCards);

// создание карточки
router.post('/', postValid, createCard);

// удаление карточки
router.delete('/:id', IdValid, deleteCard);

module.exports = router;
