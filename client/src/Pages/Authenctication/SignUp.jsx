import React, { useEffect, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { provider, auth } from "./firebaseconfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "./styles.scss";

import { FcGoogle } from "react-icons/fc";

const SignUp = ({ setValue }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const singInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        console.log("Successfully Sign In:", data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const signup = (e) => {
    e.preventDefault();
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

  const handleChange = (event) => {
    if (event.target.name === "email") setEmail(event.target.value);
    else if (event.target.name === "password") setPassword(event.target.value);
    else setUserName(event.target.value);
  };

  return (
    <div className="wrapper">
      <form onSubmit={signup} className="form">
        <input className="input" type="text" placeholder="Username" value={userName} onChange={handleChange} />
        <input className="input" type="Email" placeholder="Email" value={email} onChange={handleChange}/>
        <input className="input" type="Password" placeholder="Password" value={password} onChange={handleChange}/>
        <button className="btn" type="submit">
          Sign Up
        </button>
      </form>
      <hr className="line" />
      <span className="google" onClick={singInWithGoogle}>
        <FcGoogle size={25} className="icon" />
        Sign In With Google
      </span>
      <span className="sign">
        Already have an account?{" "}
        <span
          className="setValue"
          onClick={() => {
            console.log("clieck");
            setValue("Sign In");
          }}
        >
          Sign In
        </span>{" "}
      </span>
    </div>
  );
};

export default SignUp;
