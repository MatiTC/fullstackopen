import React from 'react';
import blogService from '../services/blogs';

const ButtonLike = ({ blog, updateBlog }) => {
  const handleLike = async () => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 };
      await blogService.updateLike(blog.id, updatedBlog);
      updateBlog(updatedBlog);
    } catch (error) {
      console.error('Error al enviar la solicitud PUT:', error);
    }
  };
  return <button onClick={handleLike}>Like</button>;
};

export default ButtonLike;
