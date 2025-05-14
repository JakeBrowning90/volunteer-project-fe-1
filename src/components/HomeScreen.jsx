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

  // Render
  return (
    <>
      {localStorage.role == "student" && (
        <div>
          <h1>Student Home</h1>

          <p>TBA: Activity summary, log of hours</p>
          <p>TBA: Search for orgs and opportunities</p>
        </div>
      )}
      {localStorage.role == "school_admin" && (
        <div>
          <h1>School Admin Home</h1>
          <span>Create school:</span>
          <Link to="/schoolform">Form</Link>
          <p>TBA: List of registered students, logged hours</p>
          <p>TBA: Report generator</p>
        </div>
      )}

      {localStorage.role == "org_admin" && (
        <div>
          <h1>NPO Admin Home</h1>

          <p>TBA: List of registered volunteers, contact info</p>
          <p>TBA: Form to post volunteer opportunities</p>
        </div>
      )}
    </>
  );
}

export default HomeScreen;
