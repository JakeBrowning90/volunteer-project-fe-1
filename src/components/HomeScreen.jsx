import React, { useEffect, useState } from "react";
import DashSchoolAdmin from "./DashSchoolAdmin";
import DashOrgAdmin from "./DashOrgAdmin";
import DashStudent from "./DashStudent";
// import apiSource
import { apiSource } from "../apiSource";

import { Routes, Route, Link, useNavigate } from "react-router";

function HomeScreen(
  {
    // Props
  }
) {
  // State declarations

  // Functions
  const navigate = useNavigate();
  // Render
  return (
    <>
      {localStorage.role == "student" && <DashStudent />}
      {localStorage.role == "school_admin" && <DashSchoolAdmin />}
      {localStorage.role == "org_admin" && <DashOrgAdmin />}
    </>
  );
}

export default HomeScreen;
