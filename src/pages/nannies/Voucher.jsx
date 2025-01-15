import React, { useState, useEffect } from 'react';
import NavBarNannies from '../../components/layout/NavbarNannies';
import Footer from '../../components/layout/Footer';
import { Row, Col } from 'react-bootstrap';
import '../../styles/Voucher.css';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import QR__CODE from '../../assets/images/qr_code.jpg';
import HelpButton from '../../components/buttons/HelpButton';
import Alert from '@mui/material/Alert';
import Breadcrumb from '../../components/layout/Breadcrumb';
import { Link } from "react-router-dom";
import { db } from '../../providers/firebaseConfig';
import { collection, query, where, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';


export default function Voucher() {
    const [isChecked, setIsChecked] = useState(false);
    const [formData, setFormData] = useState({
        iban: '',
        beneficiary: '',
        bank: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [isAlreadySubmitted, setIsAlreadySubmitted] = useState(false); 
    const [showAlert, setShowAlert] = useState(false);
    const [paymentData, setPaymentData] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPayment = async () => {
            try {
                const userId = localStorage.getItem('userId'); 
                if (!userId) {
                    console.error('Δεν βρέθηκε userId στο localStorage.');
                    return;
                }

                
                const nannyRef = doc(db, 'users', userId);
                const nannySnap = await getDoc(nannyRef);

                if (!nannySnap.exists()) {
                    console.error('Δεν βρέθηκαν δεδομένα για τη νταντά.');
                    return;
                }

                const nannyData = nannySnap.data();
                const { name: nannyName, surname: nannySurName } = nannyData;


                const nannyFullName = `${nannyData.name} ${nannyData.surname}`;
                console.log('Nanny Full Name:', nannyFullName);

                const currentMonth = new Date().getMonth();
                const paymentsRef = collection(db, 'payments');
                const paymentsQuery = query(
                    paymentsRef,
                    where('nannyName', '==', nannyFullName),
                    where('month', '==', currentMonth)
                );

                const paymentsSnapshot = await getDocs(paymentsQuery);
                if (!paymentsSnapshot.empty) {
                    const paymentDoc = paymentsSnapshot.docs[0];
                    const paymentData = paymentDoc.data();
                    console.log('Πληρωμή βρέθηκε:', paymentDoc.data());
 
                    if (paymentData.received) {
                        setIsDisabled(true); 
                    } else {
                        setPaymentData({ ...paymentData, id: paymentDoc.id });
                    }
                } else {
                    console.log('Δεν βρέθηκαν πληρωμές για τη νταντά.');
                }
            } catch (error) {
                console.error('Σφάλμα κατά την ανάκτηση των πληρωμών:', error);
            }
        };

        fetchPayment();
    }, []);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        if (formErrors.checkbox) {
            setFormErrors({ ...formErrors, checkbox: '' }); 
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev) => ({ ...prev, [name]: !value }));
    };

    const checkFormValidity = () => {
        const errors = {};
        let isValid = true;
    
        ['iban', 'beneficiary', 'bank'].forEach((field) => {
            if (!formData[field]?.trim()) { 
                errors[field] = true;
                isValid = false;
            }
        });
    
        if (!isChecked) {
            errors.checkbox = 'Πρέπει να επιβεβαιώσετε την υπεύθυνη δήλωση για να συνεχίσετε.';
            isValid = false;
        }
    
        setFormErrors(errors);
        console.log('Errors:', errors); 
        return isValid;
    };
    
    

    const handleSnackbarOpen = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };
    
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (checkFormValidity() && paymentData) {
            try {
                
                const paymentRef = doc(db, 'payments', paymentData.id);
                await updateDoc(paymentRef, { received: true });

                console.log('Η πληρωμή ενημερώθηκε ως ληφθείσα.');
                setIsDisabled(true); 
                navigate('/Voucher2'); 
            } catch (error) {
                console.error('Σφάλμα κατά την ενημέρωση της πληρωμής:', error);
            }
        } else {
            console.log('Παρακαλώ συμπληρώστε όλα τα πεδία.');
        }
    };
    return (
        <div className="nanny-voucher">
            <NavBarNannies />
            <HelpButton />
            <Breadcrumb label="Voucher"/>
            <p className='this_text'>Voucher</p>
            {paymentData ? ( 
                <>
                    <p className="this_text-voucher" style={{ display: 'inline-block', marginRight: '10px' }}>
                        Το ποσό που σου αντιστοιχεί είναι:
                    </p>
                    <p className="text-voucher2" style={{ display: 'inline-block' }}>
                        {paymentData.amount} €
                    </p>
                </>
            ) : (
                <p className="text-voucher1">Δεν υπάρχει πληρωμή για αυτόν τον μήνα.</p>
            )}
            <div className="content flex-grow-1 d-flex align-items-center justify-content-center">
                <Row className="align-items-start justify-content-center g-5 m-0 w-100">
                    <Col
                        md={6}
                        xs={12}
                        className="d-flex flex-column align-items-center justify-content-center text-center"
                        style={{ gap: '15px' }}
                    >
                        <TextField
                            fullWidth={false}
                            label="IBAN:"
                            type="text"
                            name="iban"
                            value={formData.iban}
                            onChange={handleInputChange}
                            className="text-agreement2"
                            error={formErrors.iban}
                            helperText={formErrors.iban ? 'Το πεδίο IBAN είναι υποχρεωτικό' : ''}
                        />
                        <TextField
                            fullWidth={false}
                            label="Δικαιούχος:"
                            type="text"
                            name="beneficiary"
                            value={formData.beneficiary}
                            onChange={handleInputChange}
                            className="text-agreement2"
                            error={formErrors.beneficiary}
                            helperText={formErrors.beneficiary ? 'Το πεδίο Δικαιούχος είναι υποχρεωτικό' : ''}
                        />
                        <TextField
                            fullWidth={false}
                            label="Τράπεζα:"
                            type="text"
                            name="bank"
                            value={formData.bank}
                            onChange={handleInputChange}
                            className="text-agreement2"
                            error={formErrors.bank}
                            helperText={formErrors.bank ? 'Το πεδίο Τράπεζα είναι υποχρεωτικό' : ''}
                        />
                    </Col>
                    <Col
                        md={6}
                        xs={12}
                        className="d-flex flex-column align-items-center justify-content-center text-center"
                    >
                        <img id="qr_code" src={QR__CODE} alt="QR-Code" className="mb-3" />
                    </Col>
                </Row>
            </div>
            <div style={{ fontSize: '18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '100px' }}>
                        <span style={{ marginRight: '10px' }}>Επιβεβαιώνω ότι έχω δουλέψει στο ωράριο που αναφέρεται στο συμφωνητικό μου και έχω μείνει
                            ικανοποιημένος/η από τις συνθήκες εργασίας μου
                        </span>
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                    {formErrors.checkbox && (
                        <Alert 
                            severity="error" 
                            style={{ marginTop: '10px', fontSize: '12px', padding: '5px 10px', width: 'auto', maxWidth: '300px', marginLeft: '20px', }}
                        >
                            {formErrors.checkbox ? 'Πρέπει να επιβεβαιώσετε το ωράριο και τις συνθήκες εργασίας σας' : ''}
                        </Alert>
                    )}                        
                    </div>
                </div>
            <button
                type="submit"
                onClick={handleSubmit}
                className="button-apply-voucher"
                disabled={isDisabled}
            >
                Τελική υποβολή
            </button>
            <Footer />
        </div>
    );
}