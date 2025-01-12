import { Container, Navbar, Nav, Button, Dropdown } from 'react-bootstrap';
import '../../styles/NavBarNannies.css';
import { useNavigate, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import React, { useState } from 'react';

export default function NavBarParents() {
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
    navigate('/'); // Home page from logo
  };

  const menuItems = [
    { label: 'Αναζήτηση', path: '/SearchNannies', onClick: () => navigate('/SearchNannies') },
    { label: 'Πληρωμή', path: '/NewPayment', onClick: () => navigate('/NewPayment') },
    { label: 'Ειδοποιήσεις', path: '/MessageParents', onClick: () => navigate('/MessageParents') },
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
                  <Dropdown.Item
                    onClick={() => navigate('/TransactionHistoryParents')}
                    className={isActive('/TransactionHistoryParents') ? 'active' : ''}
                  >
                    Πληρωμών
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => navigate('/AgreementHistoryParents')}
                    className={isActive('/AgreementHistoryParents') ? 'active' : ''}
                  >
                    Συμφωνητικών
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown className="d-inline mx-2">
                <Dropdown.Toggle variant="primary" className="button">
                  Συμφωνητικό
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    href="/AgreementExpiration"
                    className={isActive('/AgreementExpiration') ? 'active' : ''}
                  >
                    Λήξη Συνεργασίας
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="/ParentsAgreement"
                    className={isActive('/ParentsAgreement') ? 'active' : ''}
                  >
                    Νέο συμφωνητικό
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="/AgreementRenewal"
                    className={isActive('/AgreementRenewal') ? 'active' : ''}
                  >
                    Ανανέωση
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
                  <Dropdown.Item onClick={() => navigate('/PersonalInfoParents')}>Επεξεργασία Προφίλ</Dropdown.Item>
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
