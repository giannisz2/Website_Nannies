import { Container, Navbar, Nav, Button, Dropdown } from 'react-bootstrap';
import '../../styles/NavBarNannies.css';

import { useNavigate } from 'react-router-dom';



  

export default function NavBarNannies() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');  //home page from logo
  };


  const goToTransactionHistory = () => {
    navigate('/TransactionHistory');
  };


  return (
    <Navbar className="nav" bg="light" expand="lg" variant="light">
      <Container fluid>
        <Navbar.Brand className="ms-4 fw-bolder fs-3" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          Nannies GR
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-6">
            <Button className="button" variant="primary">
              Αξιολογήσεις
            </Button>

            {/* Dropdown for Ιστορικό */}
            <Dropdown className="d-inline">
              <Dropdown.Toggle variant="primary" className="button">
                Ιστορικό
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item id="dropDownItem" href="#/Πληρωμών">Πληρωμών</Dropdown.Item>
                <Dropdown.Item onClick={goToTransactionHistory}>Συμφωνητικών</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Button className="button" variant="primary">
              Ειδοποιήσεις
            </Button>
            <Button className="button" variant="primary">
              Συνάντηση
            </Button>
            <Button className="button" variant="primary">
              Συμφωνητικό
            </Button>
            <Button className="button" variant="primary">
              Voucher
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

