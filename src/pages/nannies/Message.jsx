import React, { useState, useEffect } from 'react';
import NavBarNannies from '../../components/layout/NavBarNannies';
import HelpButton from '../../components/buttons/HelpButton';
import Footer from '../../components/layout/Footer';
import { Row, Col } from 'react-bootstrap';
import TextField from "@mui/material/TextField";
import '../../styles/AgreementHistory.css';
import '../../styles/Message.css';
import '../../styles/PopUp.css';
import { db } from '../../providers/firebaseConfig';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import Breadcrumb from '../../components/layout/Breadcrumb'

export default function Message() {
  const [show, setShow] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [currentType, setCurrentType] = useState('');
  const [agreementsNotifications, setAgreementsNotifications] = useState([]);
  const [interestNotifications, setInterestNotifications] = useState([]);

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

  const togglePopUp = (type, index) => {
    setCurrentType(type);
    setCurrentItemIndex(index);
    setShow(true);
  };

  const handleNextItem = () => {
    const list = currentType === 'message' ? messages : agreementsNotifications.concat(interestNotifications);
    setCurrentItemIndex((prevIndex) => (prevIndex + 1) % list.length);
  };

  const handlePreviousItem = () => {
    const list = currentType === 'message' ? messages : agreementsNotifications.concat(interestNotifications);
    setCurrentItemIndex((prevIndex) => (prevIndex - 1 + list.length) % list.length);
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const userId = localStorage.getItem('userId'); 
        if (!userId) {
          console.error('Δεν βρέθηκε userId στο localStorage.');
          return;
        }

        
        const nannyRef = doc(db, 'users', userId);
        const nannySnap = await getDoc(nannyRef);

        if (!nannySnap.exists()) {
          console.error('Δεν βρέθηκαν δεδομένα για τη νταντά.');
          return;
        }

        const nannyData = nannySnap.data();
        const { name: nannyName, surname: nannySurName } = nannyData;

        
        const agreementsRef = collection(db, 'agreements');
        const agreementsQuery = query(
          agreementsRef,
          where('nannyName', '==', nannyName),
          where('nannySurName', '==', nannySurName)
        );

        console.log('Nanny Name:', nannyName);
        console.log('Nanny Surname:', nannySurName);
        const agreementsSnapshot = await getDocs(agreementsQuery);
        console.log('Agreements Snapshot:', agreementsSnapshot.docs.map(doc => doc.data()));

        const notifications = [];
        agreementsSnapshot.forEach((doc) => {
          const data = doc.data();
          const status = data.isenable
            ? `Έχετε ενεργό συμφωνητικό με τον/την ${data.parentName} ${data.parentSurname}.`
            : `Η συνεργασία σας με τον/την ${data.parentName} ${data.parentSurname} έχει λήξει.`;
          notifications.push({
            title: data.isenable ? 'Ενεργό Συμφωνητικό' : 'Λήξη Συνεργασίας',
            content: status,
            date: new Date(data.startDate.seconds * 1000).toLocaleDateString(),
          });
        });

        setAgreementsNotifications(notifications);


        
        const nannyFullName = `${nannyData.name} ${nannyData.surname}`;
        console.log('Nanny Full Name:', nannyFullName);

        const interestRef = collection(db, 'interest');
        const interestQuery = query(
          interestRef,
          where('nannyName', '==', nannyFullName)
        );
  
        const interestSnapshot = await getDocs(interestQuery);
        console.log('Interest Snapshot Size:', interestSnapshot.size);
  
        const interestNotifications = [];
        interestSnapshot.forEach((doc) => {
          const data = doc.data();
          console.log('Interest Data:', data);
          interestNotifications.push({
            title: 'Νέο Ενδιαφέρον',
            content: `Ο/Η ${data.parentName} έδειξε ενδιαφέρον για συνεργασία.`,
            date: new Date().toLocaleDateString(),
          });
        });
  
        setInterestNotifications(interestNotifications);
        console.log('Interest Notifications:', interestNotifications);
      } catch (error) {
        console.error('Σφάλμα κατά την ανάκτηση των ειδοποιήσεων:', error);
      }
    };
  

    fetchNotifications();
  }, []);
  

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
    currentType === 'message'
      ? messages[currentItemIndex]
      : agreementsNotifications.concat(interestNotifications)[currentItemIndex];

  return (
    <div id="Message">
      <NavBarNannies/>
      <div><Breadcrumb label="Ειδοποιήσεις"/></div>
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
          {agreementsNotifications.length > 0 ? (
            agreementsNotifications.map((notification, index) => (
              <div key={index} className="messageBox">
                <p className="header-message">{notification.title}</p>
                <p className="text-message">{notification.content}</p>
                <p className="date-message">{notification.date}</p>
              </div>
            ))
          ) : (
            <p className="text-message">Δεν υπάρχουν ειδοποιήσεις συμφωνητικών.</p>
          )}
        
          <div className="this_text_message"></div>
          {interestNotifications.length > 0 ? (
            interestNotifications.map((notification, index) => (
              <div key={index} className="messageBox">
                <p className="header-message">{notification.title}</p>
                <p className="text-message">{notification.content}</p>
                <p className="date-message">{notification.date}</p>
              </div>
            ))
          ) : (
            <p className="text-message">Δεν υπάρχουν αιτήσεις ενδιαφέροντος.</p>
          )}
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
