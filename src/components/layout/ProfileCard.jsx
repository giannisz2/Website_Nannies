import React from 'react';
import '../../styles/ProfileCard.css';

export default function ProfileCard() {
    return (
        <div className="profile-card">
            <div className="profile-image">
                {/* Placeholder for the image */}
                <img
                    src="https://via.placeholder.com/150"
                    alt="Profile"
                />
            </div>
            <div className="profile-details">
                <h3 className="profile-name">Μαρία Μόμμου</h3>
                <p className="profile-subtitle">Κυψέλη</p>
                <p className="profile-description">
                    Καλοκάγαθη και ευγενική.
                    <br />
                    Αγαπώ τα παιδιά και επιθυμώ συνεργασία μαζί με όποια οικογένεια θέλει.
                    Μπορώ να κρατήσω μέχρι 3 παιδιά ταυτόχρονα.
                </p>
            </div>
        </div>
    );
}
