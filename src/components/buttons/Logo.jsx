import {Navbar} from 'react-bootstrap';
import '../../styles/NavBarNannies.css';
import { useNavigate } from 'react-router-dom'; 


export default function NavBarNannies() {

  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate('/');  //home page from logo
  };

  return (
    <Navbar className="nav" bg="light" expand="lg" variant="light">
        <Navbar.Brand className="ms-4 fw-bolder fs-3" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          Nannies GR
        </Navbar.Brand>   
    </Navbar>
  );
}

