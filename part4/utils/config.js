/* eslint-disable no-undef */
require('dotenv').config();
const PORT = process.env.PORT; // || 3001

const MONGODB_URL =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URL;

const SECRET =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_SECRET
    : process.env.SECRET_KEY;

module.exports = {
  MONGODB_URL,
  PORT,
  SECRET,
};
