import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OneCountry = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);

  console.log(country);
  // Verificar si country es un array y tiene al menos un elemento
  const [miObject] =
    Array.isArray(country) && country.length > 0 ? country : [country];
  console.log(miObject);
  const capital = miObject.capital;
  console.log(capital);
  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
  const params = {
    access_key: apiKey,
    query: capital,
  };

  useEffect(() => {
    console.log('useEffect de clima');
    axios
      .get('https://api.weatherstack.com/current', { params })
      .then((response) => {
        const apiResponse = response.data;
        setWeatherData(apiResponse);
        console.log(apiResponse);
      })
      .catch((error) => {
        console.log('Error en la solicitud a la API de Weatherstack:', error);
      });
  }, []);

  return (
    <>
      <h1>{miObject.name.common}</h1>

      <div>Capital: {miObject.capital}</div>
      <div>Poblacion: {miObject.population}</div>

      <div>
        <h2>Lenguajes</h2>
        <ul>
          {Object.values(miObject.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
      </div>
      <div>
        <img alt={miObject.flags.alt} src={miObject.flags.png}></img>
      </div>
      <div>
        <h2>Weather in {miObject.capital}</h2>
        <p>
          {/* <strong>temperatura: {weatherData.result.temperature} </strong> */}
        </p>
        {/* <div>svg</div> */}
        <p>{/* <strong>wind: {weatherData.result.wind} </strong> */}</p>
      </div>
    </>
  );
};

export default OneCountry;
