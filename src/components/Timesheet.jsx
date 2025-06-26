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
  const [user, setUser] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Functions
  const { userId } = useParams();

  useEffect(() => {
    // If user is student or school admin, fetch all shifts
    if (localStorage.role == "student" || localStorage.role == "school_admin") {
      fetch(apiSource + `shift/user/${userId}`, {
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
          // console.log(response);
          setUser(response[0]);
          setShifts(response[1]);
          getTotal(response[1]);
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    } else if (localStorage.role == "org_admin") {
      fetch(apiSource + `shift/${localStorage.id}/user/${userId}`, {
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
          // console.log(response);
          setUser(response[0]);
          setShifts(response[1]);
          getTotal(response[1]);
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }
  }, []);

  function getTotal(shifts) {
    let total = 0;
    for (let i = 0; i < shifts.length; i++) {
      // total +=
      //   (Date.parse(shifts[i].endtime) - Date.parse(shifts[i].starttime)) /
      //   (1000 * 60 * 60);
      // console.log(shifts[i].starttime);
      // console.log(new Date(shifts[i].starttime));

      total += parseFloat(shifts[i].length);
    }
    setTotal(total);
  }

  // Render
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Network error, please try again later.</p>;
  return (
    <div>
      {localStorage.role == "student" && <Link to="/">Back to Home</Link>}
      {localStorage.role == "school_admin" && (
        <Link to={`/school/${user.school[0].id}`}>Back to Student List</Link>
      )}
      {localStorage.role == "org_admin" && (
        <>
          <Link to={`/`}>Back to Home</Link>
          <span>
            TODO: filter fetch to only show shifts for NPO's opportunities
          </span>
        </>
      )}
      <h1>Timesheet: {user.username}</h1>
      {shifts.length == 0 ? (
        <span>No recorded shifts</span>
      ) : (
        <>
          <div className="timesheetRow">
            <span>Date</span>
            <span>Program</span>
            <span>Shift start</span>
            <span>Shift end</span>
            <span>Hours</span>
          </div>
          <ul>
            {shifts.map((shift) => {
              return (
                <li key={shift.id} className="timesheetRow">
                  <span>{shift.starttime.slice(0, 10)}</span>
                  <span>{shift.opportunity[0].title} </span>

                  {/* <span>{shift.starttime.slice(11, 16)}</span> */}
                  <span>
                    {new Date(Date.parse(shift.starttime))
                      .toTimeString()
                      .slice(0, 5)}
                  </span>

                  {/* console.log(new Date(shifts[i].starttime)); */}

                  <span>
                    {new Date(
                      Date.parse(shift.starttime) +
                        parseFloat(shift.length) * (60 * 60 * 1000)
                    )
                      .toTimeString()
                      .slice(0, 5)}
                  </span>

                  {/* <span>
                    {(
                      (Date.parse(shift.endtime) -
                        Date.parse(shift.starttime)) /
                      (1000 * 60 * 60)
                    ).toFixed(1)}
                  </span> */}
                  <span>{parseFloat(shift.length).toFixed(1)}</span>
                </li>
              );
            })}
            <div className="timesheetRow">
              <h2>Total:</h2>
              <span></span>
              <span></span>
              <span></span>
              <h2>{total.toFixed(1)}</h2>
            </div>
          </ul>
        </>
      )}
    </div>
  );
}

export default Timesheet;
