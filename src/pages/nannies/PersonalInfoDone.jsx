import React, { useState, useEffect } from 'react';
import Logo from '../../components/buttons/Logo.jsx';
import Footer from '../../components/layout/Footer.jsx';
import HelpButton from '../../components/buttons/HelpButton.jsx';
import { Box, Grid, Typography, Divider, IconButton  } from '@mui/material';
import { Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';
import { DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { db } from '../../providers/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export default function PersonalInfo() {
    const [formData, setFormData] = useState({



        name: '',
        surname: '',
        gender: '',
        birthdate: '',
        educationLevel: '',
        employmentTime: '',
        recommendationLetters: '',
        experienceYears: '',
        maxChildren: '',
        smoker: '',
        availability: '',
        experience: '',
        bio: '',
        location: '',
        pets: '',
        phone: '',
        phoneAccess: '',
        availableDate: [],
        availableTimeFrom: null,
        availableTimeTo: null,
    });

    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    
    const [snackbarOpen, setSnackbarOpen] = useState(false);
        

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    console.error('User ID is not available');
                    setIsLoading(false);
                    return;
                }

                const userRef = doc(db, 'users', userId);
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    setFormData(userDoc.data());
                } else {
                    console.error('No such document!');
                }
            } catch (error) {
                console.error('Error fetching user data: ', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <p>Φόρτωση...</p>;
    }

    const handleFinalSubmit = () => {
        setSnackbarOpen(true);
        setTimeout(() => {
            navigate('/NannyHomepage'); 
        }, 2000);
    };


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ padding: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f9f9f9' }}>
            <HelpButton />
                <Logo />
                <Box
                    sx={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '8px',
                        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
                        maxWidth: '800px',
                        margin: '0 auto',
                        position: 'relative',
                    }}
                >
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                        }}
                        onClick={() => navigate('/NannyHomepage')}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h4" align="center" sx={{ marginBottom: '20px' }}>
                        Προεπισκόπηση Προφίλ
                    </Typography>
                    
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Όνομα"
                                type="text"
                                value={formData.name || ''}
                                InputProps={{ readOnly: true }}
                            className="my-3"
                            />
                                <TextField
                                fullWidth
                                label="Φύλο"
                                type="text"
                                value={formData.gender || ''}
                                InputProps={{ readOnly: true }}
                                className="my-3"
                            />
                           <TextField
                                fullWidth
                                label="Χρόνος Απασχόλησης"
                                type="text"
                                value={formData.employmentTime || ''}
                                InputProps={{ readOnly: true }}
                                className="my-3"
                            />
                            <TextField
                                fullWidth
                                label="Εκπαίδευση"
                                type="text"
                                value={formData.educationLevel || ''}
                                InputProps={{ readOnly: true }}
                                className="my-3"
                            />
                           <TextField
                                fullWidth
                                label="Συστατικές Επιστολές"
                                type="text"
                                value={formData.recommendationLetters || 'Δεν υπάρχουν'}
                                InputProps={{ readOnly: true }}
                                className="my-3"
                            />

                            <TextField
                                fullWidth
                                label="Έτη Προϋπηρεσίας"
                                type="text"
                                value={formData.experienceYears || ''}
                                InputProps={{ readOnly: true }}
                                className="my-3"
                            />
                            <TextField
                                fullWidth
                                label="Τηλέφωνο Επικοινωνίας"
                                type="text"
                                value={formData.phone || ''}
                                InputProps={{ readOnly: true }}
                                className="my-3"
                            />
                            <TextField
                                fullWidth
                                label="Λίγα Λόγια για Εσάς"
                                type="text"
                                value={formData.bio || 'Δεν έχουν καταχωρηθεί στοιχεία'}
                                InputProps={{ readOnly: true }}
                                multiline
                                rows={4}
                                className="my-3"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
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
                                type="text"
                                value={formData.birthdate || ''}
                                InputProps={{ readOnly: true }}
                                className="my-3"
                            />
                             <TextField
                                    fullWidth
                                    label="Μέχρι Πόσα Παιδιά"
                                    type="text"
                                    value={formData.maxChildren || ''}
                                    InputProps={{ readOnly: true }}
                                    className="my-3"
                                />
                             <TextField
                                fullWidth
                                label="Μέχρι Πόσα Παιδιά"
                                type="text"
                                value={formData.maxChildren || ''}
                                InputProps={{ readOnly: true }}
                                className="my-3"
                            />
                            <TextField
                                fullWidth
                                label="Είστε Καπνιστής"
                                type="text"
                                value={formData.smoker || ''}
                                InputProps={{ readOnly: true }}
                                className="my-3"
                            />
                            
                             <TextField
                                fullWidth
                                label="Διαθεσιμότητα"
                                type="text"
                                value={formData.availability || ''}
                                InputProps={{ readOnly: true }}
                                className="my-3"
                            />
                           <TextField
                                fullWidth
                                label="Είστε Διαθέσιμος σε Σπίτι με Κατοικίδια"
                                type="text"
                                value={formData.pets || ''}
                                InputProps={{ readOnly: true }}
                                className="my-3"
                            />
                            

                            <TextField
                                fullWidth
                                label="Πρόσβαση Κινητού"
                                type="text"
                                value={formData.phoneAccess || ''}
                                InputProps={{ readOnly: true }}
                                className="my-3"
                            />
                            <TextField
                                    fullWidth
                                    label="Ημερομηνίες Διαθεσιμότητας"
                                    type="text"
                                    value={formData.availableDate?.join(', ') || 'Δεν υπάρχουν'}
                                    InputProps={{ readOnly: true }}
                                    multiline
                                    rows={2}
                                    className="my-3"
                                />

                            <TextField
                                    fullWidth
                                    label="Ώρες Διαθεσιμότητας"
                                    type="text"
                                    value={`${formData.availableTimeFrom || ''} - ${formData.availableTimeTo || ''}`}
                                    InputProps={{ readOnly: true }}
                                    className="my-3"
                                />
                            
                        </Grid>
                        <Grid item xs={12}>
                            <Divider sx={{ marginY: 2 }} />
                            <TimePicker
                                label="Από"
                                value={formData.availableTimeFrom ? dayjs(formData.availableTimeFrom) : null}
                                onChange={(time) => handleTimeChange('availableTimeFrom', time)}
                                sx={{ marginRight: '20px' }}
                            />
                            <TimePicker
                                label="Μέχρι"
                                value={formData.availableTimeTo ? dayjs(formData.availableTimeTo) : null}
                                onChange={(time) => handleTimeChange('availableTimeTo', time)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <button className="button-apply" onClick={handleFinalSubmit}>
                            Οριστική Υποβολή
                        </button>
                        </Grid>
                    </Grid>
                </Box>
                <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={2000}
                        onClose={() => setSnackbarOpen(false)}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
                            Οι αλλαγές έγιναν επιτυχώς!
                        </Alert>
                    </Snackbar>
            </Box>
        </LocalizationProvider>
    );
}
