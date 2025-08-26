// src/pages/MovieDetails.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLoader } from "../contexts/LoaderContext";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  const [movie, setMovie] = useState(null);
  const [trailerOpen, setTrailerOpen] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL; // use env variable

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        showLoader();
        const { data } = await axios.get(`${API_URL}/movies/${id}`);
        setMovie(data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      } finally {
        hideLoader();
      }
    };

    fetchMovie();
  }, [id, API_URL, showLoader, hideLoader]);

  if (!movie) return <p className="text-center text-white p-6">Loading...</p>;

  const getEmbedUrl = (url) => {
    if (!url) return "";
    let embedUrl = "";
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1].split("?")[0];
      embedUrl = `https://www.youtube.com/embed/${id}?autoplay=1`;
    } else if (url.includes("youtube.com/watch")) {
      const params = new URLSearchParams(url.split("?")[1]);
      embedUrl = `https://www.youtube.com/embed/${params.get("v")}?autoplay=1`;
    } else {
      embedUrl = url;
    }
    return embedUrl;
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full md:w-1/3 h-auto rounded-lg object-cover"
        />
        <div className="flex-1">
          <p className="mb-2"><strong>Genre:</strong> {movie.genre}</p>
          <p className="mb-2"><strong>Duration:</strong> {movie.duration}</p>
          <p className="mb-2"><strong>Language:</strong> {movie.language}</p>
          <p className="mb-2"><strong>Release Date:</strong> {movie.releaseDate}</p>
          <p className="mb-4">{movie.description}</p>

          <div className="flex gap-4 mt-4">
            {movie.trailer && (
              <button
                onClick={() => setTrailerOpen(true)}
                className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-medium transition"
              >
                Watch Trailer
              </button>
            )}
            <button
              onClick={() => navigate(`/booking/${movie._id}`)}
              className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-medium transition"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {trailerOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setTrailerOpen(false)}
        >
          <div
            className="bg-black rounded-lg p-4 max-w-3xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setTrailerOpen(false)}
              className="absolute top-2 right-2 text-white text-xl font-bold"
            >
              &times;
            </button>
            <iframe
              width="100%"
              height="500"
              src={getEmbedUrl(movie.trailer)}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
