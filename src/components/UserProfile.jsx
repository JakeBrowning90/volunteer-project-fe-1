import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router";

// import apiSource
import { apiSource } from "../apiSource";

function UserProfile(
  {
    // Props
  }
) {
  // State declarations
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Functions
  useEffect(() => {
    fetch(apiSource + `user/${localStorage.id}`, {
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
    <>
      <Link to="/">Back to Home</Link>
      <h1>User Profile</h1>
      <h2>{user.username}</h2>
      <span>TBA: submit form to update info</span>
      <form action="">
        <h1>Update User Info</h1>

        <div className="formLabelInput ">
          <label htmlFor="profileUsernameInput">Username:</label>
          <input type="text" id="profileUsernameInput" />
        </div>
        <div className="formLabelInput ">
          <label htmlFor="profileUsernameInput">Password:</label>
          <input type="text" id="profileUsernameInput" />
        </div>
        <span>TBA: Contact info, etc</span>
        <button>Save Changes</button>
      </form>
    </>
  );
}

export default UserProfile;
