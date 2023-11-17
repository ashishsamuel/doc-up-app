// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBIqDGtKxD9Ydxv1dP-QsEvvQodSN25JXo",
  authDomain: "document-app-54f81.firebaseapp.com",
  projectId: "document-app-54f81",
  storageBucket: "document-app-54f81.appspot.com",
  messagingSenderId: "1012632441261",
  appId: "1:1012632441261:web:eeb31df5862795af355124",
  measurementId: "G-7F67LWDGQ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)