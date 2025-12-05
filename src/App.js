import React from "react";
import "./App.css";
import PasswordValidator from "./PasswordValidators.jsx/PasswordValidator";
import DynamicSearchbar from "./DynamicSearchbar/DynamicSearchbar";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <DynamicSearchbar />
      <PasswordValidator />
    </div>
  );
}

export default App;
