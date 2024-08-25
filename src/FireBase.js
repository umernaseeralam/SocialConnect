import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, push, onValue, update } from "firebase/database";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9Y1Qm2MMwM6ujNAbAIG3Fjeu1ww0baIQ",
  authDomain: "socialconnect-7f102.firebaseapp.com",
  projectId: "socialconnect-7f102",
  storageBucket: "socialconnect-7f102.appspot.com",
  messagingSenderId: "528556223237",
  appId: "1:528556223237:web:debfd30a16fac98fb5656c",
  measurementId: "G-QY9VH9J2CD",
  databaseURL: "https://socialconnect-7f102-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Export Firebase services and functions
export {
  auth,
  database,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  ref,
  push,
  onValue,
  update
};
