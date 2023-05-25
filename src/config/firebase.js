// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsaC1eWl9WwkQp7kXAVAmy0MTDIRJSq84",
  authDomain: "nusmarkt.firebaseapp.com",
  projectId: "nusmarkt",
  storageBucket: "nusmarkt.appspot.com",
  messagingSenderId: "912025339830",
  appId: "1:912025339830:web:4cd35928f334f77ce0a317",
  measurementId: "G-FMWXYWC1YT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
