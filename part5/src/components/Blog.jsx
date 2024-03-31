import React, { useState } from 'react';
import '../components/style/blog.css';
import Taggable from './Togglable';
import ButtonLike from './ButtonLike';

const Blog = ({ blog }) => {
  const [blogState, setBlogState] = useState(blog);
  
  const handleUpdateBlog = (updatedBlog) => {
    setBlogState(updatedBlog);
  };
  return (
    <div className="blogStyle">
      <div>{blogState.title} </div>
      <Taggable buttonLabel="Detalles">
        <div>
          <p>Autor: {blogState.author}</p>
          <p>Url: {blogState.url}</p>
          <p>
            Likes: {blogState.likes}{' '}
            <ButtonLike blog={blogState} updateBlog={handleUpdateBlog} />
          </p>
          <p>{blogState.user.name}</p>
        </div>
      </Taggable>
    </div>
  );
};

export default Blog;
