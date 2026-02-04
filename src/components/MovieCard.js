import { Link } from "react-router-dom";
import { useState } from "react";
import { isFavorite, toggleFavorite } from "../utils/favorites";

function MovieCard({ movie }) {
  const [fav, setFav] = useState(isFavorite(movie.imdbID));

  const handleFavorite = (e) => {
    e.preventDefault(); // prevent link click
    toggleFavorite(movie);
    setFav(!fav);
  };

  return (
    <div className="movie-card">
      {/* ❤️ Favorite Button */}
      <button className="fav-btn" onClick={handleFavorite}>
        {fav ? "❤️" : "🤍"}
      </button>

      <Link to={`/movie/${movie.imdbID}`}>
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
          alt={movie.Title}
        />
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </Link>
    </div>
  );
}

export default MovieCard;
