// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyB_NhDFJCRkbTA7Ta9TdI5waE_lvfT4gAU",
//   authDomain: "mmnct-fac3f.firebaseapp.com",
//   projectId: "mmnct-fac3f",
//   storageBucket: "mmnct-fac3f.appspot.com",
//   messagingSenderId: "411682587074",
//   appId: "1:411682587074:web:03f12edd898f488500565b",
//   measurementId: "G-414HCTVM9Q",
// };

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: "mmnct-fac3f.appspot.com",
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);
