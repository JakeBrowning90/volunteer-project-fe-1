import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router";

// import apiSource

function NPODetail(
  {
    // Props
  }
) {
  // State declarations
  const [npo, setNpo] = useState("");
  const [opportunities, setOpportunities] = useState("");
  const [volunteers, setVolunteers] = useState("");

  // Functions
  // Fetch NPO title and opportunities

  // Render
  return (
    <div>
      <Link to="/">Back to Home</Link>

      <h1>NPO Detail</h1>
      <span>TBA: NPO name</span>
      {opportunities.length == 0 ? (
        <span>No opportunities registered</span>
      ) : (
        <ul>
          {opportunities.map((opportunity) => {
            return (
              <li key={opportunity.id}>
                <span>{opportunity.title}</span>
                <span>{opportunity.description}</span>
                {/* <Link to={`/npo/${npo.id}`}>{npo.nponame}</Link> */}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default NPODetail;
