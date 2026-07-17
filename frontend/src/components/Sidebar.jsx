import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  UserPlus,
  FileText,
  LogOut,
  X,
} from "lucide-react";

const Sidebar = ({ open, setOpen }) => {
  const menu = [
    {
      name: "Home",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      name: "Add Customer",
      icon: <UserPlus size={20} />,
      path: "/add-customer",
    },
    {
      name: "Reports",
      icon: <FileText size={20} />,
      path: "/reports",
    },
  ];

  return (
    <>
      {/* Overlay (Mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-screen
          w-72
          bg-yellow-600
          text-white
          z-50
          transform
          transition-transform
          duration-300

          ${
            open ? "translate-x-0" : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >
        {/* Logo */}

        <div className="flex items-center justify-between p-5 border-b border-yellow-500">

          <h1 className="text-2xl font-bold">
            Vault One
          </h1>

          <button
            className="lg:hidden"
            onClick={() => setOpen(false)}
          >
            <X />
          </button>

        </div>

        {/* Menu */}

        <nav className="mt-6">

          {menu.map((item) => (

            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 px-6 py-4 hover:bg-yellow-700 transition
                ${
                  isActive
                    ? "bg-yellow-800"
                    : ""
                }`
              }
            >
              {item.icon}

              {item.name}

            </NavLink>

          ))}

          <button
            className="flex items-center gap-4 px-6 py-4 w-full hover:bg-red-600 mt-10"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            <LogOut size={20} />

            Logout

          </button>

        </nav>

      </aside>
    </>
  );
};

export default Sidebar;