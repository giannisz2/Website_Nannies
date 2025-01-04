import React, { useState } from 'react';
import '../../styles/SidebarFilters.css';

export default function SidebarFilters({ onFilterChange }) {
    const [filters, setFilters] = useState({
        age: '',
        employmentTime: '',
        experience: '',
        educationLevel: '',
        experienceYears: ''
    });

    const handleFilterChange = (key, value) => {
        const updatedFilters = { ...filters, [key]: value };
        setFilters(updatedFilters);

        if (onFilterChange) {
            onFilterChange(updatedFilters);
        }
    };

    return (
        <div className="filters-container">
            <div className="filters-title">
                <h4>ΦΙΛΤΡΑ</h4>
            </div>
            <div className="filters-list">
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
                        type="text"
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
