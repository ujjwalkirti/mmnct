// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIkYVysaYenySTFZ76f0ts8B8ZGBNXZms",
  authDomain: "mmnct-388c4.firebaseapp.com",
  projectId: "mmnct-388c4",
  storageBucket: "mmnct-388c4.appspot.com",
  messagingSenderId: "498988086782",
  appId: "1:498988086782:web:7081b5586a698d4498fcaf",
  measurementId: "G-R3NVRMEX6C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
