import React from "react";
import { ChevronLeft, ChevronRight, Edit, Trash, Check, X } from "lucide-react";

function UserTable({ users, onEdit, onDelete, currentPage, totalPages, onPageChange }) {
  if (!users || users.length === 0) {
    return (
      <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 text-center py-12 text-gray-400">
        No Users Found
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800 border-b border-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Phone</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Created</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-800">
            
           {users.map((user) => {
  const status = user.status?.toLowerCase(); // ✅ HERE

  return (
    <tr key={user._id} className="hover:bg-gray-800 transition-colors">
      <td className="px-6 py-4 text-sm text-white font-medium">
        {user.name}
      </td>

      <td className="px-6 py-4 text-sm text-white font-medium">
        {user.email}
      </td>

      <td className="px-6 py-4 text-sm text-white font-medium">
        {user.phone}
      </td>

      <td className="px-6 py-4 text-sm font-semibold">
        <span
          className={`px-3 py-1 rounded-full text-xs ${
            status === "active"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {status === "active" ? "Active" : "Inactive"}
        </span>
      </td>

      <td className="px-6 py-4 text-sm text-gray-400">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>

      <td className="px-6 py-4 text-center">
        <div className="flex justify-center gap-2">
          <button
            onClick={() => onEdit(user)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-green-500 text-gray-900 rounded-lg hover:bg-green-400 transition-all font-semibold"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(user._id)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-400 transition-all font-semibold"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
})}

          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-800 flex justify-between items-center bg-gray-800">
        <div className="text-sm text-gray-400">
          Page {currentPage} of {totalPages}
        </div>

        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="flex items-center gap-1 px-3 py-2 bg-gray-700 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-600 disabled:opacity-50"
          >
            <ChevronLeft size={16} /> Prev
          </button>

          <button
            disabled
            className="px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white"
          >
            {currentPage}
          </button>

          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="flex items-center gap-1 px-3 py-2 bg-gray-700 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-600 disabled:opacity-50"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserTable;
