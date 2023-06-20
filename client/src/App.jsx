import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Pages/Home/Home'
import EmailVerification from "./Pages/Authenctication/emailVerification"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/squadaccountemailverification" element={<EmailVerification/>}></Route>
        {/* <Route path="/meet?id" element={<Home/>}></Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App

