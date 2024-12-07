import '../../styles/Footer.css';
import { Container, Row, Col, Nav } from 'react-bootstrap';

export default function Footer() {
    return (
        <footer className="footer-c py-5 bg-light">
            <Container fluid>
                <Row className="justify-content-around">
                    {/* First Column */}
                    <Col md={3}>
                        <h6 className="fw-bold">Μάθε περισσότερα</h6>
                        <Nav.Link href="#" className="dark">Τι είναι το ntantades.gov;</Nav.Link>
                        <Nav.Link href="#" className="dark">Είσαι δικαιούχος;</Nav.Link>
                        <Nav.Link href="#" className="dark">Γίνε νταντά</Nav.Link>
                        <Nav.Link href="#" className="dark">Έκδοση-Εξαργύρωση Ενσήμων</Nav.Link>
                        <Nav.Link href="#" className="dark">Υπολογισμός ενσήμων</Nav.Link>
                    </Col>

                    {/* Second Column */}
                    <Col md={3}>
                        <h6 className="fw-bold">Μπορούμε να βοηθήσουμε;</h6>
                        <Nav.Link href="#" className="dark">Συχνές ερωτήσεις από νταντάδες</Nav.Link>
                        <Nav.Link href="#" className="dark">Συχνές ερωτήσεις από γονείς</Nav.Link>
                        <Nav.Link href="#" className="dark">Οδηγίες εγγραφής</Nav.Link>
                        <Nav.Link href="#" className="dark">Επικοινωνία</Nav.Link>
                    </Col>

                    {/* Third Column */}
                    <Col md={3}>
                        <h6 className="fw-bold">Χρήσιμα συνεχώς ανανεώσιμες πληροφορίες</h6>
                        <Nav.Link href="#" className="dark">Οι δήμοι που ανήκουν πλέον στο πρόγραμμα</Nav.Link>
                        <Nav.Link href="#" className="dark">Αξία voucher</Nav.Link>
                        <Nav.Link href="#" className="dark">Προγράμματα διαδικτυακής εκπαίδευσης για καταρτισμό</Nav.Link>
                        <Nav.Link href="#" className="dark">Πόσες νταντάδες υπάρχουν διαθέσιμες αυτή τη στιγμή</Nav.Link>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}
