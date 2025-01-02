import React, { useState } from "react";
import 'react-calendar/dist/Calendar.css'; 
import SidebarFilters from "../../components/layout/SidebarRO";
import NavBarParents from "../../components/layout/NavBarParents";
import Footer from "../../components/layout/Footer";
import { Row, Col } from 'react-bootstrap';
import Breadcrumb from "../../components/layout/BreadcrumbSearchNannies";
import { useNavigate } from 'react-router-dom'; 
import { TextField } from '@mui/material';
import HelpButton from '../../components/buttons/HelpButton';
import "../../styles/SearchNannies.css";
import "../../styles/NanniesProfile.css";
import "../../styles/PopUp.css"

export default function NanniesProfile() {
    const breadcrumbLinks = [
        { label: 'Αναζήτηση Νταντάδων', path: '/SearchNannies' },
      ];
    
    const handleDownload = () => {
        const fileUrl = 'path/to/your/recommendation-letter.pdf';
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = 'Συστατική-Επιστολή.pdf'; 
        link.click(); 
    };

    const [show, setShow] = useState(false);
    const togglePopUp = () => setShow(!show);

    const navigate = useNavigate(); 

    const handleRateClick = () => {
        navigate('/RatesParents'); 
    };    

    const [successMessage, setSuccessMessage] = useState(false);
    
    const handleSendMessage = () => {
            setSuccessMessage(true);
            setShow(false);
            setTimeout(() => {
                setSuccessMessage(false);
            }, 3000);
        };
    
    const handleSendRequest =() =>{
        navigate('/TempAgreement');
    };
    
    const [nannies] = useState([
        {
            id: 1,
            name: "Μαρία Μώμου",
            age: 30,
            specialization: "Νηπιαγωγός",
            experience: "5 χρόνια",
            description: "Αγαπώ τα παιδιά και επιθυμώ συνεργασία μαζί με όποια οικογένεια θέλει. Μπορώ να κρατήσω μέχρι 3 παιδιά ταυτόχρονα.",
            studies: "Πρωτοβάθμια",
            employmentTime: "full-time",
            imageUrl: "https://via.placeholder.com/150" // Προσωρινή εικόνα
        }
    ]);

    const nanny = nannies[0]; // Θεωρούμε πως υπάρχει μία νταντά

    return (
        <>
            <NavBarParents className="navbar" />
            <HelpButton />
            <div className="search-result-nannies-container">
                <SidebarFilters
                    className="sidebar"
                    defaultFilters={{
                        name: nanny.name,
                        age: nanny.age,
                        specialization: nanny.specialization,
                        experience: nanny.experience,
                        studies: nanny.studies,
                        employmentTime: nanny.employmentTime
                    }}
                    disabled={true}
                />
                <Row>
                    <Col md={7}>
                        <div className="profil-list">
                            <div className="breadCrumb">
                                <Breadcrumb links={breadcrumbLinks} label={nanny.name}/>  
                            </div>                          
                            <div className="profil-card">
                                <div className="profil-content">
                                    <div className="profil-image">
                                        <img src="/path/to/placeholder.png" alt={nanny.name} />
                                    </div>
                                    <div className="profil-info">
                                        <h2>{nanny.name}</h2>
                                        <p>Ηλικία: {nanny.age}</p>
                                        <p>Εξειδίκευση: {nanny.specialization}</p>
                                        <p>Εμπειρία: {nanny.experience}</p>
                                        <p>Σπουδές: {nanny.studies}</p>
                                        <p>Τύπος απασχόλησης: {nanny.employmentTime}</p>
                                        <p>{nanny.description}</p>
                                        <div className="button-container">
                                            <button className="talk-button" onClick={togglePopUp}>
                                                <span className="icon">💬</span> Μίλα με την νταντά
                                            </button>
                                            {show && (
                                                <div className="popup-overlay">
                                                <div className="popup">
                                                    <button className="close-btn" onClick={togglePopUp}>
                                                            &times;
                                                    </button>
                                                    <TextField fullWidth label="Το μήνυμά σου..." type="text" className="popup_text" />
                                                    <div className="popup-buttons">
                                                    <button className="cancel-btn" onClick={togglePopUp}>
                                                        Ακύρωση
                                                    </button>
                                                    <button className="send-btn" onClick={handleSendMessage}>
                                                        Αποστολή
                                                    </button>
                                                    </div>
                                                </div>
                                                </div>
                                            )}
                                            <button className="rate-button" onClick={handleRateClick}>
                                                <span className="icon">⭐</span> Αξιολόγησε τη νταντά
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="additional-boxes">
                                <div className="info-box">
                                    <h3>Εμπειρία</h3>
                                    <p>Έχω εργαστεί ήδη 3 χρόνια σαν νταντά και 8 χρόνια σε παιδότοπο.</p>
                                </div>
                                <div className="info-box">
                                    <h3>Επίπεδο Σπουδών</h3>
                                    <p>Έχω πτυχίο από το Τμήμα Δημοτικής Εκπαίδευσης του Πανεπιστημίου Αθηνών.
                                        Γνωρίζω Μουσική και κάνω σεμινάρια Μουσικοκινητικής Αγωγής.
                                        Έχω το πτυχίο του Proficiency και αν η οικογένεια επιθυμεί μπορώ να επικοινωνώ με το παιδί αποκλειστικά στα Αγγλικά.</p>
                                </div>
                            </div>
                            <button className="button-recommendations" onClick={handleDownload}>
                                Συστατικές Επιστολές
                            </button>
                        </div>
                </Col>
                <Col md={5}>
                    <div className="center-container">
                        <div className="header-meet"> ΚΡΑΤΗΣΗ ΡΑΝΤΕΒΟΥ</div>
                        <div className="this_text"> !!! Έχεις ήδη κάνει το το ραντέβου που δικαιούσαι με την συγκεκριμένη επαγγελματία</div>
                        <div className="info-box-children2">
                            <ch3>Έχω 3 παιδιά</ch3>
                        </div>
                        <div className="pets">
                            <span className='span-text'>Έχω κατοικίδιο</span>
                                <input
                                    className='checkbox' 
                                    type="checkbox" 
                                />
                        </div>
                        <button type="button" className="button-apply-pc" onClick={handleSendRequest}>Δείξε το ενδιαφέρον σου για να συνεργαστείτε</button>
                    </div>
                </Col>
                </Row>
                </div>
            <Footer />
        </>
    );
}
