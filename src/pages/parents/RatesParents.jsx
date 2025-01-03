import React, { useState } from 'react';
import '../../styles/Rates.css';
import Stars from '../../components/layout/stars.jsx';
import TextField from '@mui/material/TextField';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Rates() {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        navigate('/RatesSubmits'); 
    };

    const handleClose = () => {
        navigate('/NanniesProfile'); 
    };

    return (
        <>
            <div className="nanny-rates">
                <button className="close-button" onClick={handleClose}>×</button>

                <p className="this_text">Αξιολόγησε την Μαρία Μώμμου</p>
                <Row>
                    <Col md={6}>
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
        </>
    );
}
