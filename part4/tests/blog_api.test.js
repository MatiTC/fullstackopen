const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper');
const bcrypt = require('bcrypt');

const api = supertest(app);

beforeEach(async () => {
  // Limpia la base de datos después de cada prueba
  await Blog.deleteMany({});
  // Creamos el nuevo Blog
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();

  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('test1', 10);
  const user = new User({ name: 'test1', username: 'testing1', passwordHash });

  await user.save();
});
describe('testBlogs', () => {
  test('las notas se devuelven como json', async () => {
    const userAtStart = await helper.usersInDb({});
    const id = userAtStart[0].id;
    const token = await helper.generateTestToken(id);
    await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /application\/json/);
  });
  test('hay 2 blogs', async () => {
    const userAtStart = await helper.usersInDb({});
    const id = userAtStart[0].id;
    const username = userAtStart[0].username;
    const token = await helper.generateTestToken({ id, username });
    // Establecer el encabezado de autorización en la solicitud GET
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`);
    // Verificar la respuesta
    expect(response.body).toHaveLength(2);
  });
  //exercise 4.8
  test('2 blogs y formato json', async () => {
    const userAtStart = await helper.usersInDb({});
    const id = userAtStart[0].id;
    const username = userAtStart[0].username;
    const token = await helper.generateTestToken({ id, username });
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveLength(2);
  });

  test('las publicaciones de blog tienen un identificador único llamado _id', async () => {
    const userAtStart = await helper.usersInDb({});
    const id = userAtStart[0].id;
    const username = userAtStart[0].username;
    const token = await helper.generateTestToken({ id, username });
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`);

    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });

  test('exercise 4.10', async () => {
    const blogsAtStart = await helper.blogsInDb({});
    const userAtStart = await helper.usersInDb({});
    const id = userAtStart[0].id;
    const username = userAtStart[0].username;
    const token = await helper.generateTestToken(id, username);

    const blog = {
      title: 'Blog de prueba 4.10',
      author: 'Autor de prueba',
      url: 'www.prueba1.com',
      likes: 9,
    };

    await api
      .post('/api/blogs')
      .send(blog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const responseFinal = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`);

    const newBlog = responseFinal.body.find(
      (b) => b.title === 'Blog de prueba 4.10'
    );

    const blogsAtEnd = await helper.blogsInDb({});
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1);
    expect(newBlog).toBeDefined();
  });

  test('exercise 4,11', async () => {
    const userAtStart = await helper.usersInDb({});
    const id = userAtStart[0].id;
    const username = userAtStart[0].username;
    const token = await helper.generateTestToken(id, username);

    const newBlogSinLikes = {
      title: 'Blog sin likes',
      author: 'Autor de prueba',
      url: 'www.prueba.com',
    };

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlogSinLikes)
      .expect(201);

    expect(response.body.likes).toBe(0);
  });

  test('exercise 4.12', async () => {
    const userAtStart = await helper.usersInDb({});
    const id = userAtStart[0].id;
    const username = userAtStart[0].username;
    const token = await helper.generateTestToken(id, username);

    const newBlog = {
      author: 'Exercises 4.12',
    };
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog);

    expect(response.status).toBe(400);
  });
});

describe('exercise 4.13', () => {
  test('delete exitoso con un status 204 y id valido', async () => {
    const userAtStart = await helper.usersInDb({});
    const id = userAtStart[0].id;
    const username = userAtStart[0].username;
    const token = await helper.generateTestToken(id, username);

    const blogsAtStart = await helper.blogsInDb();
    const idBlogDeleteTest = blogsAtStart[0].id;

    await api
      .delete(`/api/blogs/${idBlogDeleteTest}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

    // Verificar que el ID del blog eliminado no esté presente en la lista de blogs
    const contents = blogsAtEnd.map((r) => r.id);
    expect(contents).not.toContain(idBlogDeleteTest);
  });
});

describe('exercise 4.14', () => {
  test('actualizar los likes de un blog existente', async () => {
    const userAtStart = await helper.usersInDb({});
    const id = userAtStart[0].id;
    const username = userAtStart[0].username;
    const token = await helper.generateTestToken(id, username);

    const blogsAtStart = await helper.blogsInDb();
    const idBlogTest = blogsAtStart[0].id;

    const updateLikes = 25;

    const response = await api
      .put(`/api/blogs/${idBlogTest}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ likes: updateLikes })
      .expect(200);

    expect(response.body.likes).toBe(updateLikes);
  });
  test('devolver un error 401 si se intenta actualizar los datos de un blog inexistente', async () => {
    const notExistenId = new mongoose.Types.ObjectId();
    const updateLikes = 25;
    const response = await api
      .put(`/api/blogs/${notExistenId}`)
      .send({ likes: updateLikes })
      .expect(401);

    expect(response.body).toEqual({ error: 'Token no proporcionado. Acceso no autorizado' });
  });
});

describe('exercise 4.23', () => {
  test('Debería devolver un código de estado 401 si no se proporciona un token', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const idBlogTest = blogsAtStart[0].id;
    // Realiza una solicitud PUT para editar un blog sin proporcionar un token
    const response = await api
      .put(`/api/blogs/${idBlogTest}`) // Suponiendo que esta es la ruta para editar un blog, y que el ID del blog es 1
      .send({ likes: 10 }); // Envía los datos del blog que se van a actualizar, en este caso, los likes
    // Verifica que la respuesta tenga el código de estado 401 Unauthorized
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: 'Token no proporcionado. Acceso no autorizado',
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
