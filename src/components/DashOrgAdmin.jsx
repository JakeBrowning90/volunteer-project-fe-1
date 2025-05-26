import React, { useEffect, useState } from "react";
// import apiSource
import { apiSource } from "../apiSource";
import { Routes, Route, Link, useNavigate } from "react-router";

function DashOrgAdmin(
  {
    // Props
  }
) {
  // State declarations
  const [npoList, setNpoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Functions
  useEffect(() => {
    fetch(apiSource + `npo/?adminId=${localStorage.id}`, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("NPO list fetch error");
        }
        return response.json();
      })
      .then((response) => setNpoList(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  // Render
  return (
    <div>
      <h1>NPO Admin Home</h1>
      <span>Create NPO:</span>
      <Link to="/npoform">Form</Link>
      {npoList.length == 0 ? (
        <span>No NPOs registered</span>
      ) : (
        <ul>
          {npoList.map((npo) => {
            return (
              <li key={npo.id}>
                {/* <span>{npo.nponame}</span> */}
                <Link to={`/npo/${npo.id}`}>{npo.nponame}</Link>
              </li>
            );
          })}
        </ul>
      )}
      {/* <span>TBA: Form to post volunteer opportunities</span> */}
      <Link to="/oppform">Create Volunteer Opportunity</Link>

      <p>TBA: List of registered volunteers, contact info</p>
    </div>
  );
}

export default DashOrgAdmin;
