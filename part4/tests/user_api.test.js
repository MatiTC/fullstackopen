const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const app = require('../app');
const supertest = require('supertest');
const helper = require('./test_helper');

const api = supertest(app);

describe('cuando inicialmente hay una usuario en db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('root', 10);
    const user = new User({ name: 'root', username: 'root', passwordHash });

    await user.save();
  });

  test('la creación se realiza correctamente con un nuevo nombre de usuario', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'Kasu',
      name: 'Matias Tardones',
      password: 'matias10',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
  test('la creación falla con el código de estado y el mensaje adecuados si el nombre de usuario ya está en uso', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('Se esperaba que el "nombre de usuario" fuera único');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});
