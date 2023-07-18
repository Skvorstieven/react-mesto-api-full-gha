const router = require('express').Router();

const {
  createCardValidation,
  cardIdValidation,
} = require('../utils/validationRules');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

// Получить все карточки
router.get('/', getCards);

// Создать карточку
router.post('/', createCardValidation, createCard);

// Удалить карточку
router.delete('/:cardId', cardIdValidation, deleteCard);

// Лайкнуть карточку
router.put('/:cardId/likes', cardIdValidation, likeCard);

// Удалить лайк с карточки
router.delete('/:cardId/likes', cardIdValidation, dislikeCard);

module.exports = router;
