import React from 'react';

const FormularioLogin = ({
  handleLoginSubmit,
  handleChange,
  username,
  password,
}) => {
  return (
    <>
      <form onSubmit={handleLoginSubmit}>
        <div></div>
        <div>
          Nombre
          <input
            typeof="text"
            value={username}
            placeholder="nombre"
            name="username"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          Contraseña
          <input
            typeof="password"
            placeholder="contraseña"
            value={password}
            name="password"
            onChange={handleChange}
          ></input>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </>
  );
};

export default FormularioLogin;
