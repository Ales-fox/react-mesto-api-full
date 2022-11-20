const jwt = require('jsonwebtoken');
const Error401 = require('../errors/Error401');
require('dotenv').config();// Модуль для работы с переменной окружения process.env
const { errorMessage, SECRET_JWT_DEV } = require('../constants');

const auth = (req, res, next) => {
  // Вариант для использования локал сторэдж
  /*  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Error401(errorMessage.errorAuth));
  }
  const token = authorization.replace('Bearer ', ''); */
  if (!req.cookies.jwt) {
    return next(new Error401(errorMessage.errorAuth));
  }
  const token = req.cookies.jwt;
  let payload;
  const { NODE_ENV = 'development', JWT_SECRET = 'Key-secret' } = process.env;

  try {
    payload = jwt.verify(token, (NODE_ENV === 'production' ? JWT_SECRET : SECRET_JWT_DEV));
  } catch (err) {
    return next(new Error401(errorMessage.errorAuth));
  }

  req.user = payload;
  return next();
};

module.exports = auth;
