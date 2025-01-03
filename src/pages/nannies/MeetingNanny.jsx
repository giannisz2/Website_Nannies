import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Στυλ για το ημερολόγιο
import NavBarNannies from '../../components/layout/NavbarNannies';
import HelpButton from '../../components/buttons/HelpButton';
import Footer from '../../components/layout/Footer';
import { Row,Col } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import '../../styles/MeetingNanny.css';

export default function MeetingNanny() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointmentInfo1, setAppointmentInfo1] = useState(''); 
  const [appointmentInfo2, setAppointmentInfo2] = useState(''); 
  const [appointmentInfo3, setAppointmentInfo3] = useState(''); 

  const appointments1 = {
    '2024-12-20': 'Μαρία Παπαδοπούλου',
    '2024-12-25': 'Ελένη Χατζηγιάννη',
    '2024-12-30': 'Αποστόλης Γραμματόπουλος',
  };
  const appointments2 = {
    '2024-12-20': 'Σάββατο 21-12-2024 18:00',
    '2024-12-25': 'Πέμπτη 26-12-2024 8:00',
    '2024-12-30': 'Τρίτη 31-12-2024 17:00',
  };  const appointments3 = {
    '2024-12-20': 'Παλαιολόγου 8, Αιγαίο',
    '2024-12-25': 'Κίτρινο Σπίτι 5, Σύνταγμα',
    '2024-12-30': 'link@link.com',
  };

  const handleDateClick = (date) => {
    const dateString = date.toISOString().split('T')[0]; 
    setSelectedDate(dateString); 
    setAppointmentInfo1(appointments1[dateString] || ' ');
    setAppointmentInfo2(appointments2[dateString] || ' ');
    setAppointmentInfo3(appointments3[dateString] || ' ');
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0]; 
      if (appointments1[dateString]) {
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
