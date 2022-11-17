const jwt = require('jsonwebtoken');
const Error401 = require('../errors/Error401');
const { errorMessage } = require('../constants');

// const { NODE_ENV, JWT_SECRET} = process.env;

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

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new Error401(errorMessage.errorAuth));
  }

  req.user = payload;
  return next();
};

module.exports = auth;
