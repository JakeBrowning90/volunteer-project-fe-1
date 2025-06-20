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
  if (loading) return <p>Loading NPOs...</p>;
  if (error) return <p>Network error, please try again later.</p>;
  return (
    <div>
      <h1>NPO Admin Home</h1>
      <span>Create NPO:</span>
      <Link to="/npoform">Form</Link>
      {npoList.length == 0 ? (
        <span>No NPOs registered</span>
      ) : (
        <ul className="npoList">
          {npoList.map((npo) => {
            return (
              <li key={npo.id} className="npoListItem">
                {/* <span>{npo.nponame}</span> */}
                <Link to={`/npo/${npo.id}`}>{npo.nponame}</Link>
              </li>
            );
          })}
        </ul>
      )}

      <p>TBA: List of registered volunteers, contact info</p>
    </div>
  );
}

export default DashOrgAdmin;
