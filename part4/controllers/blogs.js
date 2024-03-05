const { info, error } = require('../utils/logger');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

info('mensaje de prueba');

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post('/', (req, res, next) => {
  const body = req.body;
  info(body)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });
  blog.save().then(savedBlog => {
    res.json(savedBlog)
  })
  .catch(error => next(error))
});

module.exports = blogsRouter;
