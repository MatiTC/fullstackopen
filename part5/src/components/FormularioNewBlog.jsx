import React from 'react';

const FormularioNewBlog = ({
  handleNewBlogSubmit,
  handleChangeNewBlog,
  newBlog,
}) => {
  return (
    <>
      <h4>Crear un nuevo blogs</h4>
      <form onSubmit={handleNewBlogSubmit} className="blogForm">
        <div>
          Titulo
          <input
            type="text"
            value={newBlog.title}
            placeholder="Titulo"
            name="title"
            onChange={handleChangeNewBlog}
          ></input>
        </div>
        <div>
          Autor
          <input
            type="text"
            value={newBlog.author}
            placeholder="Autor"
            name="author"
            onChange={handleChangeNewBlog}
          ></input>
        </div>
        <div>
          Url
          <input
            type="text"
            value={newBlog.url}
            placeholder="Url"
            name="url"
            onChange={handleChangeNewBlog}
          ></input>
        </div>
        <div>
          MeGusta
          <input
            type="text"
            value={newBlog.likes}
            placeholder="MeGusta"
            name="likes"
            onChange={handleChangeNewBlog}
          ></input>
        </div>
        <button type="submit">Crear</button>
      </form>
    </>
  );
};

export default FormularioNewBlog;
