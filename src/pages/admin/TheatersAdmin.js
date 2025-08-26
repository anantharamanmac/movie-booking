import React, { useEffect, useState } from "react";
import { getTheaters, addTheater, updateTheater, deleteTheater } from "../../api";
import TheaterTable from "../../components/admin/TheaterTable";
import TheaterForm from "../../components/admin/TheaterForm";

const TheatersAdmin = () => {
  const [theaters, setTheaters] = useState([]);
  const [editingTheater, setEditingTheater] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchTheaters();
  }, []);

  const fetchTheaters = async () => {
    const res = await getTheaters();
    setTheaters(res.data);
  };

  const handleSave = async (theater) => {
    if (editingTheater) {
      await updateTheater(editingTheater._id, theater);
    } else {
      await addTheater(theater);
    }
    setEditingTheater(null);
    setShowForm(false);
    fetchTheaters();
  };

  const handleEdit = (theater) => {
    setEditingTheater(theater);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this theater?")) {
      await deleteTheater(id);
      fetchTheaters();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Theaters</h2>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowForm(true)}
      >
        Add Theater
      </button>

      {showForm && (
        <TheaterForm
          theater={editingTheater}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditingTheater(null); }}
        />
      )}

      <TheaterTable theaters={theaters} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default TheatersAdmin;
