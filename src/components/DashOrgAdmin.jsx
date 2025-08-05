import React, { useEffect, useState } from "react";
// import apiSource
import { apiSource } from "../apiSource";
import { Routes, Route, Link, useNavigate } from "react-router";
import punchclock from "../assets/punchclock.svg";

function DashOrgAdmin(
  {
    // Props
  }
) {
  // State declarations
  const [npoList, setNpoList] = useState([]);
  const [volunteerList, setVolunteerList] = useState([]);
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
      .then((response) => {
        setNpoList(response[0]);
        setVolunteerList(response[1]);
      })

      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  // Render
  if (loading) return <p>Loading NPOs...</p>;
  if (error) return <p>Network error, please try again later.</p>;
  return (
    <>
      <h1>NPO Admin Home</h1>
      <Link to="/npoform">Create NPO</Link>
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

      {volunteerList.length == 0 ? (
        <span>No Volunteers registered</span>
      ) : (
        <>
          <span>All Registered Volunteers:</span>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Timesheet</th>
              </tr>
            </thead>
            <tbody>
              {volunteerList.map((volunteer) => {
                return (
                  <tr key={volunteer.id}>
                    <th>
                      <Link to={`user/${volunteer.id}`}>
                        {volunteer.username}
                      </Link>
                    </th>
                    <td>
                      <Link to={`/user/${volunteer.id}/timesheet`}>
                        <img src={punchclock} alt="" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export default DashOrgAdmin;
