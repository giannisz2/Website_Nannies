import {initializeApp} from "firebase/app";
import {browserLocalPersistence} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { initializeAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzsTzWawkM3jKek0dmWj2kTJTAY-O3yrc",
  authDomain: "eam-project-a1810.firebaseapp.com",
  projectId: "eam-project-a1810",
  storageBucket: "eam-project-a1810.firebasestorage.app",
  messagingSenderId: "768362215377",
  appId: "1:768362215377:web:7186de0c7ba9d1ffbed2f0",
  measurementId: "G-B8615XGDEZ"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: browserLocalPersistence,
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);