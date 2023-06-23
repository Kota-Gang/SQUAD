import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import EmailVerification from "./Pages/Authenctication/emailVerification";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import "../src/Pages/Authenctication/firebaseconfig";
import Room from "./Pages/Room/Room";

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/squadaccountemailverification"
          element={<EmailVerification />}
        />
        <Route path="/meet/:id" element={<Room />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
