const { initializeApp } =  require("firebase/app");
const firebaseConfig = {

    apiKey: "AIzaSyDAv_AjBsvdvAQD3TP4SOf8o5jm1DEY3mk",
  
    authDomain: "sahaya-1c292.firebaseapp.com",
  
    projectId: "sahaya-1c292",
  
    storageBucket: "sahaya-1c292.appspot.com",
  
    messagingSenderId: "551177806875",
  
    appId: "1:551177806875:web:6267da37bfca773f1804be"
  
};
const app = initializeApp(firebaseConfig)

module.exports = app