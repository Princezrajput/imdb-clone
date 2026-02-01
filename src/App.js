import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PasswordValidator from "./components/PasswordValidator";
import MovieSearch from "./components/MovieSearch";

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/password" style={{ marginRight: "15px" }}>
          Password Validator
        </Link>
        <Link to="/movies">Movie Search</Link>
      </nav>

      <Routes>
        <Route path="/password" element={<PasswordValidator />} />
        <Route path="/movies" element={<MovieSearch />} />
        <Route path="/" element={<MovieSearch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
