import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import '../../styles/HelpButton.css';

const HelpButton = () => {
  const [message] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    // setShowMessage(true);
    // setTimeout(() => {
    //     setShowMessage(false);
    // }, 2000);
  };

  return (
    <div>
      {showMessage && <p>{message}</p>}
      <Button
        variant="primary"
        className="me-2"
        id="help-button"
        onClick={handleClick}
      >
        Θέλεις βοήθεια;
      </Button>
    </div>
  );
};

export default HelpButton;
