import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OneCountry = ({ country }) => {
  console.log(country);
  const [weatherData, setWeatherData] = useState(null);
  const [windData, setWindDataData] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);
  // Verificar si country es un array y tiene al menos un elemento
  const [miObject] =
    Array.isArray(country) && country.length > 0 ? country : [country];
  console.log(miObject);
  //Latitud y longitud del pais
  const lat = miObject.latlng[0];
  const lon = miObject.latlng[1];
  // api key
  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
  useEffect(() => {
    console.log('useEffect de clima');
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
      )
      .then((response) => {
        const apiResponse = response.data;
        console.log('Respuesta de la API', apiResponse);
        setWeatherData(apiResponse.main.temp);
        setWindDataData(apiResponse.wind.speed);
        setWeatherIcon(apiResponse.weather[0].icon)
      })
      .catch((error) => {
        console.log('Error en la solicitud a la API de OpenWeather:', error);
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
        <p>Temperatura {weatherData} Celcius</p>
        <img
          alt="Weather icon"
          src={`https://openweathermap.org/img/wn/${weatherIcon}.png`}
        ></img>
        <p>wind {windData} m/s</p>
      </div>
      <div>
        <h2>Weather in {miObject.capital}</h2>
      </div>
    </>
  );
};

export default OneCountry;
