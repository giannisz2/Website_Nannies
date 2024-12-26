import React from 'react';
import NavBarNannies from '../../components/layout/NavbarNannies';
import Footer from '../../components/layout/Footer';
import '../../styles/Stars.css';

export default function Rates() {
    return (
        <>
            <div className="nanny-rates">
                <NavBarNannies />
                <p className="text">Αξιολογήσεις</p>

                {/* Σύστημα Αξιολόγησης */}
                <div className="star-rating">
                    {[...Array(5)].map((_, index) => (
                        <>
                            <input
                                key={`input-${index}`}
                                type="radio"
                                id={`star${5 - index}`}
                                name="rating"
                                value={5 - index}
                            />
                            <label
                                key={`label-${index}`}
                                htmlFor={`star${5 - index}`}
                                title={`${5 - index} αστέρια`}
                            >
                                ★
                            </label>
                        </>
                    ))}
                </div>

                <Footer />
            </div>
        </>
    );
}
