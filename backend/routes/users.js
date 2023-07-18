const router = require('express').Router();

const {
  updateUserValidation,
  updateUserAvatarValidation,
  userIdValidation,
} = require('../utils/validationRules');

const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUser,
} = require('../controllers/users');

// Получить список пользователей
router.get('/', getUsers);

// Получить текущего пользователя
router.get('/me', getCurrentUser);

// Обновить информацию о пользователе
router.patch('/me', updateUserValidation, updateUser);

// Обновить аватар пользователя
router.patch('/me/avatar', updateUserAvatarValidation, updateUser);

// Получить пользователя по id
router.get('/:userId', userIdValidation, getUserById);

module.exports = router;
