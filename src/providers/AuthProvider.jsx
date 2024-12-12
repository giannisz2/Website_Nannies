import React, { createContext, useContext, useState } from "react";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBmCo_4WL6CbfHb6OUtLZimLWWiXoc3rc",
  authDomain: "eam-project-3-firebase.firebaseapp.com",
  projectId: "eam-project-3-firebase",
  storageBucket: "eam-project-3-firebase.firebasestorage.app",
  messagingSenderId: "810801482506",
  appId: "1:810801482506:web:514237753a8a57cb9c48f3",
  measurementId: "G-Y5SV11HJ57",
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
