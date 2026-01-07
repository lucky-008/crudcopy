import { Edit } from "lucide-react";
import React from "react";

function UserTable() {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800 border-b border-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                Name
              </th>
               <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Email
              </th>
               <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                Phone
              </th>
               <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                Status
              </th>
               <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
               Created
              </th>
               <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Action 
              </th>
              
            </tr>
          </thead>
        </table>


        <tbody className="divide-y divide-gray-800">
  {/* I will use map method */}
  <tr className="hover:bg-gray-800 transition-colors">
    <td className="px-6 py-4 text-sm text-white font-medium">
      User Name
    </td>

    <td className="px-6 py-4 text-sm text-white font-medium">
      Email
    </td>

    <td className="px-6 py-4 text-sm text-white font-medium">
      Phone
    </td>

    <td className="px-3 py-1 rounded-full text-xs font-semibold">
      Active
    </td>

    <td className="px-6 py-4 text-sm text-gray-400">
      Date
    </td>

    <td className="px-6 py-4 text-center">
      <div className="flex justify-center gap-2">
        <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-green-500 text-gray-900 rounded-lg hover:bg-green-400 transition-all font-semibold">
          <Edit size={16} />
          Edit
        </button>
      </div>
    </td>
  </tr>
</tbody>

      </div>
    </div>
  );
}

export default UserTable;
