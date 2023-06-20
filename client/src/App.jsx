import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Pages/Home/Home'
import EmailVerification from "./Pages/Authenctication/emailVerification"
import Footer from './Components/Footer/Footer'

import Header from './Components/Header/Header'

function App() {
  return (
    <BrowserRouter>
        <Header/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/squadaccountemailverification" element={<EmailVerification/>}></Route>
        <Route path="/meet?id" element={<Home/>}></Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App

