import { Container, Navbar, Nav, Button, Dropdown } from 'react-bootstrap';
import '../../styles/NavBarNannies.css';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';

export default function NavBarParents() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');  // Home page from logo
  };

  const goToTransactionHistory = () => {
    navigate('/TransactionHistory');
  };


  const handleProfileClick = () => {
    navigate('/PersonalInfo');  // Navigate to PersonalInfo page
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
              Αναζήτηση
            </Button>
            <Button className="button mx-2" variant="primary">
              Ειδοποιήσεις
            </Button>
            <Button className="button mx-2" variant="primary">
              Συμφωνητικό
            </Button>
            <Button className="button mx-2" variant="primary">
              Πληρωμή
            </Button>
          </Nav>
          <Nav>
            <IconButton aria-label="account of current user" color="inherit" onClick={handleProfileClick}>
              <AccountCircleIcon />
            </IconButton>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>);
}
