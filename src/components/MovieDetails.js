import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./MovieDetails.css"; // Import the CSS file

const API_KEY = "0b5b088bab00665e8e996c070b4e5991";  // Double-check this API key
const API_URL = `https://api.themoviedb.org/3/movie/`;

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${API_URL}${id}?api_key=${API_KEY}`);
        setMovie(response.data);
      } catch (err) {
        console.error("Error fetching movie:", err.response ? err.response.data : err.message);
        setError("Unable to fetch movie details.");
      }
    };
    fetchMovie();
  }, [id]);

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!movie) return <h2>Loading...</h2>;

  return (
    <div className="movie-details">
      <div className="movie-poster">
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt={movie.title} 
          className="poster-image"
        />
      </div>
      <div className="movie-info">
        <h2 className="movie-title">{movie.title}</h2>
        <p className="movie-release-date">Release Date: {movie.release_date}</p>
        <p className="movie-rating">Rating: {movie.vote_average}</p>
        <p className="movie-runtime">Runtime: {movie.runtime} minutes</p>
        <p className="movie-overview">{movie.overview}</p>
        <button 
          className="watch-trailer-btn"
          onClick={() => navigate(`/watch/${id}`)}
        >
          Watch Trailer
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;