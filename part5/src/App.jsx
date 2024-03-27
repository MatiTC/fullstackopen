import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, []);

  const handleButtonLogout = () => {
    console.log('se presiono el botón para eliminar el localStorege');
    localStorage.removeItem('loggedUser');
    window.location.reload();
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setPassword('');
      setUsername('');
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    } catch (error) {
      console.error('Error en el handleLoginSubmit:', error);
    }
  };
  // Manejar cambios en los campos del formulario
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  if (user === null) {
    return (
      <>
        <form onSubmit={handleLoginSubmit}>
          <div>
            <p>Login</p>
          </div>
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
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <p>
          {' '}
          {user.username} iniciando sesión en la aplicación{' '}
          <span>
            {' '}
            <button onClick={handleButtonLogout}>cerrar sesión</button>
          </span>
        </p>

        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  }
};

export default App;
