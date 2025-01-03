import React, { useState, useEffect } from 'react';
import NavBar from '../../components/layout/NavBarNannies';
import HelpButton from '../../components/buttons/HelpButton';
import Footer from '../../components/layout/Footer';
import { Row, Col } from 'react-bootstrap';
import TextField from "@mui/material/TextField";
import '../../styles/AgreementHistory.css';
import '../../styles/Message.css';
import '../../styles/PopUp.css';

export default function Message() {
  const [show, setShow] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [currentType, setCurrentType] = useState(''); 

  const messages = [
    {
      title: 'Λήξη συνεργασίας',
      content: 'Η συνεργασία μας μαζί σας ήταν άριστη και σας ευχαριστώ για όλον τον ποιοτικό χρόνο που περάσατε με το παιδί μου! Αν χρειαστείτε συστατική επιστολή είμαι στη βοήθειά σας! Καλή συνέχεια!',
      sender: 'Κυριακή Πολυδώρου'
    },
    {
      title: 'Η πληρωμή έγινε με επιτυχία',
      content: 'Σας ευχαριστούμε που χρησιμοποιήσατε την υπηρεσία μας. Ελπίζουμε να σας εξυπηρετήσαμε.',
      sender: 'Αποστόλης Γραμματόπουλος'
    },
    {
      title: 'Ενημέρωση για το πρόγραμμα',
      content: 'Το πρόγραμμα έχει ενημερωθεί. Μπορείτε να δείτε τις αλλαγές στην καρτέλα σας.',
      sender: 'Ομάδα Υποστήριξης'
    }
  ];

  const notifications = [
    {
      title: 'Η πληρωμή έγινε με επιτυχία',
      content: 'Η πληρωμή σας στις 14/3/2018 με τον Αποστόλη Γραμματόπουλο ολοκληρώθηκε.',
      date: '14/3/2018'
    },
    {
      title: 'Η πληρωμή έγινε με επιτυχία',
      content: 'Η πληρωμή σας στις 14/2/2018 με τον Αποστόλη Γραμματόπουλο ολοκληρώθηκε.',
      date: '14/2/2018'
    }
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
      <NavBar />
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
              <p className="text-message">{notification.date}</p>
            </div>
          ))}
        </Col>
      </Row>
      {show && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-btn" onClick={() => setShow(false)}>
              &times;
            </button>
            <button className="arrow-btn left-arrow" onClick={handlePreviousItem}>
              &larr;
            </button>
            <button className="arrow-btn right-arrow" onClick={handleNextItem}>
              &rarr;
            </button>
            <h2>{currentItem.title}</h2>
            <p>{currentItem.content}</p>
            {currentType === 'message' && <p><strong>Από:</strong> {currentItem.sender}</p>}
            <TextField fullWidth label="Απάντηση" type="text" className="popup_text" />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
