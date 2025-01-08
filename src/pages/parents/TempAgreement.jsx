import React, { useState, useEffect } from 'react';
import NavBarParents from '../../components/layout/NavBarParents';
import Footer from '../../components/layout/Footer';
import HelpButton from '../../components/buttons/HelpButton';
import { Row, Col } from 'react-bootstrap';
import { TextField, Alert, Snackbar } from '@mui/material';
import { Box, IconButton } from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '../../providers/firebaseConfig'; 
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';

export default function TempAgreement() {
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [parentData, setParentData] = useState(() => {
        const savedData = localStorage.getItem('tempAgreementData');
        return savedData ? JSON.parse(savedData) : {
            parentName: '',
            parentAddress: '',
            parentPhone: '',
            email: '',
            nannyName: '',
            nannyAddress: '',
            workHours: '',
            workHoursFrom: '',
            nannyEmploymentTime: ''
        };
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [formErrors, setFormErrors] = useState({ email: '' });
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem('userId'); 
                if (userId) {
                    const parentRef = doc(db, 'Parent', userId);
                    const parentSnapshot = await getDoc(parentRef);
                    if (parentSnapshot.exists()) {
                        const parentInfo = parentSnapshot.data();
                        setParentData((prevData) => ({
                            ...prevData,
                            parentName: `${parentInfo.name} ${parentInfo.surname}`,
                            parentAddress: parentInfo.residence || 'Διεύθυνση μη διαθέσιμη',
                            parentPhone: parentInfo.phone || 'Τηλέφωνο μη διαθέσιμο',
                            email: parentInfo.email || '',
                            nannyName: location.state?.nannyName || '',
                            nannyAddress: location.state?.nannyAddress || '',
                            nannyEmploymentTime: location.state?.nannyEmploymentTime === "Μερική" ? "ΜΕΡΙΚΗ ΑΠΑΣΧΟΛΗΣΗ" : "ΠΛΗΡΗΣ ΑΠΑΣΧΟΛΗΣΗ"
                        }));
                    } else {
                        console.error('Δεν βρέθηκαν δεδομένα για τον χρήστη.');
                    }
                } else {
                    console.error('Δεν βρέθηκε αναγνωριστικό χρήστη.');
                }

                const loadedData = localStorage.getItem('tempAgreementData');
                if (loadedData) {
                    const data = JSON.parse(loadedData);
                    setParentData(data);
                    if (data.startTime) {
                        setStartTime(dayjs(data.startTime));
                    }
                    if (data.endTime) {
                        setEndTime(dayjs(data.endTime));
                    }
                }
            } catch (error) {
                console.error('Σφάλμα κατά την ανάκτηση δεδομένων:', error);
            }
        };

        fetchData();
    }, [location.state]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setParentData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (name === 'email') {
            if (!value) {
                setFormErrors(prev => ({
                    ...prev,
                    email: 'Email is required'
                }));
            } else {
                setFormErrors(prev => ({
                    ...prev,
                    email: ''
                }));
            }
        }
    };

    const handleTempSave = () => {
        const dataToSave = {
            ...parentData,
            startTime: startTime ? startTime.toISOString() : '', 
            endTime: endTime ? endTime.toISOString() : '' 
        };
        localStorage.setItem('tempAgreementData', JSON.stringify(dataToSave));
        setSnackbarMessage('Τα δεδομένα αποθηκεύτηκαν προσωρινά.');
        setSnackbarSeverity('info');
        setSnackbarOpen(true);
    };

    const handleSubmit = async () => {
        try {
            if (!startTime || !endTime) {
                setSnackbarMessage('Παρακαλώ εισάγετε ώρες έναρξης και λήξης.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
                return;
            }

            if (!parentData.email) {
                setSnackbarMessage('Το email είναι υποχρεωτικό.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
                return;
            }

            const startHours = startTime.hour();
            const startMinutes = startTime.minute();
            const endHours = endTime.hour();
            const endMinutes = endTime.minute();

            const totalMinutes = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
            const maxMinutes = parentData.nannyEmploymentTime === "ΜΕΡΙΚΗ ΑΠΑΣΧΟΛΗΣΗ" ? 360 : 480;

            if (totalMinutes > maxMinutes) {
                setSnackbarMessage(`Δεν μπορείτε να δηλώσετε πάνω από ${maxMinutes / 60} ώρες εργασίας.`);
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
                return;
            }

            const formattedData = {
                ...parentData,
                workHoursFrom: startTime.format('HH:mm'),
                workHoursTo: endTime.format('HH:mm'),
            };

            await addDoc(collection(db, 'interest'), formattedData);
            localStorage.removeItem('tempAgreementData');
            navigate('/PreviewAgreement', { state: { formData: formattedData } });
        } catch (error) {
            console.error('Σφάλμα κατά την καταχώρηση δεδομένων:', error);
            setSnackbarMessage('Σφάλμα κατά την καταχώρηση της αίτησης.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleCloseWithoutSaving = () => {
        navigate('/ParentHomepage');
    };

    return (
        <div>
            <NavBarParents />
            <HelpButton />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ padding: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f9f9f9' }}>
                <Box sx={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
                <p className='top-text'>Αίτηση Ενδιαφέροντος Συνεργασίας</p>
                        <IconButton sx={{ position: 'absolute', top: '10px', right: '10px' }} onClick={handleCloseWithoutSaving}>
                            <CloseIcon />
                        </IconButton>
                        <Row>
                            <Col><p className="text">Εγώ ο/η</p></Col>
                            <Col>
                                <TextField fullWidth className="text-field" value={parentData.parentName} InputProps={{ readOnly: true }} />
                            </Col>
                        </Row>
                        <Row>
                            <Col><p className="text">Που μένω στην διεύθυνση</p></Col>
                            <Col>
                                <TextField fullWidth className="text-field" value={parentData.parentAddress} InputProps={{ readOnly: true }} />
                            </Col>
                        </Row>
                        <Row>
                            <Col><p className="text">με κινητό τηλέφωνο</p></Col>
                            <Col>
                                <TextField fullWidth className="text-field" value={parentData.parentPhone} InputProps={{ readOnly: true }} />
                            </Col>
                        </Row>
                        <Row>
                            <Col><p className="text">και email</p></Col>
                            <Col>
                                <TextField fullWidth className="text-field" name="email" value={parentData.email} onChange={handleInputChange} />
                            </Col>
                        </Row>
                        <Row>
                            <Col><p className="text">Θα ήθελα να ΣΥΝΕΡΓΑΣΤΩ με τον/την</p></Col>
                            <Col>
                                <TextField fullWidth className="text-field" value={parentData.nannyName} InputProps={{ readOnly: true }} />
                            </Col>
                        </Row>
                        <Row>
                            <Col><p className="text">που διαμένει στην</p></Col>
                            <Col>
                                <TextField fullWidth className="text-field" value={parentData.nannyAddress} InputProps={{ readOnly: true }} />
                            </Col>
                        </Row>
                        <Row>
                            <Col><p className="text">για</p></Col>
                            <Col>
                                <TextField fullWidth className="text-field" value={parentData.nannyEmploymentTime} InputProps={{ readOnly: true }} />
                            </Col>
                        </Row>
                        <Row>
                            <Col><p className="text">Ώρα Έναρξης:</p></Col>
                            <Col>
                                <TimePicker value={startTime} onChange={setStartTime} renderInput={(params) => <TextField fullWidth {...params} />} />
                            </Col>
                        </Row>
                        <Row>
                            <Col><p className="text">Ώρα Λήξης:</p></Col>
                            <Col>
                                <TimePicker value={endTime} onChange={setEndTime} renderInput={(params) => <TextField fullWidth {...params} />} />
                            </Col>
                        </Row>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                        <div className='buttonsTemp'>
                            <button type="submit" className="button-temp-5" onClick={handleTempSave}>Προσωρινή αποθήκευση</button>
                            <button type="submit" className="button-submit-5" onClick={handleSubmit}>Προεπισκόπηση</button>
                        </div>
                        </Box>
                    </Box>
                </Box>
            </LocalizationProvider>
            <Footer />
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}
