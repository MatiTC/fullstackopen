const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  // Limpia la base de datos después de cada prueba
  await Blog.deleteMany({});
  // Creamos el nuevo Blog
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
});

describe('testBlogs', () => {
  test('las notas se devuelven como json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('hay 1 blogs', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(2);
  });
  //exercise 4.8
  test('1 blogs y formato json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveLength(2);
  });

  test('las publicaciones de blog tienen un identificador único llamado _id', async () => {
    const response = await api.get('/api/blogs');

    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });

  test('exercise 4.10', async () => {
    const responseInicial = await api.get('/api/blogs');
    const arrayInicial = responseInicial.body.length;

    const blog = {
      title: 'Blog de prueba 4.10',
      author: 'Autor de prueba',
      url: 'www.prueba1.com',
      likes: 9,
    };

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(arrayInicial + 1);

    const contents = blogsAtEnd.map((r) => r.title);
    expect(contents).toContain('Blog de prueba 4.10');
  });
});

afterAll(() => {
  mongoose.connection.close();
});
