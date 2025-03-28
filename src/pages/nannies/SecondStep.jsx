import Logo from '../../components/buttons/Logo.jsx';
import Footer from '../../components/layout/Footer.jsx';
import HelpButton from '../../components/buttons/HelpButton.jsx';
import { Row, Col } from 'react-bootstrap';
import { Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';
import Datepicker from '../../components/layout/Datepicker.jsx';
import '../../styles/SecondStep.css';
import { db } from '../../providers/firebaseConfig'; 
import { collection, addDoc } from "firebase/firestore";
import { useFormContext } from '../../context/FormContext.jsx';
import { Timestamp } from "firebase/firestore";
import { Autocomplete } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';





export default function SecondStep() {

    const initialFormData = {
        name: "",
        surname: "",
        gender: "",
        birthdate: "",
        educationLevel: "",
        experience: "",
        recommendationLetters: "",
        availability: "",
        employmentTime: "",
        location: "", 
        bio: "",
    };
    


    const citiesAndTowns = [
        { region: "ΑΤΤΙΚΗ", name: "ΑΘΗΝΑ" },
        { region: "ΑΤΤΙΚΗ", name: "ΠΕΙΡΑΙΑΣ" },
        { region: "ΑΤΤΙΚΗ", name: "ΜΑΡΟΥΣΙ" },
        { region: "ΑΤΤΙΚΗ", name: "ΚΗΦΙΣΙΑ" },
        { region: "ΑΤΤΙΚΗ", name: "ΓΛΥΦΑΔΑ" },
        { region: "ΑΤΤΙΚΗ", name: "ΒΟΥΛΑ" },
        { region: "ΑΤΤΙΚΗ", name: "ΒΟΥΛΙΑΓΜΕΝΗ" },
        
        { region: "ΘΕΣΣΑΛΟΝΙΚΗ", name: "ΘΕΣΣΑΛΟΝΙΚΗ" },
        { region: "ΘΕΣΣΑΛΟΝΙΚΗ", name: "ΚΑΛΑΜΑΡΙΑ" },
        { region: "ΘΕΣΣΑΛΟΝΙΚΗ", name: "ΠΥΛΑΙΑ" },
        { region: "ΘΕΣΣΑΛΟΝΙΚΗ", name: "ΕΥΟΣΜΟΣ" },
        { region: "ΘΕΣΣΑΛΟΝΙΚΗ", name: "ΣΤΑΥΡΟΥΠΟΛΗ" },
        
        { region: "ΠΕΛΟΠΟΝΝΗΣΟΣ", name: "ΠΑΤΡΑ" },
        { region: "ΠΕΛΟΠΟΝΝΗΣΟΣ", name: "ΚΑΛΑΜΑΤΑ" },
        { region: "ΠΕΛΟΠΟΝΝΗΣΟΣ", name: "ΣΠΑΡΤΗ" },
        { region: "ΠΕΛΟΠΟΝΝΗΣΟΣ", name: "ΚΟΡΙΝΘΟΣ" },
        { region: "ΠΕΛΟΠΟΝΝΗΣΟΣ", name: "ΤΡΙΠΟΛΗ" },
        { region: "ΠΕΛΟΠΟΝΝΗΣΟΣ", name: "ΝΑΥΠΛΙΟ" },
        { region: "ΠΕΛΟΠΟΝΝΗΣΟΣ", name: "ΑΡΓΟΣ" },
        
        { region: "ΚΡΗΤΗ", name: "ΗΡΑΚΛΕΙΟ" },
        { region: "ΚΡΗΤΗ", name: "ΧΑΝΙΑ" },
        { region: "ΚΡΗΤΗ", name: "ΡΕΘΥΜΝΟ" },
        { region: "ΚΡΗΤΗ", name: "ΑΓΙΟΣ ΝΙΚΟΛΑΟΣ" },
        
        { region: "ΣΤΕΡΕΑ ΕΛΛΑΔΑ", name: "ΛΑΜΙΑ" },
        { region: "ΣΤΕΡΕΑ ΕΛΛΑΔΑ", name: "ΧΑΛΚΙΔΑ" },
        { region: "ΣΤΕΡΕΑ ΕΛΛΑΔΑ", name: "ΘΗΒΑ" },
        { region: "ΣΤΕΡΕΑ ΕΛΛΑΔΑ", name: "ΛΙΒΑΔΕΙΑ" },
        
        { region: "ΜΑΚΕΔΟΝΙΑ", name: "ΚΑΒΑΛΑ" },
        { region: "ΜΑΚΕΔΟΝΙΑ", name: "ΒΕΡΟΙΑ" },
        { region: "ΜΑΚΕΔΟΝΙΑ", name: "ΣΕΡΡΕΣ" },
        { region: "ΜΑΚΕΔΟΝΙΑ", name: "ΔΡΑΜΑ" },
        { region: "ΜΑΚΕΔΟΝΙΑ", name: "ΚΟΖΑΝΗ" },
        { region: "ΜΑΚΕΔΟΝΙΑ", name: "ΚΑΣΤΟΡΙΑ" },
        
        { region: "ΗΠΕΙΡΟΣ", name: "ΙΩΑΝΝΙΝΑ" },
        { region: "ΗΠΕΙΡΟΣ", name: "ΑΡΤΑ" },
        { region: "ΗΠΕΙΡΟΣ", name: "ΠΡΕΒΕΖΑ" },
        { region: "ΗΠΕΙΡΟΣ", name: "ΗΓΟΥΜΕΝΙΤΣΑ" },
        
        { region: "ΘΕΣΣΑΛΙΑ", name: "ΛΑΡΙΣΑ" },
        { region: "ΘΕΣΣΑΛΙΑ", name: "ΒΟΛΟΣ" },
        { region: "ΘΕΣΣΑΛΙΑ", name: "ΚΑΡΔΙΤΣΑ" },
        { region: "ΘΕΣΣΑΛΙΑ", name: "ΤΡΙΚΑΛΑ" },
        
        { region: "ΔΩΔΕΚΑΝΗΣΑ", name: "ΡΟΔΟΣ" },
        { region: "ΔΩΔΕΚΑΝΗΣΑ", name: "ΚΩΣ" },
        { region: "ΔΩΔΕΚΑΝΗΣΑ", name: "ΛΕΡΟΣ" },
        { region: "ΔΩΔΕΚΑΝΗΣΑ", name: "ΚΑΛΥΜΝΟΣ" },
        
        { region: "ΕΠΤΑΝΗΣΑ", name: "ΚΕΡΚΥΡΑ" },
        { region: "ΕΠΤΑΝΗΣΑ", name: "ΖΑΚΥΝΘΟΣ" },
        { region: "ΕΠΤΑΝΗΣΑ", name: "ΛΕΥΚΑΔΑ" },
        { region: "ΕΠΤΑΝΗΣΑ", name: "ΚΕΦΑΛΟΝΙΑ" },
    ];


    const { formData, setFormData } = useFormContext();
    
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

    const [isSubmitted, setIsSubmitted] = useState(false);
  
    
const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitted(true);

    const errors = {};
    let isValid = true;

    ['availability', 'employmentTime', 'location', 'experienceYears', 'maxChildren', 'pets', 'smoker'].forEach((field) => {
        if (!formData[field]) {
            errors[field] = true;
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
                birthdate: formData.birthdate ? Timestamp.fromDate(new Date(formData.birthdate)) : null, 
                availability: formData.availability ? Timestamp.fromDate(new Date(formData.availability)) : null,
                bio: bio.trim(),
            };

            const docRef = await addDoc(collection(db, "users"), preparedData);
            console.log("Document written with ID: ", docRef.id);
            navigate('/ThirdStep');
        } catch (e) {
            console.error("Error adding document: ", e.message);
            alert(`Σφάλμα κατά την αποθήκευση: ${e.message}`);
        }
    }
};

    
    
    
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

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
    


    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleSnackbarOpen = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };
    
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    


    useEffect(() => {
        const savedData = localStorage.getItem('formData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setFormData((prevData) => ({
                ...prevData,
                ...parsedData,
            }));
            if (parsedData.bio) setBio(parsedData.bio); 
            if (parsedData.availability) {
                setFormData((prevData) => ({
                    ...prevData,
                    availability: parsedData.availability,
                }));
            }
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
                <div className="step">
                    <div className="circle">1</div>
                    <div className="label">ΣΤΟΙΧΕΙΑ</div>
                </div>
                <div className="step active">
                    <div className="circle">2</div>
                    <div className="label">ΔΗΜΙΟΥΡΓΙΑ ΑΓΓΕΛΙΑΣ & ΟΡΙΣΤΙΚΗ ΥΠΟΒΟΛΗ</div>
                </div>
                <div className="step">
                    <div className="circle">3</div>
                    <div className="label">ΔΙΑΘΕΣΙΜΟΤΗΤΑ</div>
                </div>
            </div>
            <div className="content flex-grow-1 d-flex align-items-center justify-content-center">
                <Row className="row">
                    <p>Διαθεσιμότητα: (Πότε θα μπορούσατε να ξεκινήσετε;)</p>
                    <Datepicker 
                        name="availability" 
                        selected={formData.availability ? new Date(formData.availability) : null} 
                        onChange={(date) => {
                            setFormData(prev => ({
                                ...prev,
                                availability: date ? date.toISOString() : null
                            }));
                            setFormErrors(prev => ({
                                ...prev,
                                availability: !date
                            }));
                        }}
                        dateFormat="dd/MM/yyyy"
                    />

                    {formErrors.availability && <p className="error-text"><span style={{ color: 'red', fontSize: '12px' }}>Το πεδίο Διαθεσιμότητα είναι υποχρεωτικό </span></p>}
                   
                   
                    <FormControl component="fieldset" fullWidth className="my-3">
                        <p>Χρόνος Απασχόλησης:</p>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <label>
                                <input
                                    type="radio"
                                    name="employmentTime"
                                    value="Μερική"
                                    checked={formData.employmentTime === "Μερική"}
                                    onChange={handleInputChange}
                                />
                                Μερική Απασχόληση
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="employmentTime"
                                    value="Πλήρης"
                                    checked={formData.employmentTime === "Πλήρης"}
                                    onChange={handleInputChange}
                                />
                                Πλήρης Απασχόληση
                            </label>
                        </div>
                        {formErrors.employmentTime && (
                            <span style={{ color: 'red', fontSize: '12px' }}>
                                Το πεδίο Χρόνος Απασχόλησης είναι υποχρεωτικό
                            </span>
                        )}
                    </FormControl>

                    <Autocomplete
                        fullWidth
                        options={citiesAndTowns.map((city) => `${city.region}:${city.name}`)} 
                        getOptionLabel={(option) => option || ""} 
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Τόπος Κατοικίας"
                                className="my-3"
                                helperText={formErrors.location ? (
                                    <span style={{ color: 'red', fontSize: '12px' }}>Το πεδίο Τόπος Κατοικίας είναι υποχρεωτικό</span>
                                ) : null}
                            />
                        )}
                        value={formData.location || ""} 
                        onChange={(event, newValue) => {
                            setFormData({ ...formData, location: newValue || "" }); 
                            setFormErrors({ ...formErrors, location: !newValue }); 
                        }}
                        filterSelectedOptions
                    />


                    <Col>
                        <FormControl fullWidth className="my-3">
                            <InputLabel>Έτη προϋπηρεσίας</InputLabel>
                            <Select name="experienceYears"
                                value={formData.experienceYears}
                                onChange={handleInputChange}
                                defaultValue=""
                            >
                                <MenuItem value="0">0</MenuItem>
                                <MenuItem value="1">1</MenuItem>
                                <MenuItem value="2">2</MenuItem>
                                <MenuItem value="3">3</MenuItem>
                                <MenuItem value="4+">4+</MenuItem>
                            </Select>
                            {formErrors.experienceYears && (
                                <span style={{ color: 'red', fontSize: '12px' }}>
                                Το πεδίο Έτη προϋπηρεσίας είναι υποχρεωτικό
                                </span>
                            )}
                        </FormControl>
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
                            <InputLabel>Μέχρι πόσα παιδια μπορείτε να αναλάβετε ταυτόχρονα;</InputLabel>
                            <Select name="maxChildren"
                                value={formData.maxChildren}
                                onChange={handleInputChange}
                                defaultValue=""
                            >
                                <MenuItem value="1">1</MenuItem>
                                <MenuItem value="2">2</MenuItem>
                                <MenuItem value="3">3</MenuItem>
                                <MenuItem value="4+">4+</MenuItem>
                            </Select>
                            {formErrors.maxChildren && (
                                <span style={{ color: 'red', fontSize: '12px' }}>
                                Το πεδίο Μέχρι πόσα παιδια μπορείτε να αναλάβετε είναι υποχρεωτικό
                                </span>
                            )}
                        </FormControl>
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
                            style: { borderColor: formErrors.bio && isSubmitted ? "red" : "none" },
                        }}
                        error={formErrors.bio && isSubmitted}
                        helperText={isSubmitted && formErrors.bio ? (
                            <span style={{ color: 'red', fontSize: '12px' }}>Αυτό το πεδίο είναι υποχρεωτικό</span>
                        ) : `Characters: ${wordCount}/${maxWords}`}
                    />

                        <p>   </p>
                        <p style={{ color: 'red', fontSize: '14px', marginBottom: '20px' }}>
                            * Όλα τα πεδία είναι υποχρεωτικά
                        </p>



                    <div className="buttons-pu1">
                        <button className="button-temp-pu1"onClick={handleTemporarySave}>Προσωρινή Αποθήκευση</button>
                        <button className="button-apply-pu1" onClick={handleSubmit}>Υποβολή</button>
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
            </div>
            <Footer />
        </div>
    );
}