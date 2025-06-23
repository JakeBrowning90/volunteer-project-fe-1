import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router";
import { apiSource } from "../apiSource";

// import apiSource

function Timesheet(
  {
    // Props
  }
) {
  // State declarations
  const [shifts, setShifts] = useState([]);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Functions
  useEffect(() => {
    fetch(apiSource + `shift/user/${localStorage.id}`, {
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
      .then((response) => {
        setShifts(response);
        getTotal(response);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  function getTotal(shifts) {
    let total = 0;
    for (let i = 0; i < shifts.length; i++) {
      total +=
        (Date.parse(shifts[i].endtime) - Date.parse(shifts[i].starttime)) /
        (1000 * 60 * 60);
    }
    setTotal(total);
  }

  // Render
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Network error, please try again later.</p>;
  return (
    <div>
      <Link to="/">Back to Home</Link>
      <h1>Timesheet</h1>
      {shifts.length == 0 ? (
        <span>No recorded shifts</span>
      ) : (
        <>
          <h2>Total: {total}</h2>
          <ul>
            {shifts.map((shift) => {
              return (
                <li key={shift.id}>
                  <span>{shift.opportunity[0].title} | </span>

                  <span>
                    {shift.starttime} - {shift.endtime} |
                  </span>
                  <span>
                    {(Date.parse(shift.endtime) - Date.parse(shift.starttime)) /
                      (1000 * 60 * 60)}{" "}
                    hours
                  </span>
                  {/* <span>{shift.endtime.getTime() - shift.starttime.getTime() }</span> */}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

export default Timesheet;
