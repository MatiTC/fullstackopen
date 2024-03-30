import React, { useState } from 'react';
import '../components/style/blog.css'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="blogStyle">
      <div>{blog.title}</div>
      {showDetails && (
        <div>
          <p>Autor: {blog.author}</p>
          <p>Url: {blog.content}</p>
          {/* Agrega más campos aquí según los atributos de tu blog */}
        </div>
      )}
      <button onClick={toggleDetails}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
    </div>
  );
};

export default Blog;
