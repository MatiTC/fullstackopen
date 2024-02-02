import React from 'react';
import personsService from '../services/persons';

const Persons = ({ persons, search, setPersons }) => {
  const filterPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );
  const toggleImportanceOf = (id) => {
    if (window.confirm(`¿De seguro que quieres eliminar al usuario de la id: ${id}`)) {
      console.log(`Usuario a eliminar es el ${id}`);
      personsService
      .eliminar(id)
      .then((response) => {
        console.log('Se elimino correctamente al usuario de la ide', id);
        console.log(response);
        setPersons(persons.filter((person) => person.id !== id));
      }).catch((error) =>{
        console.log(error)
      })
    } 
  };
  console.log(persons);
  return (
    <div>
      {filterPersons.map((person, index) => (
        <div key={index}>
          {person.name}-{person.number}{' '}
          <button onClick={() => toggleImportanceOf(person.id)}>
            {' '}
            delete:{person.id}{' '}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
