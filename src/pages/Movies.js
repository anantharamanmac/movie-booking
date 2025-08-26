import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import MovieCard from "../components/admin/MovieCard";
import { useLoader } from "../contexts/LoaderContext";

function Movies() {
  const { showLoader, hideLoader } = useLoader();
  const [movies, setMovies] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL; // <-- use environment variable

  const fetchMovies = useCallback(async () => {
    showLoader();
    try {
      const { data } = await axios.get(`${API_URL}/movies`);
      setMovies(data);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally {
      hideLoader();
    }
  }, [showLoader, hideLoader, API_URL]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {movies.map((movie) => (
        <MovieCard key={movie._id || movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default Movies;
