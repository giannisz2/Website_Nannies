import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import SidebarFiltersAlt from "../../components/layout/SidebarFiltersAlt.jsx";
import NavBar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import ProfileCard from "../../components/layout/ProfileCardPopUp";
import { Row } from "react-bootstrap";
import HelpButton from "../../components/buttons/HelpButton";
import "../../styles/SearchNannies.css";
import { db } from "../../providers/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function SearchNannies() {
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const locationFromQuery = queryParams.get('location');
  const decodedLocation = locationFromQuery
    ? decodeURIComponent(locationFromQuery).replace(' - ', ':').replace(/\s+/g, '')
    : '';

  const [filterCriteria, setFilterCriteria] = useState({ location: decodedLocation || '' });
  const [nannies, setNannies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedNanny, setSelectedNanny] = useState(null);

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
          } else {
            birthdate = data.birthdate;
          }
          const age = birthdate ? new Date().getFullYear() - birthdate.getFullYear() : null;
          return {
            id: doc.id,
            ...data,
            age,
            surname: data.surname || "Χωρίς Επώνυμο",
          };
        });

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

  const getFilteredNannies = () => {
    return nannies.filter((nanny) => {
      if (filterCriteria.location && nanny.location !== filterCriteria.location) {
        return false; // Only return nannies whose location matches the filter
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
      <NavBar className="navbar" />
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
                    onCardClick={() => setSelectedNanny(nanny)} 
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
    </div>
  );
}
