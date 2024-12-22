import React, { useState } from "react";
import SidebarFilters from "../../components/layout/SidebarFilters";
import NavBarParents from "../../components/layout/NavBarParents";
import Footer from "../../components/layout/Footer";
import ProfileCard from "../../components/layout/ProfileCard";
import "../../styles/SearchNannies.css";

export default function SearchNannies() {
    const [nannies, setNannies] = useState([
        {
            id: 1,
            name: "Μαρία Μώμου",
            age: 30,
            specialization: "Νηπιαγωγός",
            experience: "5 χρόνια",
            description: "Αγαπώ τα παιδιά και επιθυμώ συνεργασία μαζί με οποια οικογένεια θέλει.",
        },
        {
            id: 2,
            name: "Ελένη Παπαδοπούλου",
            age: 25,
            specialization: "Ειδική Αγωγή",
            experience: "3 χρόνια",
            description: "Φιλική και έμπειρη στη φύλαξη παιδιών με ειδικές ανάγκες.",
        },
        {
            id: 3,
            name: "Κωνσταντίνα Μητσοπούλου",
            age: 35,
            specialization: "Παιδαγωγός",
            experience: "10 χρόνια",
            description: "Μεγάλη εμπειρία με νήπια και παιδιά σχολικής ηλικίας.",
        },
        {
            id: 3,
            name: "Κωνσταντίνα Μητσοπούλου",
            age: 35,
            specialization: "Παιδαγωγός",
            experience: "10 χρόνια",
            description: "Μεγάλη εμπειρία με νήπια και παιδιά σχολικής ηλικίας.",
        },{
            id: 3,
            name: "Κωνσταντίνα Μητσοπούλου",
            age: 35,
            specialization: "Παιδαγωγός",
            experience: "10 χρόνια",
            description: "Μεγάλη εμπειρία με νήπια και παιδιά σχολικής ηλικίας.",
        },{
            id: 3,
            name: "Κωνσταντίνα Μητσοπούλου",
            age: 35,
            specialization: "Παιδαγωγός",
            experience: "10 χρόνια",
            description: "Μεγάλη εμπειρία με νήπια και παιδιά σχολικής ηλικίας.",
        },{
            id: 3,
            name: "Κωνσταντίνα Μητσοπούλου",
            age: 35,
            specialization: "Παιδαγωγός",
            experience: "10 χρόνια",
            description: "Μεγάλη εμπειρία με νήπια και παιδιά σχολικής ηλικίας.",
        },
    ]);

    const [filterCriteria, setFilterCriteria] = useState({});

    // Function to filter nannies based on the criteria
    const getFilteredNannies = () => {
        return nannies.filter((nanny) => {
            if (filterCriteria.age && !nanny.age.toString().includes(filterCriteria.age)) return false;
            if (filterCriteria.specialization && !nanny.specialization.includes(filterCriteria.specialization))
                return false;
            if (filterCriteria.experience && !nanny.experience.includes(filterCriteria.experience)) return false;
            return true;
        });
    };

    const filteredNannies = getFilteredNannies();

    return (
        <>
            <NavBarParents className="navbar" />
            <div className="search-nannies-container">
                {/* Sidebar with Filters */}
                <SidebarFilters
                    className="sidebar"
                    onFilterChange={(filters) => setFilterCriteria(filters)}
                />

                {/* Nanny Profiles */}
                <div className="profile-list">
                    {filteredNannies.length > 0 ? (
                        filteredNannies.map((nanny) => (
                            <ProfileCard key={nanny.id} nanny={nanny} />
                        ))
                    ) : (
                        <p className="no-results">Δεν βρέθηκαν αποτελέσματα.</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
