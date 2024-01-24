import React from 'react';
import Course from './componets/Course';
import courses from './Courses';

const App = () => {
  return (
    <>
      <Course course={courses[0]} />
      <Course course={courses[1]} />
    </>
  );
};

export default App;
