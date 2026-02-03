import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
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
