import React, { useState } from 'react';
import NavBarNannies from '../../components/layout/NavbarNannies';
import Footer from '../../components/layout/Footer';
import { Row, Col } from 'react-bootstrap';
import '../../styles/Voucher.css';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import QR__CODE from '../../assets/images/qr_code.jpg';
import HelpButton from '../../components/buttons/HelpButton';
import Alert from '@mui/material/Alert';

export default function Voucher() {
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        if (formErrors.checkbox) {
            setFormErrors({ ...formErrors, checkbox: '' }); 
        }
    };
    const [formData, setFormData] = useState({
        iban: '',
        beneficiary: '',
        bank: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev) => ({ ...prev, [name]: !value }));
    };

    const checkFormValidity = () => {
        const errors = {};
        let isValid = true;

        ['iban', 'beneficiary', 'bank'].forEach((field) => {
            if (!formData[field] || formData[field].trim() === '' && ('name' || 'beneficiary' || 'bank')) {
                errors[field] = true;
                isValid = false;
            }
        });
        if (!isChecked) {
            errors.checkbox = 'Πρέπει να επιβεβαιώσετε την υπεύθυνη δήλωση για να συνεχίσετε.'; 
            isValid = false;
        }
        setFormErrors(errors);
        return isValid;
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
    const handleSubmit = (event) => {
        event.preventDefault();
    
        if (checkFormValidity()) {
            navigate('/Voucher2'); 
        } else {
            handleSnackbarOpen('Παρακαλώ συμπληρώστε όλα τα πεδία και επιβεβαιώστε το συμφωνητικό.'); 
        }
    };
    

    return (
        <>
            <div className="nanny-voucher">
                <NavBarNannies />
                <HelpButton />
                <p className="this_text">Voucher</p>
                <p className="this_text-voucher" style={{ display: 'inline-block', marginRight: '10px' }}>Το ποσό που σου αντιστοιχεί είναι: </p>
                <p className="text-voucher2" style={{ display: 'inline-block' }}>800 € </p>
                <p className="text-voucher1">Μπορείς να λάβεις τα χρήματα είτε γράφοντας το IBAN σου και να περιμένεις 5 εργάσιμες μέρες
                                        είτε σκανάροντας το QR-Code </p>
                <div className="content flex-grow-1 d-flex align-items-center justify-content-center"> 
                    <Row className="align-items-start justify-content-center g-5 m-0 w-100">
                       <Col
                            md={6}
                            xs={12}
                            className="d-flex flex-column align-items-center justify-content-center text-center"
                            style={{ gap: '15px' }} 
                        >
                            <TextField
                                fullWidth={false}  label="IBAN:" type="text" name="iban" value={formData.iban} onChange={handleInputChange}
                                className="text-agreement2"
                                error={formErrors.iban}
                                helperText={formErrors.iban ? 'Το πεδίο IBAN είναι υποχρεωτικό' : ''}
                            />
                            <TextField fullWidth={false} label="Δικαιούχος:" type="text" name="beneficiary"
                                value={formData.beneficiary} onChange={handleInputChange} className="text-agreement2"
                                error={formErrors.beneficiary}
                                helperText={formErrors.beneficiary ? 'Το πεδίο Δικαιούχος είναι υποχρεωτικό' : ''}
                            />
                            <TextField fullWidth={false} label="Τράπεζα:" type="text"
                                name="bank" value={formData.bank} onChange={handleInputChange} className="text-agreement2"
                                error={formErrors.bank}
                                helperText={formErrors.bank ? 'Το πεδίο Τράπεζα είναι υποχρεωτικό' : ''}
                            />
                        </Col>
                        <Col
                            md={6}
                            xs={12}
                            className="d-flex flex-column align-items-center justify-content-center text-center"
                        >
                        <img id="qr_code" src={QR__CODE} alt="QR-Code" className="mb-3"></img>
                        </Col>
                    </Row> 
                </div>              
                <div style={{ fontSize: '18px' }}>
                    <div style={{ display: 'flex',justifyContent:'center', alignItems: 'center', marginTop : '100px' }}>
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
                            style={{ marginTop: '10px', fontSize: '12px', padding: '5px 10px', width: 'auto', maxWidth: '300px', marginLeft: '20px',}}
                        >
                            {formErrors.checkbox ? 'Πρέπει να επιβεβαιώσετε το ωράριο και τις συνθήκες εργασίας σας' : ''}
                        </Alert>
                    )}                        
                    </div>
                </div>
                <button type="submit" onClick={handleSubmit} className="button-apply">Τελική υποβολή</button>
                <Footer />
            </div>
        </>
    );
}
