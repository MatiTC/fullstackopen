/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');
const { SECRET } = require('../utils/config');

loginRouter.post('/', async (request, response) => {
  console.log('viene algo del front');
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };
  // el token expira in 60*60 segundos, eso es, en una hora
  const token = jwt.sign(userForToken, SECRET, {
    expiresIn: 60 * 60,
  });

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
