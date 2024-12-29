import React, { useState } from 'react';
import NavBarParents from '../../components/layout/NavBarParents';
import Footer from '../../components/layout/Footer';
import '../../styles/Rates.css';
import TextField from '@mui/material/TextField';
import HelpButton from '../../components/buttons/HelpButton'

export default function Rates() {
    const [showMore, setShowMore] = useState(false);
    const handleClick = () => {
        setShowMore(!showMore);  
    };
    return (
        <>
            <div className="nanny-rates">
                <NavBarParents />
                <HelpButton/>
                <p className="this_text">Αξιολόγησε την Μαρία Μώμμου</p>
                <div className="rating-container">
                    <b className="text">Συνέπεια(χρόνος)</b>
                    <div className="star-rating">
                        {[...Array(1)].map((_, index) => (
                            <label key={`filled-${index}`} className="filled">★</label>
                        ))}
                        {[...Array(4)].map((_, index) => (
                            <label key={`empty-${index}`} className="empty">★</label>
                        ))}
                    </div>
                    <b className="text">Σεβασμός</b>
                    <div className="star-rating">
                        {[...Array(4)].map((_, index) => (
                            <label key={`filled-${index}`} className="filled">★</label>
                        ))}
                        {[...Array(1)].map((_, index) => (
                            <label key={`empty-${index}`} className="empty">★</label>
                        ))}
                    </div>
                    <b className="text">Δημιουργική Απασχόληση</b>
                    <div className="star-rating">
                        {[...Array(3)].map((_, index) => (
                            <label key={`filled-${index}`} className="filled">★</label>
                        ))}
                        {[...Array(2)].map((_, index) => (
                            <label key={`empty-${index}`} className="empty">★</label>
                        ))}
                    </div>
                </div>
                <div className="rating-container2">
                    <b className="text">Αγάπη για τα παιδιά</b>
                    <div className="star-rating">
                        {[...Array(3)].map((_, index) => (
                            <label key={`filled-${index}`} className="filled">★</label>
                        ))}
                        {[...Array(2)].map((_, index) => (
                            <label key={`empty-${index}`} className="empty">★</label>
                        ))}
                    </div>
                    <b className="text">Χαρά παιδιού</b>
                    <div className="star-rating">
                        {[...Array(5)].map((_, index) => (
                            <label key={`filled-${index}`} className="filled">★</label>
                        ))}
                    </div>
                </div>
                <div className="container-text">
                    <TextField fullWidth={false} label="Σχόλια" type="text" className="nanny_rates_text" />
                </div>
                <button className='button-apply'>Υποβολή</button>
                <Footer />
            </div>
        </>
    );
}
