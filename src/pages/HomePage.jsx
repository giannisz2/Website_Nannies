import '../styles/HomePage.css';
import userIcon from '../assets/images/user_icon.png';
import calendarIcon from '../assets/images/calendar.png';
import happyFaceIcon from '../assets/images/happy_face.png';
import SearchIcon from '@mui/icons-material/Search';
import NavBar from '../components/layout/Navbar';
import HelpButton from '../components/buttons/HelpButton';
import Footer from '../components/layout/Footer'
import { Row, Col } from 'react-bootstrap';

export default function HomePage() {
  return (
    <div id="homepage">
      <NavBar/>
      <HelpButton />
      <div className="search-field">
        <input className="location" placeholder="Αναζητήστε περιοχή..." />
        <SearchIcon className="search-icon" />
      </div>
      <p id="how-it-works">Πως δουλεύει...</p>
      <Row className="align-items-center g-5 m-0 text-center">
        <Col
          xs={12} /* Full width for small screens */
          md={4} /* 4 columns wide for medium screens and above */
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <img id="user-icon" src={userIcon} alt="User Icon" className="mb-3"></img>
          <p className='this_text1'>Βρες τον/την νταντά του παιδιού σου</p>
          <p id="p2">
            Βρες τον/ην νταντά που θα φροντίσει το παιδάκι σου με αγάπη. Δες ποιος\α
            είναι κοντά σου, τι εμπειρία έχει, τι υπηρεσίες προσφέρει και επίλεξε τον/ην
            καλύτερο.
          </p>
        </Col>
        <Col
          xs={12} /* Full width for small screens */
          md={4} /* 4 columns wide for medium screens and above */
          className="d-flex flex-column align-items-center justify-content-center"
          id="col-2"
        >
          <img id="calendar-icon" src={calendarIcon} alt="Calendar Icon" className="mb-3"></img>
          <p className='this_text1'>Επικοινώνησε μαζί του/της & πλήρωσε online</p>
          <p id="p4">
            Απλά και εύκολα συνεννοήσου για τη συνάντηση, συμφώνησε και πλήρωσε με το
            voucher ηλεκτρονικά ώστε να απολαύσεις όλα τα προνόμια του ntantades.gov.
          </p>
        </Col>
        <Col
          xs={12} /* Full width for small screens */
          md={4} /* 4 columns wide for medium screens and above */
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <img id="happy-face-icon" src={happyFaceIcon} alt="Happy Face" className="mb-3"></img>
          <p className='this_text1'>Το παιδάκι σου απασχολείται δημιουργικά όσο εσύ δουλεύεις</p>
          <p id="p6">
            Ο/Η νταντά θα προσπαθήσει να φροντίσει το παιδάκι σου όπως εσύ. Είναι
            συστηματικά σε επικοινωνία μαζί σου.
          </p>
        </Col>
      </Row>
      <Footer/>
    </div>
  );
}
