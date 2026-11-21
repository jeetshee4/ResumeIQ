import {
  LayoutDashboard,
  FileText,
  History,
  Settings,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

import { NavLink } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      navigate("/login");
    }
  };

  const navItems = [

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard
    },
    {
      name: "Analyze Resume",
      path: "/analyze",
      icon: FileText
    },
    {
      name: "History",
      path: "/history",
      icon: History
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings
    }







  ]







  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6">
      <h1 className="text-2xl font-bold text-blue-600">
        ResumeIQ
      </h1>

      <nav className="mt-10 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (

            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `flex items-center gap-3 w-full rounded-lg px-4 py-3 transition ${isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
                }`
              }>
              <Icon size={20} />
              {item.name}

            </NavLink>




          );



        })}

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
        >
          Logout
        </button>


      </nav>
    </aside>
  );
}

export default Sidebar;