import React, { useState } from "react";
// import apiSource

function SchoolForm(
  {
    // Props
  }
) {
  // State declarations
  const [name, setName] = useState("");

  // Functions
  function handleName(e) {
    setName(e.target.value);
  }

  async function submitSchool(e) {
    e.preventDefault();
    console.log(name, localStorage.id);
  }

  // Render
  return (
    <div>
      <h1>Create School</h1>
      <form onSubmit={submitSchool}>
        <label htmlFor="nameInput">School name:</label>
        <input type="text" id="nameInput" value={name} onChange={handleName} />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default SchoolForm;
