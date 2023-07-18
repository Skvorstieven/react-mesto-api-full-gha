const http2 = require('http2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
  findAllUsers,
  findUserById,
  findUserByIdAndUpdate,
  createUser,
  findUserByCredentials,
} = require('../utils/databaseHandler');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const { jwtKey } = require('../config');

const http2Constants = http2.constants;

// Получить список пользователей
module.exports.getUsers = (req, res, next) => {
  findAllUsers()
    .then((users) => res.send(users))
    .catch(next);
};

// Получить пользователя по id
module.exports.getUserById = (req, res, next) => {
  findUserById(req.params.userId)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный id пользователя'));
      } else {
        next(err);
      }
    });
};

// Получить текущего пользователя
module.exports.getCurrentUser = (req, res, next) => {
  findUserById(req.user._id)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch(next);
};

// Обновить информацию о пользователе
module.exports.updateUser = (req, res, next) => {
  findUserByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch(next);
};

// Зарегистрировать нового пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => createUser({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res
      .status(http2Constants.HTTP_STATUS_CREATED)
      .send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      }))
    .catch(next);
};

// Авторизация пользователя
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, jwtKey);
      res
        .cookie('jwt', token, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: true,
        })
        .send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        });
    })
    .catch(next);
};

// eslint-disable-next-line no-unused-vars
module.exports.logout = (req, res, next) => {
  res
    .clearCookie('jwt')
    .status(http2Constants.HTTP_STATUS_OK)
    .send();
};
