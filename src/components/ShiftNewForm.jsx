import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router";

// import apiSource
import { apiSource } from "../apiSource";

function ShiftNewForm(
  {
    // Props
  }
) {
  // State declarations
  const [shift, setShift] = useState([]);
  const [oppList, setOppList] = useState([]);
  const [volunteerList, setVolunteerList] = useState([]);
  const [newShiftDate, setNewShiftDate] = useState("");
  const [newShiftLength, setNewShiftLength] = useState(null);
  const [shiftError, setShiftError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Functions
  // Fetch list of volunteers, list of opportunities
  // useEffect(() => {
  //   fetch(apiSource + `npo/?adminId=${localStorage.id}`, {
  //     mode: "cors",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       if (response.status >= 400) {
  //         throw new Error("Fetch error");
  //       }
  //       return response.json();
  //     })
  //     .then((response) => {
  //       setVolunteerList(response[0]);
  //       setOppList(response[1]);
  //     })

  //     .catch((error) => setError(error))
  //     .finally(() => setLoading(false));
  // }, []);

  function handleNewShiftDate(e) {
    setNewShiftDate(e.target.value);
  }

  function handleNewShiftLength(e) {
    setNewShiftLength(e.target.value);
  }

  async function submitShiftNew(e) {
    e.preventDefault();
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
      // TODO: display error message
    } else {
      setShiftError(false);
      // TODO: Modal to verify clock-in?
      // Redirect to home
      window.location.href = `/user/${shift.volunteer[0].id}/timesheet`;
    }
  }

  // Render
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Network error, please try again later.</p>;
  return (
    <>
      <Link to={`/`}>Back to Home</Link>
      <form onSubmit={submitShiftNew}>
        <h1>Create New Shift </h1>
        <div className="formLabelInput">
          <label htmlFor="volunteerSelect">Volunteer:</label>
          <select name="volunteerSelect" id=""></select>
        </div>
        <div className="formLabelInput">
          <label htmlFor="opportunitySelect">Opportunity:</label>
          <select name="opportunitySelect" id=""></select>
        </div>
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
        {/* TODO: Error message for bad submission */}
        <button>Submit Shift</button>
      </form>
    </>
  );
}

export default ShiftNewForm;
