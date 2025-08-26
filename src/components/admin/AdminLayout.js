import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <nav className="flex flex-col gap-3">
          <Link to="/admin/movies" className="hover:bg-gray-700 p-2 rounded">Movies</Link>
          <Link to="/admin/theaters" className="hover:bg-gray-700 p-2 rounded">Theaters</Link>
          <Link to="/admin/shows" className="hover:bg-gray-700 p-2 rounded">Shows</Link>
          <Link to="/admin/tickets" className="hover:bg-gray-700 p-2 rounded">Tickets</Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-900">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
