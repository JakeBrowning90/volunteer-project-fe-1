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
    <>
      {localStorage.role == "student" && <Link to="/">Back to Home</Link>}
      {localStorage.role == "school_admin" && (
        <Link to={`/school/${user.school[0].id}`}>Back to Student List</Link>
      )}
      {localStorage.role == "org_admin" && (
        <>
          <Link to={`/`}>Back to Home</Link>
          <Link to={`/`}>TODO: Manually create shift</Link>
        </>
      )}
      <h1>Timesheet: {user.username}</h1>
      {shifts.length == 0 ? (
        <span>No recorded shifts</span>
      ) : (
        <>
          <table>
            <thead>
              <tr className="timesheetRow">
                <th>Date</th>
                <th>Program</th>
                <th>Shift start</th>
                <th>Shift end</th>
                <th>Hours</th>
              </tr>
            </thead>
            <tbody>
              {shifts.map((shift) => {
                return (
                  <tr key={shift.id} className="timesheetRow">
                    <th>{shift.starttime.slice(0, 10)}</th>
                    <td>{shift.opportunity[0].title} </td>

                    {/* <span>{shift.starttime.slice(11, 16)}</span> */}
                    <td>
                      {new Date(Date.parse(shift.starttime))
                        .toTimeString()
                        .slice(0, 5)}
                    </td>

                    {/* console.log(new Date(shifts[i].starttime)); */}

                    <td>
                      {new Date(
                        Date.parse(shift.starttime) +
                          parseFloat(shift.length) * (60 * 60 * 1000)
                      )
                        .toTimeString()
                        .slice(0, 5)}
                    </td>

                    {/* <span>
                    {(
                      (Date.parse(shift.endtime) -
                        Date.parse(shift.starttime)) /
                      (1000 * 60 * 60)
                    ).toFixed(1)}
                  </span> */}
                    {localStorage.role == "org_admin" ? (
                      <>
                        <td>
                          <a href={`/shift/${shift.id}`}>{parseFloat(shift.length).toFixed(1)}</a>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{parseFloat(shift.length).toFixed(1)}</td>
                      </>
                    )}
                    {/* <td>{parseFloat(shift.length).toFixed(1)}</td> */}
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="timesheetRow">
                <th scope="row" colSpan="4">
                  Total:
                </th>

                <td>{total.toFixed(1)}</td>
              </tr>
            </tfoot>
          </table>
        </>
      )}
    </>
  );
}

export default Timesheet;
