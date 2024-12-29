import * as React from 'react';
import { useState } from 'react';
import NavBarNannies from '../../components/layout/NavbarNannies';
import HelpButton from '../../components/buttons/HelpButton';
import Footer from '../../components/layout/Footer'
import { Row,Col } from 'react-bootstrap';
import '../../styles/AgreementHistory.css'
import '../../styles/Message.css'
import TextField from "@mui/material/TextField"; 


export default function MessageParents(){
  const [show, setShow] = useState(false);

  const togglePopUp = () => setShow(!show);

  return (<div id="Message">
            <NavBarNannies className="nav-bar-nannies" />
            <HelpButton/>
            <Row>
                <Col>
                    <div className='this_text_message'>ΜΗΝΥΜΑΤΑ</div>
                    <button className='messageBox' onClick={togglePopUp}>
                    <p className='header-message'>Λήξη συνεργασίας</p>
                    <p className='text-message'>Από: Μαρία Μώμμου</p>
                    </button>
                    {show && (
                      <div className="popup-overlay">
                        <div className="popup">
                          <button className="close-btn" onClick={togglePopUp}>
                            &times;
                          </button>
                          <h2>Θα θελα συνάντηση</h2>
                          <p>Χαιρομαι που προσεχα το παιδι σας, ηταν ενα αγγελουδι. Σας ευχαριστω και γω παρα πολυ.
                                Μαρία Μώμμου
          <TextField fullWidth label="Απάντηση" type="text" className="nanny_rates_text" />                      
                                </p>
                        </div>
                      </div>
                    )}
                </Col>
                <Col>
                    <div className='this_text_message'>ΕΙΔΟΠΟΙΗΣΕΙΣ</div>
                    <div className='messageBox'>
                    <p className='header-message'>Η πληρωμή έγινε με επιτυχία</p>
                    <p className='text-message'>14/3/2018 με τον Αποστόλη Γραμματόπουλο</p>
                    </div>
                </Col>
            </Row>
            <Footer/>
          </div>
  );
}