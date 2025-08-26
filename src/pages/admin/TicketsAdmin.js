import React, { useEffect, useState } from "react";
import { getTickets } from "../../api";
import TicketTable from "../../components/admin/TicketTable";

const TicketsAdmin = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const res = await getTickets();
    setTickets(res.data);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Booked Tickets</h2>
      <TicketTable tickets={tickets} />
    </div>
  );
};

export default TicketsAdmin;
