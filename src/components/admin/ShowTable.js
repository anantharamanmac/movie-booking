import React from "react";

const ShowTable = ({ shows, onEdit, onDelete }) => {
  return (
    <table className="w-full border-collapse border border-gray-300 text-white">
      <thead>
        <tr className="bg-gray-800">
          <th className="border p-2">Movie</th>
          <th className="border p-2">Theater</th>
          <th className="border p-2">Timing</th>
          <th className="border p-2">Seats</th>
          <th className="border p-2">Price</th>
          <th className="border p-2">Screen</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {shows.map((show) => (
          <tr key={show._id} className="bg-gray-900">
            <td className="border p-2">{show.movie?.title}</td>
            <td className="border p-2">{show.theatre?.name}</td>
            <td className="border p-2">
              {show.showTime
                ? new Date(show.showTime).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : ""}
            </td>
            <td className="border p-2">{show.seatsAvailable}</td>
            <td className="border p-2">{show.price}</td>
            <td className="border p-2">{show.screen}</td>
            <td className="border p-2">
              <button
                className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
                onClick={() => onEdit(show)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => onDelete(show._id)}
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

export default ShowTable;
