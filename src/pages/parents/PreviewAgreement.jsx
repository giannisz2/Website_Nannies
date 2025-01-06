import React from 'react';
import NavBarParents from '../../components/layout/NavBarParents';
import Footer from '../../components/layout/Footer';
import HelpButton from '../../components/buttons/HelpButton';
import { Row, Col } from 'react-bootstrap';
import { TextField } from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/TempAgreement.css';
import { Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function PreviewAgreement() {
    const location = useLocation();
    const formData = location.state?.formData || JSON.parse(localStorage.getItem('previewData'));
    const [parentData, setParentData] = useState(formData);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
        
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const navigate = useNavigate();

    const handleSubmit = () => {
        setSnackbarMessage('Η αίτηση καταχωρήθηκε επιτυχώς.');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        
        setTimeout(() => navigate("/ParentHomepage"), 2000);
    };

    return (
        <div>
            <NavBarParents />
            <p className='top-text'>Επισκόπηση Αίτησης Ενδιαφέροντος</p>
            <HelpButton />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Row>
                    <Col>
                        <p className="text">Εγώ ο/η</p>
                    </Col>
                    <Col>
                        <TextField
                            fullWidth
                            value={parentData.parentName}
                            className="text-field"
                            InputProps={{ readOnly: true }}
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
                        value={parentData.parentAddress}
                        className="text-field"
                        InputProps={{ readOnly: true }}
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
                        value={parentData.parentPhone}
                        className="text-field"
                        InputProps={{ readOnly: true }}
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
                        value={parentData.email}
                        className="text-field"
                        InputProps={{ readOnly: true }}
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
                        value={parentData.nannyName}
                        className="text-field"
                        InputProps={{ readOnly: true }}
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
                        value={parentData.nannyAddress}
                        className="text-field"
                        InputProps={{ readOnly: true }}
                    />
                    </Col>
                </Row>
                
                <Row>
                    <Col>
                        <p className="text">με</p>
                    </Col>
                    <Col>
                    <TextField
                        fullWidth
                        value={parentData.nannyEmploymentTime}
                        className="text-field"
                        InputProps={{ readOnly: true }}
                    />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="text">στις ώρες</p>
                    </Col>
                    <Col>
                        <TextField
                            fullWidth
                            value={parentData.workHoursFrom}
                            className="text-field"
                            InputProps={{ readOnly: true }}
                        />
                        <TextField
                            fullWidth
                            value={parentData.workHoursTo}
                            className="text-field"
                            InputProps={{ readOnly: true }}
                        />
                    </Col>
                </Row>
            </LocalizationProvider>
            <button type="button" className="button-apply" onClick={handleSubmit}>
                Υποβολή
            </button>
            <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                            <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>{snackbarMessage}</Alert>
                        </Snackbar>
            <Footer />
        </div>
    );
}
