import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import NavBarNannies from '../../components/layout/NavbarNannies';
import HelpButton from '../../components/buttons/HelpButton';
import Footer from '../../components/layout/Footer';
import { Row, Col } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../providers/firebaseConfig';
import 'react-calendar/dist/Calendar.css';
import '../../styles/MeetingNanny.css';

export default function MeetingNanny() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointmentInfo1, setAppointmentInfo1] = useState(''); 
  const [appointmentInfo2, setAppointmentInfo2] = useState(''); 
  const [appointmentInfo3, setAppointmentInfo3] = useState(''); 

  const [appointments, setAppointments] = useState({});

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const docRef = doc(db, 'appointments', 'appointmentsCollectionId');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setAppointments(data);
        } else {
          console.log('No appointments data found');
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleDateClick = (date) => {
    const dateString = date.toISOString().split('T')[0]; 
    setSelectedDate(dateString); 
    setAppointmentInfo1(appointments[dateString]?.info1 || '');
    setAppointmentInfo2(appointments[dateString]?.info2 || '');
    setAppointmentInfo3(appointments[dateString]?.info3 || '');
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0]; 
      if (appointments[dateString]) {
        return <div className="bullet"></div>; 
      }
    }
    return null;
  };

  return (
    <div className="MeetingNanny">
      <NavBarNannies className="nav-bar-nannies" />
      <HelpButton />
      <p className="text3"> Πατήστε στις κουκκίδες για να δείτε τα στοιχεία του ραντεβού </p>
      <Row className="row">
        <Col
          md={6}
          xs={12}
          className="d-flex flex-column align-items-center justify-content-center text-center"
        >
        <Calendar
          onClickDay={handleDateClick} 
          tileContent={tileContent} 
        />
        </Col>
        <Col
          md={6}
          xs={12}
          className="d-flex flex-column align-items-center justify-content-center text-center"
        >
        <TextField fullWidth label="Ονοματεπώνυμο κηδεμόνα" type="text" value={appointmentInfo1} className="my-3" disabled />
        <TextField fullWidth label="Ημέρα/Ώρα" type="text" value={appointmentInfo2} className="my-3" disabled />
        <TextField fullWidth label="Τοποθεσία (αν γίνει από κοντά ή link αν γίνει διαδικτυακά)" type="text" value={appointmentInfo3} className="my-3" disabled />
        </Col>
      </Row>
      <Footer />
    </div>
  );
}