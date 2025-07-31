import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router";

// import apiSource
import { apiSource } from "../apiSource";

function ShiftEditForm(
  {
    // Props
  }
) {
  // State declarations
  const [shift, setShift] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Functions
  const { shiftId } = useParams();
  // Fetch shift info to populate form
  useEffect(() => {
    fetch(apiSource + `shift/${shiftId}`, {
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
      .then((response) => setShift(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  // Render
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Network error, please try again later.</p>;
  return (
    <>
      <Link to={`/user/${shift.volunteer[0].id}/timesheet`}>
        Back to Timesheet
      </Link>
      <h2>Shift Detail: </h2>
      <span>Shift ID: {shift.id}</span>
      <span>Volunteer Name: {shift.volunteer[0].username}</span>
      <span>Opportunity: {shift.opportunity[0].title}</span>
      <span>Date: {shift.starttime}</span>
      <span>Start time: {shift.starttime}</span>
      <span>Shift length (hours): {shift.length}</span>

      <form action="">
        <h1>Edit Shift</h1>
        <span>Volunteer: {shift.volunteer[0].username}</span>
        <div className="formLabelInput">
          <label htmlFor="editDatetimeInput">Shift Date and Start Time:</label>
          <input id="editDatetimeInput" type="datetime-local" />
        </div>

        <div className="formLabelInput">
          <label htmlFor="">Shift Length:</label>
          <input type="text" />
        </div>
        <button>Save Changes</button>
      </form>
      <form action="">
        <h1>Delete Shift</h1>

        <button>Delete</button>
      </form>
    </>
  );
}

export default ShiftEditForm;
