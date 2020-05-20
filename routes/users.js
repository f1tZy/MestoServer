const router = require('express').Router();

const { getAllUsers, getUser } = require('../controllers/users');
const { IdValid } = require('../middlewares/validation');

router.get('/', getAllUsers);// возвращаем список пользователей

// получения пользователя по id
router.get('/:id', IdValid, getUser);

module.exports = router;
