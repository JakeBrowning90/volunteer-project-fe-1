import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router";

// import apiSource
import { apiSource } from "../apiSource";

function OpportunityForm(
  {
    // Props
  }
) {
  // State declarations
  const [npoList, setNpoList] = useState([]);
  const [npo, setNpo] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [invalidSubmission, setInvalidSubmission] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // // Functions
  // function handleNpoName(e) {
  //   setNpoName(e.target.value);
  // }
  const { npoId } = useParams();

  // useEffect(() => {
  //   fetch(apiSource + `npo/?adminId=${localStorage.id}`, {
  //     mode: "cors",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       if (response.status >= 400) {
  //         throw new Error("NPO list fetch error");
  //       }
  //       return response.json();
  //     })
  //     .then((response) => setNpoList(response))
  //     .catch((error) => setError(error))
  //     .finally(() => setLoading(false));
  // }, []);
  useEffect(() => {
    fetch(apiSource + `npo/${npoId}`, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("NPO fetch error");
        }
        return response.json();
      })
      .then((response) => setNpo(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  function handleNpo(e) {
    setNpo(e.target.value);
  }

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  async function submitOpportunity(e) {
    e.preventDefault();
    const response = await fetch(apiSource + "opportunity", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        npo: npo.id,
      }),
    });
    const npoResponse = await response.json();
    if (Array.isArray(npoResponse.errors)) {
      setInvalidSubmission(true);
    } else {
      setInvalidSubmission(false);
      // Redirect to NPO overview
      window.location.href = `/npo/${npoId}`;
    }
  }

  // Render
  return (
    <>
      <Link to={`../npo/${npo.id}`}>Back to NPO Overview</Link>
      <h1>{npo.nponame}</h1>
      <h1>Create Volunteering Opportunity</h1>
      {invalidSubmission && <span>Invalid event</span>}
      <form onSubmit={submitOpportunity}>
        {/* <label htmlFor="npoSelect">NPO:</label>

        <select id="npoSelect" onChange={handleNpo}>
          <option value="">-Select an organization-</option>
          {npoList.map((npo) => {
            return (
              <option key={npo.id} value={npo.id}>
                {npo.nponame}
              </option>
            );
          })}
        </select> */}
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
    </>
  );
}

export default OpportunityForm;
