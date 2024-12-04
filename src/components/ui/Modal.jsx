import React, { useEffect, useState } from 'react';


const Modal = ({ children, isOpen, onClose }) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    }
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setShouldRender(false); 
    }
  };

  return (
    shouldRender && (
      <div
        className={`modal-overlay ${isOpen ? 'open' : 'close'}`}
        onClick={onClose}
        onAnimationEnd={handleAnimationEnd} 
      >
        <div
          className={`modal-content ${isOpen ? 'open' : 'close'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
