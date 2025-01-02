import React from "react";
import { useLocation } from "react-router-dom";

export default function NanniesProfileOthers() {
    const location = useLocation();
    const nanny = location.state; // Get passed state

    if (!nanny) {
        return <p>Δεν βρέθηκε προφίλ νταντάς.</p>;
    }

    return (
        <div>
            <h2>{nanny.name}</h2>
            <p><strong>Ηλικία:</strong> {nanny.age}</p>
            <p><strong>Εξειδίκευση:</strong> {nanny.specialization}</p>
            <p><strong>Εμπειρία:</strong> {nanny.experience}</p>
            <p><strong>Σπουδές:</strong> {nanny.studies}</p>
            <p><strong>Περιγραφή:</strong> {nanny.description}</p>
        </div>
    );
}
