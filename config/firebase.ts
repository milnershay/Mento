// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import Constants from 'expo-constants';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBKxbE86oRGaI7oj3kDAQGpa5BizOEkkmo",
    authDomain: "mento-10.firebaseapp.com",
    projectId: "mento-10",
    storageBucket: "mento-10.appspot.com",
    messagingSenderId: "150711167772",
    appId: "1:150711167772:web:aef23f4d5ced64c26268d9"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
