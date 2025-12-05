import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "./PasswordValidators.css";

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
    condition ? (
      <FaCheckCircle className="rule-icon valid-icon" />
    ) : (
      <FaTimesCircle className="rule-icon invalid-icon" />
    );

  return (
    <div className="password-container">
      <h2 className="section-title">Strong Password Validator</h2>

      <form onSubmit={handleSubmit} className="password-form">
        <label className="field-label">Username</label>
        <input
          type="text"
          value={username}
          className="input-field"
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label className="field-label">Password</label>
        <input
          type="password"
          value={password}
          className="input-field"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <ul className="rules-list">
          <li className={`rule-item ${rules.length ? "valid" : "invalid"}`}>
            {renderIcon(rules.length)}
            At least 8 characters
          </li>

          <li
            className={`rule-item ${rules.uppercase ? "valid" : "invalid"}`}
          >
            {renderIcon(rules.uppercase)}
            At least 1 uppercase letter
          </li>

          <li className={`rule-item ${rules.number ? "valid" : "invalid"}`}>
            {renderIcon(rules.number)}
            At least 1 number
          </li>

          <li
            className={`rule-item ${rules.specialChar ? "valid" : "invalid"}`}
          >
            {renderIcon(rules.specialChar)}
            At least 1 special character
          </li>
        </ul>

        <button
          type="submit"
          disabled={!isPasswordStrong}
          className={`submit-btn ${
            isPasswordStrong ? "submit-btn-active" : "submit-btn-disabled"
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default PasswordValidator;
