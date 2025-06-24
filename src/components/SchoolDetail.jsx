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
      <Link to="/">Back to Dashboard</Link>

      <h1>School Detail</h1>
      <h2>{school.schoolname}</h2>
      <h2>{school.code}</h2>

      {school.user.length == 0 ? (
        <span>No users registered</span>
      ) : (
        <ul className="userList">
          {school.user.map((user) => {
            return (
              <a
                // href={`${school.id}/user/${user.id}`}
                href={`/user/${user.id}/timesheet`}
                className="userListItem"
                key={user.id}
              >
                <span className="userListTitle">{user.username}</span>
                <span>TBA: Hour total</span>
              </a>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default SchoolDetail;
