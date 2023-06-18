import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import {  auth } from "../firebaseconfig";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = (e) => {
    e.preventDefault();
    console.log(email,password)
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Successfull SignUp", user);
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
      <h1>Sign Up </h1>
      <form onSubmit={signup}>
        <label htmlFor="email">Enter Your Email Address</label>
        <input type="email" id="email" placeholder="example@gmail.com" onChange={handleChange} name="email" value={email}/>
        <label htmlFor="password">Enter Your Password</label>
        <input type="password" id="password" placeholder="password" onChange={handleChange} name="password" value={password} />
        <button type="submit">SignUp</button>
      </form>
    </div>
  );
};

export default Signup;
