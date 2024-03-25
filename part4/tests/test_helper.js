const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');

const initialBlogs = [
  {
    title: 'Blog de prueba 0',
    author: 'Autor de prueba 0',
    url: 'www.prueba0.com',
    likes: 1,
  },
];
const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

// Función para generar un token JWT para pruebas
const generateTestToken = async (id, username) => {
  // Simplemente firmamos un token con algún secreto (puede ser cualquier cosa para pruebas)
  const payload = { id, username };
  const tokenTest = jwt.sign(payload, SECRET, {
    expiresIn: '1h',
  });
  return tokenTest;
};
const getUserIdFromTestToken = (token) => {
  const decoded = jwt.verify(token, SECRET);
  return decoded.id;
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  generateTestToken,
  getUserIdFromTestToken,
};
