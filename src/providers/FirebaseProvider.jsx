import React, { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
const db = getFirestore(app);
const storage = getStorage(app);

// Create Firebase Context
const FirebaseContext = createContext();

// FirebaseProvider Component
export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ auth, db, storage }}>
      {children}
    </FirebaseContext.Provider>
  );
};

// useFirebase Hook to access Firebase services
export const useFirebase = () => {
  return useContext(FirebaseContext);
};
