import React, { useState } from 'react';
import '../components/style/blog.css';
import Taggable from './Togglable';

const Blog = ({ blog }) => {

  return (
    <div className="blogStyle">
      <div>{blog.title} </div>
      <Taggable  buttonLabel="Detalles">
        <div>
          <p>Autor: {blog.author}</p>
          <p>Url: {blog.url}</p>
          <p>Likes: {blog.likes}</p>
        </div>
      </Taggable>
    </div>
  );
};

export default Blog;
