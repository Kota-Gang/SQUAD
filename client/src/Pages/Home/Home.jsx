import React, { useState } from "react";
import "./styles.scss";
import SignIn from "../Authenctication/SignIn";
import SignUp from "../Authenctication/SignUp";
import StartConferencing from "./StartConferencing/startConferencing";
import {auth} from '../Authenctication/firebaseconfig'
import { onAuthStateChanged } from "firebase/auth";


const Home = () => {

  const [value,setValue] = useState('Sign In');

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setValue('Start Video Conference')
    } else {
      setValue('Sign In')
    }
  });

  const signout = ()=>{
    auth.signOut();
  }

  return (
    <div className="container">
      <div className="card">
        <h1>{value}</h1>
        {value==='Sign In' && <SignIn setValue={setValue}/>}
        {value==='Sign Up' && <SignUp setValue={setValue}/>}
        {value==='Start Video Conference' && <StartConferencing signout={signout}/> }
      </div>
      <div className="info">
        
      </div>
    </div>
  );
};

export default Home;
