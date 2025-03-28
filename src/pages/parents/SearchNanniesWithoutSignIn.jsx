import React, { useState, useEffect } from "react";

import { useLocation } from 'react-router-dom';
import SidebarFiltersAlt from "../../components/layout/SidebarFiltersAlt.jsx";
import NavBar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import ProfileCard from "../../components/layout/ProfileCardPopUp";
import { Row } from "react-bootstrap";
import HelpButton from "../../components/buttons/HelpButton";
import "../../styles/SearchNannies.css";
import "../../styles/PopUp.css"
import { db } from "../../providers/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Breadcrumb from '../../components/layout/BreadcrumbH';
import dayjs from "dayjs";

export default function SearchNanniesWithoutSignIn() {
    const [isPopupOpen, setIsPopupOpen] = useState(false); 
    const [selectedNanny, setSelectedNanny] = useState(null);
    const queryParams = new URLSearchParams(location.search);
    const locationFromQuery = queryParams.get('location');
    const decodedLocation = locationFromQuery
    ? decodeURIComponent(locationFromQuery)
    : "";
   
    const [nannies, setNannies] = useState([]);
    const [filterCriteria, setFilterCriteria] = useState({ location: decodedLocation });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNannies = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                const fetchedNannies = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    const birthdate = data.birthdate?.toDate
                      ? data.birthdate.toDate()
                      : new Date(data.birthdate || null);
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
    
            if (filterCriteria.location && nanny.location !== filterCriteria.location) {
                return false;
              }
            return true; 
        });
    };
    

    const filteredNannies = getFilteredNannies();

    if (loading) {
        return <p>Φόρτωση δεδομένων...</p>;
    }

  const handleNannyClick = (nanny) => {
    setSelectedNanny(nanny); 
    setIsPopupOpen(true); 
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false); 
    setSelectedNanny(null); 
    };

    if (error) {
        return <div>{error}</div>;
      }
    

  return (
      <div className="page-container">
          <NavBar className="navbar" />
          <Breadcrumb label="Αναζήτηση"/>
          <HelpButton />
          <main className="content">
              <div className="search-nannies-container">
                  <SidebarFiltersAlt locationFromQuery={decodedLocation}
                      className="sidebar"
                      onFilterChange={(filters) => setFilterCriteria(filters)}
                  />
                  <Row>
                      <div className="profile-list">
                          {filteredNannies.length > 0 ? (
                              filteredNannies.map((nanny) => (
                                  <ProfileCard 
                                      key={nanny.id} 
                                      nanny={nanny} 
                                      onCardClick={handleNannyClick} 
                                  />
                              ))
                          ) : (
                              <p className="no-results">Δεν βρέθηκαν αποτελέσματα.</p>
                          )}
                      </div>
                  </Row>
              </div>
          </main>
          <Footer />
          {isPopupOpen && selectedNanny && (
              <div className="popup-overlay" onClick={handleClosePopup}>
                  <div className="popup" >
                      <button className="close-btn" onClick={handleClosePopup}>
                          X
                      </button>
                      <p><strong>Πρέπει να συνδεθείς ή να δημιουργήσεις λογαριασμό, για να μπεις στο προφίλ της νταντάς</strong></p>
                  </div>
              </div>
          )}
          </div>
  )
}
