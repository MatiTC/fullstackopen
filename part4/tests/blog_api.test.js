const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
describe('testBlogs', () => {
  test('las notas se devuelven como json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('hay 4 blogs', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(4);
  });
  //exercise 4.8
  test('4 blogs y formato json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveLength(4);
  });

  test('las publicaciones de blog tienen un identificador único llamado _id', async () => {
    const response = await api.get('/api/blogs');

    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
