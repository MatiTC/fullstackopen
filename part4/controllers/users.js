const bcrypt = require('bcrypt');
const User = require('../models/user');
const usersRouter = require('express').Router();

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  const usernameExiste = await User.findOne({ username });

  if (usernameExiste) {
    return response
      .status(400)
      .json({ error: 'Se esperaba que el "nombre de usuario" fuera único' });
  }
  if (username.length < 3 || password.length < 3) {
    return response
      .status(400)
      .json({ error: 'El nombre de usuario o la contraseña son muy cortos' });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username: username,
    name: name,
    passwordHash: passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs');
  response.json(users);
});

module.exports = usersRouter;
