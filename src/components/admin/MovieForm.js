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
    <div className="p-6 border mb-6 bg-black rounded-xl shadow-xl text-white max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required className="input" />
        <input name="genre" value={formData.genre} onChange={handleChange} placeholder="Genre" required className="input" />
        <input name="poster" value={formData.poster} onChange={handleChange} placeholder="Poster URL" required className="input" />
        <input name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration" required className="input" />
        <input name="trailer" value={formData.trailer} onChange={handleChange} placeholder="Trailer URL" className="input" />
        <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="input" />
        <input name="language" value={formData.language} onChange={handleChange} placeholder="Language" className="input" />
        <input name="releaseDate" value={formData.releaseDate} onChange={handleChange} placeholder="Release Date" className="input" />

        <div className="flex justify-between gap-4">
          <button type="submit" className="bg-red-600 px-6 py-2 rounded-lg">Save</button>
          <button type="button" onClick={onCancel} className="bg-gray-800 px-6 py-2 rounded-lg">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default MovieForm;
