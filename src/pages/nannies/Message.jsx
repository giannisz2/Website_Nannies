import * as React from 'react';
import { useState } from 'react';
import NavBarNannies from '../../components/layout/NavbarNannies';
import HelpButton from '../../components/buttons/HelpButton';
import Footer from '../../components/layout/Footer'
import { Row,Col } from 'react-bootstrap';
import '../../styles/AgreementHistory.css'
import '../../styles/Message.css'
import TextField from "@mui/material/TextField"; 


export default function Message(){
  const [show, setShow] = useState(false);

  const togglePopUp = () => setShow(!show);

  return (<div id="Message">
            <NavBarNannies className="nav-bar-nannies" />
            <HelpButton/>
            <Row>
                <Col>
                    <div className='this_text_message'>ΜΗΝΥΜΑΤΑ</div>
                    <button className='messageBox' onClick={togglePopUp}>
                    <p className='header-message'>Σας ευχαριστώ για τη συνεργασία</p>
                    <p className='text-message'>Από: Κυριακή Πολυδώρου</p>
                    </button>
                    {show && (
                      <div className="popup-overlay">
                        <div className="popup">
                          <button className="close-btn" onClick={togglePopUp}>
                            &times; {/* Αυτό είναι το "X" */}
                          </button>
                          <h2>Σας ευχαριστώ για τη συνεργασία</h2>
                          <p>Η συνεργασία μας μαζί σας ήταν άριστη και σας ευχαριστώ για όλον τον
                                ποιοτικό χρόνο που περάσατε με το παιδί μου! Αν χρειαστείτε συστατική 
                                επιστολή είμαι στη βοήθειά σας! Καλή συνέχεια!
                                Κυριακή Πολυδώρου
          <TextField fullWidth label="Απάντηση" type="text" className="nanny_rates_text" />                      
                                </p>
                        </div>
                      </div>
                    )}
                    <div className='messageBox'>
                    <p className='header-message'>Χρειάζομαι βοήθεια</p>
                    <p className='text-message'>Από: Κυριακή Παναγιώτου</p>
                    </div>
                </Col>
                <Col>
                    <div className='this_text_message'>ΕΙΔΟΠΟΙΗΣΕΙΣ</div>
                    <div className='messageBox'>
                    <p className='header-message'>Θα ήθελα συνάντηση...</p>
                    <p className='text-message'>14/3/2018 με τον Αποστόλη Γραμματόπουλο</p>
                    </div>
                </Col>
            </Row>
            <Footer/>
          </div>
  );
}