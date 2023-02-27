// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7dFG3rQaE0p5qT2mMzJ5nd10T7QGEgjE",
  authDomain: "verify-12.firebaseapp.com",
  projectId: "verify-12",
  storageBucket: "verify-12.appspot.com",
  messagingSenderId: "589088760383",
  appId: "1:589088760383:web:1123082b25bc0049210e8a",
  measurementId: "G-0VTSN0QQBF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;