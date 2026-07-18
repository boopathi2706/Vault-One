import { useState } from "react";
import { Home, Menu } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

import HomePage from "../components/Dashboard/Home"



const Dashboard = () => {
      const [open, setOpen] = useState(false);

  return (
    <div className="flex">

      <Sidebar
        open={open}
        setOpen={setOpen}
      />

      <div className="flex-1 lg:ml-72">

        {/* Top Navbar */}

        <div className="h-16 bg-white shadow flex items-center px-4">

          <button
            className="lg:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu size={30} />
          </button>

          <h1 className="ml-4 text-xl font-semibold">
            Gold Pawn Management
          </h1>

        </div>

        {/* Page */}

        <div className="p-6">

          <HomePage/>

        </div>

      </div>

    </div>

  );
};

export default Dashboard;