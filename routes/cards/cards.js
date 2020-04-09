const router = require('express').Router();

const cards = require('../../data/cards');

// возвращаем список карточек
router.get('/', (req, res) => {
  res.send(cards);
});


module.exports = router;
