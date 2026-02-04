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
    <div className={`app ${theme} ${theme === "dark" ? "dark" : ""}`}>
      <nav className="flex flex-wrap gap-4 items-center p-4 bg-pink-200 dark:bg-gray-800 transition">
        <Link className="hover:underline" to="/password">
          Password
        </Link>
        <Link className="hover:underline" to="/movies">
          Movies
        </Link>
        <Link className="hover:underline" to="/notes">
          Notes
        </Link>
        <Link className="hover:underline" to="/todo">
          Todo
        </Link>
        <Link className="hover:underline" to="/favorites">
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
