// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3kNYNXKVlFyjsdLpqL1LnLkI9z0k7S_I",
  authDomain: "aiflashcards-98a11.firebaseapp.com",
  projectId: "aiflashcards-98a11",
  storageBucket: "aiflashcards-98a11.appspot.com",
  messagingSenderId: "473017869431",
  appId: "1:473017869431:web:192b922e3bdbc8d91e1272",
  measurementId: "G-8HR405G1G2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);