import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API_KEY = "d9e0b0e4";
const API_URL = "https://www.omdbapi.com/";

function MovieDetails() {
  const { imdbID } = useParams(); // 👈 URL se ID
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}?apikey=${API_KEY}&i=${imdbID}`);
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [imdbID]);

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading movie details...</p>;
  }

  if (!movie) {
    return <p>No movie data found.</p>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <img
        src={movie.Poster}
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
        <strong>Ratings:</strong> {movie.imdbRating}
      </p>

      <div style={{ clear: "both" }} />
    </div>
  );
}

export default MovieDetails;
