import React, { useState, useEffect } from "react";

const TheaterForm = ({ theater, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ name: "", location: "", capacity: "" });

  useEffect(() => {
    if (theater) setFormData(theater);
  }, [theater]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ name: "", location: "", capacity: "" });
  };

  return (
    <div className="p-4 border mb-4 bg-gray-50 rounded">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Theater Name"
          required
          className="border p-2 rounded"
        />
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          required
          className="border p-2 rounded"
        />
        <input
          name="capacity"
          type="number"
          value={formData.capacity}
          onChange={handleChange}
          placeholder="Capacity"
          required
          className="border p-2 rounded"
        />
        <div className="flex gap-2">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Save
          </button>
          <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TheaterForm;
