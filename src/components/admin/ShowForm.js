import React, { useState, useEffect } from "react";

const ShowForm = ({ show, movies, theaters, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    movie: "",
    theatre: "", // backend field
    showTime: "",
    seatsAvailable: "",
    price: "",
    screen: "",
  });

  useEffect(() => {
    if (show) {
      setFormData({
        movie: show.movie._id,
        theatre: show.theatre._id, // map backend
        showTime: show.showTime
          ? new Date(show.showTime).toLocaleTimeString("en-GB", { hour12: false }).slice(0, 5)
          : "",
        seatsAvailable: show.seatsAvailable,
        price: show.price,
        screen: show.screen,
      });
    }
  }, [show]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert HH:MM string to Date object
    const [hours, minutes] = formData.showTime.split(":");
    const showTimeDate = new Date();
    showTimeDate.setHours(parseInt(hours));
    showTimeDate.setMinutes(parseInt(minutes));
    showTimeDate.setSeconds(0);
    showTimeDate.setMilliseconds(0);

    onSave({
      ...formData,
      showTime: showTimeDate,
    });

    setFormData({
      movie: "",
      theatre: "",
      showTime: "",
      seatsAvailable: "",
      price: "",
      screen: "",
    });
  };

  return (
    <div className="p-4 border mb-4 bg-black rounded-lg shadow-lg text-white">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <select
          name="movie"
          value={formData.movie}
          onChange={handleChange}
          required
          className="border border-red-600 bg-black text-white p-2 rounded focus:ring-2 focus:ring-red-600"
        >
          <option value="">Select Movie</option>
          {movies.map((m) => (
            <option key={m._id} value={m._id}>
              {m.title}
            </option>
          ))}
        </select>

        <select
          name="theatre" // backend name
          value={formData.theatre}
          onChange={handleChange}
          required
          className="border border-red-600 bg-black text-white p-2 rounded focus:ring-2 focus:ring-red-600"
        >
          <option value="">Select Theater</option>
          {theaters.map((t) => (
            <option key={t._id} value={t._id}>
              {t.name}
            </option>
          ))}
        </select>

        <input
          name="showTime"
          type="time"
          value={formData.showTime}
          onChange={handleChange}
          required
          className="border border-red-600 bg-black text-white p-2 rounded focus:ring-2 focus:ring-red-600"
        />

        <input
          name="seatsAvailable"
          type="number"
          value={formData.seatsAvailable}
          onChange={handleChange}
          placeholder="Seats Available"
          required
          className="border border-red-600 bg-black text-white p-2 rounded focus:ring-2 focus:ring-red-600"
        />

        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="border border-red-600 bg-black text-white p-2 rounded focus:ring-2 focus:ring-red-600"
        />

        <input
          name="screen"
          type="text"
          value={formData.screen}
          onChange={handleChange}
          placeholder="Screen"
          required
          className="border border-red-600 bg-black text-white p-2 rounded focus:ring-2 focus:ring-red-600"
        />

        <div className="flex gap-2">
          <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
            Save
          </button>
          <button type="button" onClick={onCancel} className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShowForm;
