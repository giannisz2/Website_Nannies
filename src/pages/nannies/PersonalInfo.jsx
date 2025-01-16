import React, { useState, useEffect } from 'react';
import Logo from '../../components/buttons/Logo.jsx';
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
import Breadcrumb from '../../components/layout/Breadcrumb2.jsx';
import '../../styles/PersonalInfo.css';
import {
    RadioGroup,
    FormControlLabel,
    Radio,
  } from '@mui/material';
  



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

    const [initialFormData, setInitialFormData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');
    

    const validatePhoneNumber = (phone) => {
        return /^\d{10}$/.test(phone); 
    };


    const validateForm = () => {
        const errors = {};
        let isValid = true;
    
       
        ['gender', 'employmentTime', 'availability','educationLevel', 'bio','recommendationLetters', 'experienceYears', 'maxChildren', 'smoker', 'availability', 'phone','availableDate'].forEach(field => {
            if (typeof formData[field] === 'string' ? !formData[field]?.trim() : !formData[field]) {
                errors[field] = true;
                isValid = false;
            }
            
        });
    
        setFormErrors(errors);
        if (!validatePhoneNumber(formData.phone)) {
            handleSnackbarOpen('Ο αριθμός τηλεφώνου πρέπει να έχει 10 ψηφία.', 'error');
            return false;
        }
    
        return isValid;
    };
    
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
                    const data = userDoc.data();
                    setFormData(data);
                    setInitialFormData(data);
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
        setIsSubmitted(true);
    
        if (!validateForm()) {
            console.log("Form validation failed.");
            return;
        }
    
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.error('User ID is not available');
                return;
            }
    
            const userRef = doc(db, 'users', userId);
            await updateDoc(userRef, formData);

            localStorage.setItem('initialFormData', JSON.stringify(initialFormData));


            navigate('/PersonalInfoDone'); 
        } catch (error) {
            console.error('Error updating document: ', error);
            alert('Σφάλμα κατά την ενημέρωση των στοιχείων.');
        }
    };
    

    if (isLoading) {
        return <p>Φόρτωση...</p>;
    }



    const handleSnackbarOpen = (message, severity = 'error') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };


    const handleCloseWithoutSaving = () => {
        if (initialFormData) {
            setFormData(initialFormData); 
        }
        navigate('/NannyHomepage'); 
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Breadcrumb label="Επεξεργασία προφίλ"/>
            <Box sx={{
                    padding: '20px',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#f9f9f9',
                    marginTop: '100px',
                }}>
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
                        zIndex: 1,
                    }}
                >
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                        }}
                        onClick={handleCloseWithoutSaving}
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
                           <FormControl component="fieldset" className="my-3">
                                <InputLabel shrink>Φύλο</InputLabel>
                                <RadioGroup
                                    row
                                    aria-label="gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                >
                                    <FormControlLabel value="Άνδρας" control={<Radio />} label="Άνδρας" />
                                    <FormControlLabel value="Γυναίκα" control={<Radio />} label="Γυναίκα" />
                                    <FormControlLabel value="Άλλο" control={<Radio />} label="Άλλο" />
                                </RadioGroup>
                                {formErrors.gender && (
                                    <p style={{ color: 'red', fontSize: '12px' }}>
                                        Το πεδίο Φύλο είναι υποχρεωτικό
                                    </p>
                                )}
                            </FormControl>

                            <FormControl fullWidth className="my-3">
                                <InputLabel>Χρόνος Απασχόλησης</InputLabel>
                                <Select name="employmentTime"
                                        value={formData.employmentTime}
                                        onChange={handleInputChange}
                                        defaultValue=""
                                    >
                                    <MenuItem value="Μερική">Μερική</MenuItem>
                                    <MenuItem value="Πλήρης">Πλήρης</MenuItem>
                                </Select>
                                {formErrors.employmentTime && (
                                        <span style={{ color: 'red', fontSize: '12px' }}>
                                        Το πεδίο Χρόνος Απασχόλησης είναι υποχρεωτικό
                                        </span>
                                    )}
                            </FormControl>

                             <FormControl fullWidth className="my-3">
                                <InputLabel>Επίπεδο σπουδών~</InputLabel>
                                <Select 
                                    name="educationLevel" 
                                    value={formData.educationLevel} 
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="Τριτοβάθμια εκπαίδευση">Τριτοβάθμια εκπαίδευση</MenuItem>
                                    <MenuItem value="Δευτεροβάθμια εκπαίδευση">Δευτεροβάθμια εκπαίδευση</MenuItem>
                                    <MenuItem value="Πρωτοβάθμια εκπαίδευση">Πρωτοβάθμια εκπαίδευση</MenuItem>
                                    <MenuItem value="Άλλο">Άλλο</MenuItem>
                                </Select>
                                {formErrors.educationLevel && (
                                    <p style={{ color: 'red', fontSize: '12px' }}>
                                        Το πεδίο Επίπεδο σπουδών είναι υποχρεωτικό
                                    </p>
                                )}
                            </FormControl>

                            <TextField
                                fullWidth
                                label="Συστατικές Επιστολές"
                                name="recommendationLetters"
                                value={formData.recommendationLetters || ''}
                                onChange={handleInputChange}
                                className="my-3"
                            />

                            <FormControl fullWidth className="my-3">
                                <InputLabel>Έτη προϋπηρεσίας</InputLabel>
                                <Select name="experienceYears"
                                    value={formData.experienceYears}
                                    onChange={handleInputChange}
                                    defaultValue=""
                                >
                                    <MenuItem value="0">0</MenuItem>
                                    <MenuItem value="1">1</MenuItem>
                                    <MenuItem value="2">2</MenuItem>
                                    <MenuItem value="3">3</MenuItem>
                                    <MenuItem value="4+">4+</MenuItem>
                                </Select>
                                {formErrors.experienceYears && (
                                    <span style={{ color: 'red', fontSize: '12px' }}>
                                    Το πεδίο Έτη προϋπηρεσίας είναι υποχρεωτικό
                                    </span>
                                )}
                            </FormControl>


                            <TextField
                                fullWidth
                                label="Τηλέφωνο Επικοινωνίας"
                                name="phone"
                                value={formData.phone || ''}
                                onChange={handleInputChange}
                                error={formErrors.phone && isSubmitted}
                                helperText={formErrors.phone && isSubmitted ? "Το πεδίο είναι υποχρεωτικό" : null}
                                margin="normal"
                                />
                                <FormControl component="fieldset" fullWidth className="my-3">
                                    <InputLabel shrink>Ειδίκευση</InputLabel>
                                    <Select
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleInputChange}
                                        row
                                    >
                                            <MenuItem value="Δασκάλος/α">Δάσκαλος/α</MenuItem>
                                            <MenuItem value="Ειδική Αγωγή">Ειδική Αγωγή</MenuItem>
                                            <MenuItem value="Νηπιαγωγός">Νηπιαγωγός</MenuItem>
                                            <MenuItem value="Παιδαγωγός">Παιδαγωγός</MenuItem>
                                            <MenuItem value="Άλλο">Άλλο</MenuItem>
                                        </Select>
        
                                    {formErrors.experience && (
                                        <p style={{ color: 'red', fontSize: '12px' }}>
                                        Το πεδίο Ειδίκευση είναι υποχρεωτικό
                                        </p>
                                    )}
                                    </FormControl>
                            <TextField
                                fullWidth
                                label="Λίγα λόγια για εσάς..."
                                name="bio"
                                value={formData.bio || ''}
                                onChange={handleInputChange}
                                multiline
                                rows={4}
                                className="my-3"
                                helperText={formErrors.surname ? (
                                    <span style={{ color: 'red', fontSize: '12px' }}>Το πεδίο Επώνυμο είναι υποχρεωτικό</span>
                                ) : null} 
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
                            <FormControl fullWidth className="my-3">
                                <InputLabel>Μέχρι πόσα παιδια μπορείτε να αναλάβετε ταυτόχρονα;</InputLabel>
                                <Select name="maxChildren"
                                    value={formData.maxChildren}
                                    onChange={handleInputChange}
                                    defaultValue=""
                                >
                                    <MenuItem value="1">1</MenuItem>
                                    <MenuItem value="2">2</MenuItem>
                                    <MenuItem value="3">3</MenuItem>
                                    <MenuItem value="4+">4+</MenuItem>
                                </Select>
                                
                            </FormControl>
                            
                            <FormControl fullWidth className="my-3">
                                <InputLabel>Είστε καπνιστής;</InputLabel>
                                <Select name="smoker"
                                    value={formData.smoker}
                                    onChange={handleInputChange}
                                    defaultValue=""
                                >
                                    <MenuItem value="ΝΑΙ">NAI</MenuItem>
                                    <MenuItem value="ΟΧΙ">OXI</MenuItem>
                                </Select>
                                {formErrors.smoker && (
                                    <span style={{ color: 'red', fontSize: '12px' }}>
                                    Το πεδίο Είστε καπνιστής είναι υποχρεωτικό
                                    </span>
                                )}
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
                                                                <button className='delete-button' type="button" onClick={() => removeDate(index)}>
                                                                    Διαγραφή
                                                                </button>
                                                            </li>
                                                        ))}
                                                    </ul>
                            
                                                    {formErrors.availableDate && <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>Το πεδίο είναι υποχρεωτικό</p>}
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
                        <Grid item xs={12} className='button-container-pi'>
                            <button type="button" className="button-apply-pi" onClick={handleSave}>
                                Υποβολή
                            </button>
                        </Grid>
                    </Grid>
                </Box>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={4000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </LocalizationProvider>
    );
}
