import React from "react";
import "../../styles/SidebarFilters.css";

export default function SidebarFilters({ defaultFilters, disabled }) {
    return (
        <div className="sidebar-filters">
            <h3>Πληροφορίες Νταντάς</h3>
            <div className="filter-group">
                <label>Όνομα:</label>
                <input className="input"
                    type="text"
                    value={defaultFilters.name || ""}
                    disabled={disabled}
                    readOnly
                />
            </div>
            <div className="filter-group">
                <label>Ηλικία:</label>
                <input className="input"
                    type="text"
                    value={defaultFilters.age || ""}
                    disabled={disabled}
                    readOnly
                />
            </div>
            <div className="filter-group">
                <label>Εξειδίκευση:</label>
                <input className="input"
                    type="text"
                    value={defaultFilters.specialization || ""}
                    disabled={disabled}
                    readOnly
                />
            </div>
            <div className="filter-group">
                <label>Εμπειρία:</label>
                <input className="input"
                    type="text"
                    value={defaultFilters.experience || ""}
                    disabled={disabled}
                    readOnly
                />
            </div>
            <div className="filter-group">
                <label>Σπουδές:</label>
                <input className="input"
                    type="text"
                    value={defaultFilters.studies || ""}
                    disabled={disabled}
                    readOnly
                />
            </div>
            <div className="filter-group">
                <label>Τύπος Απασχόλησης:</label>
                <input className="input"
                    type="text"
                    value={defaultFilters.employmentTime || ""}
                    disabled={disabled}
                    readOnly
                />
            </div>
        </div>
    );
}
