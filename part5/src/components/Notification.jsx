import { useEffect } from 'react';
import './style/Notification.css';

const Notification = ({ mensaje, setMensaje}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setMensaje({ type: '', msm: '' });
    }, 3000);

    // Limpiar el temporizador si el componente se desmonta o si el mensaje cambia antes de que expire el temporizador
    return () => clearTimeout(timer);
  }, [mensaje, setMensaje]);

  let notificationClassName = '';
  if (mensaje.type === 'success') {
    notificationClassName = 'success';
  } else if (mensaje.type === 'error') {
    notificationClassName = 'error';
  }
  return (
    <>
      {mensaje.type !== '' && mensaje.msm !== '' && (
        <div className={notificationClassName}>{mensaje.msm}</div>
      )}
    </>
  );
};

export default Notification;
