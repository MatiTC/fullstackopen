import React, { createContext, useReducer } from 'react';
import { notificationReducer, initialState } from './notificacionReducer';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notificationState, dispatch] = useReducer(
    notificationReducer,
    initialState
  );

  return (
    <NotificationContext.Provider value={{ notificationState, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};
