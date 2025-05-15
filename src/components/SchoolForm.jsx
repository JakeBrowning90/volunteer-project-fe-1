import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router";

// import apiSource
import { apiSource } from "../apiSource";

function SchoolForm(
  {
    // Props
  }
) {
  // State declarations
  const [schoolName, setSchoolName] = useState("");
  const [invalidSchool, setInvalidSchool] = useState(false);
  // Functions
  function handleSchoolName(e) {
    setSchoolName(e.target.value);
  }

  async function submitSchool(e) {
    e.preventDefault();
    const response = await fetch(apiSource + "school", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        schoolname: schoolName,
        admin: localStorage.id,
      }),
    });
    const schoolResponse = await response.json();
    if (Array.isArray(schoolResponse.errors)) {
      setInvalidSchool(true);
    } else {
      setInvalidSchool(false);
      // Redirect to login
      window.location.href = "/";
    }
  }

  // Render
  return (
    <div>
      <h1>Create School</h1>
      {invalidSchool && <p>Invalid school</p>}
      <form onSubmit={submitSchool}>
        <label htmlFor="schoolName">School name:</label>
        <input
          type="text"
          id="schoolName"
          value={schoolName}
          onChange={handleSchoolName}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default SchoolForm;
