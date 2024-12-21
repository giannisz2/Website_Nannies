import React, { useState } from 'react';
import Logo from '../../components/buttons/Logo.jsx';
import Footer from '../../components/layout/Footer.jsx';
import HelpButton from '../../components/buttons/HelpButton.jsx';
import { Row, Col } from 'react-bootstrap';
import { Select, MenuItem, TextField, InputLabel, FormControl, Button } from '@mui/material';
import Datepicker from '../../components/layout/Datepicker.jsx';
import '../../styles/FirstStep.css';
import { db } from '../../providers/firebaseConfig'; 
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

export default function FirstStep() {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        gender: '',
        birthdate: null,
        educationLevel: '',
        experience: '',
        recommendationLetters: ''
    });

    const [formErrors, setFormErrors] = useState({});

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: !value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, birthdate: date });
        setFormErrors({ ...formErrors, birthdate: !date });
    };

    const checkFormValidity = () => {
        const errors = {};
        let isValid = true;
        ['name', 'surname', 'gender', 'birthdate', 'educationLevel', 'experience', 'recommendationLetters'].forEach(field => {
            if (!formData[field] || formData[field].trim() === '') {
                errors[field] = true;
                isValid = false;
            }
        });
        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (checkFormValidity()) {
            try {
                const docRef = await addDoc(collection(db, "users"), formData);
                console.log("Document written with ID: ", docRef.id);
                navigate('/SecondStep');
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
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
                </div>
                <div className="step">
                    <div className="circle">3</div>
                </div>
            </div>
            <div className="content flex-grow-1 d-flex align-items-center justify-content-center">
                <form onSubmit={handleSubmit}>
                    <Row className="row">
                        <TextField fullWidth label="Όνομα" name="name" value={formData.name} onChange={handleInputChange} className="my-3" error={formErrors.name} helperText={formErrors.name && "Το πεδίο Όνομα είναι υποχρεωτικό"} />
                        <TextField fullWidth label="Επώνυμο" name="surname" value={formData.surname} onChange={handleInputChange} className="my-3" error={formErrors.surname} helperText={formErrors.surname && "Το πεδίο Επώνυμο είναι υποχρεωτικό"} />
                        <Col>
                            <TextField fullWidth label="Φύλο" name="gender" value={formData.gender} onChange={handleInputChange} className="my-3" error={formErrors.gender} helperText={formErrors.gender && "Το πεδίο Φύλο είναι υποχρεωτικό"} />
                        </Col>
                        <Col>
                            <p>Ημερομηνία γέννησης:</p>
                            <Datepicker name="birthdate" selected={formData.birthdate} onChange={handleDateChange} />
                            {formErrors.birthdate && <p className="error-text">Ημερομηνία γέννησης είναι υποχρεωτική</p>}
                        </Col>
                        <FormControl fullWidth className="my-3">
                            <InputLabel>Επίπεδο σπουδών~</InputLabel>
                            <Select name="educationLevel" value={formData.educationLevel} onChange={handleInputChange} defaultValue="" error={formErrors.educationLevel}>
                                <MenuItem value="Τριτοβάθμια εκπαίδευση">Τριτοβάθμια εκπαίδευση</MenuItem>
                                <MenuItem value="Δευτεροβάθμια εκπαίδευση">Δευτεροβάθμια εκπαίδευση</MenuItem>
                                <MenuItem value="Πρωτοβάθμια εκπαίδευση">Πρωτοβάθμια εκπαίδευση</MenuItem>
                                <MenuItem value="Άλλο">Άλλο</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField fullWidth label="Εμπειρία" name="experience" value={formData.experience} onChange={handleInputChange} className="my-3" error={formErrors.experience} helperText={formErrors.experience && "Το πεδίο Εμπειρία είναι υποχρεωτικό"} />
                        <TextField fullWidth label="Συστατικές επιστολές~" name="recommendationLetters" value={formData.recommendationLetters} onChange={handleInputChange} className="my-3" error={formErrors.recommendationLetters} helperText={formErrors.recommendationLetters && "Το πεδίο Συστατικές επιστολές είναι υποχρεωτικό"} />
                        
                        <p className="paragraph">Τα υπόλοιπα στοιχεία θα συμπληρώνονται αυτόματα από το Taxisnet</p>
                        <div className='buttons'>
                            <button type="button" className="button-temp">Προσωρινή Αποθήκευση</button>
                            <button className='button-apply' onClick={handleSubmit}>Υποβολή</button>
                        </div>
                    </Row>
                </form>
            </div>
            <Footer />
        </div>
    );
}
