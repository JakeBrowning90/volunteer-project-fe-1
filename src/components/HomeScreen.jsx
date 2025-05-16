import React, { useEffect, useState } from "react";
// import apiSource
import { apiSource } from "../apiSource";

import { Routes, Route, Link, useNavigate } from "react-router";

function HomeScreen(
  {
    // Props
  }
) {
  // State declarations
  const [schoolList, setSchoolList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Functions
  const navigate = useNavigate();

  useEffect(() => {
    fetch(apiSource + `school/?adminId=${localStorage.id}`, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("School list fetch error");
        }
        return response.json();
      })
      .then((response) => setSchoolList(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

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
          {schoolList.length == 0 ? (
            <span>No schools registered</span>
          ) : (
            <ul>
              {schoolList.map((school) => {
                return (
                  <li key={school.id}>
                    <span>{school.schoolname}: </span>
                    <span>{school.code}</span>
                  </li>
                );
              })}
            </ul>
          )}
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
