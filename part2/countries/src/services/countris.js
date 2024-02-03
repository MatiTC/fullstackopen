import axios from 'axios';
const baseUrl = 'https://restcountries.com/v3.1/all';
const baseUrlName = 'https://restcountries.com/v3.1/name';

const getAll = () => {
  return axios.get(baseUrl);
};
const getName = (newCountry) => {
  return axios.get(`${baseUrlName}/${newCountry}`);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const eliminar = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default {
  getAll,
  create,
  update,
  eliminar,
  getName,
};
