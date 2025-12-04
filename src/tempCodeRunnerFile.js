import React, { useState } from "react";
import "./App.css";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const rules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[!@#$%^&*(),.?:{}|<>]/.test(password),
  };

  const isPasswordStrong = Object.values(rules).every(Boolean);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login Successful!");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2> Strong Password Validator Form </h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          <li style={{ color: rules.length ? "green" : "red" }}>
            {renderIcon(rules.length)} At least 8 characters{" "}
          </li>

          <li style={{ color: rules.uppecase ? "green" : "red" }}>
            {renderIcon(rules.uppercase)} At least 1 uppercase letter
          </li>

          <li style={{ color: rules.number ? "green" : "red" }}>
            {renderIcon(rules.number)} At least 1 number{" "}
          </li>

          <li style={{ color: rules.specialChar ? "green" : "red" }}>
            {renderIcon(rules.specialChar)} At least 1 special character letter
          </li>
        </ul>

        <button
          type="submit"
          disabled={!isPasswordStrong}
          style={{
            width: "100%",
            padding: "10px",
            background: isPasswordStrong ? "blue" : "gray",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isPasswordStrong ? "pointer" : "not-allowed",
            margin: "10px",
          }}
        ></button>
      </form>
    </div>
  );
}
export default App;
