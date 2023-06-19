import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtyriuHgPtgFkg_XaL3ZFvHFuz-g6NDDM",
  authDomain: "squad-17485.firebaseapp.com",
  projectId: "squad-17485",
  storageBucket: "squad-17485.appspot.com",
  messagingSenderId: "117718410582",
  appId: "1:117718410582:web:21ac8188091255cc6122f7",
  measurementId: "G-LFH2YERM3S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider};