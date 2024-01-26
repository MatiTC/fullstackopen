import React, { useState, useEffect } from 'react';
import PersonForm from './componets/PersonForm';
import Filter from './componets/Filter';
import Persons from './componets/Persons';
import OneUser from './componets/OneUser';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState('');
  console.log(persons);
  useEffect(() => {
    console.log('Ejecutando el useEffect');
    //Realiza la solicitud GET al servidor JSON simulado con json-server
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        console.log('promesa existosa. Datos de data:', response.data);
        setPersons(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los datos', error);
      });
  }, []); // Este paramaetro [] asegura que el useEffect se ejecute solo una vez
  console.log(persons);
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} setSearch={setSearch} />
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} />
      <h2>Detalles del Usuario </h2>
      <OneUser user={persons[0]} />
    </div>
  );
};

export default App;
