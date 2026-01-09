import React from "react";

function SearchBar({ value, onChange, onClear, itemsPerPage, onitemsPerPageChange, currentPage, totalUsers }) {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-4">
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 outline-none"
      />
      {/* <button onClick={onClear} className="px-3 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 text-white">
        Clear
      </button> */}
      <select value={itemsPerPage} onChange={(e) => onitemsPerPageChange(Number(e.target.value))} className="px-3 py-2 bg-gray-800 text-white rounded-lg">
        {[5, 10, 20, 50].map((n) => <option key={n} value={n}>{n} per page</option>)}
      </select>
      <span className="text-gray-400">{`Total Users: ${totalUsers}`}</span>
    </div>
  );
}

export default SearchBar;
