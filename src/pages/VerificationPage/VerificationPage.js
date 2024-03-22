import React, { useState } from "react";
import axios from "axios";
import "./VerificationPage.css";

function App() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/verify_email/", {
        code,
      });
      // Handle success (e.g., redirect user to dashboard)
    } catch (error) {
      setError("Verification failed. Please try again."); // Handle error display
    }
  };

  return (
    <div className="xxbodyxx">
      <div className="xxcontainerxx">
        <h2 className="xxh2xx">Verify Email</h2>
        <form onSubmit={handleSubmit}>
          <label className="xxlabelxx" htmlFor="code">Code:</label>
          <input
          className="xxinputxx"
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          {error && <div className="xxerror-messagexx">{error}</div>}
          <button className="xxbutonxx" type="submit">Verify</button>
        </form>
        <p className="xxpxx">
          Don't have an account? <a className="xxaxx" href="/registration">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default App;
