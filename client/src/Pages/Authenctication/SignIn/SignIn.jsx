import React, { useEffect, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { provider, auth } from "../firebaseconfig";
import GoogleButton from 'react-google-button'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import {FcGoogle} from 'react-icons/fc'
import { MdEmail} from 'react-icons/md'

import "./style.scss"


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const singInWithGoogle = () => {
    signInWithPopup(auth, provider).then((data) => {
      console.log("Successfully Sign In:", data);
    })
      .catch((err) => {
        console.log(err.message);
      })

  }

  const signin = (event) => {
    event.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Successfull Signin", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  };

  const handleChange = (event) => {
    if (event.target.name === "email") setEmail(event.target.value);
    else if (event.target.name === "password") setPassword(event.target.value);
  }

  return (
    <div className="container">
      <h1>Sign In </h1>
      <div className="siginContainer">
        <form onSubmit={signin} className="form">
          <label htmlFor="email" className="title">Email</label>
          <input className="input" type="email" id="email" placeholder="example@gmail.com" onChange={handleChange} name="email" value={email} />
          <label htmlFor="password" className="title">Password</label>
          <input className="input" type="password" id="password" placeholder="password" onChange={handleChange} name="password" value={password} />
          <button className=" btn" type="submit">Sign In</button>
        </form>
        <hr className="linebreak"/>
        <button className="googlesignin" onClick={singInWithGoogle}><FcGoogle/>Sign In</button>
      </div>
    </div>
  );
};

export default SignIn;
