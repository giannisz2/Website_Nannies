import React, { useState } from 'react';
import Footer from '../../components/layout/Footer';
import TextField from '@mui/material/TextField';
import NavBarParents from '../../components/layout/NavBarParents';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import HelpButton from '../../components/buttons/HelpButton';
import '../../styles/NewPayment.css';


export default function NewPayment() {
    const navigate = useNavigate();

    const completePayment = () => {
        if (!isChecked) {
            setFormErrors({ checkbox: 'Πρέπει να επιβεβαιώσετε την υπεύθυνη δήλωση για να συνεχίσετε.' });
            return;
        }
        navigate('/PaymentDone');
    };

    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        if (formErrors.checkbox) {
            setFormErrors({ ...formErrors, checkbox: '' }); // Clear the error if the user checks the box
        }
    };

    const [formErrors, setFormErrors] = useState({});

    return (
        <div className="new-payment">
            <NavBarParents />
            <HelpButton />
            <p className="new-payment-text">Νέα πληρωμή</p>
            <div className="name">
                <p className="name-text">Ονοματεπώνυμο:</p>
                <TextField
                    fullWidth={false}
                    type="text"
                    className="text-name"
                    value="ΜΑΡΙΑ ΜΩΜΜΟΥ (ΘΑ ΣΥΜΠΛΗΡΩΝΕΤΑΙ ΑΥΤΟΜΑΤΑ ΜΕ ΒΑΣΗ ΤΟ ΣΥΜΦΩΝΗΤΙΚΟ)"
                    disabled
                />
            </div>
            <div className="email">
                <p className="email-text">Email</p>
                <TextField
                    fullWidth={false}
                    type="text"
                    className="text-email"
                    value="mariamommou@gmail.com (ΘΑ ΣΥΜΠΛΗΡΩΝΕΤΑΙ ΑΥΤΟΜΑΤΑ ΜΕ ΒΑΣΗ ΤΟ ΣΥΜΦΩΝΗΤΙΚΟ)"
                    disabled
                />
            </div>
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
