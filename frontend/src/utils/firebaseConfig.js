import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDAv_AjBsvdvAQD3TP4SOf8o5jm1DEY3mk",
  authDomain: "sahaya-1c292.firebaseapp.com",
  projectId: "sahaya-1c292",
  storageBucket: "sahaya-1c292.appspot.com",
  messagingSenderId: "551177806875",
  appId: "1:551177806875:web:e2c97ff924145eda1804be"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);