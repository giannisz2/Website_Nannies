import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import '../../styles/HelpButton.css';

const HelpButton = () => {
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const handleButtonClick = () => {
    setShowChat(!showChat); // Toggle chat visibility
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatMessages([...chatMessages, { sender: 'user', text: message }]);
      setMessage('');
      // Simulate a response
      setTimeout(() => {
        setChatMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: 'Σας ευχαριστούμε για την επικοινωνία! Θα απαντήσουμε σύντομα.' },
        ]);
      }, 1000);
    }
  };

  return (
    <div>
      {/* Help Button */}
      <Button
        variant="primary"
        className="me-2"
        id="help-button"
        onClick={handleButtonClick}
      >
        Θέλεις βοήθεια;
      </Button>

      {/* Chat Interface */}
      {showChat && (
        <div className="chat-container">
          <div className="chat-header">
            <h5>Υποστήριξη</h5>
            <button className="close-chat" onClick={() => setShowChat(false)}>×</button>
          </div>
          <div className="chat-messages">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              className="chat-text"
              type="text"
              placeholder="Γράψτε το μήνυμά σας..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Αποστολή</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpButton;

