import React, { useState } from "react";
import '../../styles/Hourspicker.css'

const HoursPicker = ({ onTimeChange }) => {
  const [selectedHour, setSelectedHour] = useState(null);  

  const hours = Array.from({ length: 12 }, (_, i) => {
    const hourStart = i === 0 ? '12:00 ' : `${i}:00`;
    const hourEnd = i === 12 ? '12:00 ' : `${i + 1}:00`;
    return `${hourStart}-${hourEnd}`;
  });

  const handleRadioButtonChange = (hour) => {
    setSelectedHour(hour);  
    onTimeChange(hour);  
  };

  return (
    <div className="hours-picker">
      {hours.map((hour) => (
        <div key={hour} className="hour-box">
          <label>
            <input
              type="radio"  
              name="hour"
              value={hour}
              checked={selectedHour === hour}  
              onChange={() => handleRadioButtonChange(hour)}  
            />
            {hour}
          </label>
        </div>
      ))}
    </div>
  );
};

export default HoursPicker;
