import React, { useEffect, useState } from "react";
import { provider, auth } from "./firebaseconfig";
import {
  sendSignInLinkToEmail,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import "./styles.scss";

import { FcGoogle } from "react-icons/fc";

const actionCodeSettings = {
  url: "http://localhost:5173/",
  handleCodeInApp: true,
  iOS: {
    bundleId: "com.example.ios",
  },
  android: {
    packageName: "com.example.android",
    installApp: true,
    minimumVersion: "12",
  },
  dynamicLinkDomain: "example.page.link",
};

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

    if (userName.length == 0 || password.length < 6 || email.length == 0) {
      if (password.length < 6) {
        alert("Password Cannot Be Less Than 6 Digits");
      } else alert("Please Provdie Necessary Details");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          auth.signOut();
        })
        .catch((error) => {
          console.log(error.message);
        });

      sendSignInLinkToEmail(auth, email, actionCodeSettings)
        .then(() => {
          window.localStorage.setItem("emailForSignIn", email);
          alert("Email verification link has been sent to your email address")
        })
        .catch((error) => {
          console.log(error.message)
        });
    }
  };

  const handleChange = (event) => {
    if (event.target.name === "email") setEmail(event.target.value);
    else if (event.target.name === "password") setPassword(event.target.value);
    else setUserName(event.target.value);
  };

  return (
    <div className="wrapper">
      <form onSubmit={signup} className="form">
        <input
          className="input"
          type="text"
          placeholder="Username"
          name="userName"
          value={userName}
          onChange={handleChange}
        />
        <input
          className="input"
          type="Email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <input
          className="input"
          type="Password"
          placeholder="Password"
          value={password}
          name="password"
          onChange={handleChange}
        />
        <button onClick={signup} className="btn" type="submit">
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
