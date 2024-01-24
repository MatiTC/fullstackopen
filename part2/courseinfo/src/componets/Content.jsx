import React from 'react';
import Part from './Part';

const Content = ({ parts }) => {
  console.log('Soy las Parts que viene de Course:', parts);
  return (
    <>
      {parts.map((part) => (
        <Part key={part.name} nombre={part.name} number={part.exercises} />
      ))}
    </>
  );
};

export default Content;
