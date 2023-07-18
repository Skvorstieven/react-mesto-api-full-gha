const http2 = require('http2');
const mongoose = require('mongoose');

const http2Constants = http2.constants;
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');

function errorHandler(err, req, res) {
  if (err.code === 11000) {
    res.status(http2Constants.HTTP_STATUS_CONFLICT).send({ message: 'Пользователь с этим email уже существует' });
    return;
  }
  if (
    err instanceof BadRequestError
    || err instanceof ForbiddenError
    || err instanceof NotFoundError
    || err instanceof UnauthorizedError
    || err instanceof mongoose.Error.CastError) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(http2Constants.HTTP_STATUS_BAD_REQUEST).send({ message: err.message });
    return;
  }
  res.status(http2Constants.HTTP_STATUS_SERVER_ERROR).send({ message: 'Ошибка сервера' });
}

module.exports.errorHandler = errorHandler;
