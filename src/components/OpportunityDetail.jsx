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
  const [regError, setRegError] = useState(false);


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

  async function submitRegistration(e) {
    e.preventDefault();
    console.log("User: " + localStorage.id, "Opp: " + oppId);
    const response = await fetch(apiSource + `user/regopp/${localStorage.id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oppId: oppId,
      }),
    });
    const regResponse = await response.json();
    if (Array.isArray(regResponse.errors)) {
      setRegError(true);
    } else {
      setRegError(false);
      // Redirect to login
      window.location.href = "/";
    }
  }

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
        <>
          <span>TBA student user: registration form</span>
          <form onSubmit={submitRegistration}>
            <h2>Join Volunteer List for this Role?</h2>
            {regError && <p>An error has occurred, please try again later</p>}
            <button>Register</button>
          </form>
        </>
      )}
      {localStorage.role == "org_admin" && (
        <span>TBA org admin: list of volunteers</span>
      )}
    </div>
  );
}

export default OpportunityDetail;
