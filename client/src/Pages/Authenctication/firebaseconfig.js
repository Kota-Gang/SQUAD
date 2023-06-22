import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC5zDqygBR5TTJnFDtcAvxE9a8P8LYt6As",
  authDomain: "squad-7a8b7.firebaseapp.com",
  projectId: "squad-7a8b7",
  storageBucket: "squad-7a8b7.appspot.com",
  messagingSenderId: "730626818617",
  appId: "1:730626818617:web:51cb2cbc5cc9252be043e8",
  measurementId: "G-4CP2XXYQYY"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider,app};
