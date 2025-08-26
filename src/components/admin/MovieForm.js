// src/components/admin/MovieForm.js
import React, { useState, useEffect } from "react";

const MovieForm = ({ movie, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    poster: "",
    duration: "",
    trailer: "",
    description: "",
    language: "",
    releaseDate: "",
  });

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title || "",
        genre: movie.genre || "",
        poster: movie.poster || "",
        duration: movie.duration || "",
        trailer: movie.trailer || "",
        description: movie.description || "",
        language: movie.language || "",
        releaseDate: movie.releaseDate || "",
      });
    }
  }, [movie]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="p-6 mb-6 bg-black rounded-xl shadow-xl text-white max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/** Input fields */}
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            name={key}
            value={formData[key]}
            onChange={handleChange}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            className="bg-gray-900 text-white border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-600"
            required={key !== "trailer" && key !== "description" && key !== "language" && key !== "releaseDate"}
          />
        ))}

        {/** Buttons */}
        <div className="flex justify-between gap-4 mt-2">
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 transition px-6 py-2 rounded-lg font-medium"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-800 hover:bg-gray-700 transition px-6 py-2 rounded-lg font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default MovieForm;
