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

  test('hay 2 blogs', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(2);
  });
  //exercise 4.8
  test('2 blogs y formato json', async () => {
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

  test('exercise 4,11', async () => {
    const newBlogSinLikes = {
      title: 'Blog sin likes',
      author: 'Autor de prueba',
      url: 'www.prueba.com',
    };
    const response = await api
      .post('/api/blogs')
      .send(newBlogSinLikes)
      .expect(201);

    expect(response.body.likes).toBe(0);
  });

  test('exercise 4.12', async () => {
    const newBlog = {
      author: 'Exercises 4.12',
    };
    const response = await api.post('/api/blogs').send(newBlog);

    expect(response.status).toBe(400);
  });
});

describe('exercise 4.13', () => {
  test('delete exitoso con un status 204 y id valido', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const id = blogsAtStart[0].id;

    await api.delete(`/api/blogs/${id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

    const contents = blogsAtEnd.map((r) => r.id);
    expect(contents).not.toContain(id.id);
  });
  test('delete no se encuentra la id error 404', async () => {
    const nonExistentId = 1314141;
    await api.delete(`/api/blogs/${nonExistentId}`).expect(404);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
