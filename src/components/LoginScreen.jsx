import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router";

// import apiSource
import { apiSource } from "../apiSource";

function LoginScreen(
  {
    // Props
  }
) {
  // State declarations
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalidLogin, setInvalidLogin] = useState(false);

  // Functions
  function handleUsername(e) {
    setUsername(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  async function submitLogin(e) {
    e.preventDefault();
    const response = await fetch(apiSource + "user/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    if (response.status != 200) {
      setInvalidLogin(true);
    } else {
      const loginResponse = await response.json();
      // console.log(loginResponse);
      // localStorage.setItem("", loginResponse.);
      localStorage.setItem("username", loginResponse.username);
      localStorage.setItem("id", loginResponse.id);
      localStorage.setItem("role", loginResponse.role);
      localStorage.setItem("token", `Bearer ${loginResponse.token}`);
      setInvalidLogin(false);
      // Redirect to dashboard
      window.location.href = "/";
    }
  }

  // Render
  return (
    <div>
      <h1>Log In</h1>
      {invalidLogin && <p>Invalid login</p>}
      <form onSubmit={submitLogin}>
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
        <button>Submit</button>
      </form>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}

export default LoginScreen;
