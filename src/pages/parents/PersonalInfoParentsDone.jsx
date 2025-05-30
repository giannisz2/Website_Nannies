import React, { useState, useEffect } from 'react';
import Logo from '../../components/buttons/Logo.jsx';
import HelpButton from '../../components/buttons/HelpButton.jsx';
import { Box, Grid, Typography, Divider, IconButton, Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import { Snackbar, Alert } from '@mui/material';
import { db } from '../../providers/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import {
    RadioGroup,
    FormControlLabel,
    Radio,
  } from '@mui/material';
  

export default function PersonalInfoParentsDone() {
    const [formData, setFormData] = useState({
            
            name: '',
            surname: '',
            gender: '',
            birthdate: null,
            phone: '',
            residence: '',
            childrenCount: '',
            pets: '',
            childrenUnder2: '',
            nannyChildrenCount: '',
        });
    

    const [initialFormData, setInitialFormData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    


    const handleFinalSubmit = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.error('User ID is not available');
                return;
            }

            const userRef = doc(db, 'Parent', userId);
            await updateDoc(userRef, formData);
            setSnackbarOpen(true);
            setTimeout(() => {
                navigate('/ParentHomepage');
            }, 2000);
        } catch (error) {
            console.error('Error updating document: ', error);
        }
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

                const userRef = doc(db, 'Parent', userId);
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    const data = userDoc.data();
                    console.log('Preview Data:', data);
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

    const handleClose = () => setDialogOpen(true);

    const handleDialogClose = async (saveChanges) => {
        setDialogOpen(false);
    
        if (!saveChanges) {
            try {
                
                const initialData = JSON.parse(localStorage.getItem('initialFormData'));
                if (initialData) {
                    const userId = localStorage.getItem('userId');
                    if (!userId) {
                        console.error('User ID is not available');
                        return;
                    }
    
                    const userRef = doc(db, 'Parent', userId);
                    await updateDoc(userRef, initialData); 
                }
            } catch (error) {
                console.error('Error restoring initial data: ', error);
            }
            navigate('/ParentHomepage'); 
        } else {
            handleFinalSubmit(); 
        }
    };
    


    if (isLoading) {
        return <p>Φόρτωση...</p>;
    }

    return (
        <div className='hyper-div2'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ padding: '20px',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#f9f9f9',
                    marginTop: '100px', }}>
            <HelpButton />
            <Logo />
            <Box
                sx={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0px 2px 10px rgba(0, 0, 0,0.1)',
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
                    onClick={handleClose}
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
                                value="ΝΑΙ"
                                control={<Radio disabled />}
                                label="ΝΑΙ"
                            />
                            <FormControlLabel
                                value="ΟΧΙ"
                                control={<Radio disabled />}
                                label="ΟΧΙ"
                            />
                        </RadioGroup>



                        
                        <TextField
                            fullWidth
                            label="Πόσα παιδιά θέλετε να αναλάβει η ντάντα;"
                            value={formData.nannyChildrenCount || ''}
                            InputProps={{ readOnly: true }}
                            className="my-3"
                        />
                        
                        </Grid>
                            <Grid item xs={12} className='button-container-pi'>
                                <button type="button" className="button-apply-pi" onClick={handleFinalSubmit}>
                                   Οριστική Υποβολή
                                </button>
                            </Grid>
                        </Grid>
                <Dialog
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    aria-labelledby="confirm-exit-dialog"
                >
                    <DialogTitle id="confirm-exit-dialog">Είστε σίγουροι ότι θέλετε να αποχωρήσετε;</DialogTitle>
                    <DialogActions>
                        <Button onClick={() => handleDialogClose(false)} color="secondary">
                            Έξοδος χωρίς αποθήκευση
                        </Button>
                        <Button onClick={() => handleDialogClose(true)} color="primary">
                           Αποθήκευση και έξοδος
                        </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => setSnackbarOpen(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
                        Οι αλλαγές αποθηκεύτηκαν με επιτυχία!
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
        </LocalizationProvider>
        </div>
    );
}
