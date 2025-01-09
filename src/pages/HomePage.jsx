import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/HomePage.css';
import userIcon from '../assets/images/user_icon.png';
import calendarIcon from '../assets/images/calendar.png';
import happyFaceIcon from '../assets/images/happy_face.png';
import SearchIcon from '@mui/icons-material/Search';
import NavBar from '../components/layout/Navbar';
import HelpButton from '../components/buttons/HelpButton';
import Footer from '../components/layout/Footer';
import { Row, Col } from 'react-bootstrap';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const citiesAndTowns = [
  { region: "ΑΤΤΙΚΗ", name: "ΑΘΗΝΑ" },
  { region: "ΑΤΤΙΚΗ", name: "ΠΕΙΡΑΙΑΣ" },
  { region: "ΑΤΤΙΚΗ", name: "ΜΑΡΟΥΣΙ" },
  { region: "ΑΤΤΙΚΗ", name: "ΚΗΦΙΣΙΑ" },
  { region: "ΑΤΤΙΚΗ", name: "ΓΛΥΦΑΔΑ" },
  { region: "ΑΤΤΙΚΗ", name: "ΒΟΥΛΑ" },
  { region: "ΑΤΤΙΚΗ", name: "ΒΟΥΛΙΑΓΜΕΝΗ" },

  { region: "ΘΕΣΣΑΛΟΝΙΚΗ", name: "ΘΕΣΣΑΛΟΝΙΚΗ" },
  { region: "ΘΕΣΣΑΛΟΝΙΚΗ", name: "ΚΑΛΑΜΑΡΙΑ" },
  { region: "ΘΕΣΣΑΛΟΝΙΚΗ", name: "ΠΥΛΑΙΑ" },
  { region: "ΘΕΣΣΑΛΟΝΙΚΗ", name: "ΕΥΟΣΜΟΣ" },
  { region: "ΘΕΣΣΑΛΟΝΙΚΗ", name: "ΣΤΑΥΡΟΥΠΟΛΗ" },

  { region: "ΠΕΛΟΠΟΝΝΗΣΟΣ", name: "ΠΑΤΡΑ" },
  { region: "ΠΕΛΟΠΟΝΝΗΣΟΣ", name: "ΚΑΛΑΜΑΤΑ" },
  { region: "ΠΕΛΟΠΟΝΝΗΣΟΣ", name: "ΣΠΑΡΤΗ" },
  { region: "ΠΕΛΟΠΟΝΝΗΣΟΣ", name: "ΚΟΡΙΝΘΟΣ" },
  { region: "ΠΕΛΟΠΟΝΝΗΣΟΣ", name: "ΤΡΙΠΟΛΗ" },
  { region: "ΠΕΛΟΠΟΝΝΗΣΟΣ", name: "ΝΑΥΠΛΙΟ" },
  { region: "ΠΕΛΟΠΟΝΝΗΣΟΣ", name: "ΑΡΓΟΣ" },

  { region: "ΚΡΗΤΗ", name: "ΗΡΑΚΛΕΙΟ" },
  { region: "ΚΡΗΤΗ", name: "ΧΑΝΙΑ" },
  { region: "ΚΡΗΤΗ", name: "ΡΕΘΥΜΝΟ" },
  { region: "ΚΡΗΤΗ", name: "ΑΓΙΟΣ ΝΙΚΟΛΑΟΣ" },

  { region: "ΣΤΕΡΕΑ ΕΛΛΑΔΑ", name: "ΛΑΜΙΑ" },
  { region: "ΣΤΕΡΕΑ ΕΛΛΑΔΑ", name: "ΧΑΛΚΙΔΑ" },
  { region: "ΣΤΕΡΕΑ ΕΛΛΑΔΑ", name: "ΘΗΒΑ" },
  { region: "ΣΤΕΡΕΑ ΕΛΛΑΔΑ", name: "ΛΙΒΑΔΕΙΑ" },

  { region: "ΜΑΚΕΔΟΝΙΑ", name: "ΚΑΒΑΛΑ" },
  { region: "ΜΑΚΕΔΟΝΙΑ", name: "ΒΕΡΟΙΑ" },
  { region: "ΜΑΚΕΔΟΝΙΑ", name: "ΣΕΡΡΕΣ" },
  { region: "ΜΑΚΕΔΟΝΙΑ", name: "ΔΡΑΜΑ" },
  { region: "ΜΑΚΕΔΟΝΙΑ", name: "ΚΟΖΑΝΗ" },
  { region: "ΜΑΚΕΔΟΝΙΑ", name: "ΚΑΣΤΟΡΙΑ" },

  { region: "ΗΠΕΙΡΟΣ", name: "ΙΩΑΝΝΙΝΑ" },
  { region: "ΗΠΕΙΡΟΣ", name: "ΑΡΤΑ" },
  { region: "ΗΠΕΙΡΟΣ", name: "ΠΡΕΒΕΖΑ" },
  { region: "ΗΠΕΙΡΟΣ", name: "ΗΓΟΥΜΕΝΙΤΣΑ" },

  { region: "ΘΕΣΣΑΛΙΑ", name: "ΛΑΡΙΣΑ" },
  { region: "ΘΕΣΣΑΛΙΑ", name: "ΒΟΛΟΣ" },
  { region: "ΘΕΣΣΑΛΙΑ", name: "ΚΑΡΔΙΤΣΑ" },
  { region: "ΘΕΣΣΑΛΙΑ", name: "ΤΡΙΚΑΛΑ" },

  { region: "ΔΩΔΕΚΑΝΗΣΑ", name: "ΡΟΔΟΣ" },
  { region: "ΔΩΔΕΚΑΝΗΣΑ", name: "ΚΩΣ" },
  { region: "ΔΩΔΕΚΑΝΗΣΑ", name: "ΛΕΡΟΣ" },
  { region: "ΔΩΔΕΚΑΝΗΣΑ", name: "ΚΑΛΥΜΝΟΣ" },

  { region: "ΕΠΤΑΝΗΣΑ", name: "ΚΕΡΚΥΡΑ" },
  { region: "ΕΠΤΑΝΗΣΑ", name: "ΖΑΚΥΝΘΟΣ" },
  { region: "ΕΠΤΑΝΗΣΑ", name: "ΛΕΥΚΑΔΑ" },
  { region: "ΕΠΤΑΝΗΣΑ", name: "ΚΕΦΑΛΟΝΙΑ" },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleSearch = () => {
    if (selectedLocation) {
      navigate(`/SearchNanniesWithoutSignIn?location=${selectedLocation}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div id="homepage">
      <NavBar />
      <HelpButton />
      <div className="search-field">
        <Autocomplete
          freeSolo
          className="location-search"
          disableClearable
          options={citiesAndTowns.map((option) => `${option.region}:${option.name}`)}
          onChange={(event, newValue) => {
            setSelectedLocation(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              className="location"
              placeholder="Αναζητήστε περιοχή..."
              onKeyDown={handleKeyDown}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <SearchIcon
                    className="search-icon"
                    onClick={handleSearch}
                  />
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
            />
          )}
        />
      </div>
      <p id="how-it-works">Πως δουλεύει...</p>
      <Row className="align-items-center g-5 m-0 text-center">
        <Col xs={12} md={4} className="d-flex flex-column align-items-center justify-content-center">
          <img id="user-icon" src={userIcon} alt="User Icon" className="mb-3"></img>
          <p className="this_text1">Βρες τον/την νταντά του παιδιού σου</p>
          <p id="p2">
            Βρες τον/ην νταντά που θα φροντίσει το παιδάκι σου με αγάπη. Δες ποιος\α
            είναι κοντά σου, τι εμπειρία έχει, τι υπηρεσίες προσφέρει και επίλεξε τον/ην
            καλύτερο.
          </p>
        </Col>
        <Col xs={12} md={4} className="d-flex flex-column align-items-center justify-content-center" id="col-2">
          <img id="calendar-icon" src={calendarIcon} alt="Calendar Icon" className="mb-3"></img>
          <p className="this_text1">Επικοινώνησε μαζί του/της & πλήρωσε online</p>
          <p id="p4">
            Απλά και εύκολα συνεννοήσου για τη συνάντηση, συμφώνησε και πλήρωσε με το
            voucher ηλεκτρονικά ώστε να απολαύσεις όλα τα προνόμια του ntantades.gov.
          </p>
        </Col>
        <Col xs={12} md={4} className="d-flex flex-column align-items-center justify-content-center">
          <img id="happy-face-icon" src={happyFaceIcon} alt="Happy Face" className="mb-3"></img>
          <p className="this_text1">Το παιδάκι σου απασχολείται δημιουργικά όσο εσύ δουλεύεις</p>
          <p id="p6">
            Ο/Η νταντά θα προσπαθήσει να φροντίσει το παιδάκι σου όπως εσύ. Είναι
            συστηματικά σε επικοινωνία μαζί σου.
          </p>
        </Col>
      </Row>
      <Footer />
    </div>
  );
}
