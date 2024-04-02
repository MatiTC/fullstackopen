import ButtonLike from './ButtonLike';
import React, { useState } from 'react';
import Togglable from './Togglable';
import '../components/style/blog.css';

const Blog = ({ blog, onDeleteBlog }) => {
  const [blogState, setBlogState] = useState(blog);

  const handleUpdateBlog = (updatedBlog) => {
    setBlogState(updatedBlog);
  };

  const handleDeleteClick = () => {
    const isConfirmed = window.confirm(
      '¿Estás seguro de que deseas eliminar esta publicación?'
    );
    if (isConfirmed) {
      onDeleteBlog(blogState.id);
    }
  };

  return (
    <div className="blogStyle">
      <div className="blogTitle">{blogState.title} </div>
      <div className="blogAuthor">{blogState.author}</div>
      <Togglable className="togglableContent" buttonLabel="Detalles" buttonLabelDos="Ocultar">
        <div>
          <p className="blogUrl">Url: {blogState.url}</p>
          <p className="blogLikes">
            Likes: {blogState.likes}{' '}
            <ButtonLike blog={blogState} updateBlog={handleUpdateBlog} />
          </p>
          <p className="blogUser">{blogState.user.name}</p>
        </div>
        <div>
          <button onClick={handleDeleteClick}>Eliminar</button>
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;
