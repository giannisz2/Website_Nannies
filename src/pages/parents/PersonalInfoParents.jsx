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
import {
    RadioGroup,
    FormControlLabel,
    Radio,
  } from '@mui/material';
  


export default function PersonalInfo() {
    const [formData, setFormData] = useState({  name: '',
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
  
      
      ['gender', 'phone', 'residence', 'childrenCount', 'pets', 'childrenUnder2', 'nannyChildrenCount'].forEach(field => {
          if (typeof formData[field] === 'string' ? !formData[field]?.trim() : !formData[field]) {
              errors[field] = true;
              isValid = false;
          }
      });
  
      
      if (!formData.birthdate || !dayjs(formData.birthdate, 'DD/MM/YYYY', true).isValid()) {
          errors.birthdate = true;
          isValid = false;
      }
  
      setFormErrors(errors);
      if (!validatePhoneNumber(formData.phone)) {
          handleSnackbarOpen('Ο αριθμός τηλεφώνου πρέπει να έχει 10 ψηφία.', 'error');
          return false;
      }
      
      if (!formData.residence) {
        errors.residence = true;
        isValid = false;
    }
    if (!formData.childrenCount) {
        errors.childrenCount = true;
        isValid = false;
    }
    if (!formData.pets) {
        errors.pets = true;
        isValid = false;
    }
    if (!formData.childrenUnder2) {
        errors.childrenUnder2 = true;
        isValid = false;
    }
    if (!formData.nannyChildrenCount) {
        errors.nannyChildrenCount = true;
        isValid = false;
    }


    if (parseInt(formData.childrenUnder2) > parseInt(formData.childrenCount)) {
        errors.childrenUnder2 = true;
        handleSnackbarOpen('Ο αριθμός παιδιών σε ηλικίες από 6 μηνών έως 2.5 ετών δεν μπορεί να είναι μεγαλύτερος από το συνολικό αριθμό παιδιών.', 'error');
        isValid = false;
    }
    

    if (parseInt(formData.nannyChildrenCount) > parseInt(formData.childrenUnder2)) {
        errors.nannyChildrenCount = true;
        handleSnackbarOpen('Ο αριθμός παιδιών που θέλετε να αναλάβει η νταντά δεν μπορεί να είναι μεγαλύτερος από τον αριθμό παιδιών σε ηλικίες από 6 μηνών έως 2.5 ετών.', 'error');
        isValid = false;
    }
    
    setFormErrors(errors);
    



    
    
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
              const userRef = doc(db, 'Parent', userId);
              const userDoc = await getDoc(userRef);
              if (userDoc.exists()) {
                  const data = userDoc.data();
                  if (data.birthdate && data.birthdate.toDate) {
                      data.birthdate = dayjs(data.birthdate.toDate()).format('DD/MM/YYYY');
                  }
                  console.log('Fetched data:', data);
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
      console.log(formData.residence)
  }, []);


  const handleInputChange = (event) => {
      const { name, value } = event.target;
      if (name === "childrenUnder2") {
        if (parseInt(value) > parseInt(formData.childrenCount)) {
            handleSnackbarOpen('Ο αριθμός παιδιών σε ηλικίες από 6 μηνών έως 2.5 ετών δεν μπορεί να είναι μεγαλύτερος από το συνολικό αριθμό παιδιών.', 'error');
            setFormErrors((prev) => ({ ...prev, [name]: true }));
            return;
        } else {
            setFormErrors((prev) => ({ ...prev, [name]: false }));
        }
    }


    if (name === "nannyChildrenCount") {
        if (parseInt(value) > parseInt(formData.childrenUnder2)) {
            handleSnackbarOpen('Ο αριθμός παιδιών που θέλετε να αναλάβει η νταντά δεν μπορεί να είναι μεγαλύτερος από τον αριθμό παιδιών σε ηλικίες από 6 μηνών έως 2.5 ετών.', 'error');
            setFormErrors((prev) => ({ ...prev, [name]: true }));
            return;
        } else {
            setFormErrors((prev) => ({ ...prev, [name]: false }));
        }
    }

    setFormData({ ...formData, [name]: value });

    setFormData((prev) => {
        const updatedFormData = { ...prev, [name]: value };
        
        
        return updatedFormData;
    });


    setFormErrors({ ...formErrors, [name]: !value });
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
          const userRef = doc(db, 'Parent', userId);
          console.log('Saving data:', formData);
          await updateDoc(userRef, formData);
          localStorage.setItem('initialFormData', JSON.stringify(initialFormData));
          navigate('/PersonalInfoParentsDone'); 
      } catch (error) {
          console.error('Error updating document: ', error);
          alert('Σφάλμα κατά την ενημέρωση των στοιχείων.');
        };
    

        if (isLoading) {
            return <p>Φόρτωση...</p>;
          }
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
              navigate('/ParentHomepage'); 
          };

          
          return (
            <div className="hyper-div">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Breadcrumb label="Επεξεργασία προφίλ"/>
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
                                  <TextField
                                      fullWidth
                                      label="Τηλέφωνο Επικοινωνίας"
                                      type="text"
                                      name="phone"
                                      value={formData.phone || ''}
                                      onChange={handleInputChange}
                                      className="my-3"
                                      helperText={formErrors.phone && <span style={{ color: 'red', fontSize: '12px' }}>Το πεδίο είναι υποχρεωτικό</span>}
                                  />
                                   <FormControl fullWidth className="my-3">
                                      <InputLabel>Αριθμός Παιδιών</InputLabel>
                                      <Select
                                          name="childrenCount"
                                          value={formData.childrenCount}
                                          onChange={handleInputChange}
                                      >
                                          <MenuItem value="1">1</MenuItem>
                                          <MenuItem value="2">2</MenuItem>
                                          <MenuItem value="3">3</MenuItem>
                                          <MenuItem value="4+">4+</MenuItem>
                                      </Select>
                                      {formErrors.childrenCount && (
                                              <p style={{ color: 'red', fontSize: '12px' , textAlign:'left'}}>
                                                  Το πεδίο Αριθμός Παιδιών είναι υποχρεωτικό
                                              </p>
                                          )}
                                  </FormControl>
                                  <FormControl fullWidth className="my-3">
                                      <InputLabel>Πόσα παιδιά έχετε σε ηλικίες από 6 μηνών έως 2.5 ετών</InputLabel>
                                      <Select
                                          name="childrenUnder2"
                                          value={formData.childrenUnder2}
                                          onChange={handleInputChange}
                                      >
                                          <MenuItem value="1">1</MenuItem>
                                          <MenuItem value="2">2</MenuItem>
                                          <MenuItem value="3">3</MenuItem>
                                          <MenuItem value="4+">4+</MenuItem>
                                      </Select>
                                      {formErrors.childrenUnder2 && (
                                              <p style={{ color: 'red', fontSize: '12px', textAlign:'left' }}>
                                                  Το πεδίο Πόσα παιδιά έχετε σε ηλικίες από 6 μηνών έως 2.5 ετών είναι υποχρεωτικό
                                              </p>
                                          )}
                                  </FormControl>
                                  
                                  
                                 
                                  
                                  
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
                                      value={formData.birthdate || ''}
                                      InputProps={{ readOnly: true }}
                                      className="my-3"
                                  />
                                  
                                  <TextField
                                      fullWidth
                                      label="Τόπος Κατοικίας"
                                      name="residence"
                                      value={formData.residence}
                                      onChange={handleInputChange}
                                      className="my-3"
                                      helperText={formErrors.residence ? (
                                          <span style={{ color: 'red', fontSize: '12px' }}>Το πεδίο Τόπος Κατοικίας είναι υποχρεωτικό</span>
                                      ) : null} 
                                  />
                                 <FormControl fullWidth className="my-3">
                                    <InputLabel shrink>Έχετε κατοικίδια</InputLabel>
                                        <RadioGroup
                                                row
                                                aria-label="pets"
                                                name="pets"
                                                value={formData.pets || ''}
                                                onChange={handleInputChange}
                                            >
                                                <FormControlLabel value="ΝΑΙ" control={<Radio />} label="ΝΑΙ" />
                                                <FormControlLabel value="ΟΧΙ" control={<Radio />} label="ΟΧΙ" />
                                                
                                            </RadioGroup>
                                        
                                        {formErrors.pets && (
                                                <p style={{ color: 'red', fontSize: '12px', textAlign:'left' }}>
                                                    Το πεδίο Έχετε κατοικίδια στο σπίτι είναι υποχρεωτικό
                                                </p>
                                            )}
                                    </FormControl>
                                  <FormControl fullWidth className="my-3">
                                      <InputLabel>Πόσα παιδιά θέλετε να αναλάβει η ντάντα;</InputLabel>
                                      <Select
                                          name="nannyChildrenCount"
                                          value={formData.nannyChildrenCount}
                                          onChange={handleInputChange}
                                      >
                                          <MenuItem value="1">1</MenuItem>
                                          <MenuItem value="2">2</MenuItem>
                                          <MenuItem value="3">3</MenuItem>
                                          <MenuItem value="4+">4+</MenuItem>
                                      </Select>
                                      {formErrors.nannyChildrenCount && (
                                              <p style={{ color: 'red', fontSize: '12px' , textAlign:'left' }}>
                                                  Το πεδίο Πόσα παιδιά θέλετε να αναλάβει η ντάντα είναι υποχρεωτικό
                                              </p>
                                          )}
                                  </FormControl>
                                  
                                 
                                  
                                                          
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
            </div>
          );
        
      }