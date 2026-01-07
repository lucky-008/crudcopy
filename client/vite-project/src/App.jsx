import React from "react";
import { Plus, Users } from "lucide-react";
import StatsCard from "./components/StatsCard";
import SearchBar from "./components/SearchBar";
import UserTable from "./components/UserTable";
import UserModel from "./components/UserModel";

function App() {
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
              <h1 className="text-3l font-bold text-white" >User Management </h1>
              <p className="text-gray-400 mt-1">MERN stack application</p>

            </div>
            <button className="flex items-center gap-2 bg-amber-500 text-gray-900 px-5 py-2.5 rounded-lg *
             hover:bg-green-400 transition-colors shadow-lg font-semibold">
              <Plus size={20} />Add user
             </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <StatsCard />
       </div>



<SearchBar />

<UserTable />

<UserModel />


      </main>

    </div>
  );
}

export default App;
