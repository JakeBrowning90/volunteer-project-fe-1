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
      <p>TBA: Account details</p>
      <p>TBA: Activity summary, log of hours</p>
      <p>TBA: Search for orgs and opportunities</p>

      <a onClick={logout}>Log Out</a>
    </div>
  );
}

export default HomeScreen;
