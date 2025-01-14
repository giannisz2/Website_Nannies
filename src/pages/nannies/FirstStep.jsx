import React, { useState, useEffect } from 'react';
import Logo from '../../components/buttons/Logo.jsx';
import Footer from '../../components/layout/Footer.jsx';
import HelpButton from '../../components/buttons/HelpButton.jsx';
import { Row, Col } from 'react-bootstrap';
import { Select, MenuItem, TextField, InputLabel, FormControl, Button } from '@mui/material';
import '../../styles/FirstStep.css';
import { db } from '../../providers/firebaseConfig'; 
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useFormContext } from '../../context/FormContext.jsx';
import { Timestamp } from "firebase/firestore";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';



export default function FirstStep() {
    const { formData, setFormData } = useFormContext();

    const validateGreekUppercase = (value) => {
        const greekUppercaseRegex = /^[Α-ΩΪΫ]+$/; 
        return greekUppercaseRegex.test(value);
    };
    



    const handleInputChange = (event) => {
        const { name, value } = event.target;
    
        
        if ((name === "name" || name === "surname") && value && !validateGreekUppercase(value)) {
            handleSnackbarOpen('Το πεδίο πρέπει να περιέχει μόνο κεφαλαία ελληνικά γράμματα.');
            setFormErrors((prev) => ({ ...prev, [name]: true }));
            return;
        }
    
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev) => ({ ...prev, [name]: !value })); 
    };

    const [formErrors, setFormErrors] = useState({});

    

    const handleDateChange = (date) => {
        setFormData((prev) => ({
            ...prev,
            birthdate: date, 
        }));
        setFormErrors((prev) => ({
            ...prev,
            birthdate: !date, 
        }));
    };
    

    const checkFormValidity = () => {
        const errors = {};
        let isValid = true;
    
        
        ['name', 'surname'].forEach((field) => {
            if (!formData[field] || !validateGreekUppercase(formData[field])) {
                errors[field] = true;
                isValid = false;
            }
        });
    
        
        ['gender', 'birthdate', 'educationLevel', 'experience', 'recommendationLetters'].forEach((field) => {
            if (!formData[field] || (typeof formData[field] === 'string' && formData[field].trim() === '')) {
                errors[field] = true;
                isValid = false;
            }
        });
    
        setFormErrors(errors);
        return isValid;
    };



    
    const isOver18 = (birthdate) => {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();  
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;  
        }
        return age >= 18;
    };
    
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleSnackbarOpen = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };
    
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    
    


    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Submitting form...");
        console.log("FormData:", formData);
    
        if (!isOver18(formData.birthdate)) {
            handleSnackbarOpen('Πρέπει να είστε τουλάχιστον 18 ετών για να εγγραφείτε.');
            setFormErrors({ ...formErrors, birthdate: true });
            return;
        }
    
        if (checkFormValidity()) {
            try {
                const preparedData = {
                    ...formData,
                    birthdate: formData.birthdate ? Timestamp.fromDate(new Date(formData.birthdate)) : null,
                };
    
                console.log("Prepared Data:", preparedData);
    
                const docRef = await addDoc(collection(db, "users"), preparedData);
                console.log("Document written with ID: ", docRef.id);
                navigate('/SecondStep');
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    };
    
    
    

    const handleFileUploadChange = (event) => {
        const file = event.target.files[0]; 
        if (file) {
            setFormData((prev) => ({
                ...prev,
                recommendationLetters: file.name, 
            }));
        }
    };
    

    useEffect(() => {
        const savedData = localStorage.getItem('formData');
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

   
    const handleTemporarySave = () => {
        localStorage.setItem('formData', JSON.stringify(formData));
        handleSnackbarOpen('Τα δεδομένα αποθηκεύτηκαν προσωρινά.');
        setTimeout(() => {
            navigate('/');
        }, 2000);
    };
    

    return (
        <div className="profile-edit-nannies d-flex flex-column min-vh-100">
            <HelpButton />
            <Logo />
            <div className="stepper">
                <div className="step active">
                    <div className="circle">1</div>
                    <div className="label">ΣΤΟΙΧΕΙΑ</div>
                </div>
                <div className="step">
                    <div className="circle">2</div>
                    <div className="label">ΔΗΜΙΟΥΡΓΙΑ ΑΓΓΕΛΙΑΣ & ΟΡΙΣΤΙΚΗ ΥΠΟΒΟΛΗ</div>

                </div>
                <div className="step">
                    <div className="circle">3</div>
                    <div className="label">ΠΡΟΓΡΑΜΜΑΤΙΣΜΟΣ ΣΥΝΑΝΤΗΣΗΣ</div>

                </div>
            </div>

            
            <div className="content flex-grow-1 d-flex align-items-center justify-content-center">
                <div className="form-header">
                
                </div>
                <form onSubmit={handleSubmit}>
                    <Row className="row">

                        <TextField 
                        fullWidth 
                        label="Όνομα (ΜΕ ΚΕΦΑΛΑΙΑ)" 
                        type="text"
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        className="my-3" 
                        helperText={formErrors.name ? (
                            <span style={{ color: 'red', fontSize: '12px' }}>Το πεδίο Όνομα είναι υποχρεωτικό</span>
                        ) : null}
                    />
                        <TextField 
                            fullWidth 
                            label="Επώνυμο (ΜΕ ΚΕΦΑΛΑΙΑ)" 
                            type="text"
                            name="surname" 
                            value={formData.surname}
                            onChange={handleInputChange}
                            className="my-3" 
                            helperText={formErrors.surname ? (
                                <span style={{ color: 'red', fontSize: '12px' }}>Το πεδίο Επώνυμο είναι υποχρεωτικό</span>
                            ) : null} 
                        />
                        <Col>
                        <FormControl component="fieldset" className="my-3">
                            <InputLabel shrink>Φύλο</InputLabel>
                            <RadioGroup
                                row
                                aria-label="gender"
                                name="gender"
                                value={formData.gender || ''}
                                onChange={handleInputChange}
                            >
                                <FormControlLabel value="Άνδρας" control={<Radio />} label="Άνδρας" />
                                <FormControlLabel value="Γυναίκα" control={<Radio />} label="Γυναίκα" />
                                <FormControlLabel value="Άλλο" control={<Radio />} label="Άλλο" />
                            </RadioGroup>
                            {formErrors.gender && (
                                <p style={{ color: 'red', fontSize: '12px' }}>
                                    Το πεδίο Φύλο είναι υποχρεωτικό
                                </p>
                            )}
                        </FormControl>
                    </Col>

                        <Col>
                            <TextField fullWidth label="Ημερομηνία γέννησης" type="date" name="birthdate" value={formData.birthdate || ''}
                                onChange={(e) => handleDateChange(e.target.value)} className="my-3"
                                InputLabelProps={{
                                    shrink: true, 
                                }}
                                helperText={formErrors.birthdate ? (
                                    <span style={{ color: 'red', fontSize: '12px' }}>Το πεδίο Ημερομηνία γέννησης είναι υποχρεωτικό</span>
                                ) : null}
                            />
                        </Col>
                        <FormControl fullWidth className="my-3">
                            <InputLabel>Επίπεδο σπουδών~</InputLabel>
                            <Select 
                                name="educationLevel" 
                                value={formData.educationLevel} 
                                onChange={handleInputChange}
                            >
                                <MenuItem value="Τριτοβάθμια εκπαίδευση">Τριτοβάθμια εκπαίδευση</MenuItem>
                                <MenuItem value="Δευτεροβάθμια εκπαίδευση">Δευτεροβάθμια εκπαίδευση</MenuItem>
                                <MenuItem value="Πρωτοβάθμια εκπαίδευση">Πρωτοβάθμια εκπαίδευση</MenuItem>
                                <MenuItem value="Άλλο">Άλλο</MenuItem>
                            </Select>
                            {formErrors.educationLevel && (
                                <p style={{ color: 'red', fontSize: '12px' }}>
                                    Το πεδίο Επίπεδο σπουδών είναι υποχρεωτικό
                                </p>
                            )}
                        </FormControl>

                        <FormControl component="fieldset" fullWidth className="my-3">
                            <InputLabel shrink>Ειδίκευση</InputLabel>
                            <Select
                                name="experience"
                                value={formData.experience}
                                onChange={handleInputChange}
                                row
                            >
                                 <MenuItem value="Δασκάλος/α">Δάσκαλος/α</MenuItem>
                                    <MenuItem value="Ειδική Αγωγή">Ειδική Αγωγή</MenuItem>
                                    <MenuItem value="Νηπιαγωγός">Νηπιαγωγός</MenuItem>
                                    <MenuItem value="Παιδαγωγός">Παιδαγωγός</MenuItem>
                                    <MenuItem value="Άλλο">Άλλο</MenuItem>
                                </Select>

                            {formErrors.experience && (
                                <p style={{ color: 'red', fontSize: '12px' }}>
                                Το πεδίο Ειδίκευση είναι υποχρεωτικό
                                </p>
                            )}
                            </FormControl>
    

                        
                        <FormControl fullWidth className="my-3" error={formErrors.recommendationLetters}>
                            <InputLabel shrink htmlFor="recommendationLettersUpload">
                                Συστατικές επιστολές~
                            </InputLabel>
                            <input
                                type="file"
                                id="recommendationLettersUpload"
                                name="recommendationLetters"
                                onChange={handleFileUploadChange}
                                className="form-control"
                                style={{ marginTop: '8px' }}
                            />
                            {formData.recommendationLetters && (
                                <p>{`Αποθηκευμένο αρχείο: ${formData.recommendationLetters}`}</p>
                            )}
                            {formErrors.recommendationLetters && (
                                <span style={{ color: 'red', fontSize: '12px' }}>
                                Το πεδίο Συστατικές επιστολές είναι υποχρεωτικό
                                </span>
                            )}
                        </FormControl>
                        <p>   </p>
                        <p style={{ color: 'red', fontSize: '14px', marginBottom: '20px' }}>
                            * Όλα τα πεδία είναι υποχρεωτικά
                        </p>
                        <p className="paragraph">Τα υπόλοιπα στοιχεία θα συμπληρώνονται αυτόματα από το Taxisnet</p>
                        <div className='buttons-pu1'>
                            <button type="button" className="button-temp-pu1"onClick={handleTemporarySave}>Προσωρινή Αποθήκευση</button>
                            <button type="submit" className="button-apply-pu1">Υποβολή</button>
                        </div>
                        <Snackbar open={snackbarOpen} 
                            autoHideDuration={6000} 
                            onClose={handleSnackbarClose}
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            >
                            <Alert onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%' }}>
                                {snackbarMessage}
                            </Alert>
                        </Snackbar>

                    </Row>
                </form>
            </div>
            <Footer />
        </div>
    );
}
