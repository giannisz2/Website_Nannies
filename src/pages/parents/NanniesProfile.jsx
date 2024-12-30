import React, { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import SidebarFilters from "../../components/layout/SidebarRO";
import NavBarParents from "../../components/layout/NavBarParents";
import Footer from "../../components/layout/Footer";
import { Row, Col } from 'react-bootstrap';
import Breadcrumb from "../../components/layout/BreadcrumbSearchNannies";
import HelpButton from '../../components/buttons/HelpButton';
import "../../styles/SearchNannies.css";
import "../../styles/NanniesProfile.css";


export default function NanniesProfile() {
    const handleDownload = () => {
        const fileUrl = 'path/to/your/recommendation-letter.pdf';
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = 'Συστατική-Επιστολή.pdf'; 
        link.click(); 
    };

    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);  
    };
    
    const [formErrors, setFormErrors] = useState({});
    
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
                    <Col md={6}>
                    <div className="profil-list">
                        <div className="breadCrumb">
                            <Breadcrumb label={nanny.name}/>  
                        </div>                          
                        <div className="profil-card">
                            <div className="profil-content">
                                <div className="profil-image">
                                    <img src={nanny.imageUrl} alt="Nanny" />
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
                                        <button className="talk-button">
                                            <span className="icon">💬</span> Μίλα με την νταντά
                                        </button>
                                        <button className="rate-button">
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
                <Col md={6}>
                    <div className="center-container">
                        <div className="header-meet"> ΚΡΑΤΗΣΗ ΡΑΝΤΕΒΟΥ</div>
                        <Calendar />
                        <div className="info-box-children">
                            <ch3>Έχω</ch3>
                            <input 
                                className="children-input"
                                type="text"
                                placeholder="Συμπληρώστε τον αριθμό"
                                onChange={(e) => setNumberOfChildren(e.target.value)} 
                                error={formErrors.name}
                                helperText={formErrors.name && "Πρέπει να συμπληρωθεί για να προχωρήσετε παρακάτω"}        
                            />
                            <ch3>παιδιά</ch3>
                        </div>
                        <div className="pets">
                            <span className='span-text'>Έχω κατοικίδιο</span>
                                <input
                                    className='checkbox' 
                                    type="checkbox" 
                                    checked={isChecked} 
                                    onChange={handleCheckboxChange} 
                                />
                        </div>
                        <button type="button" className="button-apply-pc">Κλείσε ραντεβού</button>
                    </div>
                </Col>
                </Row>
                </div>
            <Footer />
        </>
    );
}
