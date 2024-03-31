import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import FormularioLogin from './components/FormularioLogin';
import FormularioNewBlog from './components/FormularioNewBlog';
import Taggable from './components/Togglable';

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
      blogService.getAll().then((blogs) => {
        blogs.sort((a, b) => b.likes - a.likes);
        setBlogs(blogs);
      });
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
      setMensaje({
        type: 'success',
        msm: `Se agrego un nuevo blog con éxito by ${user.username}`,
      });
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
  const handleDeleteBlog = async (blogId) => {
    try {
      await blogService.deleteID(blogId);
      setBlogs(blogs.filter((blog) => blog.id !== blogId));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <>
      {user === null ? (
        <>
          <h2>Log in to application</h2>
          <Notification mensaje={mensaje} setMensaje={setMensaje} />
          <FormularioLogin
            handleLoginSubmit={handleLoginSubmit}
            handleChange={handleChange}
            username={username}
            password={password}
          />
        </>
      ) : (
        <>
          <h2>Blogs</h2>
          <Notification mensaje={mensaje} setMensaje={setMensaje} />
          <div>
            <p>
              {user.username} iniciando sesión en la aplicación{' '}
              <button onClick={handleButtonLogout}>cerrar sesión</button>
            </p>
            <Taggable buttonLabel="create new blog" buttonLabelDos="cancelar">
              <FormularioNewBlog
                handleNewBlogSubmit={handleNewBlogSubmit}
                handleChangeNewBlog={handleChangeNewBlog}
                newBlog={newBlog}
              />
            </Taggable>
          </div>
          <div>
            {blogs.map((blog, index) => (
              <Blog key={blog.id} blog={blog} onDeleteBlog={handleDeleteBlog} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default App;
