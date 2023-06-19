import React, { useState } from "react";
import "./styles.scss";
import SignIn from "../Authenctication/SignIn";
import SignUp from "../Authenctication/SignUp";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Home = () => {

  const [value,setValue] = useState('Sign In');

  return (
    <div className="container">
      <div className="card">
        <h1>{value}</h1>
        {value==='Sign In' && <SignIn setValue={setValue}/>}
        {value==='Sign Up' && <SignUp setValue={setValue}/>}
      </div>
      <div className="info">
        
      </div>
    </div>
  );
};

export default Home;
