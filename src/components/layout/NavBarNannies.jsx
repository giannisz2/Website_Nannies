import { Container, Navbar, Nav, Button, Dropdown } from 'react-bootstrap';
import '../../styles/NavBarNannies.css';
import { useNavigate, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import React, { useState } from 'react';

export default function NavBarNannies() {
  const navigate = useNavigate();
  const location = useLocation();
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
    navigate('/NannyHomepage'); // Home page from logo
  };

  const menuItems = [
    { label: 'Αξιολογήσεις', path: '/Rates', onClick: () => navigate('/Rates') },
    { label: 'Ειδοποιήσεις', path: '/Message', onClick: () => navigate('/Message') },
    { label: 'Συνάντηση', path: '/MeetingNanny', onClick: () => navigate('/MeetingNanny') },
    { label: 'Συμφωνητικό', path: '/Agreement', onClick: () => navigate('/Agreement') },
    { label: 'Voucher', path: '/Voucher', onClick: () => navigate('/Voucher') },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <Navbar className="nav" bg="light" expand="lg" variant="light">
        <Container fluid>
          <Navbar.Brand className="ms-4 fw-bolder fs-3" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            Νταντάδες.gr
            <div className="fs-6 text-muted">Όπου η φροντίδα συναντά την εμπιστοσύνη..</div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  className={`button mx-2 ${isActive(item.path) ? 'active' : ''}`}
                  variant="primary"
                  onClick={item.onClick}
                >
                  {item.label}
                </Button>
              ))}
              <Dropdown className="d-inline mx-2">
                <Dropdown.Toggle variant="primary" className="button">
                  Ιστορικό
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/Πληρωμών" onClick={() => navigate('/TransactionHistory')}>
                    Πληρωμών
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate('/AgreementHistory')}>
                    Συμφωνητικών
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
            <Nav>
              <Dropdown>
                <Dropdown.Toggle as={IconButton} aria-label="account of current user" color="inherit">
                  <AccountCircleIcon />
                </Dropdown.Toggle>
                <Dropdown.Menu align="end">
                  <Dropdown.Item onClick={() => navigate('/PersonalInfo')}>Επεξεργασία Προφίλ</Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      handleSnackbarOpen('Ο λογαριασμός αποσυνδέθηκε!', 'info');
                      setTimeout(() => {
                        navigate('/');
                      }, 2000);
                    }}
                  >
                    Αποσύνδεση
                  </Dropdown.Item>
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
