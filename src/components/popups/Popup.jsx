import React, { useState } from 'react';
import '../../styles/Popup.css';

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button className="show-popup-btn" onClick={openPopup}>Show Popup</button>

      {isOpen && (
        <>
          <div className="popup-overlay" onClick={closePopup} />
          <div className="popup-container">
            <button className="close-btn" onClick={closePopup}>×</button>
            <p className='text'>Πρέπει να συνδεθείς πρώτα</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Popup;
