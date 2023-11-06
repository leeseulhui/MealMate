import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


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
const analytics = getAnalytics(app);
const db = getFirestore(app);
const getFirebase = () => app;
const auth = getAuth(app);

export { app, analytics,db ,auth, getFirebase };