import React from 'react';
const Filter = ({ search, setSearch }) => {
  const handleFilterChange = (e) => {
    console.log('Manejo de la BUSQUEDA', e.target.value);
    setSearch(e.target.value);
  };
  return (
    <div>
      filter shown with:{' '}
      <input value={search} onChange={handleFilterChange}></input>
    </div>
  );
};

export default Filter;
