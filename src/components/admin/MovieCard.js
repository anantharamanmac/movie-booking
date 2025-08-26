import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4 text-white">
        <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
        <p className="mb-2">{movie.genre}</p>
        <p className="mb-4">{movie.duration}</p>
        <button
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition"
          onClick={() => navigate(`/movies/${movie._id}`)}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
