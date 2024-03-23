/* eslint-disable no-undef */
const { info } = require('../utils/logger');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const jwt = require('jsonwebtoken');

info('mensaje de prueba');

blogsRouter.get('/', async (request, response) => {
  const blog = await Blog.find({}).populate('user');
  response.json(blog);
});

blogsRouter.post('/', async (req, res) => {
  const body = req.body;
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' });
  }
  const user = req.user;

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
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  res.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (req, res) => {
  const idBlog = req.params.id;
  // verificamos si se proporciona un token
  if (!req.token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }
  const user = req.user;
  // verificamos si el blog existe a partir de la id de la solicitud
  const deleteBlog = await Blog.findById(idBlog);
  if (!deleteBlog) {
    return res.status(404).json({ error: 'Blog no encontrado' });
  }
  /*
    tenemos el ID del blog(idBlog) tenemos el ID del User(user.id) 
    convertir el ID del usuario del blog a una cadena para compararlo con el ID del usuario del token
    comparamos, si no son iguales o si 
  */
  if (deleteBlog.user.toString() !== user.id) {
    return res
      .status(403)
      .json({ error: 'No tienes permiso para eliminar este blog' });
  }
  // si todo esta bien procedemos a eliminar el blog
  await Blog.findByIdAndDelete(idBlog);
  res.status(204).json({ message: 'El blog se eliminó con éxito' });
});

blogsRouter.put('/:id', async (req, res) => {
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
