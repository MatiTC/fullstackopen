const Header = (props) => {
  console.log(props)
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return (
    <div>
      <Part nombre={props.name} number={props.exercises} />
    </div>
  );
};

const Total = ({ total }) => {
  return (
    <div>
      <p>Number of exercises {total}</p>
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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  return (
    <div>
      <Header course={course} />
      <Content name = {part1.name} exercises = {part1.exercises}/>
      <Content name = {part2.name} exercises = {part2.exercises}/>
      <Content name = {part3.name} exercises = {part3.exercises}/>
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
      <p>Soy un cambio</p>
    </div>
  );
};

export default App;
