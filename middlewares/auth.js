const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config/config');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    res.status(401).send({ message: 'Ошибка авторизации' });
  }
  req.user = payload;

  next();
};
