require('dotenv').config();

// eslint-disable-next-line no-undef
const PORT = process.env.PORT; // || 3001
// eslint-disable-next-line no-undef
const MONGODB_URL = process.env.MONGODB_URL;

module.exports = {
  MONGODB_URL,
  PORT,
};
