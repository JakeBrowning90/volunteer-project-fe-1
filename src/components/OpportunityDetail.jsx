import React, { useState, useEffect } from "react";
// import apiSource
import { apiSource } from "../apiSource";
import { Routes, Route, Link, useNavigate, useParams } from "react-router";

function OpportunityDetail(
  {
    // Props
  }
) {
  // State declarations
  const [opp, setOpp] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Functions
  const { oppId } = useParams();

  useEffect(() => {
    fetch(apiSource + `opportunity/${oppId}`, {
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
      .then((response) => setOpp(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  // Render
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Network error, please try again later.</p>;
  return (
    <div>
      {/* Conditional based on user being student or org admin */}
      {localStorage.role == "student" && <Link to="/">Back to Home</Link>}
      {localStorage.role == "org_admin" && (
        <Link to={`../npo/${opp.npo[0].id}`}>Back to NPO</Link>
      )}

      <h1>Opportunity Detail</h1>
      <h2>{opp.title}</h2>
      <h2>{opp.npo[0].nponame}</h2>
      <p>{opp.description}</p>

      {localStorage.role == "student" && (
        <span>TBA student user: registration form</span>
      )}
      {localStorage.role == "org_admin" && (
        <span>TBA org admin: list of volunteers</span>
      )}
    </div>
  );
}

export default OpportunityDetail;
