import React, { useEffect, useState } from "react";
import {signInWithPopup} from "firebase/auth";
import { provider, auth } from "../firebaseconfig";
import GoogleButton from 'react-google-button'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// import {  auth } from "../firebaseconfig";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const singInWithGoogle = ()=>{
    signInWithPopup(auth,provider).then((data)=>{
        console.log("Successfully Sign In:",data);
    })
    .catch((err)=>{
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

  const handleChange = (event)=>{
    if(event.target.name ==="email")setEmail(event.target.value);
    else if(event.target.name ==="password")setPassword(event.target.value);
  }

  return (
    <div>
      <h1>Sign In </h1>
      <form onSubmit={signin}>
        <label htmlFor="email">Enter Your Email Address</label>
        <input type="email" id="email" placeholder="example@gmail.com" onChange={handleChange} name="email" value={email}/>
        <label htmlFor="password">Enter Your Password</label>
        <input type="password" id="password" placeholder="password" onChange={handleChange} name="password" value={password} />
        <button type="submit">Signin</button>
      </form>
      <GoogleButton onClick={singInWithGoogle}/>
    </div>
  );
};

export default SignIn;
