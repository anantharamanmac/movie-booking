import React from "react";

const TheaterTable = ({ theaters, onEdit, onDelete }) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Name</th>
          <th className="border p-2">Location</th>
          <th className="border p-2">Capacity</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {theaters.map((theater) => (
          <tr key={theater._id}>
            <td className="border p-2">{theater.name}</td>
            <td className="border p-2">{theater.location}</td>
            <td className="border p-2">{theater.capacity}</td>
            <td className="border p-2">
              <button
                className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
                onClick={() => onEdit(theater)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => onDelete(theater._id)}
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

export default TheaterTable;
