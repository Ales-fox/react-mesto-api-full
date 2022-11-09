// Импорт(подключение) модулей
const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const router = require('./routes/index');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorMessage, avatarPatternValidation } = require('./constants');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
// Подключение базы данных
mongoose.connect(MONGO_URL);
// Создание приложения
const app = express();

app.use(requestLogger); // Логгер запросов. Подключается до всех обработчиков роутов

// Подключаем возможность обработки json объектов запросами
// Всегда выше запросов где это используется
// Можно подключить только к 1 конкретному запросу
app.use(express.json());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(avatarPatternValidation),
  }).unknown(true),
}), createUser);

// авторизация
app.use(auth);

app.use(router);

app.use('*', (req, res, next) => { // Ошибка на неизвестные роуты
  next(new NotFoundError(errorMessage.resourseExistError));
});

app.use(errorLogger); //  Логгер ошибок. Подключаем после обр-в роутов и до обр-в ошибок
app.use(errors()); // Обработчик ошибок celebrate
// Централизованный обработчик ошибок, находится ниже всех но до PORT
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on port ${PORT}`);
});
