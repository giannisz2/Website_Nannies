import React, { useState } from 'react';
import NavBarNannies from '../../components/layout/NavbarNannies';
import Footer from '../../components/layout/Footer';
import '../../styles/Rates.css';
import TextField from '@mui/material/TextField';
import HelpButton from '../../components/buttons/HelpButton'
import Breadcrumb from '../../components/layout/Breadcrumb'

export default function Rates() {
    const [showMore, setShowMore] = useState(false);
    const handleClick = () => {
        setShowMore(!showMore);  
    };
    return (
        <>
            <div className="nanny-rates">
                <NavBarNannies />
                <Breadcrumb label="Αξιολογήσεις"/>
                <HelpButton/>
                <p className="this_text">Αξιολογήσεις</p>
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
                  <TextField fullWidth={false} label="Σχόλια" type="text" value="Πολύ καλή στη δουλειά της" className="nanny_rates_text" disabled/>
                {!showMore && (
                    <p>
                    <span
                        className="clickable-text"
                        onClick={handleClick}
                        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                    >
                        Δείτε περισσότερα...
                    </span>
                    </p>
                )}
                {showMore && (
                <p>
                    Έμαθε στα παιδιά μας να είναι ευγενικοί άνθρωποι και να διασκεδάζουν χωρίς σταματιμό.
                </p>
                )}
                </div>                <Footer />
            </div>
        </>
    );
}
