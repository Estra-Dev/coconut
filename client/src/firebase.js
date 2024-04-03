// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "coconut-37b31.firebaseapp.com",
  projectId: "coconut-37b31",
  storageBucket: "coconut-37b31.appspot.com",
  messagingSenderId: "663405393462",
  appId: "1:663405393462:web:d80509186f36db5ad08a97",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
