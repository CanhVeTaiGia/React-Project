// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "project-react-48d03.firebaseapp.com",
  databaseURL: "https://project-react-48d03-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "project-react-48d03",
  storageBucket: "project-react-48d03.appspot.com",
  messagingSenderId: "517599824090",
  appId: "1:517599824090:web:adb18f0161f0e763cdfde3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);