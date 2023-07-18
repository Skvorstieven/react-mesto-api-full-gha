const User = require('../models/user');
const Card = require('../models/card');

function findAllUsers() {
  return User.find({});
}

function findUserById(userId) {
  return User.findById(userId);
}

function findUserByIdAndUpdate(userId, reqBody) {
  return User.findByIdAndUpdate(userId, reqBody, {
    new: true,
    runValidators: true,
  });
}

function createUser(reqBody) {
  return User.create(reqBody);
}

function findUserByCredentials(email, password) {
  return User.findUserByCredentials(email, password);
}

function findAllCards() {
  return Card.find({});
}

function createNewCard(reqBody) {
  return Card.create(reqBody);
}

function findCardById(cardId) {
  return Card.findById(cardId);
}

function AddLikeCard(cardId, userId) {
  return Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  );
}

function RemoveLikeCard(cardId, userId) {
  return Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  );
}

function deleteCard(card) {
  return Card.deleteOne(card);
}

module.exports = {
  findAllUsers,
  findUserById,
  findUserByIdAndUpdate,
  createUser,
  findUserByCredentials,
  findAllCards,
  createNewCard,
  findCardById,
  AddLikeCard,
  RemoveLikeCard,
  deleteCard,
};
