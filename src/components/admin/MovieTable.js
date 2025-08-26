import React from "react";

const MovieTable = ({ movies, onEdit, onDelete }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Duration</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => (
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre}</td>
            <td>{movie.duration} min</td>
            <td>
              <button onClick={() => onEdit(movie)}>Edit</button>
              <button onClick={() => onDelete(movie._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MovieTable;
