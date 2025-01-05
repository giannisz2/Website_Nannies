import React from "react";
import "../../styles/ProfileCard.css";

export default function ProfileCard({ nanny, onCardClick }) {
    return (
        <div 
            className="profile-card" 
            onClick={() => onCardClick(nanny)} 
            style={{ cursor: "pointer" }} 
        >
            <div className="profile-details">
                <div className="profile-image-placeholder">
                    <img src="/path/to/placeholder.png" alt={nanny.name} />
                </div>
                <div className="profile-info">
                    <h3>{`${nanny.name} ${nanny.surname}`}</h3>
                    <p><strong>Τοποθεσία:</strong> {nanny.location}</p>
                    <p><strong>Ηλικία:</strong> {nanny.age}</p>
                    <p><strong>Ειδίκευση:</strong> {nanny.experience}</p>
                    <p><strong>Εμπειρία:</strong> {nanny.experienceYears}</p>
                    <p><strong>Σπουδές:</strong> {nanny.educationLevel}</p>
                    <p><strong>Χρόνος Απασχόλησης:</strong> {nanny.employmentTime === 'full-time' ? 'Πλήρης Απασχόληση' : 'Μερική Απασχόληση'}</p>
                    <p>{nanny.bio}</p>
                </div>
            </div>
        </div>
    );
}
