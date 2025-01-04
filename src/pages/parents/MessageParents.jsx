import React, { useState, useEffect } from 'react';
import NavBarParents from '../../components/layout/NavBarParents';
import HelpButton from '../../components/buttons/HelpButton';
import Footer from '../../components/layout/Footer';
import { Row, Col } from 'react-bootstrap';
import TextField from "@mui/material/TextField";
import '../../styles/AgreementHistory.css';
import '../../styles/Message.css';
import '../../styles/PopUp.css';

export default function MessageParents() {
  const [show, setShow] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [currentType, setCurrentType] = useState(''); 

  const messages = [
    {
      title: 'Θέμα: Θα ήθελα συνάντηση',
      sender: 'Κατερίνα Νικολάου',
      content: `Σχετικά με το μήνυμα που μου στείλατε μπορώ ειδικά αυτή τη βδομάδα την Πέμπτη στις 6 το απόγευμα. 
                            Εύχομαι να ξεκινήσει μια όμορφη συνεργασία.`,
    },
    {
      title: 'Ευχαριστήριο μήνυμα',
      sender: 'Αποστόλης Παπαδόπουλος',
      content: `Σας ευχαριστούμε πολύ για την καλή συνεργασία. Ελπίζω να έχουμε την ευκαιρία να συνεργαστούμε ξανά στο μέλλον!`,
    },
    {
      title: 'Πρόταση συνεργασίας',
      sender: 'Δήμητρα Σταθοπούλου',
      content: `Θα θέλαμε να συζητήσουμε το ενδεχόμενο συνεργασίας. Παρακαλώ επικοινωνήστε μαζί μας.`,
    },
  ];

  const notifications = [
    {
      title: 'Η πληρωμή έγινε με επιτυχία!',
      content: `Το voucher για τον μήνα Δεκέμβριο έχει ληφθεί`,
    },
    {
      title: 'Η πληρωμή έγινε με επιτυχία!',
      content: `Το voucher για τον μήνα Νοέμβριο έχει ληφθεί`,
    },
  ];

  const togglePopUp = (type, index) => {
    setCurrentType(type);
    setCurrentItemIndex(index);
    setShow(true);
  };

  const handleNextItem = () => {
    const list = currentType === 'message' ? messages : notifications;
    setCurrentItemIndex((prevIndex) => (prevIndex + 1) % list.length);
  };

  const handlePreviousItem = () => {
    const list = currentType === 'message' ? messages : notifications;
    setCurrentItemIndex((prevIndex) => (prevIndex - 1 + list.length) % list.length);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (show) {
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          handleNextItem();
        } else if (event.key === 'ArrowLeft') {
          event.preventDefault();
          handlePreviousItem();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [show, currentType]);

  const currentItem =
    currentType === 'message' ? messages[currentItemIndex] : notifications[currentItemIndex];

  return (
    <div id="Message">
      <NavBarParents />
      <HelpButton />
      <Row>
        <Col md={6}>
          <div className="this_text_message">ΜΗΝΥΜΑΤΑ</div>
          {messages.map((message, index) => (
            <div
              key={index}
              className="messageBox"
              onClick={() => togglePopUp('message', index)}
            >
              <p className="header-message">{message.title}</p>
              <p className="text-message">Από: {message.sender}</p>
            </div>
          ))}
        </Col>
        <Col md={6}>
          <div className="this_text_message">ΕΙΔΟΠΟΙΗΣΕΙΣ</div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="messageBox"
              onClick={() => togglePopUp('notification', index)}
            >
              <p className="header-message">{notification.title}</p>
              <p className="text-message">{notification.content}</p>
            </div>
          ))}
        </Col>
      </Row>
      {show && (
        <div className="popup-overlay">
          <div className={`popup ${show ? 'popup-active' : ''}`} >
            <button className="close-btn" onClick={() => setShow(false)}>
              &times;
            </button>
            <button className="arrow-btn left-arrow" onClick={handlePreviousItem}>
              &larr;
            </button>
            <button className="arrow-btn right-arrow" onClick={handleNextItem}>
              &rarr;
            </button>
            <h2 className='header-message'>{currentItem.title}</h2>
            <p>{currentItem.content}</p>
            {currentType === 'message' && (
              <p>
                <strong>Από:</strong> {currentItem.sender}
              </p>
            )}
            <TextField fullWidth label="Απάντηση" type="text" className="popup_text" />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
