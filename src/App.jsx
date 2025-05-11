import { useState } from "react";
// import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router";

import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignupScreen";
import HomeScreen from "./components/HomeScreen";
// User info
// Find Orgs
// Sign up for shift
// Hours report

function App() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <header></header>
      <main>
        {/* <h1>Volunteer Portal</h1>
        <a href="">Log In</a>
        <a href="">Sign Up</a> */}
        <Routes>
          {/* <Route path="" element={} /> */}
          <Route path="login" element={<LoginScreen />} />
          <Route path="signup" element={<SignupScreen />} />
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
