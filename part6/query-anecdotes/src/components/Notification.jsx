import React, { useContext } from 'react';
import { NotificationContext } from '../reducer/NotificationContext';

const Notification = () => {
  const { notificationState } = useContext(NotificationContext);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: notificationState.show ? 'block' : 'none',
  };

  return <div style={style}>{notificationState.message}</div>;
};

export default Notification;
