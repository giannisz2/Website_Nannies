import React, { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
