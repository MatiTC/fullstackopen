import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
//ruta protegida
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.get(baseUrl, config);
    return response.data;
  } catch (error) {
    // Manejo de errores, por ejemplo:
    console.error('Error al obtener los blogs:', error);
  }
};

const updateLike = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
    return response.data;
  } catch (error) {
    console.error('Error desconocido', error);
  }
};

const deleteID = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response.data;
  } catch (error) {
    console.error('Error en la petición delete', error);
  }
};
export default { getAll, setToken, create, updateLike, deleteID };
