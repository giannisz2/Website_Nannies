import React, { useState, useEffect } from 'react';
import NavBarParents from '../../components/layout/NavBarParents';
import Footer from '../../components/layout/Footer';
import { Row, Col } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import HelpButton from '../../components/buttons/HelpButton';
import { Alert,Snackbar } from '@mui/material';
import '../../styles/Agreement.css';
import { db } from '../../providers/firebaseConfig.js';
import { collection, addDoc, query, where,getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import {  doc, getDoc } from 'firebase/firestore';
import { TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { writeBatch } from 'firebase/firestore';
import Breadcrumb from '../../components/layout/Breadcrumb2';




export default function ParentsAgreement() {
    
    const [formData, setFormData] = useState({
        nannyName: '',
        nannySurName: '',
        parentName:'',
        parentSurname: '',
        parentEmail: '',
        workHoursFrom: dayjs('09:30', 'HH:mm'),
        workHoursTo: dayjs('17:00', 'HH:mm'),
        startDate: dayjs(),
        isenable: true,
        
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


    const handleTimeChange = (name, newValue) => {
        setFormData((prev) => ({ ...prev, [name]: newValue }));
    };

    useEffect(() => {
        const fetchParentData = async () => {
            const userId = localStorage.getItem("userId");
            if (userId) {
                try {
                   
                    const parentRef = doc(db, "Parent", userId);
                    const parentSnap = await getDoc(parentRef);
                    if (parentSnap.exists()) {
                        const parentData = parentSnap.data();
                        setFormData((prev) => ({
                            ...prev,
                            parentName: parentData.name,
                            parentSurname: parentData.surname,
                            parentEmail: parentData.email,
                        }));
    
                        
                        const agreementsRef = collection(db, "agreements");
                        const activeAgreementQuery = query(
                            agreementsRef,
                            where("parentName", "==", parentData.name),
                            where("parentSurname", "==", parentData.surname),
                            where("isenable", "==", true)
                        );
    
                        const querySnapshot = await getDocs(activeAgreementQuery);
                        if (!querySnapshot.empty) {
                            // Εμφάνιση μηνύματος σφάλματος εάν υπάρχει ενεργό συμφωνητικό
                            handleSnackbarOpen(
                                "Υπάρχει ήδη ενεργό συμφωνητικό για τον χρήστη.",
                                "error"
                            );
                            setTimeout(() => navigate("/ParentHomepage"), 3000); // Μεταφορά στην Αρχική Σελίδα
                            return;
                        }
                    } else {
                        console.error("Δεν βρέθηκαν δεδομένα γονέα.");
                        handleSnackbarOpen("Δεν βρέθηκαν δεδομένα για τον χρήστη.", "error");
                    }
                } catch (error) {
                    console.error("Σφάλμα κατά την ανάκτηση δεδομένων γονέα: ", error);
                    handleSnackbarOpen("Σφάλμα κατά την ανάκτηση δεδομένων.", "error");
                }
            } else {
                console.error("Δεν υπάρχει συνδεδεμένος χρήστης.");
                handleSnackbarOpen("Δεν υπάρχει συνδεδεμένος χρήστης.", "error");
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
            
            const workHoursFrom = formData.workHoursFrom.hour() * 60 + formData.workHoursFrom.minute();
        const workHoursTo = formData.workHoursTo.hour() * 60 + formData.workHoursTo.minute();
        const totalMinutes = workHoursTo - workHoursFrom;

        if (totalMinutes <= 0) {
            handleSnackbarOpen(
                "Η Ώρα Έναρξης πρέπει να είναι πριν την Ώρα Λήξης.",
                "error"
            );
            return;
        }

        // Εύρεση νταντάς στο db users
        const usersRef = collection(db, "users");
        const nannyQuery = query(
            usersRef,
            where("name", "==", formData.nannyName),
            where("surname", "==", formData.nannySurName)
        );
        const nannySnapshot = await getDocs(nannyQuery);

        if (nannySnapshot.empty) {
            handleSnackbarOpen(
                "Η νταντά που καταχωρήσατε δεν υπάρχει στο σύστημα.",
                "error"
            );
            return;
        }

        const nannyData = nannySnapshot.docs[0].data();
        const employmentTime = nannyData.employmentTime;

        // Έλεγχος ωρών εργασίας βάσει τύπου απασχόλησης
        const maxMinutes = employmentTime === "Μερική" ? 360 : 480;
        if (totalMinutes > maxMinutes) {
            handleSnackbarOpen(
                `Η μέγιστη διάρκεια για ${employmentTime === "Μερική" ? "Μερική" : "Πλήρη"} απασχόληση είναι ${maxMinutes / 60} ώρες.`,
                "error"
            );
            return;
        }



            const agreementsRef = collection(db, 'agreements');
            const existingAgreementQuery = query(
                agreementsRef,
                where("parentName", "==", formData.parentName),
                where("parentSurname", "==", formData.parentSurname),
                where("nannyName", "==", formData.nannyName),
                where("nannySurName", "==", formData.nannySurName)
            );
            const existingAgreementSnapshot = await getDocs(existingAgreementQuery);
    
            if (!existingAgreementSnapshot.empty) {
                handleSnackbarOpen(
                    "Υπάρχει ήδη συμφωνητικό με τη συγκεκριμένη νταντά. Παρακαλώ μεταβείτε στην ανανέωση συμφωνητικού.",
                    "error"
                );
                setTimeout(() => navigate("/AgreementRenewal"), 3000);
                return;
            }


            
        const activeAgreementQuery = query(
            agreementsRef,
            where("nannyName", "==", formData.nannyName),
            where("nannySurName", "==", formData.nannySurName),
            where("isenable", "==", true)
        );

        const activeAgreementSnapshot = await getDocs(activeAgreementQuery);
        if (!activeAgreementSnapshot.empty) {
            handleSnackbarOpen(
                "Η νταντά έχει ήδη ενεργό συμφωνητικό με άλλον γονέα.",
                "error"
            );
            return;
        }



    
            const otherAgreementsQuery = query(
                agreementsRef,
                where("parentName", "==", formData.parentName),
                where("parentSurname", "==", formData.parentSurname)
            );
            const otherAgreementsSnapshot = await getDocs(otherAgreementsQuery);
    
            const batch = writeBatch(db); // Δημιουργία batch
            otherAgreementsSnapshot.forEach((doc) => {
                batch.delete(doc.ref);
            });
            await batch.commit();
        
            
            const formattedData = {
                ...formData,
                workHoursFrom: formData.workHoursFrom.format('HH:mm'), 
                workHoursTo: formData.workHoursTo.format('HH:mm'), 
                startDate: formData.startDate.toDate(), 
                isenable: formData.isenable, 
            };
            const docRef = await addDoc(collection(db, 'agreements'), formattedData);
            console.log('Document written with ID: ', docRef.id);
            handleSnackbarOpen("Το συμφωνητικό δημιουργήθηκε επιτυχώς.", "success");
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <>
            <div className="nanny-agreement">
                <NavBarParents />
                <Breadcrumb label="Νέο συμφωνητικό"/>
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
        <Col md={6} className="d-flex flex-column">
        <p> Ωράριο Εργασίας:</p>
            <TimePicker
                label="Ώρα Από"
                value={formData.workHoursFrom}
                onChange={(newValue) => handleTimeChange('workHoursFrom', newValue)}
                renderInput={(params) => <TextField {...params} className="mb-3" />}
            />
            <p></p>
            <TimePicker
                label="Ώρα Μέχρι"
                value={formData.workHoursTo}
                onChange={(newValue) => handleTimeChange('workHoursTo', newValue)}
                renderInput={(params) => <TextField {...params} />}
            />
        </Col>
                        <Col md={6}>
                    <p>Έναρξη Εργασίας:</p>
                    <DatePicker
                        label="Επιλέξτε Ημερομηνία"
                        value={formData.startDate}
                        onChange={(newValue) => setFormData((prev) => ({ ...prev, startDate: newValue }))}
                        renderInput={(params) => <TextField {...params} />}
                    />
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
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
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
         </LocalizationProvider>
    );
}