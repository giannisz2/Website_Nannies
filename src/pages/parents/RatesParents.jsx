import React, { useState } from 'react';
import '../../styles/Rates.css';
import Stars from '../../components/layout/stars.jsx';
import TextField from '@mui/material/TextField';
import { Row, Col } from 'react-bootstrap';

export default function Rates() {
    const [showMore, setShowMore] = useState(false);
    const handleClick = () => {
        setShowMore(!showMore);  
    };
    return (
        <>
            <div className="nanny-rates">
                <p className="this_text">Αξιολόγησε την Μαρία Μώμμου</p>
                <Row>
                    <Col md={6}>
                        <b className="textp">Συνέπεια(χρόνος)</b>
                        <div className="star-rating">
                            <Stars />
                        </div>
                        <b className="textp">Σεβασμός</b>
                        <div className="star-rating">
                            <Stars />
                        </div>
                        <b className="text">Δημιουργική Απασχόληση</b>
                        <div className="star-rating">
                                <Stars />
                        </div>
                    </Col>

                    <Col md={6}>
                        <b className="text">Αγάπη για τα παιδιά</b>
                        <div className="star-rating">
                                <Stars />
                        </div>
                        <b className="text">Χαρά παιδιού</b>
                        <div className="star-rating">
                                <Stars />
                        </div>
                    </Col>
                </Row>
                <div className="container-textp">
                    <TextField fullWidth={false} label="Σχόλια" type="textp" className="nanny_rates_text" />
                </div>
                <div className="buttons-rates">
                    <button className='button-apply-rates'>Υποβολή</button>
                </div>
            </div>
        </>
    );
}
