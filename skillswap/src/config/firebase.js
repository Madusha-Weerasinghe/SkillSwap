// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTMBNzCbBPn7PViXfS7xtCmOYzIXkm0dk",
  authDomain: "skillswap-c946e.firebaseapp.com",
  projectId: "skillswap-c946e",
  storageBucket: "skillswap-c946e.appspot.com",
  messagingSenderId: "838067842511",
  appId: "1:838067842511:web:05ed984a97e56eb308f6ba",
  measurementId: "G-8T6MKCE6F9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);
