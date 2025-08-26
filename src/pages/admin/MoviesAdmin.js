import React, { useEffect, useState } from "react";
import { getMovies, addMovie, updateMovie, deleteMovie } from "../../api";
import MovieForm from "../../components/admin/MovieForm";

const MoviesAdmin = () => {
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await getMovies();
      setMovies(res.data);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  const handleSave = async (movieData) => {
    try {
      if (editingMovie) {
        await updateMovie(editingMovie._id, movieData);
      } else {
        await addMovie(movieData);
      }
      setEditingMovie(null);
      setFormVisible(false);
      fetchMovies();
    } catch (err) {
      console.error("Error saving movie:", err);
    }
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        await deleteMovie(id);
        fetchMovies();
      } catch (err) {
        console.error("Error deleting movie:", err);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Manage Movies</h2>
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium transition"
          onClick={() => setFormVisible(true)}
        >
          Add Movie
        </button>
      </div>

      {formVisible && (
        <MovieForm
          movie={editingMovie}
          onSave={handleSave}
          onCancel={() => {
            setFormVisible(false);
            setEditingMovie(null);
          }}
        />
      )}

      <table className="w-full border-collapse border border-gray-300 text-white mt-4">
        <thead>
          <tr className="bg-gray-800">
            <th className="border p-2">Title</th>
            <th className="border p-2">Genre</th>
            <th className="border p-2">Duration</th>
            <th className="border p-2">Trailer URL</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id} className="bg-gray-900">
              <td className="border p-2">{movie.title}</td>
              <td className="border p-2">{movie.genre}</td>
              <td className="border p-2">{movie.duration}</td>
              <td className="border p-2">
                {movie.trailer ? (
                  <a
                    href={movie.trailer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 underline"
                  >
                    Watch Trailer
                  </a>
                ) : (
                  "N/A"
                )}
              </td>
              <td className="border p-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
                  onClick={() => handleEdit(movie)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(movie._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MoviesAdmin;
