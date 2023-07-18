// Импорт сторонних модулей
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
require('dotenv').config();

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/errorHandler');

const indexRoutes = require('./routes/index');
const { PORT, databaseURL, allowedCors } = require('./config');

const app = express();

// Подключение к базе данных
mongoose.connect(databaseURL, {
  useNewUrlParser: true,
})
  // eslint-disable-next-line no-console
  .then(() => console.log('Connected to MongoDB'));

// Подключение мидлвэра безопасности и парсеров
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// Настройка логгера запросов
app.use(requestLogger);

// Подключение мидлвэра CORS
app.use(cors({
  origin: allowedCors,
  optionsSuccessStatus: 200,
  credentials: true,
}));

// Подключение роутов
app.use(indexRoutes);

// Настройка логгера ошибок
app.use(errorLogger);

// Настройка обработки ошибок
app.use(errors());
app.use((error, req, res, next) => {
  errorHandler(error, req, res, next);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
