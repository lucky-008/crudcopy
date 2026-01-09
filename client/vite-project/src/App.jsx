import React, { useState, useEffect } from "react";
import { Check, Plus, Users, X } from "lucide-react";
import StatsCard from "./components/StatsCard";
import SearchBar from "./components/SearchBar";
import UserTable from "./components/UserTable";
import UserModel from "./components/UserModel";
import { getUsers, searchUsers, getStats, addUser, updateUser, deleteUser } from "./api/userApi";

function App() {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", status: "active" });
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch stats
  const fetchStats = async () => {
    try {
      const data = await getStats();
      setStats(data);
    } catch (err) {
      console.error("Stats error:", err);
    }
  };

  // Fetch users
  const fetchUsers = async () => {
    try {
      const data = await getUsers(currentPage, itemsPerPage);
      setUsers(data.users);
      setTotalPages(data.totalPages);
      setTotalUsers(data.totalUsers);
      fetchStats();
    } catch (err) {
      console.error("Fetch users error:", err);
    }
  };

  // Search users
  const handleSearch = async () => {
    try {
      const data = await searchUsers(searchTerm, currentPage, itemsPerPage);
      setUsers(data.users);
      setTotalPages(data.totalPages);
      setTotalUsers(data.totalUsers);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  useEffect(() => {
    if (searchTerm) handleSearch();
    else fetchUsers();
  }, [searchTerm, currentPage, itemsPerPage]);

  // Add / Update
  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      return alert("Fill all fields");
    }

    setLoading(true);
    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      status: formData.status.toLowerCase(),
    };

    try {
      if (editingItem?._id) {
        await updateUser(editingItem._id, payload);
      } else {
        await addUser(payload);
      }
      fetchUsers();
      closeModel();
    } catch (err) {
      console.error("Create/update error:", err);
      alert(err.response?.data?.message || err.message || "Server error");
    }

    setLoading(false);
  };

  // Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(id);
        fetchUsers();
      } catch (err) {
        console.error("Delete error:", err);
        alert("Failed to delete user");
      }
    }
  };

  // Modal
  const openModel = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ ...item, status: item.status.toLowerCase() });
    } else {
      setEditingItem(null);
      setFormData({ name: "", email: "", phone: "", status: "active" });
    }
    setIsModalOpen(true);
  };

  const closeModel = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({ name: "", email: "", phone: "", status: "active" });
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900 shadow-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500 rounded-lg">
              <Users size={28} className="text-gray-900" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">User Management</h1>
              <p className="text-gray-400 mt-1">MERN stack application</p>
            </div>
          </div>

          <button
            onClick={() => openModel()}
            className="flex items-center gap-2 bg-green-500 text-gray-900 px-5 py-2.5 rounded-lg hover:bg-amber-400 transition-colors shadow-lg font-semibold"
          >
            <Plus size={20} /> Add user
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard title="Total Users" value={{ number: stats.total }} icon={<Users />} bgicon="bg-indigo-500" iconColor="text-white" gradient="from-indigo-900 to-indigo-700" />
          <StatsCard title="Active Users" value={{ number: stats.active }} icon={<Check />} bgicon="bg-green-500" iconColor="text-white" gradient="from-green-900 to-green-700" />
          <StatsCard title="Inactive Users" value={{ number: stats.inactive }} icon={<X />} bgicon="bg-red-500" iconColor="text-white" gradient="from-red-900 to-red-700" />
        </div>

        {/* Search */}
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onClear={() => setSearchTerm("")}
          itemsPerPage={itemsPerPage}
          onitemsPerPageChange={(val) => setItemsPerPage(Number(val))}
          currentPage={currentPage}
          totalUsers={totalUsers}
        />

        {/* Table */}
        <UserTable
          users={users}
          onEdit={openModel}
          onDelete={handleDelete}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />

        {/* Modal */}
        <UserModel isOpen={isModalOpen} onClose={closeModel} formData={formData} setFormData={setFormData} onSubmit={handleSubmit} loading={loading} />
      </main>
    </div>
  );
}

export default App;
