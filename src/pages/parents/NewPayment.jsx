import React, { useState, useEffect } from 'react';
import Footer from '../../components/layout/Footer';
import TextField from '@mui/material/TextField';
import NavBarParents from '../../components/layout/NavBarParents';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';
import HelpButton from '../../components/buttons/HelpButton';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../providers/firebaseConfig';
import '../../styles/NewPayment.css';

export default function NewPayment() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        parentName: '',
        nannyName: '',
        nannySurname: '',
        email: '',
        nannyPay: false,
    });

    const [isChecked, setIsChecked] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [agreement, setAgreement] = useState(null);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false);


    useEffect(() => {
        const fetchAgreement = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    console.error('User ID is not available');
                    setIsLoading(false);
                    return;
                }

                const parentRef = doc(db, 'Parent', userId);
                const parentSnap = await getDoc(parentRef);
        
                if (!parentSnap.exists()) {
                    console.error('Δεν βρέθηκαν δεδομένα για τον γονέα.');
                    return;
                }
        
                const parentData = parentSnap.data();
                const { name: name, surname: surname } = parentData;
        
                
                const agreementsRef = collection(db, 'agreements');
                const agreementsQuery = query(
                    agreementsRef,
                    where('parentName', '==', name),
                    where('parentSurname', '==', surname), 
                    where('isenable', '==', true));

                const agreementsSnapshot = await getDocs(agreementsQuery);

                if (!agreementsSnapshot.empty) {
                    const agreementData = agreementsSnapshot.docs[0].data();
                    setAgreement(agreementData);
                    setFormData({
                        parentName: `${agreementData.parentName} ${agreementData.parentSurname}`,
                        nannyName: `${agreementData.nannyName} ${agreementData.nannySurName}`,
                        email: agreementData.parentEmail,
                    });
                } else {
                    console.error('No active agreement found');
                }
            } catch (error) {
                console.error('Error fetching agreement: ', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAgreement();
    }, []);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        if (formErrors.checkbox) {
            setFormErrors({ ...formErrors, checkbox: '' });
        }
    };

    const getPreviousMonth = () => {
        const date = new Date();
        date.setMonth(date.getMonth() - 1);
        return date.toLocaleString('default', { month: 'long', year: 'numeric' });
    };

    const calculatePaymentAmount = () => {
        if (!agreement) return 0;

        const workHoursFrom = parseFloat(agreement.workHoursFrom || '0');
        const workHoursTo = parseFloat(agreement.workHoursTo || '0');
        const totalHours = workHoursTo - workHoursFrom;

        return totalHours <= 3600 ? 600 : 800;
    };

    const completePayment = async () => {
        if (!isChecked) {
            setFormErrors({ checkbox: 'Πρέπει να επιβεβαιώσετε την υπεύθυνη δήλωση για να συνεχίσετε.' });
            return;
        }

        try {
            const paymentRef = collection(db, 'payments');
            const currentMonth = new Date().getMonth();
            const paymentQuery = query(
                paymentRef,
                where('parentEmail', '==', formData.email),
                where('month', '==', currentMonth)
            );
            const paymentSnapshot = await getDocs(paymentQuery);

            if (!paymentSnapshot.empty) {
                setSnackbarMessage(`Η πληρωμή για τον μήνα ${getPreviousMonth()} έχει ήδη πραγματοποιηθεί.`);
                setShowSnackbar(true);
                return;
            }

            const paymentAmount = calculatePaymentAmount();

            await setDoc(doc(paymentRef), {
                parentEmail: formData.email,
                nannyName: formData.nannyName,
                amount: paymentAmount, 
                date: new Date(),
                month: currentMonth,
            });

            setSnackbarMessage(`Η πληρωμή των ${paymentAmount}€ για τον μήνα ${getPreviousMonth()} πραγματοποιήθηκε με επιτυχία!`);
            setShowSnackbar(true);

            setTimeout(() => {
                navigate('/ParentHomepage'); 
            }, 2000);
        } catch (error) {
            console.error('Error completing payment: ', error);
            setSnackbarMessage('Προέκυψε σφάλμα κατά την ολοκλήρωση της πληρωμής.');
            setShowSnackbar(true);
        }
    };

    return (
        <div className="new-payment">
            <NavBarParents className="navbar"/>
            
            <HelpButton />
            <p className="new-payment-text">Νέα πληρωμή</p>

            {isLoading ? (
                <p>Loading...</p>
            ) : agreement ? (
                <>
                    <div className="name">
                        <p className="name-text">Ονοματεπώνυμο:</p>
                        <TextField
                            fullWidth={false}
                            type="text"
                            className="text-name"
                            value={formData.parentName || 'Δεν βρέθηκαν δεδομένα'}
                            disabled
                        />
                    </div>
                    <div className="email">
                        <p className="email-text">Email:</p>
                        <TextField
                            fullWidth={false}
                            type="text"
                            className="text-email"
                            value={formData.email || 'Δεν βρέθηκαν δεδομένα'}
                            disabled
                        />
                    </div>
                    <div className="declaration">
                        <span className="span-text">
                            Δηλώνω υπεύθυνα ότι η/ο {formData.nannyName} δούλεψε φροντίζοντας το παιδί μου τον μήνα  τον μήνα {getPreviousMonth()}. Γνωρίζω ότι η δήλωση ψευδών στοιχείων διώκεται ποινικά.
                        </span>
                       
                        <input
                            className="checkbox-payment"
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                        {formErrors.checkbox && (
                            <Alert severity="error" style={{ marginTop: '10px' }}>
                                {formErrors.checkbox}
                            </Alert>
                        )}
                    </div>
                    <button onClick={completePayment} type="submit" className="pay">
                        Πληρωμή
                    </button>
                </>
            ) : (
                <p>Δεν υπάρχει ενεργό συμφωνητικό.</p>
            )}
            <Snackbar
                open={showSnackbar}
                autoHideDuration={6000}
                onClose={() => setShowSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                message={snackbarMessage}
            />
            <Footer />
        </div>
        
    );

}
