import React, { useState } from "react";
import SidebarFilters from "../../components/layout/SidebarFilters";
import NavBarParents from "../../components/layout/NavBarParents";
import Footer from "../../components/layout/Footer";
import ProfileCard from "../../components/layout/ProfileCard";
import {Row} from 'react-bootstrap';
import HelpButton from '../../components/buttons/HelpButton'
import "../../styles/SearchNannies.css";

export default function SearchNannies() {
    const [nannies, setNannies] = useState([
        {
            id: 1,
            name: "Μαρία Μώμου",
            age: 30,
            specialization: "Νηπιαγωγός",
            experience: "5 χρόνια",
            description: "Αγαπώ τα παιδιά και επιθυμώ να συνεργαστώ μαζί με όποια οικογένεια θέλει.",
            studies: "Πρωτοβάθμια",
            employmentTime: "full-time"
        },
        {
            id: 2,
            name: "Ελένη Παπαδοπούλου",
            age: 25,
            specialization: "Ειδική Αγωγή",
            experience: "3 χρόνια",
            description: "Φιλική και έμπειρη στη φύλαξη παιδιών με ειδικές ανάγκες.",
            studies: "Δευτεροβάθμια",
            employmentTime: "part-time"
        },
        {
            id: 3,
            name: "Κωνσταντίνα Μητσοπούλου",
            age: 35,
            specialization: "Παιδαγωγός",
            experience: "10 χρόνια",
            description: "Μεγάλη εμπειρία με νήπια και παιδιά σχολικής ηλικίας.",
            studies: "Τριτοβάθμια",
            employmentTime: "full-time"
        },
        {
            id: 4,
            name: "Αθηνά Παππά",
            age: 28,
            specialization: "Νηπιαγωγός",
            experience: "6 χρόνια",
            description: "Εμπειρία στη φύλαξη νηπίων και στην εκπαίδευση παιδιών προσχολικής ηλικίας.",
            studies: "Πρωτοβάθμια",
            employmentTime: "part-time"
        },
        {
            id: 5,
            name: "Χριστίνα Στρατή",
            age: 32,
            specialization: "Ειδική Αγωγή",
            experience: "8 χρόνια",
            description: "Εξειδίκευση στην παροχή υποστήριξης σε παιδιά με αναπτυξιακές διαταραχές.",
            studies: "Δευτεροβάθμια",
            employmentTime: "full-time"
        },
        {
            id: 6,
            name: "Ιωάννα Μπουρνάζου",
            age: 40,
            specialization: "Παιδαγωγός",
            experience: "15 χρόνια",
            description: "Εμπειρία με παιδιά όλων των ηλικιών και εξειδίκευση στην καλλιτεχνική εκπαίδευση.",
            studies: "Τριτοβάθμια",
            employmentTime: "part-time"
        },
        {
            id: 7,
            name: "Άννα Βασιλείου",
            age: 24,
            specialization: "Νηπιαγωγός",
            experience: "2 χρόνια",
            description: "Διαθέτω γνώσεις και εμπειρία στην εκπαίδευση παιδιών προσχολικής ηλικίας.",
            studies: "Πρωτοβάθμια",
            employmentTime: "full-time"
        },
        {
            id: 8,
            name: "Κατερίνα Κεφαλά",
            age: 33,
            specialization: "Ειδική Αγωγή",
            experience: "7 χρόνια",
            description: "Αναλαμβάνω τη φροντίδα και την εκπαίδευση παιδιών με ειδικές ανάγκες.",
            studies: "Δευτεροβάθμια",
            employmentTime: "full-time"
        },
        {
            id: 9,
            name: "Γεωργία Μαυρίδου",
            age: 29,
            specialization: "Παιδαγωγός",
            experience: "4 χρόνια",
            description: "Μεγάλη εμπειρία στη φύλαξη και εκπαίδευση παιδιών νηπιακής και προσχολικής ηλικίας.",
            studies: "Τριτοβάθμια",
            employmentTime: "part-time"
        },
        {
            id: 10,
            name: "Νίνα Σοφία Καραχάλια",
            age: 37,
            specialization: "Νηπιαγωγός",
            experience: "12 χρόνια",
            description: "Παροχή εξαιρετικής φροντίδας και εκπαίδευσης σε παιδιά προσχολικής ηλικίας.",
            studies: "Πρωτοβάθμια",
            employmentTime: "full-time"
        },
        {
            id: 11,
            name: "Ειρήνη Παναγιώτου",
            age: 26,
            specialization: "Ειδική Αγωγή",
            experience: "3 χρόνια",
            description: "Εξειδίκευση στη φροντίδα και την υποστήριξη παιδιών με αναπτυξιακές αναπηρίες.",
            studies: "Δευτεροβάθμια",
            employmentTime: "full-time"
        },
        {
            id: 12,
            name: "Αναστασία Κουκουρίκου",
            age: 31,
            specialization: "Παιδαγωγός",
            experience: "7 χρόνια",
            description: "Μεγάλη εμπειρία με παιδιά σχολικής ηλικίας και εξειδίκευση στην ψυχολογική υποστήριξη.",
            studies: "Τριτοβάθμια",
            employmentTime: "part-time"
        },
        {
            id: 13,
            name: "Δήμητρα Καλαμάρα",
            age: 45,
            specialization: "Νηπιαγωγός",
            experience: "20 χρόνια",
            description: "Μεγάλη εμπειρία στην εκπαίδευση και φροντίδα νηπίων.",
            studies: "Πρωτοβάθμια",
            employmentTime: "full-time"
        },
        {
            id: 14,
            name: "Μαρία Καπλάνογλου",
            age: 28,
            specialization: "Ειδική Αγωγή",
            experience: "4 χρόνια",
            description: "Αναλαμβάνω παιδιά με ειδικές ανάγκες και παρέχω εξατομικευμένη φροντίδα.",
            studies: "Δευτεροβάθμια",
            employmentTime: "part-time"
        },
        {
            id: 15,
            name: "Αλεξάνδρα Νικολαΐδη",
            age: 30,
            specialization: "Παιδαγωγός",
            experience: "9 χρόνια",
            description: "Ειδίκευση στην προσχολική και σχολική εκπαίδευση.",
            studies: "Τριτοβάθμια",
            employmentTime: "full-time"
        },
        {
            id: 16,
            name: "Μαρία Χρυσοχοΐδη",
            age: 34,
            specialization: "Νηπιαγωγός",
            experience: "5 χρόνια",
            description: "Πάθος για την εκπαίδευση και φροντίδα παιδιών προσχολικής ηλικίας.",
            studies: "Πρωτοβάθμια",
            employmentTime: "part-time"
        },
        {
            id: 17,
            name: "Νικολέττα Τσιγγερίδου",
            age: 27,
            specialization: "Ειδική Αγωγή",
            experience: "6 χρόνια",
            description: "Εξειδίκευση στην υποστήριξη παιδιών με αυτισμό και μαθησιακές δυσκολίες.",
            studies: "Δευτεροβάθμια",
            employmentTime: "full-time"
        },
        {
            id: 18,
            name: "Σοφία Κόκκαλη",
            age: 29,
            specialization: "Παιδαγωγός",
            experience: "4 χρόνια",
            description: "Εξειδίκευση στην καλλιτεχνική εκπαίδευση και στη μουσική αγωγή για παιδιά.",
            studies: "Τριτοβάθμια",
            employmentTime: "part-time"
        },
        {
            id: 19,
            name: "Αλίκη Περδικάρη",
            age: 38,
            specialization: "Νηπιαγωγός",
            experience: "11 χρόνια",
            description: "Αγαπώ τα παιδιά και είμαι ειδική στην παροχή δημιουργικής απασχόλησης.",
            studies: "Πρωτοβάθμια",
            employmentTime: "full-time"
        },
        {
            id: 20,
            name: "Ευαγγελία Παπανικολάου",
            age: 41,
            specialization: "Ειδική Αγωγή",
            experience: "15 χρόνια",
            description: "Έχω εμπειρία στη φροντίδα και εκπαίδευση παιδιών με ειδικές ανάγκες.",
            studies: "Δευτεροβάθμια",
            employmentTime: "part-time"
        }
    ]);

    const [filterCriteria, setFilterCriteria] = useState({});

    const getFilteredNannies = () => {
        return nannies.filter((nanny) => {
            if (filterCriteria.age) {
                const ageFilter = filterCriteria.age;
                if (ageFilter.includes('+')) {
                    const minAge = parseInt(ageFilter.replace('+', '').trim());
                    if (nanny.age < minAge) return false;
                } else {
                    const ageRange = ageFilter.split('-').map(Number);
                    if (nanny.age < ageRange[0] || nanny.age > ageRange[1]) return false;
                }
            }

            if (filterCriteria.experience) {
                const experienceFilter = filterCriteria.experience;
                if (experienceFilter.includes('+')) {
                    const minExperience = parseInt(experienceFilter.replace('+', '').trim());
                    const nannyExperience = parseInt(nanny.experience.split(' ')[0]);
                    if (nannyExperience < minExperience) return false;
                } else {
                    const minExperience = parseInt(filterCriteria.experience);
                    const nannyExperience = parseInt(nanny.experience.split(' ')[0]);
                    if (nannyExperience < minExperience) return false;
                }
            }

            if (filterCriteria.specialization && !nanny.specialization.includes(filterCriteria.specialization)) return false;
            if (filterCriteria.studies && !nanny.studies.includes(filterCriteria.studies)) return false;

            if (filterCriteria.employmentTime && nanny.employmentTime !== filterCriteria.employmentTime) {
                return false;
            }

            return true;
        });
    };

    const filteredNannies = getFilteredNannies();

    return (
        <>
    <div className="page-container">
        <NavBarParents className="navbar" />
        <HelpButton />
        <main className="content">
            <div className="search-nannies-container">
                <SidebarFilters
                    className="sidebar"
                    onFilterChange={(filters) => setFilterCriteria(filters)}
                />
                <Row>
                    <div className="profile-list">
                        {filteredNannies.length > 0 ? (
                            filteredNannies.map((nanny) => (
                                <ProfileCard key={nanny.id} nanny={nanny} />
                            ))
                        ) : (
                            <p className="no-results">Δεν βρέθηκαν αποτελέσματα.</p>
                        )}
                    </div>
                </Row>
            </div>
        </main>
        <Footer />
    </div>
        </>
    );
}
