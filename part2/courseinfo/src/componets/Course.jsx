import React from 'react';
import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = ({course}) => {
  console.log('Soy el objeto que viene de APP.', course);
  console.log(course.parts);
  return (
    <>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
