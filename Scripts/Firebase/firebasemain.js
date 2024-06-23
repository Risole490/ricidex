// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsN6cStWPelaAoz00HEbVEK3fiNhDD074",
  authDomain: "ricidex-8134d.firebaseapp.com",
  projectId: "ricidex-8134d",
  storageBucket: "ricidex-8134d.appspot.com",
  messagingSenderId: "257258688981",
  appId: "1:257258688981:web:39da38f8df2778ef432d5c",
  measurementId: "G-DK13ELNGP2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);