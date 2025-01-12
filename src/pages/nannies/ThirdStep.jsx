import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/buttons/Logo.jsx';
import Footer from '../../components/layout/Footer.jsx';
import HelpButton from '../../components/buttons/HelpButton.jsx';
import { Row } from 'react-bootstrap';
import { Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';
import '../../styles/ThirdStep.css';
import { useFormContext } from '../../context/FormContext.jsx';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../providers/firebaseConfig';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



export default function ThirdStep() {
    const navigate = useNavigate();
    const { formData, setFormData } = useFormContext();
    const [formErrors, setFormErrors] = useState({});


    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');


    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('userData')) || {};
        setFormData((prev) => ({
            ...prev,
            ...savedData,
        }));
    }, [setFormData]);
    
    
    useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(formData));
    }, [formData]);
    

    const validatePhoneNumber = (phone) => {
        return /^\d{10}$/.test(phone); // Ελέγχει αν είναι ακριβώς 10 ψηφία
    };



    const validateForm = () => {
        const errors = {
            phone: !formData.phone?.trim() || !validatePhoneNumber(formData.phone),
            phoneAccess: !formData.phoneAccess,
            availableDate: !formData.availableDate || formData.availableDate.length === 0,
            availableTimeFrom: !formData.availableTimeFrom,
            availableTimeTo:
                !formData.availableTimeTo ||
                (formData.availableTimeFrom &&
                    dayjs(formData.availableTimeTo).isBefore(dayjs(formData.availableTimeFrom))),
        };
    
        setFormErrors(errors);
    
        
        if (!validatePhoneNumber(formData.phone)) {
            handleSnackbarOpen('Ο αριθμός τηλεφώνου πρέπει να έχει 10 ψηφία.', 'error');
            return false;
        }
    
        
        if (Object.values(errors).some((error) => error === true)) {
            handleSnackbarOpen('Παρακαλώ συμπληρώστε όλα τα υποχρεωτικά πεδία.', 'error');
            return false;
        }
    
        return true;
    };
    





    const handleSnackbarOpen = (message, severity = 'error') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                const preparedData = {
                    ...formData,
                    availableDate: formData.availableDate.map((date) => dayjs(date).toISOString()),
                    availableTimeFrom: formData.availableTimeFrom
                        ? dayjs(formData.availableTimeFrom).toISOString()
                        : null,
                    availableTimeTo: formData.availableTimeTo
                        ? dayjs(formData.availableTimeTo).toISOString()
                        : null,
                };
                console.log('Prepared Data:', preparedData);
    
                const docRef = await addDoc(collection(db, 'users'), preparedData);
                console.log('Document written with ID: ', docRef.id);
    
                navigate('/PreviewPage');
            } catch (e) {
                console.error("Error adding document: ", e);
                alert(`Σφάλμα κατά την αποθήκευση: ${e.message}`);
            }
        } else {
            console.log("Validation failed. Please complete all fields.");
        }
    };
    

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (name === 'phone' && !validatePhoneNumber(value)) {
            setFormErrors((prev) => ({ ...prev, phone: true }));
        } else {
            setFormErrors((prev) => ({ ...prev, phone: false }));
        }
    };
    
    const handleDateChange = (date) => {
        if (date) {
            setFormData((prev) => ({
                ...prev,
                availableDate: [...(prev.availableDate || []), date.toISOString()],
            }));
        }
    };

    const handleTimeChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value ? dayjs(value).toISOString() : null,
        }));
    };
    
    

    const removeDate = (index) => {
        setFormData((prev) => ({
            ...prev,
            availableDate: prev.availableDate.filter((_, i) => i !== index),
        }));
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="profile-edit-nannies d-flex flex-column min-vh-100">
                <HelpButton />
                <Logo />
                <div className="stepper">
                    <div className="step">
                        <div className="circle">1</div>
                        <div className="label">ΣΤΟΙΧΕΙΑ</div>
                    </div>
                    <div className="step">
                        <div className="circle">2</div>
                        <div className="label">ΔΗΜΙΟΥΡΓΙΑ ΑΓΓΕΛΙΑΣ & ΟΡΙΣΤΙΚΗ ΥΠΟΒΟΛΗ</div>
                    </div>
                    <div className="step active">
                        <div className="circle">3</div>
                        <div className="label">ΠΡΟΓΡΑΜΜΑΤΙΣΜΟΣ ΣΥΝΑΝΤΗΣΗΣ</div>
                    </div>
                </div>
                <div className="content flex-grow-1 d-flex align-items-center justify-content-center">
                    <Row className="row">
                        <TextField
                            fullWidth
                            label="Κινητό Τηλέφωνο"
                            type="text"
                            name="phone"
                            value={formData.phone || ''}
                            onChange={handleInputChange}
                            className="my-3"
                            helperText={formErrors.phone && <span style={{ color: 'red', fontSize: '12px' }}>Το πεδίο είναι υποχρεωτικό</span>}
                        />
                        <FormControl fullWidth className="my-3">
                            <InputLabel>Επιτρέπω τη πρόσβαση στο κινητό μου τηλέφωνο σε:</InputLabel>
                            <Select
                                name="phoneAccess"
                                value={formData.phoneAccess || ''}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="Όλους τους ενδιαφερόμενους γονείς">Όλους τους ενδιαφερόμενους γονείς</MenuItem>
                                <MenuItem value="Σε αυτούς που επιλέγω εγώ">Σε αυτούς που επιλέγω εγώ</MenuItem>
                            </Select>
                            {formErrors.phoneAccess && <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>Το πεδίο είναι υποχρεωτικό</p>}
                        </FormControl>
                        <p>   </p>
                        <p>Ποιες μέρες/ώρες είσαι διαθέσιμος/η να σε καλέσουν;</p>
                        <DatePicker
                            value={null}
                            minDate={dayjs()}
                            onChange={handleDateChange}
                            className="my-3"
                        />

                        <ul>
                            {formData.availableDate?.map((date, index) => (
                                <li key={index}>
                                    {dayjs(date).format('DD/MM/YYYY')}
                                    <button type="button" onClick={() => removeDate(index)}>
                                        Διαγραφή
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {formErrors.availableDate && <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>Το πεδίο είναι υποχρεωτικό</p>}

                        Από:
                        <TimePicker
                            value={formData.availableTimeFrom ? dayjs(formData.availableTimeFrom) : null}
                            onChange={(time) => handleTimeChange('availableTimeFrom', time)}
                        />
                        {formErrors.availableTimeFrom && <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>Το πεδίο είναι υποχρεωτικό</p>}

                        Μέχρι:
                        <TimePicker
                            value={formData.availableTimeTo ? dayjs(formData.availableTimeTo) : null}
                            onChange={(time) => handleTimeChange('availableTimeTo', time)}
                        />
                        {formErrors.availableTimeTo && <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>Η ώρα λήξης πρέπει να είναι μεγαλύτερη από την ώρα έναρξης</p>}

                        <p>   </p>
                        <p>   </p>
                        <p style={{ color: 'red', fontSize: '14px', marginBottom: '20px' }}>
                            * Όλα τα πεδία είναι υποχρεωτικά
                        </p>

                        <div className="buttons3">
                            <button type="button" className="button-apply3" onClick={handleSubmit}>
                                Υποβολή
                            </button>
                        </div>
                    </Row>
                </div>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={4000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
                <Footer />
            </div>
        </LocalizationProvider>
    );
}
