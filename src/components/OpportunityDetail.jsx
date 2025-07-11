import React, { useState, useEffect } from "react";
// import apiSource
import { apiSource } from "../apiSource";
import { Routes, Route, Link, useNavigate, useParams } from "react-router";
import punchclock from "../assets/punchclock.svg";

function OpportunityDetail(
  {
    // Props
  }
) {
  // State declarations
  const [opp, setOpp] = useState("");
  const [shiftLength, setShiftLength] = useState(null);
  const [shiftError, setShiftError] = useState(null);
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

  function handleShiftLength(e) {
    setShiftLength(e.target.value);
  }

  // Check if current user is already listed as a volunteer for this opp
  const isRegistered = () => {
    if (opp.volunteer.some((e) => e.id === parseInt(localStorage.id))) {
      return true;
    } else {
      return false;
    }
  };

  // Combine into single function with variable for reg/unreg?
  async function submitRegistration(e) {
    e.preventDefault();
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
      console.log(regResponse);
      localStorage.setItem(
        "opportunity",
        JSON.stringify(regResponse.opportunity)
      );
      // Redirect to login
      window.location.href = "/";
    }
  }

  async function submitUnregistration(e) {
    e.preventDefault();
    const response = await fetch(
      apiSource + `user/unregopp/${localStorage.id}`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oppId: oppId,
        }),
      }
    );
    const regResponse = await response.json();
    if (Array.isArray(regResponse.errors)) {
      setRegError(true);
    } else {
      setRegError(false);
      console.log(regResponse);
      localStorage.setItem(
        "opportunity",
        JSON.stringify(regResponse.opportunity)
      );
      // Redirect to login
      window.location.href = "/";
    }
  }

  async function startShift(e) {
    e.preventDefault();
    const startTime = new Date();
    const response = await fetch(apiSource + "shift", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: localStorage.id,
        opp: oppId,
        starttime: startTime,
        length: shiftLength,
        // endtime: endTime,
      }),
    });
    const shiftResponse = await response.json();
    console.log(shiftResponse);
    if (Array.isArray(shiftResponse.errors)) {
      setShiftError(true);
    } else {
      setShiftError(false);
      // TODO: Modal to verify clock-in?
      // Redirect to home
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
          {isRegistered() ? (
            <>
              <form onSubmit={startShift}>
                <label htmlFor="shiftSelect">Shift length:</label>
                <select name="" id="shiftSelect" onChange={handleShiftLength}>
                  <option value="">-Select the a number of hours-</option>
                  <option value="0.5">0.5</option>
                  <option value="1.0">1.0</option>
                  <option value="1.5">1.5</option>
                  <option value="2.0">2.0</option>
                  <option value="2.5">2.5</option>
                  <option value="3.0">3.0</option>
                  <option value="3.5">3.5</option>
                  <option value="4.0">4.0</option>
                  <option value="4.5">4.5</option>
                  <option value="5.0">5.0</option>
                  <option value="5.5">5.5</option>
                  <option value="6.0">6.0</option>
                </select>
                <button>Clock In</button>
              </form>
              <h2>Unregister from this Volunteer Opportunity?</h2>
              <form onSubmit={submitUnregistration}>
                {/* <h2>Join Volunteer List for this Role?</h2> */}
                {regError && (
                  <p>An error has occurred, please try again later</p>
                )}
                <button>Unregister</button>
              </form>
            </>
          ) : (
            <form onSubmit={submitRegistration}>
              <span>TBA student user registration form w/ other details?</span>
              {/* <h2>Join Volunteer List for this Role?</h2> */}
              {regError && <p>An error has occurred, please try again later</p>}
              <button>Register</button>
            </form>
          )}
        </>
      )}
      {localStorage.role == "org_admin" && (
        <>
          {opp.volunteer == 0 ? (
            <span>No Volunteers registered</span>
          ) : (
            <>
              <span>List of Volunteers:</span>
              <ul>
                {opp.volunteer.map((volunteer) => {
                  return (
                    <li key={volunteer.id} className="userListItem">
                      <Link to={`/user/${volunteer.id}`}>
                        {volunteer.username}
                      </Link>
                      <span>TBA: School/contact?</span>
                      <Link to={`/user/${volunteer.id}/timesheet`}>
                        <img src={punchclock} alt="" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default OpportunityDetail;
