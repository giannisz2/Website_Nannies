import {initializeApp} from "firebase/app";
import {browserLocalPersistence} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { initializeAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBmCo_4WL6CbfHb6OUtLZimLWWiXoc3rc",
  authDomain: "eam-project-3-firebase.firebaseapp.com",
  projectId: "eam-project-3-firebase",
  storageBucket: "eam-project-3-firebase.firebasestorage.app",
  messagingSenderId: "810801482506",
  appId: "1:810801482506:web:514237753a8a57cb9c48f3",
  measurementId: "G-Y5SV11HJ57"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: browserLocalPersistence,
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);