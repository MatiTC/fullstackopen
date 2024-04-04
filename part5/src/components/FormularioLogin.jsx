import React from 'react';
import PropTypes from 'prop-types';

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
            id="username"
            type="text"
            value={username}
            placeholder="nombre"
            name="username"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          Contraseña
          <input
            id="password"
            type="password"
            placeholder="contraseña"
            value={password}
            name="password"
            onChange={handleChange}
          ></input>
        </div>
        <button id="login-button" type="submit">
          Enviar
        </button>
      </form>
    </>
  );
};

FormularioLogin.propTypes = {
  handleLoginSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default FormularioLogin;
