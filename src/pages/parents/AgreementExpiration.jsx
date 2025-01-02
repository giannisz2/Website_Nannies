import React, { useState } from 'react';
import NavBarParents from '../../components/layout/NavBarParents';
import Footer from '../../components/layout/Footer';
import HelpButton from '../../components/buttons/HelpButton';
import { Row, Col } from 'react-bootstrap';
import { TextField, Alert } from '@mui/material';
import '../../styles/AgreementExpiration.css';

export default function AgreementExpiration() {
    const [isWorkingAtHome, setIsWorkingAtHome] = useState(false);
    const [isSureToTerminate, setIsSureToTerminate] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = () => {
        if (!isWorkingAtHome || !isSureToTerminate) {
            setShowAlert(true);
        } else {
            setShowAlert(false);
            console.log('Form submitted');
        }
    };

    return (
        <div>
            <NavBarParents />
            <p className='top-text'>Λήξη Συμφωνητικού</p>
            <HelpButton />


            <Row>
                <Col>
                    <p className='text'>Εγώ ο/η</p>
                </Col>
                <Col>
                    <TextField fullWidth className='text-field' placeholder={"ΠΕΤΡΟΣ ΑΝΑΣΤΑΣΙΟΥ  (ΘΑ ΣΥΜΠΛΗΡΩΝΕΤΑΙ ΑΥΤΌΜΑΤΑ ΑΠΟ ΤΟ ΣΥΣΤΗΜΑ)"} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className='text'>Που μένω στην διεύθυνση</p>
                </Col>
                <Col>
                    <TextField fullWidth className='text-field' placeholder={"ΠΑΠΑΓΡΗΓΟΡΙΟΥ 7, 11855, ΑΘΗΝΑ  (ΘΑ ΣΥΜΠΛΗΡΩΝΕΤΑΙ ΑΥΤΌΜΑΤΑ ΑΠΟ ΤΟ ΣΥΣΤΗΜΑ )"} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className='text'>με κινητό τηλέφωνο</p>
                </Col>
                <Col>
                    <TextField fullWidth className='text-field' placeholder={"+44 592 410 845 (ΘΑ ΣΥΜΠΛΗΡΩΝΕΤΑΙ ΑΥΤΌΜΑΤΑ ΑΠΟ ΤΟ ΣΥΣΤΗΜΑ )"} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className='text'>και email</p>
                </Col>
                <Col>
                    <TextField fullWidth className='text-field' placeholder={"panastasiou@gmail.com (ΘΑ ΣΥΜΠΛΗΡΩΝΕΤΑΙ ΑΥΤΌΜΑΤΑ ΑΠΟ ΤΟ ΣΥΣΤΗΜΑ )"} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className='text'>Θα ήθελα να ΔΙΑΚΟΨΩ την συνεργασία μου με τον/την</p>
                </Col>
                <Col>
                    <TextField fullWidth className='text-field' placeholder={"ΜΑΡΙΑ ΜΩΜΜΟΥ  (ΘΑ ΣΥΜΠΛΗΡΩΝΕΤΑΙ ΑΥΤΌΜΑΤΑ ΑΠΟ ΤΟ ΣΥΣΤΗΜΑ )"} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className='text'>που διαμένει στην</p>
                </Col>
                <Col>
                    <TextField fullWidth className='text-field' placeholder={"ΚΥΨΕΛΗ  (ΘΑ ΣΥΜΠΛΗΡΩΝΕΤΑΙ ΑΥΤΌΜΑΤΑ ΑΠΟ ΤΟ ΣΥΣΤΗΜΑ )"} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className='text'>και εργάζεται στην κατοικία μου</p>
                </Col>
                <Col>
                    <input type="checkbox" className='checkbox' onChange={(e) => setIsWorkingAtHome(e.target.checked)} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className='text'>με</p>
                </Col>
                <Col>
                    <TextField fullWidth className='text-field' placeholder={"ΠΛΗΡΕΣ ΩΡΑΡΙΟ"} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className='text'>ΕΙΜΑΙ ΣΙΓΟΥΡΟΣ ΟΤΙ ΘΕΛΩ ΝΑ ΔΙΑΚΟΨΩ ΤΗΝ ΔΙΑΔΙΚΑΣΙΑ</p>
                </Col>
                <Col>
                    <input type="checkbox" className='checkbox' onChange={(e) => setIsSureToTerminate(e.target.checked)} />
                </Col>
            </Row>
             {showAlert && (
                <Alert severity="error" className="alert" onClose={() => setShowAlert(false)}>
                    Παρακαλώ ελέγξτε αν εργάζεται στην κατοικία σας και αν είστε σίγουροι ότι θέλετε να διακόψετε την διαδικασία.
                </Alert>
            )}
            <button type="button" className="button-apply" onClick={handleSubmit}>
                Υποβολή
            </button>
            <p className='side-button'>ΘΑ ΗΘΕΛΑ ΝΑ ΑΝΑΝΕΩΣΩ ΤΟ ΣΥΜΒΟΛΑΙΟ</p>
            <Footer />
        </div>
    );
}
