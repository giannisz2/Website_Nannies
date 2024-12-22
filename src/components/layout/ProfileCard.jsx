import React from "react";
import "../../styles/ProfileCard.css";

export default function ProfileCard({ nanny }) {
    return (
        <div className="profile-card">
            <div className="profile-image-placeholder">
                <img src="/path/to/placeholder.png" alt={nanny.name} />
            </div>
            <div className="profile-details">
                <h3>{nanny.name}</h3>
                <p><strong>Ηλικία:</strong> {nanny.age}</p>
                <p><strong>Ειδίκευση:</strong> {nanny.specialization}</p>
                <p><strong>Εμπειρία:</strong> {nanny.experience}</p>
                <p>{nanny.description}</p>
            </div>
        </div>
    );
}
