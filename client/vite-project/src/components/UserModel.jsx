import React from "react";
import { Check, X } from "lucide-react";

function UserModel({ isOpen, onClose, formData, setFormData, onSubmit, loading }) {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto border border-gray-800">
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-white">{formData._id ? "Edit User" : "Add New User"}</h2>
          <button className="text-gray-400 hover:text-white transition-all" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["name", "email", "phone"].map((field) => (
              <div key={field}>
                <label className="block text-gray-300 font-medium mb-2">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Enter ${field}`}
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  required
                />
              </div>
            ))}

            <div>
              <label className="block text-gray-300 font-medium mb-2">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-green-500 outline-none">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 transition-all">
              Cancel
            </button>

            <button type="submit" disabled={loading} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500 text-gray-900 rounded-lg hover:bg-green-400 transition-all font-semibold disabled:opacity-50">
              <Check size={20} /> {formData._id ? "Update User" : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserModel;
