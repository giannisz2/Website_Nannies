import Logo from '../../components/buttons/Logo.jsx';
import Footer from '../../components/layout/Footer.jsx';
import HelpButton from '../../components/buttons/HelpButton.jsx';
import { Row, Col } from 'react-bootstrap';
import { Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';
import Datepicker from '../../components/layout/Datepicker.jsx';
import '../../styles/SecondStep.css';
import { db } from '../../providers/firebaseConfig'; 
import { collection, addDoc } from "firebase/firestore";

import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";





export default function SecondStep() {


    const [formData, setFormData] = useState({
            availability: '',
            employmentTime: '',
            location: '',
            experienceYears: '',
            maxChildren: '',
            pets: '',
            smoker: ''
        });
    
        const [formErrors, setFormErrors] = useState({});

        const checkFormValidity = () => {
            const errors = {};
            let isValid = true;
            ['availability', 'employmentTime', 'location', 'experienceYears', 'maxChildren', 'pets', 'smoker'].forEach(field => {
                if (!formData.availability) {
                    errors.availability = true;
                    isValid = false;
                }
                
            });
            setFormErrors(errors);
            return isValid;
        };


    const navigate = useNavigate();

    const [bio, setBio] = useState("");
    const [wordCount, setWordCount] = useState(0);
    const maxWords = 200;

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const errors = {};
        let isValid = true;
    
        
        ['availability', 'employmentTime', 'location', 'experienceYears', 'maxChildren', 'pets', 'smoker'].forEach((field) => {
            if (!formData.availability) {
                console.log("Availability:", formData.availability);

                setFormErrors(prev => ({ ...prev, availability: true }));
                isValid = false;
            }
            
        });
    
        if (!bio.trim()) {
            errors.bio = true; 
            isValid = false;
        }
    
        setFormErrors(errors);
    
        if (isValid) {
            try {
                const preparedData = {
                    ...formData,
                    bio,
                };
                const docRef = await addDoc(collection(db, "users"), preparedData);
                console.log("Document written with ID: ", docRef.id);
                navigate('/ThirdStep');
            } catch (e) {
                console.error("Error adding document: ", e.message); // Εμφανίζει το μήνυμα του σφάλματος
                alert(`Σφάλμα κατά την αποθήκευση: ${e.message}`); // Ενημέρωση για τον χρήστη
            }
            
        }
    };
    
    
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        
        if (name === "bio") {
            const charCount = value.length; 
    
            if (charCount <= maxWords) { 
                setBio(value);  
                setWordCount(charCount); 
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
            setFormErrors(prev => ({
                ...prev,
                [name]: !value.trim()  
            }));
        }
    };
    
    
    
   
    

    return (
        <div className="profile-edit-nannies d-flex flex-column min-vh-100">
            <HelpButton />
            <Logo />
            <div className="stepper">
                <div className="step">
                    <div className="circle">1</div>
                </div>
                <div className="step active">
                    <div className="circle">2</div>
                    <div className="label">ΔΗΜΙΟΥΡΓΙΑ ΑΓΓΕΛΙΑΣ & ΟΡΙΣΤΙΚΗ ΥΠΟΒΟΛΗ</div>
                </div>
                <div className="step">
                    <div className="circle">3</div>
                </div>
            </div>
            <div className="content flex-grow-1 d-flex align-items-center justify-content-center">
                <Row className="row">
                    <p>Διαθεσιμότητα: (Πότε θα μπορούσατε να ξεκινήσετε;)</p>
                    <Datepicker 
                        name="availability" 
                        selected={formData.availability} 
                        onChange={(date) => {
                            setFormData(prev => ({
                                ...prev,
                                availability: date.toISOString() // Παραμένει ISO string για αποθήκευση
                            }));
                            setFormErrors(prev => ({
                                ...prev,
                                availability: !date // Σφάλμα αν δεν υπάρχει ημερομηνία
                            }));
                        }}
                        dateFormat="dd/MM/yyyy" // Προσαρμογή στη μορφή ημέρα/μήνας/έτος
                    />


                    {formErrors.availability && <p className="error-text"><span style={{ color: 'red', fontSize: '12px' }}>Το πεδίο Διαθεσιμότητα είναι υποχρεωτικό </span></p>}
                    <FormControl fullWidth className="my-3">
                        <InputLabel>Χρόνος Απασχόλησης</InputLabel>
                        <Select name="employmentTime"
                                value={formData.employmentTime}
                                onChange={handleInputChange}
                                defaultValue=""
                            >
                            <MenuItem value="Μερική">Μερική</MenuItem>
                            <MenuItem value="Πλήρης">Πλήρης</MenuItem>
                        </Select>
                        {formErrors.employmentTime && (
                                <span style={{ color: 'red', fontSize: '12px' }}>
                                Το πεδίο Χρόνος Απασχόλησης είναι υποχρεωτικό
                                </span>
                            )}
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Τοποθεσία"
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="my-3"
                        helperText={formErrors.location ? (
                            <span style={{ color: 'red', fontSize: '12px' }}>Το πεδίο Τοποθεσία είναι υποχρεωτικό</span>
                        ) : null} // Εμφανίζει το μήνυμα μόνο αν υπάρχει σφάλμα
                    />

                    <Col>
                        <FormControl fullWidth className="my-3">
                            <InputLabel>Έτη προϋπηρεσίας</InputLabel>
                            <Select name="experienceYears"
                                value={formData.experienceYears}
                                onChange={handleInputChange}
                                defaultValue=""
                            >
                                <MenuItem value="1">0</MenuItem>
                                <MenuItem value="2">1</MenuItem>
                                <MenuItem value="2">2</MenuItem>
                                <MenuItem value="2">3</MenuItem>
                                <MenuItem value="Άλλο">4+</MenuItem>
                            </Select>
                            {formErrors.experienceYears && (
                                <span style={{ color: 'red', fontSize: '12px' }}>
                                Το πεδίο Έτη προϋπηρεσίας είναι υποχρεωτικό
                                </span>
                            )}
                        </FormControl>
                    </Col>
                    <Col>
                        <FormControl fullWidth className="my-3">
                            <InputLabel>Μέχρι πόσα παιδια μπορείτε να αναλάβετε;</InputLabel>
                            <Select name="maxChildren"
                                value={formData.maxChildren}
                                onChange={handleInputChange}
                                defaultValue=""
                            >
                                <MenuItem value="2">1</MenuItem>
                                <MenuItem value="2">2</MenuItem>
                                <MenuItem value="2">3</MenuItem>
                                <MenuItem value="Άλλο">4+</MenuItem>
                            </Select>
                            {formErrors.maxChildren && (
                                <span style={{ color: 'red', fontSize: '12px' }}>
                                Το πεδίο Μέχρι πόσα παιδια μπορείτε να αναλάβετε είναι υποχρεωτικό
                                </span>
                            )}
                        </FormControl>
                    </Col>
                    <Row className="row" />
                    <Col>
                        <FormControl fullWidth className="my-3">
                            <InputLabel>Είστε διατεθειμένος να εργαστείτε σε σπίτι με κατοικίδια ζώα;</InputLabel>
                            <Select name="pets"
                                value={formData.pets}
                                onChange={handleInputChange}
                                defaultValue=""
                            >
                                <MenuItem value="ΝΑΙ">NAI</MenuItem>
                                <MenuItem value="ΟΧΙ">OXI</MenuItem>
                            </Select>
                            {formErrors.pets && (
                                <span style={{ color: 'red', fontSize: '12px' }}>
                                Το πεδίο Είστε διατεθειμένος να εργαστείτε σε σπίτι με κατοικίδια ζώα είναι υποχρεωτικό
                                </span>
                            )}
                        </FormControl>
                    </Col>
                    <Col>
                        <FormControl fullWidth className="my-3">
                            <InputLabel>Είστε καπνιστής;</InputLabel>
                            <Select name="smoker"
                                value={formData.smoker}
                                onChange={handleInputChange}
                                defaultValue=""
                            >
                                <MenuItem value="ΝΑΙ">NAI</MenuItem>
                                <MenuItem value="ΟΧΙ">OXI</MenuItem>
                            </Select>
                            {formErrors.smoker && (
                                <span style={{ color: 'red', fontSize: '12px' }}>
                                Το πεδίο Είστε καπνιστής είναι υποχρεωτικό
                                </span>
                            )}
                        </FormControl>
                    </Col>
                   
                    <TextField
                    fullWidth
                    label="Λίγα λόγια για εσάς..."
                    type="text"
                    name="bio"
                    value={bio}
                    onChange={handleInputChange}
                    className="my-3"
                    multiline
                    rows={4}
                    InputProps={{
                        style: { borderColor: formErrors.bio ? "initial" : "none" }, 
                    }}
                    error={false} 
                    helperText={bio.trim() === "" ? (
                        <span style={{ color: 'red', fontSize: '12px' }}>Αυτό το πεδίο είναι υποχρεωτικό</span>
                    ) : `Characters: ${wordCount}/${maxWords}`} />
                




                    <div className="buttons">
                        <button className="button-temp">Προσωρινή Αποθήκευση</button>
                        <button className="button-apply" onClick={handleSubmit}>Υποβολή</button>
                    </div>
                </Row>
            </div>
            <Footer />
        </div>
    );
}

