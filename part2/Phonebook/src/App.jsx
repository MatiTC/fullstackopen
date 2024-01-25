import React, { useState } from 'react';
import PersonForm from './componets/PersonForm';
import Filter from './componets/Filter';
import Persons from './componets/Persons';
import OneUser from './componets/OneUser';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);
  const [search, setSearch] = useState('');
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} setSearch={setSearch} />
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={persons} search={search}/>
      <h2>Detalles del Usuario </h2>
      <OneUser user={persons[0]}/>
    </div>
  );
};

export default App;
