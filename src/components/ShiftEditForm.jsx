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
  const [newShiftDate, setNewShiftDate] = useState("");
  const [newShiftLength, setNewShiftLength] = useState(null);
  const [shiftError, setShiftError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Functions
  const { shiftId } = useParams();
  // Fetch shift info to populate header and form
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

  function handleNewShiftDate(e) {
    setNewShiftDate(e.target.value);
  }

  function handleNewShiftLength(e) {
    setNewShiftLength(e.target.value);
  }

  async function submitShiftEdit(e) {
    e.preventDefault();
    console.log(newShiftDate);
    const response = await fetch(apiSource + `shift/${shiftId}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        starttime: newShiftDate,
        length: newShiftLength,
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
      window.location.href = `/user/${shift.volunteer[0].id}/timesheet`;
    }
  }

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
      <span>Date: {shift.starttime.slice(0, 10)}</span>
      <span>
        Start time:
        {new Date(Date.parse(shift.starttime)).toTimeString().slice(0, 5)}
      </span>
      <span>Shift length (hours): {shift.length}</span>

      <form onSubmit={submitShiftEdit}>
        <h1>Edit Shift</h1>
        <span>Volunteer: {shift.volunteer[0].username}</span>
        <span>Opportunity: {shift.opportunity[0].title}</span>
        <span>
          Date / Start time: {shift.starttime.slice(0, 10)}, 
           {new Date(Date.parse(shift.starttime)).toTimeString().slice(0, 5)}
        </span>
        <span>Shift length (hours): {shift.length}</span>

        {/* <div className="formLabelInput">
          <label htmlFor="editDatetimeInput">Opportunity:</label>
          <select id="editDatetimeInput">
          </select>
        </div> */}

        <div className="formLabelInput">
          <label htmlFor="editDatetimeInput">Shift Date and Start Time:</label>
          <input
            id="editDatetimeInput"
            type="datetime-local"
            value={newShiftDate}
            onChange={handleNewShiftDate}
          />
        </div>

        <div className="formLabelInput">
          <label htmlFor="shiftLength">Shift Length:</label>
          <select name="" id="shiftLength" onChange={handleNewShiftLength}>
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
