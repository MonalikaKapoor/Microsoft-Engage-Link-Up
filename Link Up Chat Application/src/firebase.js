import firebase from "firebase/app";
import "firebase/auth";

//Exporting as an auth object
export const auth = firebase.initializeApp ({
    apiKey: "AIzaSyC-HkvCaqxRkP-rr6GMMU2V9ukBlZZeKag",
    authDomain: "teams-clone-7777.firebaseapp.com",
    projectId: "teams-clone-7777",
    storageBucket: "teams-clone-7777.appspot.com",
    messagingSenderId: "534894253250",
    appId: "1:534894253250:web:9b89d680e71879554f975b"
  }).auth();