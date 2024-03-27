import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   blogService.getAll().then((blogs) => setBlogs(blogs));
  // }, []);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    console.log('Login con los datos de:', username, password);
    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      setUser(user);
      setPassword('');
      setUsername('');
    } catch (error) {
      console.error('Error en el handleLoginSubmit:', error.message);
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
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  }
};

export default App;
