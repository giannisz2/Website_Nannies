import React, { useEffect, useState } from 'react';
import Logo from '../../components/buttons/Logo.jsx';
import Footer from '../../components/layout/Footer.jsx';
import HelpButton from '../../components/buttons/HelpButton.jsx';
import { Row, Col } from 'react-bootstrap';
import { TextField } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../providers/firebaseConfig.js';
import '../../styles/PreviewParents.css';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import {  Typography } from '@mui/material';

import {
    RadioGroup,
    FormControlLabel,
    Radio,
  } from '@mui/material';
  

export default function PersonalInfoPreview() {
    const [formData, setFormData] = useState({
        role:'Parent',
        name: '',
        surname: '',
        gender: '',
        birthdate: '',
        phone: '',
        residence: '',
        childrenCount: '',
        pets: '',
        childrenUnder2: '',
        nannyChildrenCount: '',
    });

    const [isLoading, setIsLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const navigate = useNavigate();


    const handleFinalSubmit = () => {
        setSnackbarOpen(true);
        setTimeout(() => {
            navigate('/ParentHomepage'); 
        }, 2000);
    };

    useEffect(() => {
        const fetchParentData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    console.error('User ID not found');
                    return;
                }

                const docRef = doc(db, 'Parent', userId); 
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    
                    if (data.birthdate) {
                        data.birthdate = dayjs(data.birthdate.toDate()).format('DD/MM/YYYY');
                    }
                    setFormData(data);
                } else {
                    console.error('No such document!');
                }
            } catch (error) {
                console.error('Error fetching parent data: ', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchParentData();
    }, []);

    if (isLoading) {
        return <p>Φόρτωση...</p>;
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="profile-edit-nannies d-flex flex-column min-vh-100">
            <HelpButton />
            <Logo />
            <h2 className="text-center my-4">Προεπισκόπηση Προφίλ</h2>
            <div className="content flex-grow-1 d-flex align-items-center justify-content-center">
                <Row className="align-items-start justify-content-center g-5 m-0 w-100">
                    <Col md={6} xs={12} className="d-flex flex-column align-items-center justify-content-center text-center">
                        <TextField
                            fullWidth
                            label="Όνομα"
                            value={formData.name || ''}
                            InputProps={{ readOnly: true }}
                            className="my-3"
                        />
                        <Typography variant="body1" sx={{ marginBottom: '8px' }}>
                                Φύλο
                            </Typography>
                            <RadioGroup
                                row
                                aria-label="gender"
                                name="gender"
                                value={formData.gender || ''}
                            >
                                <FormControlLabel
                                    value="Άνδρας"
                                    control={<Radio disabled />}
                                    label="Άνδρας"
                                />
                                <FormControlLabel
                                    value="Γυναίκα"
                                    control={<Radio disabled />}
                                    label="Γυναίκα"
                                />
                                <FormControlLabel
                                    value="Άλλο"
                                    control={<Radio disabled />}
                                    label="Άλλο"
                                />
                            </RadioGroup>



                        <TextField
                            fullWidth
                            label="Τηλέφωνο Επικοινωνίας"
                            value={formData.phone || ''}
                            InputProps={{ readOnly: true }}
                            className="my-3"
                        />
                        <TextField
                            fullWidth
                            label="Αριθμός Παιδιών"
                            value={formData.childrenCount || ''}
                            InputProps={{ readOnly: true }}
                            className="my-3"
                        />
                        <TextField
                            fullWidth
                            label="Πόσα παιδιά έχετε σε ηλικίες από 6 μηνών έως 2.5 ετών"
                            value={formData.childrenUnder2 || ''}
                            InputProps={{ readOnly: true }}
                            className="my-3"
                        />
                    </Col>
                    <Col md={6} xs={12} className="d-flex flex-column align-items-center justify-content-center text-center">
                        <TextField
                            fullWidth
                            label="Επώνυμο"
                            type="text"
                            value={formData.surname || ''}
                            InputProps={{ readOnly: true }}
                            className="my-3"
                        />
                        <TextField
                            fullWidth
                            label="Ημερομηνία Γέννησης"
                            value={formData.birthdate || ''}
                            InputProps={{ readOnly: true }}
                            className="my-3"
                        />
                        <TextField
                            fullWidth
                            label="Τόπος Κατοικίας"
                            value={formData.residence || ''}
                            InputProps={{ readOnly: true }}
                            className="my-3"
                        />


                        <Typography variant="body1" sx={{ marginBottom: '8px' }}>
                                Έχετε κατοικίδια
                            </Typography>
                            <RadioGroup
                                row
                                aria-label="pets"
                                name="pets"
                                value={formData.pets || ''}
                            >
                                <FormControlLabel
                                    value="NAI"
                                    control={<Radio disabled />}
                                    label="NAI"
                                />
                                <FormControlLabel
                                    value="OXI"
                                    control={<Radio disabled />}
                                    label="OXI"
                                />
                                <FormControlLabel
                                    value="Άλλο"
                                    control={<Radio disabled />}
                                    label="Άλλο"
                                />
                            </RadioGroup>
                        <TextField
                            fullWidth
                            label="Έχετε κατοικίδια στο σπίτι"
                            value={formData.pets || ''}
                            InputProps={{ readOnly: true }}
                            className="my-3"
                        />
                        <TextField
                            fullWidth
                            label="Πόσα παιδιά θέλετε να αναλάβει η ντάντα;"
                            value={formData.nannyChildrenCount || ''}
                            InputProps={{ readOnly: true }}
                            className="my-3"
                        />
                        <button className="button-apply-pp" onClick={handleFinalSubmit}>
                            Οριστική Υποβολή
                        </button>
                    </Col>
                </Row>
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="success">
                    Το προφίλ χρήστη δημιουργήθηκε επιτυχώς!
                </Alert>
            </Snackbar>
            <Footer />
        </div>
        </LocalizationProvider>
    );
}
