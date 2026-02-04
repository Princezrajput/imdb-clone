import "./loader.css";

function Loader({ text = "Loading..." }) {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>{text}</p>
    </div>
  );
}

export default Loader;
