import React, { useState, useEffect } from 'react';
import NavBarParents from '../../components/layout/NavBarParents';
import HelpButton from '../../components/buttons/HelpButton';
import Footer from '../../components/layout/Footer';
import { Row, Col } from 'react-bootstrap';
import TextField from "@mui/material/TextField";
import '../../styles/AgreementHistory.css';
import '../../styles/Message.css';
import '../../styles/PopUp.css';
import { db } from '../../providers/firebaseConfig';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';






export default function MessageParents() {
  const [show, setShow] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [currentType, setCurrentType] = useState(''); 

  
  const [messages, setMessages] = useState([
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
  ]);

  const [notifications, setNotifications] = useState([]);
  
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
    const fetchNotifications = async () => {
      try {
        const userId = localStorage.getItem('userId'); 
        if (!userId) {
          console.error('User ID not found in localStorage.');
          return;
        }

        // Retrieve parent data
        const parentRef = doc(db, 'Parent', userId);
        const parentSnap = await getDoc(parentRef);

        if (!parentSnap.exists()) {
          console.error('Parent data not found.');
          return;
        }

        const parentData = parentSnap.data();
        const { name: parentName, surname: parentSurname } = parentData;

        // Check for active agreements
        const agreementsRef = collection(db, 'agreements');
        const agreementsQuery = query(
          agreementsRef,
          where('parentName', '==', parentData.name),
          where('parentSurname', '==', parentData.surname),
          where('isenable', '==', true)
        );
        const agreementsSnapshot = await getDocs(agreementsQuery);

        if (agreementsSnapshot.empty) {
          setNotifications((prev) => [
            ...prev,
            { title: 'Δεν υπάρχει ενεργό συμφωνητικό.', content: 'Παρακαλώ δημιουργήστε ένα νέο συμφωνητικό.' },
          ]);
          return;
        }

        const activeAgreement = agreementsSnapshot.docs[0].data();
        const currentMonth = new Date().getMonth();

        // Check if payment has been made for the current month
        const paymentsRef = collection(db, 'payments');
        const paymentsQuery = query(
          paymentsRef,
          where('parentName', '==', parentData.name),
          where('parentSurname', '==', parentData.surname),
          where('month', '==', currentMonth)
        );
        const paymentsSnapshot = await getDocs(paymentsQuery);

        if (!paymentsSnapshot.empty) {
          setNotifications([
            { title: 'Η πληρωμή έγινε με επιτυχία!', content: `Το voucher για τον μήνα ${new Date().toLocaleString('default', { month: 'long' })} έχει ληφθεί.` },
          ]);
        } else {
          setNotifications([
            { title: 'Η πληρωμή δεν έχει γίνει.', content: `Δεν έχει ολοκληρωθεί η πληρωμή για τον μήνα ${new Date().toLocaleString('default', { month: 'long' })}.` },
          ]);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);



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
            <div key={index} className="messageBox">
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
            {currentType === 'message' && (
              <TextField fullWidth label="Απάντηση" type="text" className="popup_text" />
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
