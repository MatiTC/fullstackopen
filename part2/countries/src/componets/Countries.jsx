import React, { useState } from 'react';
import OneCountry from './OneCountry';

const Countries = ({ countris }) => {
  return (
    <div>
      {countris.map((countri) => (
        <Country key={countri.name.common} country={countri} />
      ))}
    </div>
  );
};

const Country = ({ country }) => {
  const [show, setShow] = useState(false);

  const handleshow = () => {
    setShow(!show);
  };

  return (
    <div>
      {country.name.common}
      <button onClick={handleshow}>show</button>
      {show && <OneCountry country={country} />}
    </div>
  );
};

export default Countries;
