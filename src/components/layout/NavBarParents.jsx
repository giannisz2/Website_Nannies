import { Container, Navbar, Nav, Button, Dropdown } from 'react-bootstrap';
import '../../styles/NavBarNannies.css';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import React, { useState } from 'react';

export default function NavBarParents() {
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
    navigate('/');  // Home page from logo
  };

  const handleProfileEdit = () => {
    navigate('/PersonalInfoParents'); 
  };
  
  const handleDeactivateAccount = () => {
    handleSnackbarOpen('Ο λογαριασμός απενεργοποιήθηκε!', 'info');
    setTimeout(() => {
      navigate('/'); 
    }, 2000); 
  };


  const goToTransactionHistory = () => {
    navigate('/TransactionHistoryParents');
  };


  const search = () => {
    navigate('/SearchNannies');  
  };

  const rates = () => {
    navigate('/RatesParents');  
  };


  const handleProfileClick = () => {
    navigate('/PersonalInfo');  
  };

  return (<>
    <Navbar className="nav" bg="light" expand="lg" variant="light">
      <Container fluid>
        <Navbar.Brand className="ms-4 fw-bolder fs-3" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          Nannies GR
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Button className="button" variant="primary">
              Αιτήσεις
            </Button>
            <Button className="button mx-2" onClick={search}variant="primary">
              Αναζήτηση
            </Button>
            <Dropdown className="d-inline mx-2">
              <Dropdown.Toggle variant="primary" className="button">
                Ιστορικό
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/Πληρωμών">Πληρωμών</Dropdown.Item>
                <Dropdown.Item onClick={goToTransactionHistory}>Συμφωνητικών</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
           
            <Button className="button mx-2" variant="primary">
              Ειδοποιήσεις
            </Button>
            <Dropdown className="d-inline mx-2">
              <Dropdown.Toggle variant="primary" className="button">
                Συμφωνητικό
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Λήξη Συνεργασίας</Dropdown.Item>
                <Dropdown.Item>Νέο συμφωνητικό</Dropdown.Item>
                <Dropdown.Item>Ανανέωση</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button className="button mx-2" variant="primary">
              Πληρωμή
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
