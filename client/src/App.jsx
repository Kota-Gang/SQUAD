import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./Pages/Home/Home";
import EmailVerification from "./Pages/Authenctication/emailVerification";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import "../src/Pages/Authenctication/firebaseconfig";
import Room from "./Pages/Room/Room";

function App() {
  const roomComponent = useSelector((state) => state.roomComponent.value);

  useEffect(() => {}, []);

  return (
    <>
      {!roomComponent && <Header />}
      <Routes >
        <Route path="/SQUAD" element={<Home />} />
        <Route
          path="/SQUAD/squadaccountemailverification"
          element={<EmailVerification />}
        />
        <Route path="/SQUAD/meet/:id" element={<Room />} />
      </Routes>
      {!roomComponent && <Footer />}
    </>
  );
}

export default App;
