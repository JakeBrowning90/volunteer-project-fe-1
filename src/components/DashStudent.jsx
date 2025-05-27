import React, { useEffect, useState } from "react";
// import apiSource
import { apiSource } from "../apiSource";
import { Routes, Route, Link, useNavigate } from "react-router";

function DashStudent(
  {
    // Props
  }
) {
  // State declarations
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Functions
  useEffect(() => {
    fetch(apiSource + `opportunity`, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Opportunity list fetch error");
        }
        return response.json();
      })
      .then((response) => setOpportunities(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  // Render
  if (loading) return <p>Loading volunteer opportunities...</p>;
  if (error) return <p>Network error, please try again later.</p>;
  return (
    <div>
      <h1>Student Home</h1>

      <p>TBA: Activity summary, log of hours</p>
      <p>TBA: Search for orgs and opportunities</p>
      {opportunities.length == 0 ? (
        <span>No opportunities found</span>
      ) : (
        <ul className="oppCardBase">
          {opportunities.map((opportunity) => {
            return (
              <li className="oppCard" key={opportunity.id}>
                <img  alt="thumbnail" />
                <span className="oppCardTitle">{opportunity.title}</span>
                <span>{opportunity.npo[0].nponame}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default DashStudent;
