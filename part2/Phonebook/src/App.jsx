import React, { useState, useEffect } from 'react';
import PersonForm from './componets/PersonForm';
import Filter from './componets/Filter';
import Persons from './componets/Persons';
import OneUser from './componets/OneUser';
import axios from 'axios';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState('');
  console.log(persons);
  useEffect(() => {
    console.log('Ejecutando el useEffect');
    //Realiza la solicitud GET al servidor JSON simulado con json-server
    personService
      .getAll()
      .then((response) => {
        console.log('promesa existosa. Datos de data:', response.data);
        setPersons(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los datos', error);
      });
  }, []); // Este parámetro [] asegura que el useEffect se ejecute solo una vez

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} setSearch={setSearch} />
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} setPersons={setPersons} />
      <h2>Detalles del Usuario </h2>
      <OneUser user={persons[0]} />
    </div>
  );
};

export default App;
