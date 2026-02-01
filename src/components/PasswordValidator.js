import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "../App.css";

function PasswordValidator() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const rules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const isPasswordStrong = Object.values(rules).every(Boolean);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login Successful!");
  };

  const renderIcon = (condition) =>
    condition ? <FaCheckCircle /> : <FaTimesCircle />;

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Strong Password Validator Form</h2>

      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <ul>
          <li>{renderIcon(rules.length)} At least 8 characters</li>
          <li>{renderIcon(rules.uppercase)} At least 1 uppercase letter</li>
          <li>{renderIcon(rules.number)} At least 1 number</li>
          <li>{renderIcon(rules.specialChar)} At least 1 special character</li>
        </ul>

        <button disabled={!isPasswordStrong}>Submit</button>
      </form>
    </div>
  );
}

export default PasswordValidator;
