import React, { useEffect, useState } from "react";
import { getShows, addShow, updateShow, deleteShow, getMovies, getTheaters } from "../../api";
import ShowTable from "../../components/admin/ShowTable";
import ShowForm from "../../components/admin/ShowForm";

const ShowsAdmin = () => {
  const [shows, setShows] = useState([]);
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [editingShow, setEditingShow] = useState(null);
  const [showFormVisible, setShowFormVisible] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [showsRes, moviesRes, theatersRes] = await Promise.all([
        getShows(),
        getMovies(),
        getTheaters(),
      ]);
      setShows(showsRes.data);
      setMovies(moviesRes.data);
      setTheaters(theatersRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleSave = async (showData) => {
    try {
      if (editingShow) {
        await updateShow(editingShow._id, showData);
      } else {
        await addShow(showData);
      }
      setEditingShow(null);
      setShowFormVisible(false);
      fetchAllData();
    } catch (err) {
      console.error("Error saving show:", err);
    }
  };

  const handleEdit = (show) => {
    setEditingShow(show);
    setShowFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this show?")) {
      try {
        await deleteShow(id);
        fetchAllData();
      } catch (err) {
        console.error("Error deleting show:", err);
      }
    }
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Shows</h2>
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium transition"
          onClick={() => setShowFormVisible(true)}
        >
          Add Show
        </button>
      </div>

      {showFormVisible && (
        <ShowForm
          show={editingShow}
          movies={movies}
          theaters={theaters}
          onSave={handleSave}
          onCancel={() => {
            setShowFormVisible(false);
            setEditingShow(null);
          }}
        />
      )}

      <div className="mt-6">
        <ShowTable shows={shows} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default ShowsAdmin;
