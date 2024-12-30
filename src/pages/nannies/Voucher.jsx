import React, { useState }  from 'react';
import NavBarNannies from '../../components/layout/NavbarNannies';
import Footer from '../../components/layout/Footer';
import { Row ,Col } from 'react-bootstrap'; // Εισαγωγή του Row
import '../../styles/Voucher.css';
import TextField from '@mui/material/TextField';
import QR__CODE from '../../assets/images/qr_code.jpg';
import HelpButton from '../../components/buttons/HelpButton'

export default function Voucher() {
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);  
    };

    return (
        <>
            <div className="nanny-voucher">
                <NavBarNannies />
                <HelpButton/>
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
                            <TextField fullWidth={false} label="IBAN:" type="text" className="text-agreement2"  />
                            <TextField fullWidth={false} label="Δικαιούχος:" type="text" className="text-agreement2"/>
                            <TextField fullWidth={false} label="Τράπεζα:" type="text" className="text-agreement2"/>
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
            </div>
            </div>
            <button type="submit" className='button-apply'>Τελική υποβολή</button>
            <Footer />
            </div>
        </>
    );
}
