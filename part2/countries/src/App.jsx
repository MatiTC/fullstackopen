import axios from 'axios';
import React, { useState, useEffect } from 'react';
import OneCountry from './componets/OneCountry';
import Countries from './componets/Countries';

function App() {
  const [countris, setCountris] = useState([]);
  const [searchCountries, setSearchCountris] = useState('');
  const handleCountrisChange = (e) => {
    console.log(e.target.value);
    setSearchCountris(e.target.value);
  };
  useEffect(() => {
    console.log('Ejecutando el useEffect');
    // Verificar que no está vacío antes de realizar la solicitud. trim elimina los espacios en blanco de la cadena
    if (searchCountries.trim() !== '') {
      axios
        .get(`https://restcountries.com/v3.1/name/${searchCountries}`)
        .then((response) => {
          if (response.data.length > 10) {
            console.log('Especifique más su búsqueda');
          }
          setCountris(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setCountris([]);
    }
  }, [searchCountries]);
  return (
    <>
      <div>
        <label>Find countris: 
          <input
            value={searchCountries}
            onChange={handleCountrisChange}
          ></input>
        </label>
      </div>
      <div>
        {countris.length === 1 ? (
          <OneCountry country={countris} />
        ) : countris.length > 10 ? (
          <div>Sé más específico en tu búsqueda</div>
        ) : (
          <Countries countris={countris} />
        )}
      </div>
    </>
  );
}

export default App;
