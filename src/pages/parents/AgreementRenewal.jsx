import React, { useState, useEffect } from 'react';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../providers/firebaseConfig';
import NavBarParents from '../../components/layout/NavBarParents';
import Footer from '../../components/layout/Footer';
import HelpButton from '../../components/buttons/HelpButton';
import { Row, Col } from 'react-bootstrap';
import { TextField, Alert, Snackbar } from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import '../../styles/AgreementRenewal.css';
import{updateDoc} from "firebase/firestore"



export default function AgreementRenewal() {
    const [formData, setFormData] = useState({
        name: '',
        surname:'',
        address: '',
        phone: '',
        email:'',
        colleagueName: '',
        colleagueAddress: '',
        workHours: ''
    });
    const [isWorkingAtHome, setIsWorkingAtHome] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);


    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    console.error('User ID is not available');
                    setSnackbarMessage("Δεν βρέθηκε αναγνωριστικό χρήστη.");
                    setSnackbarSeverity("error");
                    setIsLoading(false);
                    return;
                }

                const userRef = doc(db, 'Parent', userId);
                const userDoc = await getDoc(userRef);

                if (!userDoc.exists()) {
                    console.error('No such document!');
                    setSnackbarMessage("Δεν βρέθηκαν δεδομένα για τον χρήστη.");
                    setSnackbarSeverity("error");
                    setIsLoading(false);
                    return;
                }

                const userData = userDoc.data();

                const agreementsRef = collection(db, 'agreements');
                const activeAgreementQuery = query(
                    agreementsRef,
                    where('parentName','==', userData.name),
                    where('parentSurname','==', userData.surname),
                    where('isenable', '==', false)
                );

                const querySnapshot = await getDocs(activeAgreementQuery);

                if (querySnapshot.empty) {
                    setShowAlert(true);
                    setSnackbarOpen(true);
                    setSnackbarMessage("Δεν υπάρχει κάποιο προηγούμενο συμφωνητικό ή είναι ήδη ενεργό κάποιο συμφωνητικό.");
                    setSnackbarSeverity("error");
                    setIsLoading(false);
                    return;
                }


                const activeAgreement = querySnapshot.docs[0].data();
                console.log('Active Agreement:', activeAgreement);
               

                const usersRef = collection(db, 'users');
                const nannyQuery = query(
                    usersRef,
                    where('name', '==', activeAgreement.nannyName),
                    where('surname', '==', activeAgreement.nannySurName)
                );
                const nannySnapshot = await getDocs(nannyQuery);

                let nannyLocation = 'Μη διαθέσιμη τοποθεσία';
                let workHoursLabel = 'ΠΛΗΡΕΣ ΩΡΑΡΙΟ';


                if (!nannySnapshot.empty) {
                    const nannyData = nannySnapshot.docs[0].data();
                    nannyLocation = nannyData.location || nannyLocation;
                
                    if (nannyData.employmentTime === "Μερική") {
                        workHoursLabel = "ΜΕΡΙΚΗ ΑΠΑΣΧΟΛΗΣΗ";
                    } else if (nannyData.employmentTime === "Πλήρης") {
                        workHoursLabel = "ΠΛΗΡΗΣ ΑΠΑΣΧΟΛΗΣΗ";
                    }
                
                }



                


                setFormData({
                    name: `${userData.name} ${userData.surname}`,
                    address: userData.residence || '',
                    phone: userData.phone || '',
                    email: activeAgreement.parentEmail || '',
                    colleagueName: `${activeAgreement.nannyName} ${activeAgreement.nannySurName}` ,
                    colleagueAddress: nannyLocation || '',
                    workHours: workHoursLabel
                });


            } catch (error) {
                console.error('Error fetching data: ', error);
                setSnackbarOpen(true);
                setSnackbarMessage("Προέκυψε σφάλμα κατά την ανάκτηση δεδομένων.");
                setSnackbarSeverity("error");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async () => {
        if ( !startTime || !endTime) {
            setSnackbarOpen(true);
            setSnackbarMessage("Παρακαλώ συμπληρώστε τις ώρες εργασίας.");
            setSnackbarSeverity("error");
        }else {
               
            const startHours = startTime.hour();
            const startMinutes = startTime.minute();
            const endHours = endTime.hour();
            const endMinutes = endTime.minute();

            const totalMinutes = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);

            
            const maxMinutes = formData.workHours === "ΜΕΡΙΚΗ ΑΠΑΣΧΟΛΗΣΗ" ? 360 : 480; // 6 ώρες = 360 λεπτά, 8 ώρες = 480 λεπτά
        
            if (totalMinutes >= maxMinutes) {
                setSnackbarOpen(true);
                setSnackbarMessage(`Δεν μπορείτε να δηλώσετε πάνω από ${maxMinutes / 60} ώρες εργασίας που θα ήθελε η νταντά.`);
                setSnackbarSeverity("error");
                return;
            }

            try {
                
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    console.error('User ID is not available');
                    setSnackbarOpen(true);
                    setSnackbarMessage("Δεν βρέθηκε αναγνωριστικό χρήστη.");
                    setSnackbarSeverity("error");
                    return;
                }

                
                const userRef = doc(db, 'Parent', userId);
                const userDoc = await getDoc(userRef);

                if (!userDoc.exists()) {
                    console.error('No such document!');
                    setIsLoading(false);
                    return;
                }

                const userData = userDoc.data();

                
                const agreementsRef = collection(db, 'agreements');
                const activeAgreementQuery = query(
                    agreementsRef,
                    where('parentName','==', userData.name),
                    where('parentSurname','==', userData.surname),
                    where('isenable', '==', false)
                );
                
    
                const querySnapshot = await getDocs(activeAgreementQuery);
    
                if (!querySnapshot.empty) {
                    
                    const docRef = querySnapshot.docs[0].ref;
                    await updateDoc(docRef, {
                        isenable: true,
                        workHoursFrom: `${startHours}:${startMinutes.toString().padStart(2, '0')}`,
                        workHoursTo: `${endHours}:${endMinutes.toString().padStart(2, '0')}`
                    });
    
                    
                    
                    setSnackbarOpen(true);
                    setSnackbarMessage("Η ανανέωση του συμφωνητικού έγινε επιτυχώς.");
                    setSnackbarSeverity("success");
    
                    
                    setTimeout(() => navigate("/ParentHomepage"), 2000);
                } else {
                    setSnackbarOpen(true);
                    setSnackbarMessage("Δεν υπάρχει προηγούμενο συμφωνητικό για ανανέωση.");
                    setSnackbarSeverity("error");
                }
            } catch (error) {
                console.error("Error updating agreement:", error);
                setSnackbarOpen(true);
                setSnackbarMessage("Σφάλμα κατά τη λήξη του συμφωνητικού.");
                setSnackbarSeverity("error");
            }
        }
    };


    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <NavBarParents />
            <p className='top-text'>Ανανέωση Συμφωνητικού</p>
            <HelpButton />

            <Row>
                <Col>
                    <p className='text'>Εγώ ο/η</p>
                </Col>
                <Col>
                    <TextField
                        fullWidth
                        className='text-field'
                        value={formData.name}
                        placeholder="ΠΕΤΡΟΣ ΑΝΑΣΤΑΣΙΟΥ (ΘΑ ΣΥΜΠΛΗΡΩΝΕΤΑΙ ΑΥΤΌΜΑΤΑ ΑΠΟ ΤΟ ΣΥΣΤΗΜΑ)"
                        InputProps={{ readOnly: true }}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className='text'>Που μένω στην διεύθυνση</p>
                </Col>
                <Col>
                    <TextField
                        fullWidth
                        className='text-field'
                        value={formData.address}
                        placeholder="ΠΑΠΑΓΡΗΓΟΡΙΟΥ 7, 11855, ΑΘΗΝΑ (ΘΑ ΣΥΜΠΛΗΡΩΝΕΤΑΙ ΑΥΤΌΜΑΤΑ ΑΠΟ ΤΟ ΣΥΣΤΗΜΑ)"
                        InputProps={{ readOnly: true }}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className='text'>με κινητό τηλέφωνο</p>
                </Col>
                <Col>
                    <TextField
                        fullWidth
                        className='text-field'
                        value={formData.phone}
                        placeholder="+44 592 410 845 (ΘΑ ΣΥΜΠΛΗΡΩΝΕΤΑΙ ΑΥΤΌΜΑΤΑ ΑΠΟ ΤΟ ΣΥΣΤΗΜΑ)"
                        InputProps={{ readOnly: true }}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className='text'>και email</p>
                </Col>
                <Col>
                    <p className='text'>και email</p>
                </Col>
                <Col>
                    <TextField
                        fullWidth
                        className='text-field'
                        value={formData.email}
                        InputProps={{ readOnly: true }}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className='text'>Θα ήθελα να ΑΝΑΝΕΩΣΩ την συνεργασία μου με τον/την</p>
                </Col>
                <Col>
                    <TextField
                        fullWidth
                        className='text-field'
                        value={formData.colleagueName}
                        placeholder="ΜΑΡΙΑ ΜΩΜΜΟΥ (ΘΑ ΣΥΜΠΛΗΡΩΝΕΤΑΙ ΑΥΤΌΜΑΤΑ ΑΠΟ ΤΟ ΣΥΣΤΗΜΑ)"
                        InputProps={{ readOnly: true }}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className='text'>που διαμένει στην</p>
                </Col>
                <Col>
                    <TextField
                        fullWidth
                        className='text-field'
                        value={formData.colleagueAddress}
                        placeholder="ΚΥΨΕΛΗ (ΘΑ ΣΥΜΠΛΗΡΩΝΕΤΑΙ ΑΥΤΌΜΑΤΑ ΑΠΟ ΤΟ ΣΥΣΤΗΜΑ)"
                        InputProps={{ readOnly: true }}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className='text'>και εργάζεται στην κατοικία μου</p>
                </Col>
                <Col>
                    <input
                        type="checkbox"
                        className='checkbox'
                        onChange={(e) => setIsWorkingAtHome(e.target.checked)}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className='text'>που θα ήθελε να δουλέυει με</p>
                </Col>
                <Col>
                    <TextField
                        fullWidth
                        className='text-field'
                        value={formData.workHours}
                        placeholder="ΠΛΗΡΕΣ ΩΡΑΡΙΟ"
                        InputProps={{ readOnly: true }}
                    />
                </Col>
            </Row>
            <Row>
            <Col>
                <p className='text'>στις ωρες</p>
            </Col>
            <Col>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                    label="Ώρα Έναρξης"
                    value={startTime}
                    onChange={(newValue) => setStartTime(newValue)} 
                    renderInput={(params) => <TextField {...params} />}
                />
                <TimePicker
                    label="Ώρα Λήξης"
                    value={endTime}
                    onChange={(newValue) => setEndTime(newValue)} 
                    renderInput={(params) => <TextField {...params} />}
                />
                </LocalizationProvider>
            </Col>
            </Row>
            {showAlert && (
                <Alert
                    severity="error"
                    className="alert"
                    onClose={() => setShowAlert(false)}
                >
                    Παρακαλώ ελέγξτε η νταντά αν εργάζεται στην κατοικία σας, αν έχετε εισάγει το email σας και αν έχετε επιλέξει ώρες.
                </Alert>
            )}
            <button type="button" className="button-apply" onClick={handleSubmit}>
                Υποβολή
            </button>
             <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <Footer />
        </div>
    );
}





