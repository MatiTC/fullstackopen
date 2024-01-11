const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return (
    <div>
      <Part nombre={props.part1.name} number={props.part1.exercises} />
      <Part nombre={props.part2.name} number={props.part2.exercises} />
      <Part nombre={props.part3.name} number={props.part3.exercises} />
    </div>
  );
};

const Total = (props) => {
  console.log(props)
  return (
    <div>
      <p>Number of exercises {props.part1 + props.part2 + props.part3}</p>
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
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  return (
    <div>
      <Header course={course} />
      <Content part1={parts[0]} part2={parts[1]} part3={parts[2]} />
      <Total part1={parts[0].exercises} part2={parts[1].exercises} part3={parts[2].exercises} />
    </div>
  );
};

export default App;
