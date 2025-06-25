import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router";

// import apiSource
import { apiSource } from "../apiSource";

function UserDetail(
  {
    // Props
  }
) {
  // State declarations
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Functions
  const { userId } = useParams();

  useEffect(() => {
    fetch(apiSource + `user/${userId}`, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Fetch error");
        }
        return response.json();
      })
      .then((response) => setUser(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  // Render
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Network error, please try again later.</p>;
  return (
    <div>
      {localStorage.role == "school" && (
        <Link to={`../npo/${opp.npo[0].id}`}>Back to School Student List</Link>
      )}
       {localStorage.role == "org_admin" && (
        <Link to={`/`}>Back to Home</Link>
      )}
      <h1>User Detail</h1>
      <h2>{user.username}</h2>
      <span>TBA: Public info, contact details, etc</span>
      <span>TBA: Link to timesheet? or combine?</span>
    </div>
  );
}

export default UserDetail;
