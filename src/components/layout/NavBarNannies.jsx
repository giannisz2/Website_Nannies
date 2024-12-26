import { Container, Navbar, Nav, Button, Dropdown } from 'react-bootstrap';
import '../../styles/NavBarNannies.css';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import React, { useState } from 'react';

export default function NavBarNannies() {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/'); // Home page from logo
  };

  const goToAgreementHistory = () => {
    navigate('/AgreementHistory');
  };

  const handleProfileEdit = () => {
    navigate('/PersonalInfo'); // Navigate to PersonalInfo page for editing
  };

  const handleDeactivateAccount = () => {
    handleSnackbarOpen('Ο λογαριασμός απενεργοποιήθηκε!', 'info');
    setTimeout(() => {
      navigate('/'); // Navigate back to homepage or login page
    }, 2000); // Wait for 2 seconds before navigation
  };

  const contract = () => {
    navigate('/Agreement');
  };

  const voucher = () => {
    navigate('/Voucher');
  };

  const rates = () => {
    navigate('/Rates');
  };

  const MeetingNanny = () => {
    navigate('/MeetingNanny');
  };

  return (
    <>
      <Navbar className="nav" bg="light" expand="lg" variant="light">
        <Container fluid>
          <Navbar.Brand className="ms-4 fw-bolder fs-3" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            Nannies GR
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Button className="button" variant="primary" onClick={rates}>
                Αξιολογήσεις
              </Button>
              <Dropdown className="d-inline mx-2">
                <Dropdown.Toggle variant="primary" className="button">
                  Ιστορικό
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/Πληρωμών">Πληρωμών</Dropdown.Item>
                  <Dropdown.Item onClick={goToAgreementHistory}>Συμφωνητικών</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Button className="button mx-2" variant="primary">
                Ειδοποιήσεις
              </Button>
              <Button className="button mx-2" onClick={MeetingNanny} variant="primary">
                Συνάντηση
              </Button>
              <Button className="button mx-2" onClick={contract} variant="primary">
                Συμφωνητικό
              </Button>
              <Button className="button mx-2" onClick={voucher} variant="primary">
                Voucher
              </Button>
            </Nav>
            <Nav>
              <Dropdown>
                <Dropdown.Toggle as={IconButton} aria-label="account of current user" color="inherit">
                  <AccountCircleIcon />
                </Dropdown.Toggle>
                <Dropdown.Menu align="end">
                  <Dropdown.Item onClick={handleProfileEdit}>Επεξεργασία Προφίλ</Dropdown.Item>
                  <Dropdown.Item onClick={handleDeactivateAccount}>Απενεργοποίηση</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
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
