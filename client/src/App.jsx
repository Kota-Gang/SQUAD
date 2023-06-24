import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route,useLocation } from "react-router-dom";
import { useSelector} from 'react-redux'
import Home from "./Pages/Home/Home";
import EmailVerification from "./Pages/Authenctication/emailVerification";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import "../src/Pages/Authenctication/firebaseconfig";
import Room from "./Pages/Room/Room";

function App() {
  const roomComponent = useSelector((state)=>state.roomComponent.value)
 
  useEffect(()=>{
  },[])
  
  return (
   <>
     {  !roomComponent &&  <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/squadaccountemailverification"
          element={<EmailVerification />}
        />
        <Route path="/meet/:id" element={<Room />} />
      </Routes>
      { !roomComponent && <Footer />}
      </>
  );
}

export default App;
