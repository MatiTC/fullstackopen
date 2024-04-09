import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';

// eslint-disable-next-line react/prop-types
const Notification = ({ message }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNotification(message));
  }, [dispatch, message]);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  return <div style={style}>{message}</div>;
};

export default Notification;
