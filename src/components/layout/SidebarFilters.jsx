import React, { useState } from 'react';
import '../../styles/SidebarFilters.css';

const citiesAndTowns = [
    { region: "ΑΤΤΙΚΗ", name: "ΑΘΗΝΑ" },
    { region: "ΑΤΤΙΚΗ", name: "ΠΕΙΡΑΙΑΣ" },
    { region: "ΑΤΤΙΚΗ", name: "ΜΑΡΟΥΣΙ" },
    { region: "ΑΤΤΙΚΗ", name: "ΚΗΦΙΣΙΑ" },
    { region: "ΑΤΤΙΚΗ", name: "ΓΛΥΦΑΔΑ" },
    { region: "ΑΤΤΙΚΗ", name: "ΒΟΥΛΑ" },
    { region: "ΑΤΤΙΚΗ", name: "ΒΟΥΛΙΑΓΜΕΝΗ" },
  
    { region: "ΘΕΣΣΑΛΟΝΙΚΗ", name: "ΘΕΣΣΑΛΟΝΙΚΗ" },
    { region: "ΘΕΣΣΑΛΟΝΙΚΗ", name: "ΚΑΛΑΜΑΡΙΑ" },
    { region: "ΘΕΣΣΑΛΟΝΙΚΗ", name: "ΠΥΛΑΙΑ" },
    { region: "ΘΕΣΣΑΛΟΝΙΚΗ", name: "ΕΥΟΣΜΟΣ" },
    { region: "ΘΕΣΣΑΛΟΝΙΚΗ", name: "ΣΤΑΥΡΟΥΠΟΛΗ" },
  
    { region: "ΠΕΛΟΠΟΝΝΗΣΟΣ", name: "ΠΑΤΡΑ" },
    { region: "ΠΕΛΟΠΟΝΝΗΣΟΣ", name: "ΚΑΛΑΜΑΤΑ" },
    { region: "ΠΕΛΟΠΟΝΝΗΣΟΣ", name: "ΣΠΑΡΤΗ" },
    { region: "ΠΕΛΟΠΟΝΝΗΣΟΣ", name: "ΚΟΡΙΝΘΟΣ" },
    { region: "ΠΕΛΟΠΟΝΝΗΣΟΣ", name: "ΤΡΙΠΟΛΗ" },
    { region: "ΠΕΛΟΠΟΝΝΗΣΟΣ", name: "ΝΑΥΠΛΙΟ" },
    { region: "ΠΕΛΟΠΟΝΝΗΣΟΣ", name: "ΑΡΓΟΣ" },
  
    { region: "ΚΡΗΤΗ", name: "ΗΡΑΚΛΕΙΟ" },
    { region: "ΚΡΗΤΗ", name: "ΧΑΝΙΑ" },
    { region: "ΚΡΗΤΗ", name: "ΡΕΘΥΜΝΟ" },
    { region: "ΚΡΗΤΗ", name: "ΑΓΙΟΣ ΝΙΚΟΛΑΟΣ" },
  
    { region: "ΣΤΕΡΕΑ ΕΛΛΑΔΑ", name: "ΛΑΜΙΑ" },
    { region: "ΣΤΕΡΕΑ ΕΛΛΑΔΑ", name: "ΧΑΛΚΙΔΑ" },
    { region: "ΣΤΕΡΕΑ ΕΛΛΑΔΑ", name: "ΘΗΒΑ" },
    { region: "ΣΤΕΡΕΑ ΕΛΛΑΔΑ", name: "ΛΙΒΑΔΕΙΑ" },
  
    { region: "ΜΑΚΕΔΟΝΙΑ", name: "ΚΑΒΑΛΑ" },
    { region: "ΜΑΚΕΔΟΝΙΑ", name: "ΒΕΡΟΙΑ" },
    { region: "ΜΑΚΕΔΟΝΙΑ", name: "ΣΕΡΡΕΣ" },
    { region: "ΜΑΚΕΔΟΝΙΑ", name: "ΔΡΑΜΑ" },
    { region: "ΜΑΚΕΔΟΝΙΑ", name: "ΚΟΖΑΝΗ" },
    { region: "ΜΑΚΕΔΟΝΙΑ", name: "ΚΑΣΤΟΡΙΑ" },
  
    { region: "ΗΠΕΙΡΟΣ", name: "ΙΩΑΝΝΙΝΑ" },
    { region: "ΗΠΕΙΡΟΣ", name: "ΑΡΤΑ" },
    { region: "ΗΠΕΙΡΟΣ", name: "ΠΡΕΒΕΖΑ" },
    { region: "ΗΠΕΙΡΟΣ", name: "ΗΓΟΥΜΕΝΙΤΣΑ" },
  
    { region: "ΘΕΣΣΑΛΙΑ", name: "ΛΑΡΙΣΑ" },
    { region: "ΘΕΣΣΑΛΙΑ", name: "ΒΟΛΟΣ" },
    { region: "ΘΕΣΣΑΛΙΑ", name: "ΚΑΡΔΙΤΣΑ" },
    { region: "ΘΕΣΣΑΛΙΑ", name: "ΤΡΙΚΑΛΑ" },
  
    { region: "ΔΩΔΕΚΑΝΗΣΑ", name: "ΡΟΔΟΣ" },
    { region: "ΔΩΔΕΚΑΝΗΣΑ", name: "ΚΩΣ" },
    { region: "ΔΩΔΕΚΑΝΗΣΑ", name: "ΛΕΡΟΣ" },
    { region: "ΔΩΔΕΚΑΝΗΣΑ", name: "ΚΑΛΥΜΝΟΣ" },
  
    { region: "ΕΠΤΑΝΗΣΑ", name: "ΚΕΡΚΥΡΑ" },
    { region: "ΕΠΤΑΝΗΣΑ", name: "ΖΑΚΥΝΘΟΣ" },
    { region: "ΕΠΤΑΝΗΣΑ", name: "ΛΕΥΚΑΔΑ" },
    { region: "ΕΠΤΑΝΗΣΑ", name: "ΚΕΦΑΛΟΝΙΑ" },
  ];


export default function SidebarFilters({ onFilterChange }) {
    const [filters, setFilters] = useState({
        age: '',
        employmentTime: '',
        experience: '',
        educationLevel: '',
        experienceYears: '',
        location: '',
    });

    const [locationInput, setLocationInput] = useState('');
    const [filteredLocations, setFilteredLocations] = useState([]);

    const handleFilterChange = (key, value) => {
        const updatedFilters = { ...filters, [key]: value };
        setFilters(updatedFilters);

        if (onFilterChange) {
            onFilterChange(updatedFilters);
        }
    };

    const handleLocationChange = (e) => {
        const inputValue = e.target.value;
        setLocationInput(inputValue);

        const matchingLocations = citiesAndTowns
        .filter((city) => {
            const fullLocation = `${city.region}: ${city.name}`;
            if (inputValue.toLowerCase() === "Επιλογή") {
                return true; 
            }
            return fullLocation.toLowerCase().includes(inputValue.toLowerCase());
        })
        .map((city) => {
            if (inputValue.toLowerCase() === "Επιλογή") {
                return "Επιλογή"; 
            }
            return `${city.region}:${city.name}`;
        });
        setFilteredLocations(matchingLocations);
    };

    const handleLocationSelect = (location) => {
        setLocationInput(location);
        setFilteredLocations([]);
        handleFilterChange('location', location);
    };

    return (
        <div className="filters-container">
            <div className="filters-title">
                <h4>ΦΙΛΤΡΑ</h4>
            </div>
            <div className="filters-list">
            <div className="filter-item">
                <label>Περιοχή</label>
                <input
                    className="input"
                    type="text"
                    value={locationInput}
                    onChange={handleLocationChange}
                    placeholder="Π.χ. Αθήνα"
                />
                {filteredLocations.length > 0 && (
                    <ul className="autocomplete-dropdown-sidebar">
                        <li
                            key="no-selection"
                            onClick={() => handleLocationSelect("")}
                            className="autocomplete-item-sidebar"
                        >
                            Καμία Επιλογή
                        </li>
                        {filteredLocations.map((location, index) => (
                            <li
                                key={index}
                                onClick={() => handleLocationSelect(location)}
                                className="autocomplete-item-sidebar"
                            >
                                {location}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
                <div className="filter-item">
                    <label>Ηλικία:</label>
                    <input
                        className='input'
                        type="text"
                        value={filters.age}
                        onChange={(e) => handleFilterChange('age', e.target.value)}
                        placeholder="Π.χ. 25+"
                    />
                </div>

                <div className="filter-item">
                    <label>Χρόνος Εμπειρίας:</label>
                    <select
                        className='input'
                        value={filters.experienceYears}
                        onChange={(e) => handleFilterChange('experienceYears', e.target.value)}>
                        <option value="">Επιλογή</option>
                        <option value="0">0 χρόνια</option>
                        <option value="1">1 χρόνο</option>
                        <option value="2">2 χρόνια</option>
                        <option value="3">3 χρόνια</option>
                        <option value="4+">4+ χρόνια</option>
                    </select>
                </div>

                <div className="filter-item">
                    <label>Χρόνος Απασχόλησης:</label>
                    <select
                        className='input'
                        value={filters.employmentTime}
                        onChange={(e) => handleFilterChange('employmentTime', e.target.value)}
                    >
                        <option value="">Επιλογή</option>
                        <option value="Μερική">Μερική Απασχόληση</option>
                        <option value="Πλήρης">Πλήρης Απασχόληση</option>
                    </select>
                </div>

                <div className="filter-item">
                    <label>Ειδίκευση:</label>
                    <input
                        className='input'
                        type="text"
                        value={filters.experience}
                        onChange={(e) => handleFilterChange('experience', e.target.value)}
                        placeholder="Π.χ. Ειδική Αγωγή"
                    />
                </div>

                <div className="filter-item">
                    <label>Επίπεδο εκαπίδευσης:</label>
                    <input
                        className='input'
                        type="text"
                        value={filters.educationLevel}
                        onChange={(e) => handleFilterChange('educationLevel', e.target.value)}
                        placeholder="Π.χ. Δευτεροβάθμια"
                    />
                </div>
               
            </div>
        </div>
    );
}