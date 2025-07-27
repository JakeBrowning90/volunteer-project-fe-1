import React, { useEffect, useState } from "react";
// import apiSource
import { apiSource } from "../apiSource";
import { Routes, Route, Link, useNavigate } from "react-router";

function DashSchoolAdmin(
  {
    // Props
  }
) {
  // State declarations
  const [schoolList, setSchoolList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Functions
  useEffect(() => {
    fetch(apiSource + `school/?adminId=${localStorage.id}`, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("School list fetch error");
        }
        return response.json();
      })
      .then((response) => setSchoolList(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  // Render
  return (
    <>
      <h1>School Admin Home</h1>
      <Link to="/schoolform">Create School</Link>
      {schoolList.length == 0 ? (
        <span>No schools registered</span>
      ) : (
        <ul className="schoolList">
          {schoolList.map((school) => {
            return (
              
              <li key={school.id} className="schoolListItem">
                <Link to={`/school/${school.id}`}>{school.schoolname}</Link>
                {/* <span>{school.code}</span> */}
              </li>
            );
          })}
        </ul>
      )}
      <p>TBA: List of ALL registered students, logged hours?</p>
      <p>TBA: Report generator</p>
    </>
  );
}

export default DashSchoolAdmin;
