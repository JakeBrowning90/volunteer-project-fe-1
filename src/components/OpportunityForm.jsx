import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router";

// import apiSource
import { apiSource } from "../apiSource";

function OpportunityForm(
  {
    // Props
  }
) {
  // State declarations
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [invalidSubmission, setInvalidSubmission] = useState(false);

  // // Functions
  // function handleNpoName(e) {
  //   setNpoName(e.target.value);
  // }

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  async function submitOpportunity(e) {
    e.preventDefault();
    console.log(title, description);
    // const response = await fetch(apiSource + "opportunity", {
    //   method: "POST",
    //   mode: "cors",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     nponame: npoName,
    //     admin: localStorage.id,
    //   }),
    // });
    // const npoResponse = await response.json();
    // if (Array.isArray(npoResponse.errors)) {
    //   setInvalidNpo(true);
    // } else {
    //   setInvalidNpo(false);
    //   // Redirect to login
    //   window.location.href = "/";
    // }
  }

  // Render
  return (
    <div>
            <Link to="/">Back to Home</Link>

      <h1>Create Volunteering Opportunity</h1>
      {invalidSubmission && <span>Invalid event</span>}
      <form onSubmit={submitOpportunity}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={handleTitle} />
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={handleDescription}
        />

        <button>Submit</button>
      </form>
    </div>
  );
}

export default OpportunityForm;
