import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { searchMovies } from "../services/api";
import Loader from "./Loader";
import "./movies.css";

function MovieSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        fetchMovies(query);
      } else {
        setMovies([]);
        setNoResults(false);
        setError("");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const fetchMovies = async (text) => {
    setLoading(true);
    setError("");
    setNoResults(false);

    try {
      const data = await searchMovies(text);

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setNoResults(true);
      }
    } catch {
      setError("Failed to load movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="movies-container">
      <input
        type="text"
        placeholder="Search movies by title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      {loading && <Loader text="Fetching movies..." />}

      {!loading && error && (
        <div className="error-box">
          <p>{error}</p>
          <button onClick={() => fetchMovies(query)}>Retry</button>
        </div>
      )}

      {!loading && noResults && (
        <p className="empty-state">No movies found 🔍</p>
      )}

      {!loading && !error && movies.length > 0 && (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieSearch;
