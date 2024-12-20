import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Στυλ για το ημερολόγιο
import NavBarNannies from '../../components/layout/NavbarNannies';
import HelpButton from '../../components/buttons/HelpButton';
import Footer from '../../components/layout/Footer';
import Breadcrumb from '../../components/layout/Breadcrumb';
import { Row } from 'react-bootstrap'; // Αν χρησιμοποιείς Bootstrap
import TextField from '@mui/material/TextField'; // Αν χρησιμοποιείς Material-UI
import '../../styles/MeetingNanny.css';

export default function MeetingNanny() {
  const [selectedDate, setSelectedDate] = useState(null); // Επιλεγμένη ημερομηνία
  const [appointmentInfo1, setAppointmentInfo1] = useState(''); // Πληροφορίες ραντεβού
  const [appointmentInfo2, setAppointmentInfo2] = useState(''); // Πληροφορίες ραντεβού
  const [appointmentInfo3, setAppointmentInfo3] = useState(''); // Πληροφορίες ραντεβού

  // Δεδομένα με τις ημερομηνίες και τις πληροφορίες τους
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

  // Διαχείριση της ημερομηνίας που επιλέγεται
  const handleDateClick = (date) => {
    const dateString = date.toISOString().split('T')[0]; // Μορφοποίηση σε YYYY-MM-DD
    setSelectedDate(dateString); // Ενημέρωση της επιλεγμένης ημερομηνίας
    setAppointmentInfo1(appointments1[dateString] || ' ');
    setAppointmentInfo2(appointments2[dateString] || ' ');
    setAppointmentInfo3(appointments3[dateString] || ' ');
  };

  // Προσθήκη bullets στις ημερομηνίες που έχουν ραντεβού
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0]; // Μορφοποίηση σε YYYY-MM-DD
      if (appointments1[dateString]) {
        return <div className="bullet"></div>; // Bullet για τις ημερομηνίες με ραντεβού
      }
    }
    return null;
  };

  return (
    <div id="MeetingNanny">
      <NavBarNannies className="nav-bar-nannies" />
      <HelpButton />
      <div id="breadCrumb">
        <Breadcrumb />
      </div>
      <div>
        <p className="text3">
          Πατήστε στις κουκκίδες για να δείτε τα στοιχεία του ραντεβού
        </p>
        <p className="text2">
          Θα συμπληρώνονται αυτόματα ανάλογα το ραντεβού
        </p>
      </div>

      <div className="content flex-grow-1 d-flex align-items-center justify-content-center">
        {/* Εμφάνιση ημερολογίου */}
        <Calendar
          onClickDay={handleDateClick} // Χειριστής όταν επιλέγεται ημερομηνία
          tileContent={tileContent} // Προσθήκη bullets
        />
      </div>

      {/* Εμφάνιση πληροφοριών ραντεβού στο TextField */}
      <div className="form-section">
        <Row className="row">
          <TextField
            fullWidth
            label="Ονοματεπώνυμο κηδεμόνα"
            type="text"
            value={appointmentInfo1} // Οι πληροφορίες του ραντεβού εμφανίζονται εδώ
            className="my-3"
            disabled // Κάνει το πεδίο μη επεξεργάσιμο
          />
        </Row>
      </div>
      <div className="form-section">
        <Row className="row">
          <TextField
            fullWidth
            label="Ημέρα/Ώρα"
            type="text"
            value={appointmentInfo2} // Οι πληροφορίες του ραντεβού εμφανίζονται εδώ
            className="my-3"
            disabled // Κάνει το πεδίο μη επεξεργάσιμο
          />
        </Row>
      </div>
      <div className="form-section">
        <Row className="row">
          <TextField
            fullWidth
            label="Τοποθεσία (αν γίνει από κοντά ή link αν γίνει διαδικτυακά)"
            type="text"
            value={appointmentInfo3} // Οι πληροφορίες του ραντεβού εμφανίζονται εδώ
            className="my-3"
            disabled // Κάνει το πεδίο μη επεξεργάσιμο
          />
        </Row>
      </div>

      <Footer />
    </div>
  );
}
