import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/buttons/Logo.jsx';
import Footer from '../../components/layout/Footer.jsx';
import HelpButton from '../../components/buttons/HelpButton.jsx';
import { Row } from 'react-bootstrap';
import { Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';
import '../../styles/ThirdStep.css';
import { useFormContext } from '../../context/FormContext.jsx';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

export default function ThirdStep() {
    const navigate = useNavigate();
    const { formData, setFormData } = useFormContext();
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('userData')) || {};
        setFormData((prev) => ({
            ...prev,
            ...savedData,
            availableDate: savedData.availableDate || [],
        }));
    }, [setFormData]);
    
    useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(formData));
    }, [formData]);
    

    const validateForm = () => {
        const errors = {
            phone: !formData.phone?.trim(),
            phoneAccess: !formData.phoneAccess,
            availableDate: !formData.availableDate || formData.availableDate.length === 0,
            startTime: !formData.startTime,
            endTime: !formData.endTime || 
                     (formData.startTime && dayjs(formData.endTime).isBefore(dayjs(formData.startTime))),
        };
    
        setFormErrors(errors);
        return !Object.values(errors).some((error) => error === true);
    };
    

    const handleSubmit = () => {
        if (validateForm()) {
            localStorage.setItem('userData', JSON.stringify(formData));
            navigate('/NannyHomepage');
        } else {
            console.log("Validation failed. Please complete all fields.");
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    
    const handleDateChange = (date) => {
        if (date) {
            setFormData((prev) => ({
                ...prev,
                availableDate: [...(prev.availableDate || []), date.toISOString()],
            }));
        }
    };

    const handleTimeChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value ? value.toISOString() : null,
        }));
    };
    

    const removeDate = (index) => {
        setFormData((prev) => ({
            ...prev,
            availableDate: prev.availableDate.filter((_, i) => i !== index),
        }));
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                            label="Κινητό Τηλέφωνο"
                            type="text"
                            name="phone"
                            value={formData.phone || ''}
                            onChange={handleInputChange}
                            className="my-3"
                            helperText={formErrors.phone && <span style={{ color: 'red', fontSize: '12px' }}>Το πεδίο είναι υποχρεωτικό</span>}
                        />
                        <FormControl fullWidth className="my-3">
                            <InputLabel>Επιτρέπω τη πρόσβαση στο κινητό μου τηλέφωνο σε:</InputLabel>
                            <Select
                                name="phoneAccess"
                                value={formData.phoneAccess || ''}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="Όλους τους ενδιαφερόμενους γονείς">Όλους τους ενδιαφερόμενους γονείς</MenuItem>
                                <MenuItem value="Σε αυτούς που επιλέγω εγώ">Σε αυτούς που επιλέγω εγώ</MenuItem>
                            </Select>
                            {formErrors.phoneAccess && <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>Το πεδίο είναι υποχρεωτικό</p>}
                        </FormControl>

                        <p>Ποιες μέρες/ώρες είσαι διαθέσιμος/η να σε καλέσουν;</p>
                        <DatePicker
                            value={null}
                            minDate={dayjs()}
                            onChange={handleDateChange}
                            className="my-3"
                        />

                        <ul>
                            {formData.availableDate?.map((date, index) => (
                                <li key={index}>
                                    {dayjs(date).format('DD/MM/YYYY')}
                                    <button type="button" onClick={() => removeDate(index)}>
                                        Διαγραφή
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {formErrors.availableDate && <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>Το πεδίο είναι υποχρεωτικό</p>}

                        Από:
                        <TimePicker
                            value={formData.startTime ? dayjs(formData.startTime) : null}
                            onChange={(time) => handleTimeChange('startTime', time)}
                        />
                        {formErrors.startTime && <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>Το πεδίο είναι υποχρεωτικό</p>}

                        Μέχρι:
                        <TimePicker
                            value={formData.endTime ? dayjs(formData.endTime) : null}
                            onChange={(time) => handleTimeChange('endTime', time)}
                        />
                        {formErrors.endTime && (
                        <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                            Η ώρα λήξης πρέπει να είναι μεγαλύτερη από την ώρα έναρξης
                        </p>
                    )}


                        <div className="buttons">
                            <button type="button" className="button-apply" onClick={handleSubmit}>
                                Υποβολή
                            </button>
                        </div>
                    </Row>
                </div>
                <Footer />
            </div>
        </LocalizationProvider>
    );
}
