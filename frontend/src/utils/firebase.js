import { async, isAdmin } from "@firebase/util";
import { appBarClasses } from "@mui/material";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup, deleteUser } from "firebase/auth";
import App from "../App";

import { auth } from "./firebaseConfig";

// register with email and password 

export const registerWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

// google auth

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const signInWithGooglePopup = () => {
  signInWithPopup(auth, googleProvider);
};


// Delete auth
export const deleteFromFireBase = ()  => {
  const auth = getAuth();
  deleteUser(auth.currentUser);
  console.log("User Deleted from firebase");
  
};  