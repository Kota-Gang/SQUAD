import React from 'react'
import SignIn from './Pages/Authenctication/SignIn'
import Signup from './Pages/Authenctication/SignUp'
import Home from './Pages/Home/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/signin" element={<SignIn/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

