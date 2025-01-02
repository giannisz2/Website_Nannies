import React, { useState, useEffect } from 'react';
import Footer from '../../components/layout/Footer';
import TextField from '@mui/material/TextField';
import NavBarParents from '../../components/layout/NavBarParents';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import HelpButton from '../../components/buttons/HelpButton';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../providers/firebaseConfig';
import '../../styles/NewPayment.css';

export default function NewPayment() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        surname:'',
        email: '',
    });

    const [isChecked, setIsChecked] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);

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

                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setFormData({
                        fullName: `${data.name} ${data.surname}`,
                        email: data.email,
                    });
                } else {
                    console.error('No such document!');
                }
            } catch (error) {
                console.error('Error fetching user data: ', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        if (formErrors.checkbox) {
            setFormErrors({ ...formErrors, checkbox: '' });
        }
    };

    const completePayment = () => {
        if (!isChecked) {
            setFormErrors({ checkbox: 'Πρέπει να επιβεβαιώσετε την υπεύθυνη δήλωση για να συνεχίσετε.' });
            return;
        }
        navigate('/PaymentDone');
    };

    return (
        <div className="new-payment">
            <NavBarParents />
            <HelpButton />
            <p className="new-payment-text">Νέα πληρωμή</p>

            {isLoading ? (
                <p>Loading...</p> // Optional loading indicator
            ) : (
                <>
                    <div className="name">
                        <p className="name-text">Ονοματεπώνυμο:</p>
                        <TextField
                            fullWidth={false}
                            type="text"
                            className="text-name"
                            value={formData.fullName || 'Δεν βρέθηκαν δεδομένα'}
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
                </>
            )}

            <div className="declaration">
                <span className="span-text">
                    Δηλώνω υπεύθυνα ότι η Μαρία Μώμμου δούλεψε φροντίζοντας το παιδί μου από 12/12/2024 έως
                    12/01/2025. Γνωρίζω ότι η δήλωση ψευδών στοιχείων διώκεται ποινικά. (ΘΑ ΣΥΜΠΛΗΡΩΝΕΤΑΙ
                    ΑΥΤΟΜΑΤΑ ΜΕ ΒΑΣΗ ΤΟ ΣΥΜΦΩΝΗΤΙΚΟ)
                </span>
                <input
                    className="checkbox"
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
            <Footer />
        </div>
    );
}
