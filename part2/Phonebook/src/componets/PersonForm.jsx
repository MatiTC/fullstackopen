import React, { useState } from 'react';

const PersonForm = ({ persons, setPersons }) => {
  console.log(persons);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('button clicked', e.target);
    const personObject = {
      name: newName,
      number: newNumber,
    };

    // Verificador si el nombre ua existe. some: virifica si ya existe un nombre similar en la lista
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }
    setPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber(' ');
  };

  const handleNameChange = (e) => {
    console.log('Manejo de los datos del NOMBRE', e.target.value);
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    console.log('Manejo de los datos de NUMERO', e.target.value);
    setNewNumber(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Nombre:
        <input value={newName} onChange={handleNameChange}></input>
      </div>
      <div>
        Numero:
        <input value={newNumber} onChange={handleNumberChange}></input>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
