import React, { useState, useEffect } from "react";
import SidebarFilters from "../../components/layout/SidebarFilters";
import NavBarParents from "../../components/layout/NavBarParents";
import Footer from "../../components/layout/Footer";
import ProfileCard from "../../components/layout/ProfileCard";
import { Row } from "react-bootstrap";
import HelpButton from "../../components/buttons/HelpButton";
import "../../styles/SearchNannies.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../providers/firebaseConfig";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import dayjs from "dayjs";

export default function SearchNannies() {
    const [nannies, setNannies] = useState([]);
    const [filterCriteria, setFilterCriteria] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNannies = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                const fetchedNannies = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
        
                    let birthdate;
                    if (data.birthdate?.toDate) {
                        birthdate = data.birthdate.toDate();
                    } else if (typeof data.birthdate === "string") {
                        birthdate = new Date(data.birthdate);
                    } else if (data.birthdate instanceof Date) {
                        birthdate = data.birthdate;
                    } else {
                        birthdate = null;
                    }
        
                    const age = birthdate instanceof Date && !isNaN(birthdate)
                        ? new Date().getFullYear() - birthdate.getFullYear()
                        : null;
        
                    return {
                        id: doc.id,
                        ...data,
                        age,
                        surname: data.surname || "Χωρίς Επώνυμο",
                    };
                });
        
                console.log("Fetched nannies:", fetchedNannies);
                setNannies(fetchedNannies);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching nannies:", err);
                setError("Σφάλμα κατά τη λήψη δεδομένων.");
                setLoading(false);
            }
        };

        fetchNannies();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    const getFilteredNannies = () => {
        return nannies.filter((nanny) => {
            if (filterCriteria.age) {
                const ageFilter = filterCriteria.age;
                if (ageFilter.includes("+")) {
                    const minAge = parseInt(ageFilter.replace("+", "").trim());
                    if (nanny.age < minAge) return false;
                } else if (ageFilter.includes("-")) {
                    const ageRange = ageFilter.split("-").map(Number);
                    if (nanny.age < ageRange[0] || nanny.age > ageRange[1]) return false;
                } else {
                    const minAge = parseInt(ageFilter.replace("+", "").trim()) - 2;
                    const maxAge = parseInt(ageFilter.replace("+", "").trim()) + 3;
                    if (nanny.age < minAge || nanny.age > maxAge) return false;
                }
            }
    
            if (filterCriteria.experienceYears) {
                const experienceYears = parseInt(nanny.experienceYears || "0");
                const requiredYears = parseInt(filterCriteria.experienceYears);
                if (experienceYears !== requiredYears) return false;
            }
    
            if (filterCriteria.experience && !nanny.experience?.includes(filterCriteria.experience)) return false;
            if (filterCriteria.educationLevel && !nanny.educationLevel?.includes(filterCriteria.educationLevel)) return false;
    
            if (filterCriteria.employmentTime && nanny.employmentTime !== filterCriteria.employmentTime) {
                return false;
            }
    
            if (filterCriteria.location) {
                if (nanny.location !== filterCriteria.location) {
                    return false;
                }
            }
            return true; 
        });
    };
    

    const filteredNannies = getFilteredNannies();

    if (loading) {
        return <p>Φόρτωση δεδομένων...</p>;
    }

    return (
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
    );
}
