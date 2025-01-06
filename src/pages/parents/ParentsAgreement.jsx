import React, { useState, useEffect } from 'react';
import NavBarParents from '../../components/layout/NavBarParents';
import Footer from '../../components/layout/Footer';
import { Row, Col } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import HelpButton from '../../components/buttons/HelpButton';
import { Alert } from '@mui/material';
import '../../styles/Agreement.css';
import { db } from '../../providers/firebaseConfig.js';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import {  doc, getDoc } from 'firebase/firestore';

import Snackbar from '@mui/material/Snackbar';


export default function ParentsAgreement() {
    
    const [formData, setFormData] = useState({
        nannyName: '',
        nannySurName: '',
        parentName:'',
        parentSurname: '',
    
        parentEmail: '',
        workHoursFrom: '9:30',
        workHoursTo: '17:00',

        startDate: new Date(),
        
    });
    
    
    const [isChecked, setIsChecked] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');
    const navigate = useNavigate();


    const handleSnackbarOpen = (message, severity = 'error') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };


    useEffect(() => {
        const fetchParentData = async () => {
            const userId = localStorage.getItem("userId"); 
            if (userId) {
                const parentRef = doc(db, "Parent", userId);
                const parentSnap = await getDoc(parentRef);
                if (parentSnap.exists()) {
                    const parentData = parentSnap.data();
                    setFormData(prev => ({
                        ...prev,
                        parentName: parentData.name,
                        parentSurname: parentData.surname,
                        parentEmail: parentData.email,
                    }));
                } else {
                    console.log("No parent data found");
                }
            }
        };
        fetchParentData();
    }, []);



    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        setFormErrors((prev) => ({ ...prev, checkbox: false }));
    };


    const validateGreekUppercase = (value) => /^[Α-Ω\s]+$/.test(value);
    


    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check for required fields
        const errors = {};
        if (!formData.nannyName || !validateGreekUppercase(formData.nannyName)) {
            errors.nannyName = true;
        }
        if (!formData.nannySurName || !validateGreekUppercase(formData.nannySurName)) {
            errors.nannySurName = true;
        }
        if (!formData.parentEmail) {
            errors.parentEmail = true;
        }
        if (!isChecked) {
            errors.checkbox = true;
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            handleSnackbarOpen(
                'Παρακαλώ συμπληρώστε όλα τα απαιτούμενα πεδία σωστά.',
                'error'
            );
            return;
        }

        try {
            const docRef = await addDoc(collection(db, 'agreements'), formData);
            console.log('Document written with ID: ', docRef.id);
            navigate('/ParentHomepage');
        } catch (e) {
            console.error('Error adding document: ', e);
            handleSnackbarOpen(
                'Σφάλμα κατά την αποθήκευση του συμφωνητικού. Προσπαθήστε ξανά.',
                'error'
            );
        }
    };
    
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        
        if ((name === 'nannyName' || name === 'nannySurName') && value) {
            if (!validateGreekUppercase(value)) {
                handleSnackbarOpen(
                    'Το πεδίο πρέπει να περιέχει μόνο κεφαλαία ελληνικά γράμματα.',
                    'error'
                );
                setFormErrors((prev) => ({ ...prev, [name]: true }));
                return;
            }
        }

        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev) => ({ ...prev, [name]: false }));
    };



    
    return (
        <>
            <div className="nanny-agreement">
                <NavBarParents />
                <HelpButton />
                <div className="centered-container"> 
                <TextField
                        fullWidth={false}
                        label="Σμφωνητικό"
                        type="text"
                        className="text-agreement1"
                        value="Θέλω να έρθω σε συμφωνία με τον/ην:"
                        disabled
                    />
                </div>
                <div className="content flex-grow-1 d-flex align-items-center justify-content-center"> 
                    <Row className="align-items-start justify-content-center g-5 m-0 w-100">
                        
                    <Col md={6} xs={12} className="d-flex flex-column align-items-center justify-content-center text-center">
                    <TextField
                            fullWidth
                            label="Email Γονέα"
                            type="email"
                            name="parentEmail"
                            value={formData.parentEmail}
                            onChange={handleInputChange}
                            error={formErrors.parentEmail}
                            helperText={
                                formErrors.parentEmail &&
                                'Το πεδίο είναι υποχρεωτικό.'
                            }
                        />
                        </Col>
                        
                        <p > </p>


                        <Col md={6} xs={12} className="d-flex flex-column align-items-center justify-content-center text-center">
                            
                        
                            
                        <TextField
                            fullWidth
                            label="Όνομα Νταντάς (ΜΕ ΚΕΦΑΛΑΙΑ)"
                            type="text"
                            name="nannyName"
                            value={formData.nannyName}
                            onChange={handleInputChange}
                            error={formErrors.nannyName}
                            helperText={
                                formErrors.nannyName &&
                                'Το πεδίο είναι υποχρεωτικό και πρέπει να είναι με κεφαλαία.'
                            }
                        />
                        </Col>
                        <Col md={6} xs={12} className="d-flex flex-column align-items-center justify-content-center text-center">
                        <TextField
                            fullWidth
                            label="Επώνυμο Νταντάς (ΜΕ ΚΕΦΑΛΑΙΑ)"
                            type="text"
                            name="nannySurName"
                            value={formData.nannySurName}
                            onChange={handleInputChange}
                            error={formErrors.nannySurName}
                            helperText={
                                formErrors.nannySurName &&
                                'Το πεδίο είναι υποχρεωτικό και πρέπει να είναι με κεφαλαία.'
                            }
                        />
                        </Col>
                       
                    </Row>
                </div>

                <div className="content flex-grow-1 d-flex align-items-center justify-content-center"> 
                    <Row className="align-items-start justify-content-center g-5 m-0 w-100">
                        <Col
                            md={6}
                            xs={12}
                            className="d-flex flex-column align-items-center justify-content-center text-center"
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <p className="text-agreement2">Ωράριο:</p>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '18px', color: 'blue', textDecoration: 'underline' }}>9:30</span>
                                    <span style={{ fontSize: '18px', color: 'blue', textDecoration: 'underline' }}>17:00</span>
                                </div>
                            </div>
                        </Col>
                        <Col
                            md={6}
                            xs={12}
                            className="d-flex flex-column align-items-center justify-content-center text-center"
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <p className="text-agreement2">Έναρξη εργασίας:</p>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '18px', color: 'blue', textDecoration: 'underline' }}>
                                        Παρασκευή 27 Δεκεμβρίου 2024
                                    </span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div style={{ fontSize: '18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '100px' , marginBottom: '50px'}}>
                        <span style={{ marginRight: '10px' }}>
                            Επιβεβαιώνω ότι έχουμε έρθει σε συμφωνία με τον/ην προαναφερθόντα στο ωράριο που έχει δηλωθεί
                        </span>
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />{' '}
                        {formErrors.checkbox && (
                            
                            <p style={{ color: 'red' }}>
                                
                                Πρέπει να συμφωνήσετε για να συνεχίσετε.
                            </p>
                        )}
                    </div>
                </div>
                
                

                <button type="button" className="button-apply-agreement" onClick={handleSubmit}>
                    Υποβολή Συμφωνητικού
                </button>
                
                <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
                <Footer />
            </div>
        </>
    );
}