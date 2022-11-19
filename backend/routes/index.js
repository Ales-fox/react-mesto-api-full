const router = require('express').Router();
const { celebrate, Joi } = require('celebrate'); // Валидация входящих данных
const { login, createUser, logOut } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { avatarPatternValidation } = require('../constants');
const userRouter = require('./users');
const cardRouter = require('./cards');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(avatarPatternValidation),
  }).unknown(true),
}), createUser);

router.use(auth); // авторизация, выше всех роутов где нужна авторизация
router.post('/logout', logOut); // Выход из системы
router.use('/users', userRouter);
router.use('/cards', cardRouter);

module.exports = router;
