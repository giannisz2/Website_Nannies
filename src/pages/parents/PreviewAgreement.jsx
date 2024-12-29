import React from 'react';
import NavBarParents from '../../components/layout/NavBarParents';
import Footer from '../../components/layout/Footer';
import HelpButton from '../../components/buttons/HelpButton';
import { Row, Col } from 'react-bootstrap';
import { TextField } from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';

import '../../styles/TempAgreement.css';

export default function PreviewAgreement() {
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    const handleSubmit = () => {
        console.log('Form submitted with times:', startTime, endTime);
    };

    return (
        <div>
            <NavBarParents />
            <p className='top-text'>Επισκόπηση Συμφωνητικού</p>
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
                        <p className="text">Θα ήθελα να ΣΥΝΕΡΓΑΣΤΩ με τον/την </p>
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
                        <input type="checkbox" className="checkbox" aria-label="Εργάζεται στην κατοικία μου" />
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
                            onChange={(newValue) => setStartTime(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <TimePicker
                            label="Ώρα Λήξης"
                            value={endTime}
                            onChange={(newValue) => setEndTime(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Col>
                </Row>
            </LocalizationProvider>
            <button type="button" className="button-apply" onClick={handleSubmit}>
                Υποβολή
            </button>
            <Footer />
        </div>
    );
}
