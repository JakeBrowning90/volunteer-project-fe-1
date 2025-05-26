import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router";

// import apiSource
import { apiSource } from "../apiSource";

function SchoolDetail(
  {
    // Props
  }
) {
  // State declarations
  const [school, setSchool] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Functions

  const { schoolId } = useParams();
  // Fetch NPO title and opportunities
  useEffect(() => {
    fetch(apiSource + `school/${schoolId}`, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("School fetch error");
        }
        return response.json();
      })
      .then((response) => setSchool(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  // Render
  if (loading) return <p>Loading school info...</p>;
  if (error) return <p>Network error, please try again later.</p>;
  return (
    <div>
      <Link to="/">Back to Home</Link>

      <h1>School Detail</h1>
      <h2>{school.schoolname}</h2>
      <h2>{school.code}</h2>

      {school.user.length == 0 ? (
        <span>No users registered</span>
      ) : (
        <ul>
          {school.user.map((user) => {
            return (
              <li key={user.id}>
                <span>{user.username}: </span>
                <span>{user.role}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default SchoolDetail;
