const router = require('express').Router();

// Импорт модулей
const usersRoute = require('./users');
const cardsRoute = require('./cards');
const NotFoundError = require('../errors/NotFoundError');
const { createUser, login, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const {
  signupValidation,
  signinValidation,
} = require('../utils/validationRules');

// Настройка роута для регистрации
router.post('/signup', signupValidation, createUser);

// Настройка роута для авторизации
router.post('/signin', signinValidation, login);

// Настройка роута для авторизации
router.get('/signout', logout);

// Запуск мидлвэра авторизации
router.use(auth);

// Настройка основных роутов
router.use('/users', usersRoute);
router.use('/cards', cardsRoute);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
