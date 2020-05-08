const router = require('express').Router();

const users = require('./users');
const cards = require('./cards');
const auth = require('../middlewares/auth');// middleware авторизации

router.use('/cards', auth, cards);
router.use('/users', auth, users);

module.exports = router;
