import { useState } from "react";
// import "./App.css";
import "./reset.css";
import "./style.css";
import { Routes, Route, Link, useNavigate } from "react-router";

import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignupScreen";
import HomeScreen from "./components/HomeScreen";
import UserProfile from "./components/UserProfile";
import SchoolForm from "./components/SchoolForm";
import SchoolDetail from "./components/SchoolDetail";
import NPOForm from "./components/NPOForm";
import NPODetail from "./components/NPODetail";
import OpportunityForm from "./components/OpportunityForm";
import OpportunityDetail from "./components/OpportunityDetail";
import UserDetail from "./components/UserDetail";
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
          {localStorage.username ? (
            <>
              <Link to={`/user/${localStorage.id}`}>
                {localStorage.username}
              </Link>
              <span>{localStorage.opportunity}</span>
              <a onClick={logout}>Log Out</a>
            </>
          ) : (
            <>
              <Link to={`/signup`}>Sign Up</Link>
              <Link to={`/login`}>Log In</Link>
            </>
          )}
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
          <Route path="/user/:userId" element={<UserProfile />} />

          <Route path="/schoolform" element={<SchoolForm />} />
          <Route path="/school/:schoolId" element={<SchoolDetail />} />
          <Route
            path="/school/:schoolId/user/:userId"
            element={<UserDetail />}
          />

          <Route path="/npoform" element={<NPOForm />} />
          <Route path="/npo/:npoId" element={<NPODetail />} />
          <Route path="/npo/:npoId/oppform" element={<OpportunityForm />} />

          {/* <Route path="/oppform" element={<OpportunityForm />} /> */}
          <Route path="/opp/:oppId" element={<OpportunityDetail />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
