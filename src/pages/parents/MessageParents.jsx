import React, { useState, useEffect } from 'react';
import NavBarParents from '../../components/layout/NavBarParents';
import HelpButton from '../../components/buttons/HelpButton';
import Footer from '../../components/layout/Footer';
import { Row, Col } from 'react-bootstrap';
import TextField from "@mui/material/TextField";
import '../../styles/AgreementHistory.css';
import '../../styles/Message.css';

export default function Message() {
  const [show, setShow] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

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

  const togglePopUp = () => setShow(!show);

  const handleNextMessage = () => {
    setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
  };

  const handlePreviousMessage = () => {
    setCurrentMessageIndex((prevIndex) => (prevIndex - 1 + messages.length) % messages.length);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        handleNextMessage();
      } else if (event.key === 'ArrowLeft') {
        handlePreviousMessage();
      }
    };

    if (show) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [show]);

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
              onClick={() => {
                setCurrentMessageIndex(index);
                togglePopUp();
              }}
            >
              <p className="header-message">{message.title}</p>
              <p className="text-message">Από: {message.sender}</p>
            </div>
          ))}
      {show && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-btn" onClick={togglePopUp}>
              &times;
            </button>
            <button className="arrow-btn left-arrow" onClick={handlePreviousMessage}>
              &larr;
            </button>
            <button className="arrow-btn right-arrow" onClick={handleNextMessage}>
              &rarr;
            </button>
            <h2>{messages[currentMessageIndex].title}</h2>
            <p>{messages[currentMessageIndex].content}</p>
            <p>
              <strong>Από:</strong> {messages[currentMessageIndex].sender}
            </p>
            <TextField fullWidth label="Απάντηση" type="text" className="nanny_message_text" />
          </div>
        </div>
      )}
      </Col>
      <Col md={6}>
          <div className="this_text_message">ΕΙΔΟΠΟΙΗΣΕΙΣ</div>
          <div className="messageBox">
            <p className="header-message">Η πληρωμή έγινε με επιτυχία</p>
            <p className="text-message">
            Το voucher για τον μήνα Δεκέμβριο έχει ληφθεί
            </p>
          </div>
      </Col>
      </Row>
      <Footer />
    </div>
  );
}


/*  const notif = [
    {
      title: 'Η πληρωμή έγινε με επιτυχία!',
      content: `Το voucher για τον μήνα Δεκέμβριο έχει ληφθεί`,
    },
    {
      title: 'Η πληρωμή έγινε με επιτυχία!',
      content: `Το voucher για τον μήνα Noέμβριο έχει ληφθεί`,
    },
  ];
 */