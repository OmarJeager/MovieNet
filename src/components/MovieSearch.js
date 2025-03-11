import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './MovieSearch.css';

const API_KEY = "0b5b088bab00665e8e996c070b4e5991";
const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const searchMovies = async () => {
      if (query.trim()) {
        const response = await axios.get(API_URL + query);
        setMovies(response.data.results);
      } else {
        setMovies([]); // Clear movies if query is empty
      }
    };

    // Debounce the search to avoid too many API calls
    const timeoutId = setTimeout(searchMovies, 500);

    // Cleanup the timeout on query change
    return () => clearTimeout(timeoutId);
  }, [query]); // Runs every time the query changes

  return (
    <div className="movie-search-container">
      <h2>Search Movies</h2>
      <input
        type="text"
        placeholder="Search..."
        className="movie-search-input"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />

      {movies.length === 0 && query.trim() && (
        <p className="no-movies-found">No movies found. Please try another search.</p>
      )}

      {movies.length > 0 && movies.map((movie) => (
        <div
          key={movie.id}
          className="movie-card"
          onClick={() => navigate(`/movie/${movie.id}`)}
        >
          <h3>{movie.title}</h3>
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
          />
          <p>{movie.vote_average}</p>
          <p>{movie.release_date}</p>
          <p>Click To See More Details</p>
        </div>
      ))}
    </div>
  );
};

export default MovieSearch;
