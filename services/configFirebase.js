// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {initializeAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCx7em8JQQgWHccw4dqQnosj2ouozakLA",
  authDomain: "visitepenedo-e048e.firebaseapp.com",
  projectId: "visitepenedo-e048e",
  storageBucket: "visitepenedo-e048e.appspot.com",
  messagingSenderId: "20729090684",
  appId: "1:20729090684:web:06fb8dd76356441ddc6ff9",
  measurementId: "G-P4JWMZ377G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app);
const db = getFirestore(app);
export {auth, db};