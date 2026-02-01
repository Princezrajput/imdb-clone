import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = "d9e0b0e4";
const API_URL = "https://www.omdbapi.com/";

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
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [query]);

  const fetchMovies = async (searchText) => {
    setLoading(true);
    setNoResults(false);

    try {
      const res = await fetch(`${API_URL}?apikey=${API_KEY}&s=${searchText}`);
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setNoResults(true); // ❌ no results
      }
    } catch (error) {
      setNoResults(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <input
        type="text"
        placeholder="Search movies by title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "100%", padding: "10px" }}
      />

      {loading && <p>Loading...</p>}
      {!loading && noResults && <p>No Results Found</p>}

      <ul>
        {movies.map((movie) => (
          <li key={movie.imdbID}>
            <Link to={`/movie/${movie.imdbID}`}>
              {movie.Title} ({movie.Year})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieSearch;
