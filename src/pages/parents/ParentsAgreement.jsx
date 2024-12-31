import React, { useState } from 'react';
import NavBarParents from '../../components/layout/NavBarParents';
import Footer from '../../components/layout/Footer';
import { Row, Col } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import HelpButton from '../../components/buttons/HelpButton';
import { Alert } from '@mui/material'; // Import the Alert component
import '../../styles/Agreement.css';

export default function ParentsAgreement() {
    const [isChecked, setIsChecked] = useState(false); // Checkbox state
    const [formErrors, setFormErrors] = useState({}); // Form error state

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);  
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isChecked) {
            // Show an error message if the checkbox is not checked
            setFormErrors({ checkbox: "Πρέπει να επιβεβαιώσετε ότι έχετε συμφωνήσει με το ωράριο!" });
        } else {
            // If everything is okay, reset errors and proceed with form submission
            setFormErrors({});
            console.log('Agreement submitted');
            // Here, you would normally submit the form data
        }
    };

    return (
        <>
            <div className="nanny-agreement">
                <NavBarParents />
                <HelpButton />
                <p className="this_text">Συμφωνητικό</p>
                <div className="centered-container"> 
                    <TextField
                        fullWidth={false}
                        label="Σμφωνητικό"
                        type="text"
                        className="text-agreement1"
                        value="Θέλω να έρθω σε συμφωνία με τον/ην:"
                        disabled
                    />
                </div> 
                <div className="content flex-grow-1 d-flex align-items-center justify-content-center"> 
                    <Row className="align-items-start justify-content-center g-5 m-0 w-100">
                        <Col
                            md={6}
                            xs={12}
                            className="d-flex flex-column align-items-center justify-content-center text-center"
                        >
                            <TextField
                                fullWidth={false}
                                label="Όνομα νταντάς"
                                type="text"
                                className="text-agreement2"
                                value="Μαρία Μώμμου"
                                disabled
                            />
                        </Col>
                        <Col
                            md={6}
                            xs={12}
                            className="d-flex flex-column align-items-center justify-content-center text-center"
                        >
                            <TextField
                                fullWidth={false}
                                label="Email νταντάς"
                                type="text"
                                className="text-agreement2"
                                value="mariamommou@gmail.com"
                                disabled
                            />
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
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '100px' }}>
                        <span style={{ marginRight: '10px' }}>
                            Επιβεβαιώνω ότι έχουμε έρθει σε συμφωνία με τον/ην προαναφερθόντα στο ωράριο που έχει δηλωθεί
                        </span>
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                    </div>
                </div>
                
                {/* Render the error message if the checkbox is not checked */}
                {formErrors.checkbox && (
                    <Alert className='alert' severity="error" style={{ marginTop: '10px' }}>
                        {formErrors.checkbox}
                    </Alert>
                )}

                <button type="button" className="button-apply" onClick={handleSubmit}>
                    Υποβολή Συμφωνητικού
                </button>
                <Footer />
            </div>
        </>
    );
}
