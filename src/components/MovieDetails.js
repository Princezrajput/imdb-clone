import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieById } from "../services/api";
import Loader from "./Loader";

function MovieDetails() {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDetails = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getMovieById(imdbID);

      if (data.Response === "False") {
        setError("Movie details not found.");
        setMovie(null);
      } else {
        setMovie(data);
      }
    } catch (err) {
      setError("Failed to load movie details. Please try again.");
      setMovie(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [imdbID]);

  /* 🔄 Loading State */
  if (loading) {
    return <Loader text="Loading movie details..." />;
  }

  /* ❌ Error State */
  if (error) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={fetchDetails}>Retry</button>
      </div>
    );
  }

  /* 📭 Empty State */
  if (!movie) {
    return <p style={{ padding: "20px" }}>No movie data available.</p>;
  }

  /* ✅ Success State */
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
        alt={movie.Title}
        style={{ width: "300px", float: "left", marginRight: "20px" }}
      />

      <h2>{movie.Title}</h2>

      <p>
        <strong>Genre:</strong> {movie.Genre}
      </p>
      <p>
        <strong>Cast:</strong> {movie.Actors}
      </p>
      <p>
        <strong>Plot:</strong> {movie.Plot}
      </p>
      <p>
        <strong>IMDb Rating:</strong> ⭐ {movie.imdbRating}
      </p>

      <div style={{ clear: "both" }} />
    </div>
  );
}

export default MovieDetails;
