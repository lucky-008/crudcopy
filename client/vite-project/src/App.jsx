import React from "react";
import { Plus, Users } from "lucide-react";
import StatsCard from "./components/StatsCard";
import SearchBar from "./components/SearchBar";
import UserTable from "./components/UserTable";
import UserModel from "./components/UserModel";
import { getUsers, searchUsers,getStats,addUser,deleteUser } from "./api/userApi";
import { useState } from "react";
import { useEffect } from "react";
 

function App() {

  const [users, setUsers]= useState([])
  const [totalUsers, setTotalUsers]= useState(0)
  const [stats, setStats]= useState({total:0, active:0, inactive:0})
  const [searchTerm, setSearchTerm]= useState("")
  const [isModalOpen, setIsModalOpen]= useState(false)
  const [formData, setFormData]= useState({
    name:"",
    email:"", 
    phone:"",
    status:"active",
  })
  const [editingItem, setEditingItem] = useState(null);
const [loading, setLoading] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerpage, setItemsPerPage] = useState(5);
const [totalPages, setTotalPages] = useState(0);

const status = ["Active", "Inactive"];

useEffect(()=>{
  fetchUsers();

},[currentPage,itemsPerpage])


useEffect(()=>{
  if(searchTerm) handleSearch();
  else fetchUsers();

},[searchTerm])
const fetchStats = async () => {
  const data = await getStats();
  setStats(data);
};

const fetchUsers = async () => {
  const data = await getUsers(currentPage, itemsPerpage);
  setUsers(data.users);
  setTotalPages(data.totalPages);
  setTotalUsers(data.totalUsers);
  fetchStats();
};

const handleSearch = async () => {
  const data = await searchUsers(searchTerm, currentPage, itemsPerpage);
  setUsers(data.users);
  setTotalPages(data.totalPages);
  setTotalUsers(data.totalUsers);
};
const handleSubmit = async () => {
  if (!formData.name || !formData.email || !formData.phone)
    return alert("Fill all fields");

  setLoading(true);

  try {
    if (editingItem)
      await updateUser(editingItem._id, formData);
    else
      await addUser(formData);

    fetchUsers();
    closeModel();
  } catch (error) {
    alert(error.message);
  }

  setLoading(false);
};

const handleDelete = async (id) => {
  if (window.confirm("Are you sure")) {
    await deleteUser(id);
    fetchUsers();
  }
};
const openModel = (item = null) => {
  if (item) {
    setEditingItem(item);
    setFormData(item);
  } else {
    setEditingItem(null);
    setFormData({ name: "", email: "", phone: "", status: "Active" });
  }
  setIsModalOpen(true);
};

const closeModel = () => {
  setIsModalOpen(false);
  setEditingItem(null);
  setFormData({ name: "", email: "", phone: "", status: "Active" });
};







  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900 shadow-xl border-b border-gray-800">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">

    {/* LEFT SIDE */}
    <div className="flex items-center gap-3">
      <div className="p-2 bg-green-500 rounded-lg">
        <Users size={28} className="text-gray-900" />
      </div>

      <div>
        <h1 className="text-xl font-bold text-white">User Management</h1>
        <p className="text-gray-400 mt-1">MERN stack application</p>
      </div>
    </div>

    {/* RIGHT SIDE (ADD USER BUTTON) */}
    <button
      onClick={() => openModel()}
      className="flex items-center gap-2 bg-green-500 text-gray-900 px-5 py-2.5 rounded-lg hover:bg-amber-400 transition-colors shadow-lg font-semibold"
    >
      <Plus size={20} />
      Add user
    </button>

  </div>
</header>


      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <StatsCard />
       </div>



<SearchBar />

<UserTable />

<UserModel
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
/>



      </main>

    </div>
  );
}

export default App;
