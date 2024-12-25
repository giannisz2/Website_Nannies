import React, { useState } from 'react';
import '../../styles/Footer.css';
import { Container, Row, Col, Nav } from 'react-bootstrap';

export default function Footer() {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => {
    setShowChat((prevState) => !prevState);
  };

  return (
    <>
      <footer className="footer-c py-5 bg-light">
        <Container fluid>
          <Row className="justify-content-around">
            <Col md={3}>
              <h6 className="fw-bold">Μάθε περισσότερα</h6>
                <Nav.Link
                    href="https://ntantades.gov.gr/pdf/%CE%91%CE%9D%CE%91%CE%9A%CE%9F%CE%99%CE%9D%CE%A9%CE%A3%CE%97.pdf"
                    className="dark"
                    target="_blank"
                >
                    Τι είναι το ntantades.gov;
                </Nav.Link>
                <Nav.Link href="https://ntantades.gov.gr/pdf/%CE%91%CE%9D%CE%91%CE%9A%CE%9F%CE%99%CE%9D%CE%A9%CE%A3%CE%97.pdf" className="dark" target="_blank">Τι είναι το ntantades.gov;</Nav.Link>
                <Nav.Link href="https://ntantades.gov.gr/pdf/FAQ_%CE%A9%CE%A6%CE%95%CE%9B%CE%9F%CE%A5%CE%9C%CE%95%CE%9D%CE%9F%CE%99_new_17.1.2024.pdf " className="dark" target="_blank">Είσαι δικαιούχος;</Nav.Link>
                <Nav.Link href="/SelectionCriteria" className="dark" target="_blank">Γίνε νταντά</Nav.Link>
                <Nav.Link href="https://ntantades.gov.gr/pdf/%CE%9F%CE%B4%CE%B7%CE%B3%CE%AF%CE%B5%CF%82%20%CE%B3%CE%B9%CE%B1%20%CE%B5%CF%81%CE%B3%CF%8C%CF%83%CE%B7%CE%BC%CE%BF.pdf" className="dark" target="_blank">Έκδοση-Εξαργύρωση Ενσήμων</Nav.Link>
                <Nav.Link href="https://ntantades.gov.gr/pdf/%CE%9F%CE%94%CE%97%CE%93%CE%99%CE%95%CE%A3%20%CE%93%CE%99%CE%91%20%CE%A4%CE%9F%CE%9D%20%CE%A5%CE%A0%CE%9F%CE%9B%CE%9F%CE%93%CE%99%CE%A3%CE%9C%CE%9F%20%CE%A4%CE%9F%CE%A5%20%CE%95%CE%A1%CE%93%CE%9F%CE%A3%CE%97%CE%9C%CE%9F%CE%A5.pdf" className="dark" target="_blank">Υπολογισμός ενσήμων</Nav.Link>
            </Col>

            <Col md={3}>
              <h6 className="fw-bold">Μπορούμε να βοηθήσουμε;</h6>
                <Nav.Link href="https://ntantades.gov.gr/pdf/FAQ_%CE%B5%CF%80%CE%B9%CE%BA%CE%B1%CE%B9%CF%81%CE%BF%CF%80%CE%BF%CE%B9%CE%B7%CE%BC%CE%AD%CE%BD%CE%BF_%CE%B5%CF%80%CE%B9%CE%BC%CE%B5%CE%BB%CE%B7%CF%84%CE%AD%CF%82.17.1.2024.pdf" className="dark" target="_blank">Συχνές ερωτήσεις από νταντάδες</Nav.Link>
                <Nav.Link href="https://ntantades.gov.gr/pdf/FAQ_%CE%A9%CE%A6%CE%95%CE%9B%CE%9F%CE%A5%CE%9C%CE%95%CE%9D%CE%9F%CE%99_new_17.1.2024.pdf" className="dark" target="_blank">Συχνές ερωτήσεις από γονείς</Nav.Link>
                <Nav.Link href="https://ntantades.gov.gr/pdf/odigies_gia_mitroo_epimelitwn.pdf" className="dark" target="_blank">Οδηγίες εγγραφής</Nav.Link>
                <Nav.Link href="#" className="dark" target="_blank">Επικοινωνία</Nav.Link>
                <Nav.Link
                    href="#"
                    className="dark"
                    onClick={(e) => {
                    e.preventDefault();
                    toggleChat();
                    }}
                >
                    Επικοινωνία
                </Nav.Link>
            </Col>

            <Col md={3}>
              <h6 className="fw-bold">Χρήσιμα συνεχώς ανανεώσιμες πληροφορίες</h6>
                <Nav.Link href="https://ntantades.gov.gr/pdf/%CE%9A%CE%B1%CE%B9%20%CE%BF%20%CE%94%CE%AE%CE%BC%CE%BF%CF%82%20%CE%91%CE%B8%CE%B7%CE%BD%CE%B1%CE%AF%CF%89%CE%BD%20%CF%83%CF%84%CE%BF%20%CF%80%CF%81%CF%8C%CE%B3%CF%81%CE%B1%CE%BC%CE%BC%CE%B1%20%C2%AB%CE%9D%CF%84%CE%B1%CE%BD%CF%84%CE%AC%CE%B4%CE%B5%CF%82%20%CF%84%CE%B7%CF%82%20%CE%93%CE%B5%CE%B9%CF%84%CE%BF%CE%BD%CE%B9%CE%AC%CF%82%C2%BB.pdf" className="dark" target="_blank">Οι δήμοι που ανήκουν πλέον στο πρόγραμμα</Nav.Link>
                <Nav.Link href="https://ntantades.gov.gr/pdf/%CE%9D%CE%A4%CE%91%CE%9D%CE%A4%CE%91%CE%94%CE%95%CE%A3-%CE%91%CE%A5%CE%9E%CE%97%CE%A3%CE%97%20VOUCHER.pdf" className="dark" target="_blank">Αξία voucher</Nav.Link>
                <Nav.Link href="https://ntantades.gov.gr/pdf/%CE%91%CE%9D%CE%91%CE%9A%CE%9F%CE%99%CE%9D%CE%A9%CE%A3%CE%97.pdf" className="dark" target="_blank">Προγράμματα διαδικτυακής εκπαίδευσης για καταρτισμό</Nav.Link>
                <Nav.Link href="/SearchNannies" className="dark" target="_blank">Πόσες νταντάδες υπάρχουν διαθέσιμες αυτή τη στιγμή</Nav.Link>
            </Col>
          </Row>
        </Container>
      </footer>

      {/* Chat Box */}
      {showChat && (
        <div className="chat-container">
          <div className="chat-header">
            <span>Υποστήριξη</span>
            <button
              className="close-chat"
              onClick={toggleChat}
            >
              ×
            </button>
          </div>
          <div className="chat-messages">
            <div className="bot-message">
              Σας ευχαριστούμε για την επικοινωνία! Θα απαντήσουμε σύντομα.
            </div>
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Γράψτε το μήνυμά σας..."
            />
            <button
              onClick={() => alert('Μήνυμα αποστέλλεται!')}
            >
              Αποστολή
            </button>
          </div>
        </div>
      )}
    </>
  );
}





                        


                       