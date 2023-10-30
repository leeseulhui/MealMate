// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgsb0kVsGI4XxHMLpaim_-SGmIVIzM0fY",
  authDomain: "sppj-1ce61.firebaseapp.com",
  projectId: "sppj-1ce61",
  storageBucket: "sppj-1ce61.appspot.com",
  messagingSenderId: "182384163402",
  appId: "1:182384163402:web:ef15f21ca3e6e5bbf984b3",
  measurementId: "G-B7W5NKM36H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const getFirebase = () => app;
export const auth = getAuth(app);