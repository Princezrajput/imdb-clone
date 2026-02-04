import { useEffect, useState } from "react";
import { getFavorites } from "../utils/favorites";
import MovieCard from "./MovieCard";

function Favorites() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(getFavorites());
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>❤️ Favorite Movies</h2>

      {movies.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
