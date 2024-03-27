import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    likes: '',
  });
  const [mensaje, setMensaje] = useState({
    type: '',
    msm: '',
  });

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
      setMensaje({ type: 'success', msm: `Inicio sesión ${user.username}` });
      setTimeout(() => {
        setMensaje({ type: '', msm: `` });
      }, 3000);
    } catch (error) {
      setMensaje({ type: 'error', msm: `${error.response.data.error}` });
    }
  };
  const handleNewBlogSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await blogService.create(newBlog);
      setBlogs([...blogs, response]);
      setNewBlog({
        title: '',
        author: '',
        url: '',
        likes: '',
      });
      setMensaje({ type: 'success', msm: `Se agrego un nuevo blog con éxito by ${user.username}` });
      setTimeout(() => {
        setMensaje({ type: '', msm: `` });
      }, 3000);
    } catch (error) {
      setMensaje({ type: 'error', msm: `${error.response.data.error}` });
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
  const handleChangeNewBlog = (event) => {
    const { name, value } = event.target;
    setNewBlog({
      ...newBlog,
      [name]: value,
    });
  };

  if (user === null) {
    return (
      <>
      <h2>Log in to application</h2>
       <Notification mensaje={mensaje}  setMensaje={setMensaje} />
        <form onSubmit={handleLoginSubmit}>
          <div>
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
      <>
        <div>
          <h1>Notificaciones</h1>
          <Notification mensaje={mensaje} setMensaje={setMensaje} />
        </div>
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
        <div>
          <h2>Crear un nuevo blogs</h2>
          <form onSubmit={handleNewBlogSubmit}>
            <div>
              Titulo
              <input
                typeof="text"
                value={newBlog.title}
                placeholder="Titulo"
                name="title"
                onChange={handleChangeNewBlog}
              ></input>
            </div>
            <div>
              Autor
              <input
                typeof="text"
                value={newBlog.author}
                placeholder="Autor"
                name="author"
                onChange={handleChangeNewBlog}
              ></input>
            </div>
            <div>
              Url
              <input
                typeof="text"
                value={newBlog.url}
                placeholder="Url"
                name="url"
                onChange={handleChangeNewBlog}
              ></input>
            </div>
            <div>
              MeGusta
              <input
                typeof="text"
                value={newBlog.likes}
                placeholder="MeGusta"
                name="likes"
                onChange={handleChangeNewBlog}
              ></input>
            </div>
            <button type="submit">Crear</button>
          </form>
        </div>
      </>
    );
  }
};

export default App;
