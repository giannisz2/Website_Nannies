import React, { useState } from 'react';
import '../../styles/stars.css';

export default function Stars() {
    const [rating, setRating] = useState(0); 

    const handleClick = (value) => {
        setRating(value); 
    };

    return (
        <div className="nanny-rates1">
            <div className="star-rating1">
                {[...Array(5)].map((_, index) => (
                    <button
                        key={index}
                        className={`star ${rating >= 5 - index ? 'filled' : ''}`}
                        onClick={() => handleClick(5 - index)}
                        title={`${5 - index} αστέρια`}
                    >
                        ★
                    </button>
                ))}
            </div>
        </div>
    );
}
