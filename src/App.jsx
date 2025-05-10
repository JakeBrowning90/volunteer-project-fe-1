import { useState } from "react";
import "./App.css";

// Login
// Signup
// Dashboard
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
        <h1>Volunteer Portal</h1>
        <a href="">Log In</a>
        <a href="">Sign Up</a>
      </main>
    </>
  );
}

export default App;
