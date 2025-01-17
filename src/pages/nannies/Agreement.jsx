import React, { useState } from 'react';
import NavBarNannies from '../../components/layout/NavbarNannies';
import Footer from '../../components/layout/Footer';
import { Row, Col } from 'react-bootstrap';
import '../../styles/Agreement.css';
import TextField from '@mui/material/TextField';
import HelpButton from '../../components/buttons/HelpButton';
import Breadcrumb from '../../components/layout/Breadcrumb';
import { Link } from "react-router-dom";


export default function Agreement() {
    const [isChecked, setIsChecked] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isChecked) {
            setFormErrors({ checkbox: 'Πρέπει να συμφωνήσετε πριν προχωρήσετε!' });
            return;
        }
        console.log('Agreement submitted successfully');
        setFormErrors({});
    };

    return (
        <>
            <div className="nanny-agreement">
                <NavBarNannies />
                <Breadcrumb label="Συμφωνητικό"/>
                <p className="this_text">Συμφωνητικό</p>
                <div className="centered-container">
                    <TextField
                        fullWidth={false}
                        label="Συμφωνητικό"
                        type="text"
                        className="text-agreement1"
                        value="Συμφωνώ να έρθω σε συμφωνία με τους:"
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
                                label="Ονοματεπώνυμο κηδεμόνα 1"
                                type="text"
                                className="text-agreement2"
                                value="Αποστόλης Γραμματόπουλος"
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
                                label="Ονοματεπώνυμο κηδεμόνα 2"
                                type="text"
                                className="text-agreement2"
                                value="Ελευθερία Ελευθερίου"
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
                                    <span
                                        style={{
                                            fontSize: '18px',
                                            color: 'blue',
                                            textDecoration: 'underline',
                                        }}
                                    >
                                        9:30
                                    </span>
                                    <span
                                        style={{
                                            fontSize: '18px',
                                            color: 'blue',
                                            textDecoration: 'underline',
                                        }}
                                    >
                                        17:00
                                    </span>
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
                                    <span
                                        style={{
                                            fontSize: '18px',
                                            color: 'blue',
                                            textDecoration: 'underline',
                                        }}
                                    >
                                        Παρασκευή 27 Δεκεμβρίου 2024
                                    </span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div style={{ fontSize: '18px' }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '100px',
                        }}
                    >
                        <span style={{ marginRight: '10px' }}>
                            Επιβεβαιώνω ότι έχουμε έρθει σε συμφωνία με τους προαναφερθέντες στο
                            ωράριο που έχει δηλωθεί
                        </span>
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                    </div>
                    {formErrors.checkbox && (
                        <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
                            {formErrors.checkbox}
                        </p>
                    )}
                </div>
                <button type="button" className="button-apply-agreement" onClick={handleSubmit} >
                    Υποβολή Συμφωνητικού
                </button>
                <Footer />
                <HelpButton />
            </div>
        </>
    );
}
