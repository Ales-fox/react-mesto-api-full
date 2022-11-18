const errorMessage = {
  notFoundUser: 'Запрашиваемый пользователь не найден',
  notFoundCard: 'Карточка не найдена',
  castError: 'Некорректный id',
  validationError: 'Ошибка валидации:',
  jwtError: 'Отсутствие/некорректный токена/токен',
  emailExistError: 'При регистрации указан email, который уже существует на сервере',
  resourseExistError: 'Запрашиваемый ресурс не найден',
  forbiddenError: 'Доступ к запрошеному ресурсу запрещен',
  errorAuth: 'Неправильная почта или пароль',
};
const SECRET_JWT = 'some-secret-key';
const avatarPatternValidation = /(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.[\w-]{1,32}))(:\d{2,5})?((\/.+)+)?\/?#?/;
const allowedCors = [
  'http://domainSashaBack.nomoredomains.icu',
  'http://domainsashaback.nomoredomains.icu',
  'http://domainsashaback.nomoredomains.icu/',
  'https://domainSashaBack.nomoredomains.icu',
  'https://domainsashaback.nomoredomains.icu',
  'https://domainsashaback.nomoredomains.icu/',
  'http://localhost:3001',
  'https://localhost:3001',
];

module.exports = {
  errorMessage,
  SECRET_JWT,
  avatarPatternValidation,
  allowedCors,
};
