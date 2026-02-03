import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { searchMovies } from "../services/api";
import "./movies.css";

function MovieSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim() !== "") {
        fetchMovies(query);
      } else {
        setMovies([]);
        setNoResults(false);
      }
    }, 500); // debounce

    return () => clearTimeout(timer);
  }, [query]);

  const fetchMovies = async (text) => {
    setLoading(true);
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
      setNoResults(true);
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

      {loading && <p>Loading...</p>}
      {!loading && noResults && <p>No Results Found</p>}

      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieSearch;
