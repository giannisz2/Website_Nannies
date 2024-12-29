import React, { useState, useEffect } from 'react'; // Εισαγωγή του useEffect
import Logo from '../../components/buttons/Logo.jsx';
import Footer from '../../components/layout/Footer.jsx';
import HelpButton from '../../components/buttons/HelpButton.jsx';
import { Row, Col } from 'react-bootstrap';
import { Select, MenuItem, TextField, InputLabel, FormControl, Button } from '@mui/material';
import { Timestamp } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { db } from '../../providers/firebaseConfig.js';
import { collection, addDoc } from 'firebase/firestore';
import '../../styles/PersonalInfoParents.css';


import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function PersonalInfoParents() {
    const [formData, setFormData] = useState({
        role: 'Parent',
        name: '',
        surname: '',
        gender: '',
        birthdate: null,
        phone: '',
        residence: '',
        childrenCount: '',
        pets: '',
        childrenUnder2: '',
        nannyChildrenCount: '',
    });

    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if ((name === "name" || name === "surname") && value && !validateGreekUppercase(value)) {
            handleSnackbarOpen('Το πεδίο πρέπει να περιέχει μόνο κεφαλαία ελληνικά γράμματα.');
            setFormErrors((prev) => ({ ...prev, [name]: true }));
            return;
        }

        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: !value }); // Set error to true if value is empty
    };


    const validateGreekUppercase = (value) => {
        const greekUppercaseRegex = /^[Α-ΩΪΫ]+$/; // Ελέγχει μόνο κεφαλαία ελληνικά γράμματα
        return greekUppercaseRegex.test(value);
    };
    
    const validatePhoneNumber = (phone) => {
        return /^\d{10}$/.test(phone); // Ελέγχει αν είναι ακριβώς 10 ψηφία
    };

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




        if (!formData.gender) {
            errors.gender = true;
            isValid = false;
        }
        if (!formData.birthdate) {
            errors.birthdate = true;
            isValid = false;
        }
       
        if (!validatePhoneNumber(formData.phone)) {
            handleSnackbarOpen('Ο αριθμός τηλεφώνου πρέπει να έχει 10 ψηφία.', 'error');
            errors.phone = true;
            isValid = false;
        
        }
        if (!formData.residence) {
            errors.residence = true;
            isValid = false;
        }
        if (!formData.childrenCount) {
            errors.childrenCount = true;
            isValid = false;
        }
        if (!formData.pets) {
            errors.pets = true;
            isValid = false;
        }
        if (!formData.childrenUnder2) {
            errors.childrenUnder2 = true;
            isValid = false;
        }
        if (!formData.nannyChildrenCount) {
            errors.nannyChildrenCount = true;
            isValid = false;
        }
        setFormErrors(errors);
        //setFormErrors(errors);

        // Επιστροφή του isValid
        return isValid;




    };


    
    const isOver18 = (birthdate) => {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();  // Χρήση let αντί για const
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;  // Εδώ είναι εντάξει να μειώσουμε το age επειδή τώρα είναι let
        }
        return age >= 18;
    };


    const handleSubmit = async (event) => {
            event.preventDefault();
            console.log("Submitting form...");
            console.log("FormData:", formData);
        
            if (!isOver18(formData.birthdate)) {
                handleSnackbarOpen('Πρέπει να είστε τουλάχιστον 18 ετών για να εγγραφείτε.', 'error');
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
            
                    const docRef = await addDoc(collection(db, "Parent"), preparedData);

                    console.log("Document written with ID: ", docRef.id);
                    // Αποθήκευση του userId στο localStorage
                    localStorage.setItem("userId", docRef.id);
                    navigate('/PreviewParents');
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            }
            
        };

    useEffect(() => {
        // Αν θέλεις να κάνεις κάποια fetch δεδομένων, μπορείς να το χρησιμοποιήσεις εδώ.
    }, []);


    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');
    
    
    const handleSnackbarOpen = (message, severity = 'error') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };



    return (
        <div className="profile-edit-nannies d-flex flex-column min-vh-100">
            <HelpButton />
            <Logo />

            <div className="content flex-grow-1 d-flex align-items-center justify-content-center">
                <Row className="align-items-start justify-content-center g-5 m-0 w-100">
                    <Col md={6} xs={12} className="d-flex flex-column align-items-center justify-content-center text-center">
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
                        <FormControl fullWidth className="my-3">
                                <InputLabel>Φύλο</InputLabel>
                                <Select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="Αρσενικό">Αρσενικό</MenuItem>
                                    <MenuItem value="Θυληκό">Θυληκό</MenuItem>
                                    <MenuItem value="Άλλο">Άλλο</MenuItem>
                                </Select>
                                {formErrors.gender && (
                                    <p style={{ color: 'red', fontSize: '12px' , textAlign:'left'}}>
                                        Το πεδίο Φύλο είναι υποχρεωτικό
                                    </p>
                                )}
                            </FormControl>
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
                            <InputLabel>Αριθμός Παιδιών</InputLabel>
                            <Select
                                name="childrenCount"
                                value={formData.childrenCount}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="1">1</MenuItem>
                                <MenuItem value="2">2</MenuItem>
                                <MenuItem value="3">3</MenuItem>
                                <MenuItem value="4+">4+</MenuItem>
                            </Select>
                            {formErrors.childrenCount && (
                                    <p style={{ color: 'red', fontSize: '12px' , textAlign:'left'}}>
                                        Το πεδίο Αριθμός Παιδιών είναι υποχρεωτικό
                                    </p>
                                )}
                        </FormControl>
                        <FormControl fullWidth className="my-3">
                            <InputLabel>Πόσα παιδιά έχετε σε ηλικίες από 6 μηνών έως 2.5 ετών</InputLabel>
                            <Select
                                name="childrenUnder2"
                                value={formData.childrenUnder2}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="1">1</MenuItem>
                                <MenuItem value="2">2</MenuItem>
                                <MenuItem value="3">3</MenuItem>
                                <MenuItem value="4+">4+</MenuItem>
                            </Select>
                            {formErrors.childrenUnder2 && (
                                    <p style={{ color: 'red', fontSize: '12px', textAlign:'left' }}>
                                        Το πεδίο Πόσα παιδιά έχετε σε ηλικίες από 6 μηνών έως 2.5 ετών είναι υποχρεωτικό
                                    </p>
                                )}
                        </FormControl>
                    </Col>
                    <Col md={6} xs={12} className="d-flex flex-column align-items-center justify-content-center text-center">
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
                        <label>Ημερομηνία Γέννησης:</label>
                        <TextField fullWidth label="Ημερομηνία γέννησης" type="date" name="birthdate" value={formData.birthdate || ''}
                                onChange={(e) => handleDateChange(e.target.value)} className="my-3"
                                InputLabelProps={{
                                    shrink: true, // Κάνει την ετικέτα να εμφανίζεται πάνω από το πεδίο
                                }}
                                helperText={formErrors.birthdate ? (
                                    <span style={{ color: 'red', fontSize: '12px' }}>Το πεδίο Ημερομηνία γέννησης είναι υποχρεωτικό</span>
                                ) : null}
                            />

                        <TextField
                            fullWidth
                            label="Τόπος Κατοικίας"
                            name="residence"
                            value={formData.residence}
                            onChange={handleInputChange}
                            className="my-3"
                            helperText={formErrors.residence ? (
                                <span style={{ color: 'red', fontSize: '12px' }}>Το πεδίο Τόπος Κατοικίας είναι υποχρεωτικό</span>
                            ) : null} 
                        />
                        <FormControl fullWidth className="my-3">
                            <InputLabel>Έχετε κατοικίδια στο σπίτι</InputLabel>
                            <Select
                                name="pets"
                                value={formData.pets}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="ΝΑΙ">ΝΑΙ</MenuItem>
                                <MenuItem value="ΟΧΙ">ΟΧΙ</MenuItem>
                            </Select>
                            {formErrors.pets && (
                                    <p style={{ color: 'red', fontSize: '12px', textAlign:'left' }}>
                                        Το πεδίο Έχετε κατοικίδια στο σπίτι είναι υποχρεωτικό
                                    </p>
                                )}
                        </FormControl>
                        <FormControl fullWidth className="my-3">
                            <InputLabel>Πόσα παιδιά θέλετε να αναλάβει η ντάντα;</InputLabel>
                            <Select
                                name="nannyChildrenCount"
                                value={formData.nannyChildrenCount}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="1">1</MenuItem>
                                <MenuItem value="2">2</MenuItem>
                                <MenuItem value="3">3</MenuItem>
                                <MenuItem value="4+">4+</MenuItem>
                            </Select>
                            {formErrors.nannyChildrenCount && (
                                    <p style={{ color: 'red', fontSize: '12px' , textAlign:'left' }}>
                                        Το πεδίο Έχετε κατοικίδια στο σπίτι είναι υποχρεωτικό
                                    </p>
                                )}
                        </FormControl>
                    </Col>
                </Row>
            </div>
            <div className='buttons'>
                            <button className="button-temp">Προσωρινή Αποθήκευση</button>
                            <button className="button-apply"onClick={handleSubmit}>Υποβολή</button>
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            <Footer />
           
        </div>
    );
}
