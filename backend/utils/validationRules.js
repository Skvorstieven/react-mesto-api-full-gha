const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;

const urlRegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
const textNotRequiredValidation = Joi.string().min(2).max(30);
const textRequiredValidation = Joi.string().required().min(2).max(30);
const urlNotRequiredValidation = Joi.string().pattern(urlRegExp);
const urlRequiredValidation = Joi.string().required().pattern(urlRegExp);
const emailValidation = Joi.string().required().email();
const passwordValidation = Joi.string().required().min(8);

const signupValidation = celebrate({
  body: Joi.object().keys({
    name: textNotRequiredValidation,
    about: textNotRequiredValidation,
    avatar: urlNotRequiredValidation,
    email: emailValidation,
    password: passwordValidation,
  }),
});

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: emailValidation,
    password: passwordValidation,
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: textRequiredValidation,
    about: textRequiredValidation,
  }),
});

const updateUserAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: urlRequiredValidation,
  }),
});

const userIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный id пользователя');
    }),
  }),
});

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: textRequiredValidation,
    link: urlRequiredValidation,
  }),
});

const cardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный id карточки');
    }),
  }),
});

module.exports = {
  signupValidation,
  signinValidation,
  updateUserValidation,
  updateUserAvatarValidation,
  userIdValidation,
  createCardValidation,
  cardIdValidation,
};
