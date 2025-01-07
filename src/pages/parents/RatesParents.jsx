import React, { useState } from 'react';
import '../../styles/Rates.css';
import Stars from '../../components/layout/stars.jsx';
import TextField from '@mui/material/TextField';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Box, Grid, Typography, Divider, IconButton  } from '@mui/material';
import Logo from '../../components/buttons/Logo.jsx';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import { addDoc, doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore'; 
import { db } from '../../providers/firebaseConfig';

export default function Rates() {


    const [initialFormData, setInitialFormData] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { nannyName, nannyId,nannySurname } = location.state || {};
    
    const [ratings, setRatings] = useState({
        timeliness: 0,
        respect: 0,
        creativity: 0,
        loveForChildren: 0,
        childHappiness: 0
    });
    const [comment, setComment] = useState('');

    const canSubmit = Object.values(ratings).every(value => value > 0);

    const handleSnackbarOpen = (message, severity = 'error') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');
      

    const handleCloseWithoutSaving = async() => {
        if (initialFormData) {
            setFormData(initialFormData); 
        }
        
                            
        
    };

    const handleSubmit = async () => {
        if (canSubmit) {
            try {
                await addDoc(collection(db, 'rates'), {
                    nannyId,
                    ratings,
                    comment,
                    timestamp: new Date()
                });
                navigate('/RatesSubmits');
            } catch (error) {
                console.error('Error saving the rates:', error);
            }
        } else {
            alert('Please complete all ratings before submitting.');
        }
    };

    const updateRating = (category, value) => {
        setRatings(prev => ({ ...prev, [category]: value }));
    };

    

    return (
        <Box sx={{ padding: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f9f9f9' }}>
             <Box
                sx={{
                    backgroundColor: 'white',
                    padding: '120px',
                    borderRadius: '18px',
                    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
                    maxWidth: '1000px',
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
            <div className="nanny-rates">
               

                <p className="this_text">Αξιολογήστε την {nannyName}</p>
                <Row>
                    <Col md={4}>
                        <b className="textp">Συνέπεια(χρόνος)</b>
                        <div className="star-ratingp">
                            <Stars />
                        </div>
                        <b className="textp">Σεβασμός</b>
                        <div className="star-ratingp">
                            <Stars />
                        </div>
                        <b className="textp">Δημιουργική Απασχόληση</b>
                        <div className="star-ratingp">
                                <Stars />
                        </div>
                    </Col>
                    <Col> </Col>
                    <Col> </Col>
                    <Col> </Col>
                    <Col md={6}>
                        <b className="textp">Αγάπη για τα παιδιά</b>
                        <div className="star-ratingp">
                                <Stars />
                        </div>
                        <b className="textp">Χαρά παιδιού</b>
                        <div className="star-ratingp">
                                <Stars />
                        </div>
                    </Col>
                </Row>
                <div className="container-textp">
                    <TextField fullWidth={false} label="Σχόλια" type="textp" className="nanny_rates_text" />
                </div>
                <div className="buttons-rates">
                    <button className='button-apply-rates' onClick={handleSubmit}>Υποβολή</button>
                </div>
            </div>
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
        
    );
}
