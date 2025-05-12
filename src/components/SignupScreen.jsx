import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router";

// import apiSource

function SignupScreen(
  {
    // Props
  }
) {
  // State declarations
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [invalidSignup, setInvalidSignup] = useState(false);

  // Functions
  function handleUsername(e) {
    setUsername(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleConfirmPassword(e) {
    setConfirmPassword(e.target.value);
  }

  async function submitSignup(e) {
    e.preventDefault();
  }
  // Render
  return (
    <div>
      <h1>Sign Up</h1>
      {invalidSignup && <p>Invalid signup</p>}
      <form onSubmit={submitSignup}>
        <label htmlFor="usernameInput">Username:</label>
        <input
          type="text"
          name=""
          id="usernameInput"
          value={username}
          onChange={handleUsername}
        />
        <label htmlFor="passwordInput">Password:</label>
        <input
          type="password"
          name=""
          id="passwordInput"
          value={password}
          onChange={handlePassword}
        />
        <label htmlFor="confirmPasswordInput">Confirm Password:</label>
        <input
          type="password"
          name=""
          id="confirmPasswordInput"
          value={confirmPassword}
          onChange={handleConfirmPassword}
        />
        <label htmlFor="">Role:</label>
        <select name="" id="">
          <option value="">Student</option>
          <option value="">School Admin</option>
          <option value="">NPO Admin</option>
        </select>
        <button>Submit</button>
      </form>
      <Link to="/login">Back to Login</Link>
    </div>
  );
}

export default SignupScreen;
