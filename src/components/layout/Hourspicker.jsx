import React, { useState } from "react";
import '../../styles/Hourspicker.css'

const HoursPicker = () => {
  const [selectedHours, setSelectedHours] = useState([]);

  const hours = Array.from({ length: 24 }, (_, i) => {
    const hourStart = i === 0 ? '12:00 AM' : `${i}:00`;
    const hourEnd = i === 23 ? '12:00 AM' : `${i + 1}:00`;
    return `${hourStart}-${hourEnd}`;
  }); //Ζευγάρια ωρών

  const handleCheckboxChange = (hour) => {
    setSelectedHours((prevSelected) =>
      prevSelected.includes(hour)
        ? prevSelected.filter((h) => h !== hour) 
        : [...prevSelected, hour] // Επιλογή - Αποεπιλογή
    );
  };

  return (
    <div className="hours-picker">
      {hours.map((hour) => (
        <div key={hour} className="hour-box">
          <label>
            <input
              type="checkbox"
              value={hour}
              checked={selectedHours.includes(hour)}
              onChange={() => handleCheckboxChange(hour)}
            />
            {hour}
          </label>
        </div>
      ))}
    </div>
  );
};

export default HoursPicker;
