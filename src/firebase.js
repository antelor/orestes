// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBE-YQjOdgoXN5Kdxp9lHitmkV7JmzZYeU",
  authDomain: "orestes-c711f.firebaseapp.com",
  projectId: "orestes-c711f",
  storageBucket: "orestes-c711f.firebasestorage.app",
  messagingSenderId: "924762562170",
  appId: "1:924762562170:web:b4c424b7dae497418065c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
