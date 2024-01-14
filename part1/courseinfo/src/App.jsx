import React from "react";
import Header from "./componets/Header";
import Total from "./componets/Total";
import Display from "./componets/Display";
import Button from "./componets/Button";
import { useState } from "react";

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

const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age;

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  );
};
const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join('-')}
    </div>
  )
}

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

  const [total, setTotal] = useState(0);

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft + right)
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    setRight(right + 1);

    setTotal(left + right);
  };
  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text='left' />
      <Button handleClick={handleRightClick} text='right' />
      {right}
      <History allClicks={allClicks} />
    </div>
  );
};
export default App;
