import React, { useEffect, useState } from 'react';
import personService from '../services/persons';


const PersonForm = ({ persons, setPersons, setErrorMessage, setExitoMessage }) => {
  // console.log(persons);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('button clicked', e.target);
    const personObject = {
      name: newName,
      number: newNumber,
    };

    // Verificador si el nombre ua existe. some: verifica si ya existe un nombre similar en la lista

    const existingPerson = persons.find((person) => person.name === newName);
    console.log(existingPerson)
    if (existingPerson) {
      const id = existingPerson.id;
      console.log(id);
      if (
        window.confirm(
          `${newName} ya se encuentra registrado. ¿Desea remplazar el antiguo número?`
        )
      ) {
        personService
          .update(id, personObject)
          .then((response) => {
            console.log(response);
            setPersons(persons.map((p) => (p.id === id ? response.data : p))); // Actualiza la persona en el estado
            setNewName('');
            setNewNumber('');
          })
          .catch((error) => {
            console.error('Error al modificar los datos', error);
            setErrorMessage(`La información de ${personObject.name} ya fue eliminada del servidor. `) 
            setTimeout(()=>{
              setErrorMessage(null)
            },2000)
            setNewName('');
            setNewNumber('');
          });
      } else {
        console.log('No se guarda, se canceló la modificación');
      }
    } else {
      console.log('Ejecutando el ELSE');
      // Realiza la solicitud POST al servidor JSON simulado con json-server
      personService
        .create(personObject)
        .then((response) => {
          console.log(response);
          setPersons(persons.concat(response.data));
          setExitoMessage(`Se agrego correctamente al usuario ${response.data.name}`) 
          setTimeout(()=>{
            setExitoMessage(null)
          },2000)
          setNewName('');
          setNewNumber('');
        })
        .catch((error) => {
          console.log(error);
        });
    }

    console.log(personObject);
  };

  const handleNameChange = (e) => {
    // console.log('Manejo de los datos del NOMBRE', e.target.value);
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    // console.log('Manejo de los datos de NUMERO', e.target.value);
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
