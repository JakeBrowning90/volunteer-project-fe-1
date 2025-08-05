import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router";

// import apiSource
import { apiSource } from "../apiSource";

function NPOForm(
  {
    // Props
  }
) {
  // State declarations
  const [npoName, setNpoName] = useState("");
  const [invalidNpo, setInvalidNpo] = useState(false);
  // Functions
  function handleNpoName(e) {
    setNpoName(e.target.value);
  }

  async function submitNPO(e) {
    e.preventDefault();
    const response = await fetch(apiSource + "npo", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nponame: npoName,
        admin: localStorage.id,
      }),
    });
    const npoResponse = await response.json();
    if (Array.isArray(npoResponse.errors)) {
      setInvalidNpo(true);
    } else {
      setInvalidNpo(false);
      // Redirect to login
      window.location.href = "/";
    }
  }

  // Render
  return (
    <>
      <Link to="/">Back to Home</Link>

      {invalidNpo && <p>Invalid NPO</p>}
      <form onSubmit={submitNPO}>
        <div className="formLabelInput">
          <h1>Create NPO</h1>

          <label htmlFor="npoName">NPO name:</label>
          <input
            type="text"
            id="npoName"
            value={npoName}
            onChange={handleNpoName}
          />
        </div>

        <button>Submit</button>
      </form>
    </>
  );
}

export default NPOForm;
