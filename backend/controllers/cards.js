const http2 = require('http2');
const mongoose = require('mongoose');

const {
  findAllCards,
  createNewCard,
  findCardById,
  AddLikeCard,
  RemoveLikeCard,
  deleteCard,
} = require('../utils/databaseHandler');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const http2Constants = http2.constants;

// Получить всe карточки
module.exports.getCards = (req, res, next) => {
  findAllCards()
    .then((cards) => res.send(cards))
    .catch(next);
};

// Создать новую карточку
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  createNewCard({ name, link, owner: req.user._id })
    .then((card) => res.status(http2Constants.HTTP_STATUS_CREATED).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

// Удалить карточку
module.exports.deleteCard = (req, res, next) => {
  findCardById(req.params.cardId) // Найти кароточку по id
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      if (card.owner.valueOf() === req.user._id) { // Проверить что карточка принадлежит юзеру
        deleteCard(card) // Удалить карточку
          .then((deletedCard) => res.send(deletedCard))
          .catch((err) => {
            if (err.name === 'CastError') {
              next(new BadRequestError('Некорректный id карточки'));
            } else {
              next(err);
            }
          });
      } else {
        next(new ForbiddenError('Недостаточно прав'));
      }
    })
    .catch(next);
};

// Лайкнуть карточку
module.exports.likeCard = (req, res, next) => {
  AddLikeCard(
    req.params.cardId,
    req.user._id,
  )
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный id карточки'));
      } else {
        next(err);
      }
    });
};

// Удалить лайк с карточки
module.exports.dislikeCard = (req, res, next) => {
  RemoveLikeCard(
    req.params.cardId,
    req.user._id,
  )
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный id карточки'));
      } else {
        next(err);
      }
    });
};
