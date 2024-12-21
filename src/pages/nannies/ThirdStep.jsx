import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/buttons/Logo.jsx';
import Footer from '../../components/layout/Footer.jsx';
import HelpButton from '../../components/buttons/HelpButton.jsx';
import { Row, Col } from 'react-bootstrap';
import { Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';
import Datepicker from '../../components/layout/Datepicker.jsx';
import Timepicker from '../../components/layout/Timepicker.jsx';
import '../../styles/ThirdStep.css';

export default function ThirdStep() {
    const navigate = useNavigate();

    // Initialize all fields, including date/time, with null or empty strings
    const [formData, setFormData] = useState({
        phone: '',
        phoneAccess: '',
        availableDate: null, // Default to null for Datepicker
        availableTime: null, // Default to null for Timepicker
    });

    const [formErrors, setFormErrors] = useState({
        phone: false,
        phoneAccess: false,
        availableDate: false,
        availableTime: false,
    });

    const validateForm = () => {
        const errors = {
            phone: !formData.phone.trim(),
            phoneAccess: !formData.phoneAccess,
            availableDate: !formData.availableDate,
            availableTime: !formData.availableTime,
        };

        setFormErrors(errors);

        return !Object.values(errors).some((error) => error === true);
    };

    const handleSubmit = () => {
        if (validateForm()) {
            navigate('/NannyHomepage');
        } else {
            console.log("Validation failed. Please complete all fields.");
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    return (
        <div className="profile-edit-nannies d-flex flex-column min-vh-100">
            <HelpButton />
            <Logo />
            <div className="stepper">
                <div className="step">
                    <div className="circle">1</div>
                </div>
                <div className="step">
                    <div className="circle">2</div>
                </div>
                <div className="step active">
                    <div className="circle">3</div>
                    <div className="label">ΠΡΟΓΡΑΜΜΑΤΙΣΜΟΣ ΣΥΝΑΝΤΗΣΗΣ</div>
                </div>
            </div>
            <div className="content flex-grow-1 d-flex align-items-center justify-content-center">
                <Row className="row">
                    <TextField
                        fullWidth
                        label="Κινητό"
                        type="text"
                        name="phone"
                        className="my-3"
                        value={formData.phone}
                        onChange={handleInputChange}
                        error={formErrors.phone}
                        helperText={formErrors.phone && "Το πεδίο είναι υποχρεωτικό"}
                    />
                    <FormControl fullWidth className="my-3" error={formErrors.phoneAccess}>
                        <InputLabel>Επιτρέπω τη πρόσβαση στο κινητό μου τηλέφωνο σε:</InputLabel>
                        <Select
                            name="phoneAccess"
                            value={formData.phoneAccess}
                            onChange={handleInputChange}
                        >
                            <MenuItem value="Όλους τους ενδιαφερόμενους γονείς">
                                Όλους τους ενδιαφερόμενους γονείς
                            </MenuItem>
                            <MenuItem value="Σε αυτούς που επιλέγω εγώ">
                                Σε αυτούς που επιλέγω εγώ
                            </MenuItem>
                        </Select>
                        {formErrors.phoneAccess && (
                            <p className="error-text">Το πεδίο είναι υποχρεωτικό</p>
                        )}
                    </FormControl>
                    <p>Ποιες μέρες/ώρες είσαι διαθέσιμος/η να σε καλέσουν;</p>
                    <Datepicker
                        value={formData.availableDate}
                        onChange={(date) => setFormData({ ...formData, availableDate: date })}
                        error={formErrors.availableDate}
                        helperText={formErrors.availableDate && "Η ημερομηνία είναι υποχρεωτική"}
                    />
                    <Timepicker
                        value={formData.availableTime}
                        onChange={(time) => setFormData({ ...formData, availableTime: time })}
                        error={formErrors.availableTime}
                        helperText={formErrors.availableTime && "Η ώρα είναι υποχρεωτική"}
                    />
                    <div className="buttons">
                        <button
                            type="button"
                            className="button-apply"
                            onClick={handleSubmit}
                        >
                            Υποβολή
                        </button>
                    </div>
                </Row>
            </div>
            <Footer />
        </div>
    );
}
