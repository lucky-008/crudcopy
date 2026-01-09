import React from "react";

function StatsCard({ title, value, icon, bgicon, iconColor, gradient }) {
  return (
    <div className={`p-6 rounded-xl shadow-lg bg-gradient-to-r ${gradient}`}>
      <div className="flex items-center gap-4">
        <div className={`${bgicon} p-3 rounded-lg`}>{icon}</div>
        <div>
          <h3 className="text-gray-300 text-sm">{title}</h3>
          <p className="text-white text-2xl font-bold">{value.number}</p>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
