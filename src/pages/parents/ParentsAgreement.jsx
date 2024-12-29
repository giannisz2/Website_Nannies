import React, { useState }  from 'react';
import NavBarNannies from '../../components/layout/NavbarNannies';
import Footer from '../../components/layout/Footer';
import { Row ,Col } from 'react-bootstrap';
import '../../styles/Agreement.css';
import TextField from '@mui/material/TextField';
import HelpButton from '../../components/buttons/HelpButton'

export default function ParentsAgreement() {
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);  
    };
    const [formErrors, setFormErrors] = useState({});

    return (
        <>
            <div className="nanny-agreement">
                <NavBarNannies />
                <HelpButton/>
                <p className="this_text">Συμφωνητικό</p>
                <div className="centered-container"> 
                    <TextField fullWidth={false} label="Σμφωνητικό" type="text" className="text-agreement1" value="Θέλω να έρθω σε συμφωνία με τον/ην:" disabled />
                </div> 
                <div className="content flex-grow-1 d-flex align-items-center justify-content-center"> 
                    <Row className="align-items-start justify-content-center g-5 m-0 w-100">
                       <Col
                            md={6}
                            xs={12}
                            className="d-flex flex-column align-items-center justify-content-center text-center"
                        >
                            <TextField fullWidth={false} label="Όνομα νταντάς" type="text" className="text-agreement2" value="Μαρία Μώμμου" disabled />
                        </Col>
                        <Col
                            md={6}
                            xs={12}
                            className="d-flex flex-column align-items-center justify-content-center text-center"
                        >
                            <TextField fullWidth={false} label="Email νταντάς" type="text" className="text-agreement2" value="mariamommou@gmail.com" disabled />
                        </Col>
                    </Row> 
                </div>              
                <div className="content flex-grow-1 d-flex align-items-center justify-content-center"> 
                    <Row className="align-items-start justify-content-center g-5 m-0 w-100">
                    <Col
                        md={6}
                        xs={12}
                        className="d-flex flex-column align-items-center justify-content-center text-center"
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <p className="text-agreement2">Ωράριο:</p>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: '18px', color: 'blue', textDecoration: 'underline' }}>9:30</span>
                                <span style={{ fontSize: '18px', color: 'blue', textDecoration: 'underline' }}>17:00</span>
                            </div>
                        </div>
                    </Col>
                    <Col
                        md={6}
                        xs={12}
                        className="d-flex flex-column align-items-center justify-content-center text-center"
                    >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <p className="text-agreement2">Έναρξη εργασίας:</p>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '18px', color: 'blue', textDecoration: 'underline' }}>
                                Παρασκευή 27 Δεκεμβρίου 2024
                            </span>
                        </div>
                    </div>
                    </Col>
                </Row>
                </div>
                <div style={{ fontSize: '18px' }}>
                <div style={{ display: 'flex',justifyContent:'center', alignItems: 'center', marginTop : '100px' }}>
                <span style={{ marginRight: '10px' }}>Επιβεβαιώνω ότι έχουμε έρθει σε συμφωνία με τον/ην προαναφερθόντα στο ωράριο που έχει δηλωθεί</span>
                <input 
                    type="checkbox" 
                    checked={isChecked} 
                    onChange={handleCheckboxChange} 
                    error={formErrors.name}
                    helperText={formErrors.name && "Πρέπει να συμπληρωθεί για να προχωρήσετε παρακάτω"}
                />
            </div>
            </div>
            <button type="submit" className='button-apply'>Υποβολή Συμφωνητικού</button>
            <Footer />
            </div>
        </>
    );
}
