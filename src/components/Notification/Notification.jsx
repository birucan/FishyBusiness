import React, { useEffect, useState } from 'react';

const Notification = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose && onClose(), 300); // Allow fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className={`notification notification-${type} ${visible ? 'visible' : ''}`}>
      <span className="notification-icon">
        {type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
      </span>
      <span className="notification-message">{message}</span>
    </div>
  );
};

export default Notification; 