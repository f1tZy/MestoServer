const router = require('express').Router();

const { createCard, getAllCards, deleteCard } = require('../../controllers/cards');// вытаскиваем методы карточек

router.get('/', getAllCards);// возвращаем список карточек
router.post('/', createCard);// создание карточки
router.delete('/:id', deleteCard);// удаление карточки


module.exports = router;
