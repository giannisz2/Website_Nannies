import React from 'react';
import '../../styles/SidebarFilters.css';

export default function SidebarFilters() {
    return (
        <div className="filters-container">
            <div className="filters-title">
                <h4>ΦΙΛΤΡΑ</h4>
            </div>
            <div className="filters-list">
                <div className="filter-item">Ηλικία</div>
                <div className="filter-item">Χρόνος Απασχόλησης</div>
                <div className="filter-item">Προσδιορισμός χρόνου</div>
                <div className="filter-item">Ειδίκευση</div>
                <div className="filter-item">Σπουδές</div>
                <div className="filter-item">Χρόνος Εμπειρίας</div>
                <div className="filter-item">Χαρακτηριστικά</div>
            </div>
        </div>
    );
}
