import React, { useState, useEffect } from 'react';

const Notification = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true); 
      const timer = setTimeout(() => {
        setIsVisible(false); 
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);
  
  return (
    <div style={{ display: isVisible ? 'block' : 'none' }}>
      <h2>
        <b>{message}</b> was created.
      </h2>
    </div>
  );
};

export default Notification;
