import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { searchMovies } from "../services/api";
import Loader from "./Loader";
import "./movies.css";

function MovieSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);

  const [error, setError] = useState("");
  const [noResults, setNoResults] = useState(false);

  // Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        // Reset when new search happens
        setMovies([]);
        setPage(1);
        setHasMore(false);
        setNoResults(false);
        setError("");

        fetchMovies(query, 1, true);
      } else {
        setMovies([]);
        setPage(1);
        setHasMore(false);
        setNoResults(false);
        setError("");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const fetchMovies = async (text, pageNumber = 1, isNewSearch = false) => {
    if (isNewSearch) {
      setLoading(true);
    } else {
      setLoadMoreLoading(true);
    }

    try {
      const data = await searchMovies(text, pageNumber);

      if (data.Response === "True") {
        const newMovies = data.Search || [];
        const totalResults = Number(data.totalResults || 0);

        // Append movies
        setMovies((prev) =>
          isNewSearch ? newMovies : [...prev, ...newMovies],
        );

        // total pages = totalResults / 10
        const totalPages = Math.ceil(totalResults / 10);

        setHasMore(pageNumber < totalPages);
        setNoResults(false);
      } else {
        if (isNewSearch) {
          setMovies([]);
          setNoResults(true);
        }
        setHasMore(false);
      }
    } catch {
      setError("Failed to load movies. Please try again.");
    } finally {
      setLoading(false);
      setLoadMoreLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(query, nextPage, false);
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
          <button onClick={() => fetchMovies(query, 1, true)}>Retry</button>
        </div>
      )}

      {!loading && noResults && (
        <p className="empty-state">No movies found 🔍</p>
      )}

      {!loading && !error && movies.length > 0 && (
        <>
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <button
              className="loadMoreBtn"
              onClick={handleLoadMore}
              disabled={loadMoreLoading}
            >
              {loadMoreLoading ? "Loading..." : "Load More"}
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default MovieSearch;
