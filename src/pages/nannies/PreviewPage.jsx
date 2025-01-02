import React, { useState } from 'react';
import Logo from '../../components/buttons/Logo.jsx';
import Footer from '../../components/layout/Footer.jsx';
import HelpButton from '../../components/buttons/HelpButton.jsx';
import { Row, Col } from 'react-bootstrap';
import { TextField } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import '../../styles/PersonalInfoDone.css';
import { useFormContext } from '../../context/FormContext.jsx';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import "../../styles/PreviewPage.css"
import dayjs from 'dayjs';


export default function PreviewPage() {
    const { formData } = useFormContext();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const navigate = useNavigate();

    const handleFinalSubmit = () => {
        setSnackbarOpen(true);
        localStorage.removeItem('formData');
       

        setTimeout(() => {
            navigate('/NannyHomepage'); 
        }, 2000);
    };


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="profile-edit-nannies d-flex flex-column min-vh-100">
            <HelpButton />
            <Logo />
            <h2 className="text-center my-4">Προεπισκόπηση Προφίλ</h2>
            <div className="content flex-grow-1 d-flex align-items-center justify-content-center">
                <Row className="align-items-start justify-content-center g-5 m-0 w-100">
                    <Col
                        md={6}
                        xs={12}
                        className="d-flex flex-column align-items-center justify-content-center text-center"
                    >
                        <TextField
                            fullWidth
                            label="Όνομα"
                            type="text"
                            value={formData.name || ''}
                            InputProps={{ readOnly: true }}
                            className="my-3"
                        />
                        <TextField
                            fullWidth
                            label="Φύλο"
                            type="text"
                            value={formData.gender || ''}
                            InputProps={{ readOnly: true }}
                            className="my-3"
                        />
                        <TextField
                            fullWidth
                            label="Εκπαίδευση"
                            type="text"
                            value={formData.educationLevel || ''}
                            InputProps={{ readOnly: true }}
                            className="my-3"
                        />
                        <TextField
                            fullWidth
                            label="Χρόνος Απασχόλησης"
                            type="text"
                            value={formData.employmentTime || ''}
                            InputProps={{ readOnly: true }}
                            className="my-3"
                        />
                        <TextField
                            fullWidth
                            label="Συστατικές Επιστολές"
                            type="text"
                            value={formData.recommendationLetters || 'Δεν υπάρχουν'}
                            InputProps={{ readOnly: true }}
                            className="my-3"
                        />
                        <TextField
                            fullWidth
                            label="Έτη Προϋπηρεσίας"
                            type="text"
                            value={formData.experienceYears || ''}
                            InputProps={{ readOnly: true }}
                            className="my-3"
                        />
                        <TextField
                            fullWidth
                            label="Μέχρι Πόσα Παιδιά"
                            type="text"
                            value={formData.maxChildren || ''}
                            InputProps={{ readOnly: true }}
                            className="my-3"
                        />
                        
                        <TextField
                            fullWidth
                            label="Εμπειρία"
                            type="text"
                            value={formData.experience || ''}
                            InputProps={{ readOnly: true }}
                            className="my-3"
                        />
                        <TextField
                            fullWidth
                            label="Λίγα Λόγια για Εσάς"
                            type="text"
                            value={formData.bio || 'Δεν έχουν καταχωρηθεί στοιχεία'}
                            InputProps={{ readOnly: true }}
                            multiline
                            rows={4}
                            className="my-3"
                        />
                    </Col>
                    <Col
                        md={6}
                        xs={12}
                        className="d-flex flex-column align-items-center justify-content-center text-center"
                    >
                        <TextField
                            fullWidth
                            label="Επώνυμο"
                            type="text"
                            value={formData.surname || ''}
                            InputProps={{ readOnly: true }}
                            className="my-3"
                        />
                        <TextField
                            fullWidth
                            label="Ημερομηνία Γέννησης"
                            type="text"
                            value={formData.birthdate || ''}
                            InputProps={{ readOnly: true }}
                            className="my-3"
                        />
                        <DatePicker
                            label="Διαθεσιμότητα"
                            value={formData.availability ? dayjs(formData.availability) : null}
                            readOnly
                            disabled
                            sx={{ width: '100%' }}
                        />
                        
                        <TextField
                            fullWidth
                            label="Τοποθεσία"
                            type="text"
                            value={formData.location || ''}
                            InputProps={{ readOnly: true }}
                            className="my-3"
                        />
                        <TextField
                            fullWidth
                            label="Είστε Διαθέσιμος σε Σπίτι με Κατοικίδια"
                            type="text"
                            value={formData.pets || ''}
                            InputProps={{ readOnly: true }}
                            className="my-3"
                        />
                        <TextField
                            fullWidth
                            label="Είστε Καπνιστής"
                            type="text"
                            value={formData.smoker || ''}
                            InputProps={{ readOnly: true }}
                            className="my-3"
                        />
                        <TextField
                            fullWidth
                            label="Τηλέφωνο Επικοινωνίας"
                            type="text"
                            value={formData.phone || ''}
                            InputProps={{ readOnly: true }}
                            className="my-3"
                        />
                        <TextField
                            fullWidth
                            label="Πρόσβαση Κινητού"
                            type="text"
                            value={formData.phoneAccess || ''}
                            InputProps={{ readOnly: true }}
                            className="my-3"
                        />
                        <TimePicker
                                label="Ώρα Από"
                                value={formData.availableTimeFrom ? dayjs(formData.availableTimeFrom) : null}
                                readOnly
                                disabled
                                sx={{ width: '100%' }}
                            />
                            <TimePicker
                                label="Ώρα Μέχρι"
                                value={formData.availableTimeTo ? dayjs(formData.availableTimeTo) : null}
                                readOnly
                                disabled
                                sx={{ width: '100%', marginTop: '16px' }}
                            />
                        <DatePicker
                                label="Ημερομηνίες Διαθεσιμότητας"
                                value={formData.availableDate?.length ? dayjs(formData.availableDate[0]) : null}
                                readOnly
                                disabled
                                sx={{ width: '100%', marginTop: '16px' }}
                            />
                         <button className="button-applypreviewpage" onClick={handleFinalSubmit}>
                            Οριστική Υποβολή
                        </button>
                    </Col>
                </Row>
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="success">
                    Το προφίλ χρήστη δημιουργήθηκε επιτυχώς!
                </Alert>
            </Snackbar>
            <Footer />
        </div>
        </LocalizationProvider>
    );
}
