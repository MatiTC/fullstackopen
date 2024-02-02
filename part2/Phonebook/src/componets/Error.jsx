import React from 'react';
import '../index.css';

const error = ({ message }) => {
    console.log(message)
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};
export default error;
