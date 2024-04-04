/* eslint-disable no-undef */
const { info } = require('../utils/logger');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');

info('mensaje de prueba');

blogsRouter.get('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }
  const blog = await Blog.find({}).populate('user');
  response.status(200).json(blog);
});

blogsRouter.post('/', async (req, res) => {
  const body = req.body;
  const decodedToken = jwt.verify(req.token, SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' });
  }
  const userIdDecodedToken = decodedToken.id;
  const user = await User.findById(userIdDecodedToken);
  if (!user) {
    return res
      .status(401)
      .json({ error: 'Usuario no encontrado. Acceso no autorizado.' });
  }

  if (!body.title || !body.url) {
    return res
      .status(400)
      .json({ error: 'faltan los datos de title and/or url' });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: userIdDecodedToken,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  res.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (req, res) => {
  const decodedToken = jwt.verify(req.token, SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }
  const userIdDecodedToken = decodedToken.id;
  const user = await User.findById(userIdDecodedToken);
  if (!user) {
    return res
      .status(401)
      .json({ error: 'Usuario no encontrado. Acceso no autorizado.' });
  }
  const idBlog = req.params.id;
  const deleteBlog = await Blog.findById(idBlog);
  if (!deleteBlog) {
    return res.status(404).json({ error: 'Blog no encontrado' });
  }

  await Blog.findByIdAndDelete(idBlog);
  res.status(204).json({ message: 'El blog se eliminó con éxito' });
});

blogsRouter.put('/:id', async (req, res) => {
  if (!req.token) {
    return res
      .status(401)
      .json({ error: 'Token no proporcionado. Acceso no autorizado' });
  }
  const decodedToken = jwt.verify(req.token, SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }
  const id = req.params.id;
  const blogExiste = await Blog.findById(id);
  if (!blogExiste) {
    return res.status(404).json({ error: 'Blog no encontrado' });
  }
  const newLikes = req.body.likes;
  blogExiste.likes = newLikes;
  await blogExiste.save();
  res.status(200).json(blogExiste);
});

module.exports = blogsRouter;
