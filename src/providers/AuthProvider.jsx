import React, { createContext, useContext, useState } from "react";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzsTzWawkM3jKek0dmWj2kTJTAY-O3yrc",
  authDomain: "eam-project-a1810.firebaseapp.com",
  projectId: "eam-project-a1810",
  storageBucket: "eam-project-a1810.firebasestorage.app",
  messagingSenderId: "768362215377",
  appId: "1:768362215377:web:7186de0c7ba9d1ffbed2f0",
  measurementId: "G-B8615XGDEZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Create Auth Context
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ auth, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook: useAuthContext
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
