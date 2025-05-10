import React, { useState } from "react";
// import apiSource
import { Routes, Route, Link, useNavigate } from "react-router";

function HomeScreen(
  {
    // Props
  }
) {
  // State declarations
  // Functions
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Render
  return (
    <div>
      <h1>Home</h1>
      {localStorage.username && (
        <div>
          <p>{localStorage.username}</p>
          <p>{localStorage.role}</p>
        </div>
      )}

      <a onClick={logout}>Log Out</a>
    </div>
  );
}

export default HomeScreen;
