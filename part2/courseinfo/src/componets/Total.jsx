import React from 'react';

const Total = ({ parts }) => {
  console.log('Soy el total que viene de Course', parts);
  const totalExercises = parts.reduce(
    // Callback de reduce
    (totalSum, part) => {
      console.log(`Acumulado: ${totalSum}, Ejercicios: ${part.exercises}`);
      return totalSum + part.exercises;
    },
    0
  );
  return (
    <div>
      <strong>Number of exercises {totalExercises}</strong>
    </div>
  );
};

export default Total;
