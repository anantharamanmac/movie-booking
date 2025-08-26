import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../contexts/LoaderContext";
import HeroSection from "../components/HeroSection";
import axios from "axios";

function HomePage() {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  const [movies, setMovies] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL; // use env variable

  useEffect(() => {
    let isMounted = true; // prevent state update if component unmounts

    const fetchMovies = async () => {
      try {
        showLoader();
        const res = await axios.get(`${API_URL}/movies`);
        if (isMounted) setMovies(res.data);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      } finally {
        hideLoader();
      }
    };

    fetchMovies();

    return () => {
      isMounted = false;
    };
  }, [API_URL, showLoader, hideLoader]); // include API_URL for consistency

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <HeroSection />

      <h1 className="text-4xl font-bold my-8 text-center">Now Showing</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <div
            key={movie._id || movie.id}
            className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300"
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-80 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{movie.title}</h2>
              <p className="text-sm text-gray-400">{movie.genre}</p>
              <p className="text-sm text-gray-400 mb-3">{movie.duration}</p>
              <button
                onClick={() => navigate(`/booking/${movie._id || movie.id}`)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm w-full"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
        {movies.length === 0 && (
          <p className="text-center text-gray-400 col-span-full">
            No movies available at the moment.
          </p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
