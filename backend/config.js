const jwtKey = process.env.JWT_SECRET;

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017' } = process.env;

const databaseURL = `${MONGO_URL}/mestodb`;

const allowedCors = [
  'http://skvorstieven.nomoredomains.xyz',
  'https://skvorstieven.nomoredomains.xyz',
];

module.exports = {
  allowedCors,
  databaseURL,
  PORT,
  jwtKey,
};