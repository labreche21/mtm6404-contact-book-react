// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsmhQcwwBWc-QhPfbAAPd_6xPv1ScMt8E",
  authDomain: "contacts-3ac03.firebaseapp.com",
  projectId: "contacts-3ac03",
  storageBucket: "contacts-3ac03.firebasestorage.app",
  messagingSenderId: "929307186036",
  appId: "1:929307186036:web:20871b7aa0bf314f6ed221"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;