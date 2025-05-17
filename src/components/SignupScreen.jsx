import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router";

// import apiSource
import { apiSource } from "../apiSource";

function SignupScreen(
  {
    // Props
  }
) {
  // State declarations
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");
  const [schoolCode, setSchoolCode] = useState("");

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

  function handleRole(e) {
    setRole(e.target.value);
  }

  function handleSchoolCode(e) {
    setSchoolCode(e.target.value);
  }

  async function submitSignup(e) {
    e.preventDefault();
    console.log(username, password, confirmPassword, role, schoolCode);
    if (role !== "student") {
      setSchoolCode("");
    }
    const response = await fetch(apiSource + "user", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        confirmPassword: confirmPassword,
        role: role,
        schoolCode: schoolCode,
      }),
    });
    const signupResponse = await response.json();
    if (Array.isArray(signupResponse.errors)) {
      setInvalidSignup(true);
      console.log(signupResponse.errors);
    } else {
      setInvalidSignup(false);
      // Redirect to login
      window.location.href = "/login";
    }
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
        <label htmlFor="roleSelect">Role:</label>
        <select name="" id="roleSelect" onChange={handleRole}>
          <option value="student">Student</option>
          <option value="school_admin">School Admin</option>
          <option value="org_admin">NPO Admin</option>
        </select>
        {role == "student" && (
          <div>
            <label htmlFor="schoolCodeInput">School code:</label>
            <input
              type="text"
              name=""
              id="schoolCodeInput"
              value={schoolCode}
              onChange={handleSchoolCode}
            ></input>
          </div>
        )}
        <button>Submit</button>
      </form>
      <Link to="/login">Back to Login</Link>
    </div>
  );
}

export default SignupScreen;
