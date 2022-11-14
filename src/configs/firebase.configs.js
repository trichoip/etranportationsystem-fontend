// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpo18uwJZy04HzoMq9hWDp9ffNufePwwI",
  authDomain: "etransportationsys-trichoip.firebaseapp.com",
  projectId: "etransportationsys-trichoip",
  storageBucket: "etransportationsys-trichoip.appspot.com",
  messagingSenderId: "303534488692",
  appId: "1:303534488692:web:09c6b028f9d06beb06e521",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
