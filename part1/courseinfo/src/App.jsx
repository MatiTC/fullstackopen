import React from "react";
import Header from "./componets/Header";
import Total from "./componets/Total";

const Content = (props) => {
  console.log("Propiedades:", props);
  return (
    <div>
      <Part nombre={props.parts[0].name} number={props.parts[0].exercises} />
      <Part nombre={props.parts[1].name} number={props.parts[1].exercises} />
      <Part nombre={props.parts[2].name} number={props.parts[2].exercises} />
    </div>
  );
};
const Part = ({ nombre, number }) => {
  return (
    <p>
      {nombre} {number}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts} />
    </div>
  );
};

export default App;
