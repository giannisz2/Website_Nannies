import React from 'react';
import '../../styles/stars.css';

export default function Stars() {
    return (
        <>
            <div className="nanny-rates1">
                <div className="star-rating1">
                    {[...Array(5)].map((_, index) => (
                        <>
                            <input
                                key={`input-${index}`}
                                type="radio"
                                id={`star${5 - index}`}
                                name="rating"
                                value={5 - index}
                            />
                            <label
                                key={`label-${index}`}
                                htmlFor={`star${5 - index}`}
                                title={`${5 - index} αστέρια`}
                            >
                                ★
                            </label>
                        </>
                    ))}
                </div>
            </div>
        </>
    );
}
