import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ProfileCard.css";

export default function ProfileCardAgain({ nanny }) {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        if (nanny.name === "Μαρία Μώμου") {
            navigate(`/NanniesProfile`, { state: nanny }); // Pass state
        } else {
            navigate(`/NanniesProfileOthers`, { state: nanny }); // Pass state
        }
    };

    return (
        <div className="profile-card" onClick={handleProfileClick} style={{ cursor: "pointer" }}>
            <div className="profile-details">
                <div className="profile-image-placeholder">
                    <img src="/path/to/placeholder.png" alt={`${nanny.name} ${nanny.surname}`} />
                </div>
                <div className="profile-info">
                    <h3>{`${nanny.name} ${nanny.surname}`}</h3>
                    <p><strong>Ηλικία:</strong> {nanny.age}</p>
                    <p><strong>Ειδίκευση:</strong> {nanny.specialization}</p>
                    <p><strong>Εμπειρία:</strong> {nanny.experience}</p>
                    <p><strong>Σπουδές:</strong> {nanny.studies}</p>
                    <p><strong>Χρόνος Απασχόλησης:</strong> {nanny.employmentTime === 'full-time' ? 'Πλήρης Απασχόληση' : 'Μερική Απασχόληση'}</p>
                    <p>{nanny.description}</p>
                </div>
            </div>
        </div>
    );
}
