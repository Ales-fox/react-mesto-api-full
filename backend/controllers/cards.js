const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const Error400 = require('../errors/Error400');
const ForbiddenError = require('../errors/ForbiddenError');
const { errorMessage } = require('../constants');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  // Если функция не находит эл-т с таким id, то метод orFail создает ошибку и кидает в блок catch
  Card.findById(req.params.cardId)
    .populate(['owner', 'likes'])
    .orFail(new NotFoundError(errorMessage.notFoundCard))
    .then((card) => {
      if (card.owner._id.toHexString() !== req.user._id) {
        throw new ForbiddenError(errorMessage.forbiddenError);
      }
      return Card.findByIdAndRemove(req.params.cardId);
    })
    .then((dataCard) => {
      res.send(dataCard);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new Error400(errorMessage.castError));
      }
      return next(err);
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const doc = new Card({ name, link, owner: req.user._id });
  doc.save()
    .then((card) => {
      card.populate(['owner', 'likes'])
        .then(({
          // eslint-disable-next-line no-shadow
          name,
          // eslint-disable-next-line no-shadow
          link,
          owner,
          likes,
          createdAt,
          _id,
        }) => {
          // eslint-disable-next-line object-curly-newline
          res.status(201).send({ name, link, owner, likes, createdAt, _id });
        });
    })
    // 2-й в-т. Хуже двойным обращением в БД
    /* .then((card) => Card.findById(card._id).populate(['owner', 'likes']))
    . then((card) => res.send(card)) */
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new Error400(errorMessage.validationError));
      }
      return next(err);
    });
};

module.exports.putLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавляет _id в массив, если его там нет
    { new: true },
  ).populate(['owner', 'likes']).orFail(new NotFoundError(errorMessage.notFoundCard))
    .then((card) => res.send({
      likes: card.likes,
      _id: card._id,
      name: card.name,
      link: card.link,
      owner: card.owner,
      createdAt: card.createdAt,
    }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new Error400(errorMessage.castError));
      }
      return next(err);
    });
};

module.exports.deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убирает _id из массива
    { new: true },
  ).populate(['owner', 'likes']).orFail(new NotFoundError(errorMessage.notFoundCard))
    .then((card) => res.send({
      likes: card.likes,
      _id: card._id,
      name: card.name,
      link: card.link,
      owner: card.owner,
      createdAt: card.createdAt,
    }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new Error400(errorMessage.castError));
      } else {
        next(err);
      }
    });
};
