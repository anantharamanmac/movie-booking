import React from "react";

const MovieTable = ({ movies, onEdit, onDelete }) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Title</th>
          <th className="border p-2">Genre</th>
          <th className="border p-2">Poster</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => (
          <tr key={movie._id}>
            <td className="border p-2">{movie.title}</td>
            <td className="border p-2">{movie.genre}</td>
            <td className="border p-2">
              <img src={movie.poster} alt={movie.title} className="w-16 h-20 object-cover" />
            </td>
            <td className="border p-2">
              <button
                className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
                onClick={() => onEdit(movie)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => onDelete(movie._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MovieTable;
