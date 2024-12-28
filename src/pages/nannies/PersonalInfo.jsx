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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
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
            [name]: value ? dayjs(value).toISOString() : null,
        }));
    };

    const removeDate = (index) => {
        setFormData((prev) => ({
            ...prev,
            availableDate: prev.availableDate.filter((_, i) => i !== index),
        }));
    };

    const handleSave = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.error('User ID is not available');
                return;
            }

            const userRef = doc(db, 'users', userId);
            await updateDoc(userRef, formData);
            navigate('/PersonalInfoDone'); // Μετάβαση στη σελίδα PersonalInfoDone
        } catch (error) {
            console.error('Error updating document: ', error);
            alert('Σφάλμα κατά την ενημέρωση των στοιχείων.');
        }
    };

    if (isLoading) {
        return <p>Φόρτωση...</p>;
    }

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
                        Επεξεργασία Προφίλ
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
                                name="gender"
                                value={formData.gender || ''}
                                onChange={handleInputChange}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Χρόνος Απασχόλησης"
                                name="employmentTime"
                                value={formData.employmentTime || ''}
                                onChange={handleInputChange}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Εκπαίδευση"
                                name="educationLevel"
                                value={formData.educationLevel || ''}
                                onChange={handleInputChange}
                                className="my-3"
                            />
                            <TextField
                                fullWidth
                                label="Συστατικές Επιστολές"
                                name="recommendationLetters"
                                value={formData.recommendationLetters || ''}
                                onChange={handleInputChange}
                                className="my-3"
                            />

                            <TextField
                                fullWidth
                                label="Έτη Προϋπηρεσίας"
                                name="experienceYears"
                                value={formData.experienceYears || ''}
                                onChange={handleInputChange}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Τηλέφωνο Επικοινωνίας"
                                name="phone"
                                value={formData.phone || ''}
                                onChange={handleInputChange}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Λίγα λόγια για εσάς..."
                                name="bio"
                                value={formData.bio || ''}
                                onChange={handleInputChange}
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
                                name="maxChildren"
                                value={formData.maxChildren || ''}
                                onChange={handleInputChange}
                                className="my-3"
                            />
                            
                            <FormControl fullWidth className="my-3">
                                <InputLabel>Είστε καπνιστής;</InputLabel>
                                <Select
                                    name="smoker"
                                    value={formData.smoker || ''}
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="ΝΑΙ">ΝΑΙ</MenuItem>
                                    <MenuItem value="ΟΧΙ">ΟΧΙ</MenuItem>
                                </Select>
                            </FormControl>
                            
                             <DatePicker
                                
                                label="Διαθεσιμότητα"
                                value={formData.availability ? dayjs(formData.availability) : null}
                                onChange={(date) => handleInputChange({ target: { name: 'availability', value: date?.toISOString() || '' } })}
                                margin="normal"
                            />
                            <FormControl fullWidth className="my-3">
                                <InputLabel>Είστε διατεθειμένος να εργαστείτε σε σπίτι με κατοικίδια ζώα;</InputLabel>
                                <Select
                                    name="pets"
                                    value={formData.pets || ''}
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="ΝΑΙ">ΝΑΙ</MenuItem>
                                    <MenuItem value="ΟΧΙ">ΟΧΙ</MenuItem>
                                </Select>
                            </FormControl>
                            

                            <FormControl fullWidth margin="normal">
                                <InputLabel>Πρόσβαση Κινητού</InputLabel>
                                <Select
                                    name="phoneAccess"
                                    value={formData.phoneAccess || ''}
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="Όλους τους ενδιαφερόμενους γονείς">Όλους τους ενδιαφερόμενους γονείς</MenuItem>
                                    <MenuItem value="Σε αυτούς που επιλέγω εγώ">Σε αυτούς που επιλέγω εγώ</MenuItem>
                                </Select>
                            </FormControl>
                            <DatePicker
                                label="Προσθέστε Ημερομηνίες Διαθεσιμότητας"
                                value={null}
                                onChange={handleDateChange}
                                margin="normal"
                            />
                            <ul>
                                {formData.availableDate?.map((date, index) => (
                                    <li key={index}>
                                        {dayjs(date).format('DD/MM/YYYY')}
                                        <button type="button" onClick={() => removeDate(index)}>Διαγραφή</button>
                                    </li>
                                ))}
                            </ul>
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
                            <button type="button" className="button-apply" onClick={handleSave}>
                                Υποβολή
                            </button>
                        </Grid>
                    </Grid>
                </Box>
                
            </Box>
        </LocalizationProvider>
    );
}
