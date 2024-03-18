const { info } = require('../utils/logger');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

info('mensaje de prueba');

blogsRouter.get('/', async (request, response) => {
  const blog = await Blog.find({});
  response.json(blog);
});

blogsRouter.post('/', async (req, res) => {
  const body = req.body;
  if (!body.title || !body.url) {
    return res
      .status(400)
      .json({ error: 'faltan los datos de title and/or url' });
  }
  info(body);
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
  });

  const savedBlog = await blog.save();
  res.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const deleteBlog = await Blog.findByIdAndDelete(id);
  if (!deleteBlog) {
    return res.status(404).json({ error: 'Blog no encontrado' });
  }
  res.status(204).json(deleteBlog);
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
