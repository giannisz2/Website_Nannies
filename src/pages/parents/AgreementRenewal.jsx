import React, { useState } from 'react';
import NavBarParents from '../../components/layout/NavBarParents';
import Footer from '../../components/layout/Footer';
import HelpButton from '../../components/buttons/HelpButton';
import { Row, Col } from 'react-bootstrap';
import { TextField, Alert } from '@mui/material'; // Importing MUI's Alert component
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import '../../styles/AgreementRenewal.css';

export default function AgreementRenewal() {
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [isWorkingAtHome, setIsWorkingAtHome] = useState(false); // State for checkbox
    const [showAlert, setShowAlert] = useState(false); // Alert visibility state

    const handleSubmit = () => {
        // Check if the start time, end time, or checkbox is missing
        if (!startTime || !endTime || !isWorkingAtHome) {
            setShowAlert(true); // Show alert if any condition is not met
        } else {
            setShowAlert(false); // Hide alert if all conditions are met
            console.log('Form submitted with times:', startTime, endTime);
            // Additional submit logic can be added here
        }
    };

    return (
        <div>
            <NavBarParents />
            <p className='top-text'>Ανανέωση Συμφωνητικού</p>
            <HelpButton />


            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Row>
                    <Col>
                        <p className="text">Εγώ ο/η</p>
                    </Col>
                    <Col>
                        <TextField
                            fullWidth
                            className="text-field"
                            placeholder="ΠΕΤΡΟΣ ΑΝΑΣΤΑΣΙΟΥ  (ΘΑ ΣΥΜΠΛΗΡΩΝΕΤΑΙ ΑΥΤΌΜΑΤΑ ΑΠΟ ΤΟ ΣΥΣΤΗΜΑ)"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="text">Που μένω στην διεύθυνση</p>
                    </Col>
                    <Col>
                        <TextField
                            fullWidth
                            className="text-field"
                            placeholder="ΠΑΠΑΓΡΗΓΟΡΙΟΥ 7, 11855, ΑΘΗΝΑ  (ΘΑ ΣΥΜΠΛΗΡΩΝΕΤΑΙ ΑΥΤΌΜΑΤΑ ΑΠΟ ΤΟ ΣΥΣΤΗΜΑ)"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="text">με κινητό τηλέφωνο</p>
                    </Col>
                    <Col>
                        <TextField
                            fullWidth
                            className="text-field"
                            placeholder="+44 592 410 845 (ΘΑ ΣΥΜΠΛΗΡΩΝΕΤΑΙ ΑΥΤΌΜΑΤΑ ΑΠΟ ΤΟ ΣΥΣΤΗΜΑ)"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="text">και email</p>
                    </Col>
                    <Col>
                        <TextField
                            fullWidth
                            className="text-field"
                            placeholder="panastasiou@gmail.com (ΘΑ ΣΥΜΠΛΗΡΩΝΕΤΑΙ ΑΥΤΌΜΑΤΑ ΑΠΟ ΤΟ ΣΥΣΤΗΜΑ)"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="text">Θα ήθελα να ΑΝΑΝΕΩΣΩ το συμφωνητικό μου με τον/την</p>
                    </Col>
                    <Col>
                        <TextField
                            fullWidth
                            className="text-field"
                            placeholder="ΜΑΡΙΑ ΜΩΜΜΟΥ  (ΘΑ ΣΥΜΠΛΗΡΩΝΕΤΑΙ ΑΥΤΌΜΑΤΑ ΑΠΟ ΤΟ ΣΥΣΤΗΜΑ)"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="text">που διαμένει στην</p>
                    </Col>
                    <Col>
                        <TextField
                            fullWidth
                            className="text-field"
                            placeholder="ΚΥΨΕΛΗ  (ΘΑ ΣΥΜΠΛΗΡΩΝΕΤΑΙ ΑΥΤΌΜΑΤΑ ΑΠΟ ΤΟ ΣΥΣΤΗΜΑ)"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="text">και εργάζεται στην κατοικία μου</p>
                    </Col>
                    <Col>
                        <input
                            type="checkbox"
                            className="checkbox"
                            aria-label="Εργάζεται στην κατοικία μου"
                            onChange={(e) => setIsWorkingAtHome(e.target.checked)} // Update checkbox state
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="text">με</p>
                    </Col>
                    <Col>
                        <TextField fullWidth className="text-field" placeholder="ΠΛΗΡΕΣ ΩΡΑΡΙΟ" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="text">στις ώρες</p>
                    </Col>
                    <Col>
                        <TimePicker
                            label="Ώρα Έναρξης"
                            value={startTime}
                            onChange={(newValue) => setStartTime(newValue)} // Update start time
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <TimePicker
                            label="Ώρα Λήξης"
                            value={endTime}
                            onChange={(newValue) => setEndTime(newValue)} // Update end time
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Col>
                </Row>
            </LocalizationProvider>
            {showAlert && (
                <Alert severity="error" className="alert" onClose={() => setShowAlert(false)}>
                    Παρακαλώ συμπληρώστε την Ώρα Έναρξης, Ώρα Λήξης και κάντε check το box.
                </Alert>
            )}
            <button type="button" className="button-apply" onClick={handleSubmit}>
                Υποβολή
            </button>
            <Footer />
        </div>
    );
}
