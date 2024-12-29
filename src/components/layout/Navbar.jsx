import { Container, Navbar, Nav, Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../../styles/NavBar.css';
import { useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../providers/firebaseConfig';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function NavBar() {
  const navigate = useNavigate();
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleBecomeNanny = () => {
    navigate('/SelectionCriteria');
  };

  const parents = () => {
    navigate('/SelectionCriteriaParents');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignIn = async () => {
    try {
      // Λήψη δεδομένων από τη συλλογή "users"
      const usersQuerySnapshot = await getDocs(collection(db, 'users'));
      const users = usersQuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  
      // Λήψη δεδομένων από τη συλλογή "Parent"
      const parentsQuerySnapshot = await getDocs(collection(db, 'Parent'));
      const parents = parentsQuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  
      // Συνδυασμός δεδομένων από τις δύο συλλογές
      const allUsers = [...users, ...parents];
  
      // Αναζήτηση χρήστη στις συνδυασμένες συλλογές
      const user = allUsers.find(
        (u) =>
          u.name.trim().toLowerCase() === formData.firstName.trim().toLowerCase() &&
          u.surname.trim().toLowerCase() === formData.lastName.trim().toLowerCase() &&
          u.phone.trim() === formData.phone.trim()
      );
  
      if (user) {
        setSnackbarMessage(`Καλώς ήρθες, ${user.name} ${user.surname}!`);
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setShowSignInModal(false);
        localStorage.setItem("userId", user.id); // Αποθήκευση του ID του εγγράφου
  
        // Πλοήγηση ανάλογα με το ρόλο του χρήστη
        if (user.role === 'Parent') {
          navigate('/ParentHomepage');
        } else if (user.role === 'nanny') {
          navigate('/NannyHomepage');
        }
      } else {
        setSnackbarMessage('Τα στοιχεία σας δεν βρέθηκαν. Δοκιμάστε ξανά.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Σφάλμα κατά την ανάκτηση των δεδομένων:', error);
      setSnackbarMessage('Υπήρξε σφάλμα. Δοκιμάστε ξανά αργότερα.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };
  





  return (
    <>
      <Navbar id="nav" expand="lg" variant="light">
        <Container fluid>
          <Navbar.Brand
            className="ms-4 fw-bolder fs-3"
            onClick={handleLogoClick}
            style={{ cursor: 'pointer' }}
          >
            Nannies GR
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Button
                variant="primary"
                id="become-nanny"
                className="me-2 rounded-pill"
                onClick={handleBecomeNanny}
              >
                <FontAwesomeIcon icon={faUserPlus} className="me-1" /> Γίνε Νταντά
              </Button>
              <Button
                variant="primary"
                id="sign-up"
                className="me-2 rounded-pill"
                onClick={parents}
              >
                <FontAwesomeIcon icon={faUserPlus} className="me-1" /> Sign Up
              </Button>
              <Button
                variant="primary"
                id="sign-in"
                className="rounded-pill"
                onClick={() => setShowSignInModal(true)}
              >
                <FontAwesomeIcon icon={faSignInAlt} className="me-1" /> Sign In
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal για Sign In */}
      <Modal show={showSignInModal} onHide={() => setShowSignInModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>Όνομα</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Εισάγετε το όνομά σας"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Επώνυμο</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Εισάγετε το επώνυμό σας"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Τηλέφωνο</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Εισάγετε τον αριθμό τηλεφώνου σας"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSignInModal(false)}>
            Ακύρωση
          </Button>
          <Button variant="primary" onClick={handleSignIn}>
            Είσοδος
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Snackbar για μηνύματα */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default NavBar;
