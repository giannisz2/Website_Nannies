import {Navbar} from 'react-bootstrap';
import '../../styles/NavBarNannies.css';

export default function NavBarNannies() {
  return (
    <Navbar className="nav" bg="light" expand="lg" variant="light">
        <Navbar.Brand href="#" className="ms-4 fw-bolder fs-3">
          Nannies GR
        </Navbar.Brand>    
    </Navbar>
  );
}

