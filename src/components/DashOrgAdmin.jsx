import React, { useEffect, useState } from "react";
// import apiSource
import { apiSource } from "../apiSource";
import { Routes, Route, Link, useNavigate } from "react-router";

function DashOrgAdmin(
  {
    // Props
  }
) {
  // State declarations
  // const [schoolList, setSchoolList] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // Functions
  // useEffect(() => {
  //   fetch(apiSource + `school/?adminId=${localStorage.id}`, {
  //     mode: "cors",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       if (response.status >= 400) {
  //         throw new Error("School list fetch error");
  //       }
  //       return response.json();
  //     })
  //     .then((response) => setSchoolList(response))
  //     .catch((error) => setError(error))
  //     .finally(() => setLoading(false));
  // }, []);

  // Render
  return (
    <div>
      <h1>NPO Admin Home</h1>
      <span>Create NPO:</span>
      <Link to="/npoform">Form</Link>
      <p>TBA: List of registered volunteers, contact info</p>
      <p>TBA: Form to post volunteer opportunities</p>
    </div>
  );
}

export default DashOrgAdmin;
