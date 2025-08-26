import React from "react";

const TicketTable = ({ tickets }) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Movie</th>
          <th className="border p-2">Theater</th>
          <th className="border p-2">Timing</th>
          <th className="border p-2">Seats</th>
          <th className="border p-2">User</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket) => (
          <tr key={ticket._id}>
            <td className="border p-2">{ticket.show.movie.title}</td>
            <td className="border p-2">{ticket.show.theater.name}</td>
            <td className="border p-2">{ticket.show.timing}</td>
            <td className="border p-2">{ticket.seats.join(", ")}</td>
            <td className="border p-2">{ticket.user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TicketTable;
