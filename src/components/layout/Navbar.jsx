import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';  // Προσθήκη της useNavigate
import '../../styles/NavBar.css';

function NavBar() {
  const navigate = useNavigate();  // Δημιουργία της συνάρτησης navigate

  const handleLogoClick = () => {
    navigate('/');  //home page from logo
  };

  
  const handleBecomeNanny = () => {
    navigate('/SelectionCriteria');  // Διαδρομή προς τη σελίδα SelectionCriteria
  };

  return (
    <Navbar id="nav" expand="lg" variant="light">
      <Container fluid>
      <Navbar.Brand className="ms-4 fw-bolder fs-3" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          Nannies GR
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Button variant="primary" id="become-nanny" className="me-2 rounded-pill" onClick={handleBecomeNanny}>
              <FontAwesomeIcon icon={faUserPlus} className="me-1" /> Γίνε Νταντά
            </Button>
            <Button variant="primary" id="sign-up" className="me-2 rounded-pill">
              <FontAwesomeIcon icon={faUserPlus} className="me-1" /> Sign Up
            </Button>
            <Button variant="primary" id="sign-in" className="rounded-pill">
              <FontAwesomeIcon icon={faSignInAlt} className="me-1" /> Sign In
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
