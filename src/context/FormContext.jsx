import React, { createContext, useContext, useState } from 'react';

// Create the context
const FormContext = createContext();

// Hook to use the context
export const useFormContext = () => useContext(FormContext);

// Provider to share form data
export const FormProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        gender: '',
        birthdate: null,
        educationLevel: '',
        experience: '',
        recommendationLetters: '',
        availability: '',
        employmentTime: '',
        location: '',
        experienceYears: '',
        maxChildren: '',
        pets: '',
        smoker: '',
        phone: '',
        phoneAccess: '',
        availableDate: [],
        availableTimeFrom: null,
        availableTimeTo: null,
    });

    return (
        <FormContext.Provider value={{ formData, setFormData }}>
            {children}
        </FormContext.Provider>
    );
};
