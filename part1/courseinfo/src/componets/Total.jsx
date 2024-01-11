import React from "react";

const Total = ({ total }) => {
  console.log(total);
  const totalExercises = total.reduce(
    (totalSum, array) => totalSum + array.exercises,
    0
  );
  console.log(totalExercises);
  return (
    <div>
      <p>Number of exercises {totalExercises}</p>
    </div>
  );
};

export default Total;
