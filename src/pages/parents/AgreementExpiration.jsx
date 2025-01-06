import React, { useState, useEffect } from 'react';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../providers/firebaseConfig';
import NavBarParents from '../../components/layout/NavBarParents';
import Footer from '../../components/layout/Footer';
import HelpButton from '../../components/buttons/HelpButton';
import { Row, Col } from 'react-bootstrap';
import { TextField, Alert, Snackbar } from '@mui/material';
import '../../styles/AgreementExpiration.css';
import { updateDoc } from "firebase/firestore";


export default function AgreementExpiration() {
    const [formData, setFormData] = useState({
        name: '',
        surname:'',
        address: '',
        phone: '',
        email: '',
        colleagueName: '',
        colleagueAddress: '',
        workHours: ''
    });
    const [isWorkingAtHome, setIsWorkingAtHome] = useState(false);
    const [isSureToTerminate, setIsSureToTerminate] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
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
                    setIsLoading(false);
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
                    where('isenable', '==', true)
                );
                
                
                const querySnapshot = await getDocs(activeAgreementQuery);
               
                
                if (querySnapshot.empty) {
                    setShowAlert(true);
                    setIsLoading(false);
                    return;
                }

                const activeAgreement = querySnapshot.docs[0].data();
                console.log('Active Agreement:', activeAgreement);
                console.log('Checking active agreement:', userData.name, userData.surname);
                console.log('Query Snapshot:', querySnapshot.docs.map(doc => doc.data()));


                
                const usersRef = collection(db, 'users');
                const nannyQuery = query(
                    usersRef,
                    where('name', '==', activeAgreement.nannyName),
                    where('surname', '==', activeAgreement.nannySurName)
                );
                const nannySnapshot = await getDocs(nannyQuery);

                let nannyLocation = 'Μη διαθέσιμη τοποθεσία';
                if (!nannySnapshot.empty) {
                    const nannyData = nannySnapshot.docs[0].data();
                    nannyLocation = nannyData.location || nannyLocation;
                }


                const workHoursFrom = activeAgreement.workHoursFrom.split(':');
                const workHoursTo = activeAgreement.workHoursTo.split(':');
                const startTime = new Date();
                const endTime = new Date();

                startTime.setHours(parseInt(workHoursFrom[0]), parseInt(workHoursFrom[1]));
                endTime.setHours(parseInt(workHoursTo[0]), parseInt(workHoursTo[1]));

                const hoursDifference = (endTime - startTime) / (1000 * 60 * 60);

                
                setFormData({
                    name: `${userData.name} ${userData.surname}`,
                    address: userData.residence || '',
                    phone: userData.phone || '',
                    email: activeAgreement.parentEmail || '',
                    colleagueName: `${activeAgreement.nannyName} ${activeAgreement.nannySurName}` ,
                    colleagueAddress: nannyLocation || '',
                    workHours: hoursDifference >= 7 ? 'ΠΛΗΡΗΣ ΑΠΑΣΧΟΛΗΣΗ' : 'ΜΕΡΙΚΗ ΑΠΑΣΧΟΛΗΣΗ'
                });

               
            } catch (error) {
                console.error('Error fetching data: ', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);


    const handleSubmit = async () => {
        if (!isSureToTerminate) {
            setShowAlert(true);
        } else {
            setShowAlert(false);
    
            try {
                
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    console.error('User ID is not available');
                    setIsLoading(false);
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
                    where('isenable', '==', true)
                );
                
    
                const querySnapshot = await getDocs(activeAgreementQuery);
    
                if (!querySnapshot.empty) {
                    
                    const docRef = querySnapshot.docs[0].ref;
                    await updateDoc(docRef, { isenable: false });
    
                    
                    setShowAlert(false);
                    setSnackbarOpen(true);
                    setSnackbarMessage("Η λήξη του συμφωνητικού έγινε επιτυχώς.");
                    setSnackbarSeverity("success");
    
                    
                    setTimeout(() => navigate("/ParentHomepage"), 2000);
                } else {
                    setShowAlert(true);
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
            <p className='top-text'>Λήξη Συμφωνητικού</p>
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
                        InputProps={{ readOnly: true }}
                    />
                </Col>
            </Row>
            <Row>
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
                    <p className='text'>Θα ήθελα να ΔΙΑΚΟΨΩ την συνεργασία μου με τον/την</p>
                </Col>
                <Col>
                    <TextField
                        fullWidth
                        className='text-field'
                        value={formData.colleagueName}
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
                    <p className='text'>με</p>
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
                    <p className='text'>ΕΙΜΑΙ ΣΙΓΟΥΡΟΣ ΟΤΙ ΘΕΛΩ ΝΑ ΔΙΑΚΟΨΩ ΤΗΝ ΔΙΑΔΙΚΑΣΙΑ</p>
                </Col>
                <Col>
                    <input
                        type="checkbox"
                        className='checkbox'
                        onChange={(e) => setIsSureToTerminate(e.target.checked)}
                    />
                </Col>
            </Row>
            {showAlert && (
                <Alert
                    severity="error"
                    className="alert"
                    onClose={() => setShowAlert(false)}
                >
                    Παρακαλώ ελέγξτε αν είστε σίγουροι ότι θέλετε να διακόψετε την διαδικασία.
                </Alert>
            )}
            {showAlert && (
                <Alert
                    severity="error"
                    className="alert"
                    onClose={() => setShowAlert(false)}
                >
                    Δεν υπάρχει ενεργό συμφωνητικό για τον χρήστη.
                </Alert>
            )}
            <button type="button" className="button-apply" onClick={handleSubmit}>
                Υποβολή
            </button>
            <p
                onClick={() => navigate('/AgreementRenewal')}
                className='side-button'
                style={{ cursor: 'pointer' }} 
            >
                ΘΑ ΗΘΕΛΑ ΝΑ ΑΝΑΝΕΩΣΩ ΤΟ ΣΥΜΒΟΛΑΙΟ
            </p>
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
