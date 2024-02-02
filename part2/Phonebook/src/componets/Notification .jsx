import React from 'react';
import '../index.css';

const Notification = ({ message }) => {
    console.log(message)
  if (message === null) {
    return null;
  }

  return <div className="exito">{message}</div>;
};
export default Notification;
