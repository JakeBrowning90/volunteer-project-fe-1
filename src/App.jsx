import { useState } from "react";
// import "./App.css";
import "./reset.css";
import "./style.css";
import { Routes, Route, Link, useNavigate } from "react-router";

import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignupScreen";
import HomeScreen from "./components/HomeScreen";
import SchoolForm from "./components/SchoolForm";
import SchoolDetail from "./components/SchoolDetail";
import NPOForm from "./components/NPOForm";
import NPODetail from "./components/NPODetail";
import OpportunityForm from "./components/OpportunityForm";
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
      <header>
        <nav>
          {localStorage.username && (
            <div>
              <p>{localStorage.username}</p>
              <p>{localStorage.role}</p>
              <p>{localStorage.school}</p>
            </div>
          )}
          <p>TBA: Account details</p>
          <a onClick={logout}>Log Out</a>
        </nav>
      </header>
      <main>
        {/* <h1>Volunteer Portal</h1>
        <a href="">Log In</a>
        <a href="">Sign Up</a> */}
        <Routes>
          {/* <Route path="" element={} /> */}
          <Route path="login" element={<LoginScreen />} />
          <Route path="signup" element={<SignupScreen />} />
          <Route path="/" element={<HomeScreen />} />

          <Route path="/schoolform" element={<SchoolForm />} />
          <Route path="/school/:schoolId" element={<SchoolDetail />} />

          <Route path="/npoform" element={<NPOForm />} />
          <Route path="/npo/:npoId" element={<NPODetail />} />
          <Route path="/oppform" element={<OpportunityForm />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
