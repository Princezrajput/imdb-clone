import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PasswordValidator from "./components/PasswordValidator";
import MovieSearch from "./components/MovieSearch";
import MovieDetails from "./components/MovieDetails";
import NotesApp from "./components/NotesApp";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import TodoApp from "./todo/TodoApp";
import Favorites from "./components/Favorites";

function Layout() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`app ${theme}`}>
      <nav style={{ padding: "10px", background: "#d5a0a0ee" }}>
        <Link to="/password" style={{ marginRight: "15px" }}>
          Password Validator
        </Link>
        <Link to="/movies" style={{ marginRight: "15px" }}>
          Movie Search
        </Link>
        <Link to="/notes" style={{ marginRight: "15px" }}>
          Notes App
        </Link>
        <Link to="/todo" style={{ marginRight: "15px" }}>
          To-Do App
        </Link>
        <Link to="/favorites" style={{ marginRight: "15px" }}>
          Favorites
        </Link>

        {/* 🌙 Theme Toggle Button */}
        <ThemeToggle />
      </nav>

      <Routes>
        <Route path="/password" element={<PasswordValidator />} />
        <Route path="/movies" element={<MovieSearch />} />
        <Route path="/movie/:imdbID" element={<MovieDetails />} />
        <Route path="/notes" element={<NotesApp />} />
        <Route path="/" element={<MovieSearch />} />
        <Route path="/todo" element={<TodoApp />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
