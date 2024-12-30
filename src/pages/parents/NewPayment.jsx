import React, { useState }  from 'react';
import Footer from '../../components/layout/Footer';
import TextField from '@mui/material/TextField';
import NavBarParents from '../../components/layout/NavBarParents';
import '../../styles/NewPayment.css';
import HelpButton from '../../components/buttons/HelpButton'

export default function NewPayment() {

     const [isChecked, setIsChecked] = useState(false);
        const handleCheckboxChange = () => {
            setIsChecked(!isChecked);  
        };
        const [formErrors, setFormErrors] = useState({});

    return(<div className='new-payment'>
            <NavBarParents/>
            <HelpButton/>
            <p className='new-payment-text'>Νέα πληρωμή</p>
            <div className='name'>
                <p className='name-text'>Ονοματεπώνυμο:</p>
                <TextField fullWidth={false}  type="text" className="text-name" value="ΜΑΡΙΑ ΜΩΜΜΟΥ (ΘΑ ΣΥΜΠΛΗΡΩΝΕΤΑΙ ΑΥΤΟΜΑΤΑ ΜΕ ΒΑΣΗ ΤΟ ΣΥΜΦΩΝΗΤΙΚΟ)" disabled />
            </div>
            <div className='email'>
                <p className='email-text'>Email</p>
                <TextField fullWidth={false}  type="text" className="text-email" value="mariamommou@gmail.com (ΘΑ ΣΥΜΠΛΗΡΩΝΕΤΑΙ ΑΥΤΟΜΑΤΑ ΜΕ ΒΑΣΗ ΤΟ ΣΥΜΦΩΝΗΤΙΚΟ)" disabled/>
            </div>
            <div className='declaration'>
                <span className='span-text'>Δηλώνω υπεύθυνα ότι η Μαρία Μώμμου δούλεψε φροντίζοντας το παιδί μου από 12/12/2024 έως 12/01/2025. Γνωρίζω  ότι η δήλωση ψευδών στοιχείων διώκεται ποινικά. (ΘΑ ΣΥΜΠΛΗΡΩΝΕΤΑΙ ΑΥΤΟΜΑΤΑ ΜΕ ΒΑΣΗ ΤΟ ΣΥΜΦΩΝΗΤΙΚΟ)</span>
                    <input
                        className='checkbox' 
                        type="checkbox" 
                        checked={isChecked} 
                        onChange={handleCheckboxChange} 
                        error={formErrors.name}
                        helperText={formErrors.name && "Πρέπει να συμπληρωθεί για να προχωρήσετε παρακάτω"}
                    />
            </div>
                <button type="submit" className='pay'>Πληρωμή</button>
                <Footer />
            </div>);
}