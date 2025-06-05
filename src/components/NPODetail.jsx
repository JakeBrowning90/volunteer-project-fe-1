import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router";

// import apiSource
import { apiSource } from "../apiSource";

function NPODetail(
  {
    // Props
  }
) {
  // State declarations
  const [npo, setNpo] = useState("");
  const [opportunities, setOpportunities] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Functions

  const { npoId } = useParams();
  // Fetch NPO title and opportunities
  useEffect(() => {
    fetch(apiSource + `npo/${npoId}`, {
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
      .then((response) => setNpo(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  // Render
  if (loading) return <p>Loading NPO info...</p>;
  if (error) return <p>Network error, please try again later.</p>;
  return (
    <div>
      <Link to="/">Back to Home</Link>

      <h1>NPO Detail</h1>
      <h2>{npo.nponame}</h2>
      <Link to={`../npo/${npoId}/oppform`}>Create Volunteer Opportunity</Link>

      {npo.opportunity.length == 0 ? (
        <span>No opportunities registered</span>
      ) : (
        <ul className="oppCardBase">
          {npo.opportunity.map((opportunity) => {
            return (
              // <li key={opportunity.id}>
              //   <span>{opportunity.title}: </span>
              //   <span>{opportunity.description}</span>
              // </li>
              <a
                href={`../opp/${opportunity.id}`}
                className="oppCard"
                key={opportunity.id}
              >
                <img alt="thumbnail" />
                <span className="oppCardTitle">{opportunity.title}</span>

                {/* <span>{opportunity.npo[0].nponame}</span> */}
              </a>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default NPODetail;
