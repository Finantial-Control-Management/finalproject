import React, { useState } from "react";
import "./Sidebar.css";
import {
  FaHome,
  FaCog,
  FaSignOutAlt,
  FaTable,
  FaUsers,
  FaPaypal,
  FaAmbulance,
  FaBars,
} from "react-icons/fa";
import { NavLink } from "react-router";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin-dashboard",
      icon: <FaHome />,
      isParent: true,
    },
    {
      name: "Recebimentos",
      path: "/admin-dashboard/recebimentos",
      icon: <FaTable />,
      isParent: false,
    },
    {
      name: "Pagamentos",
      path: "/admin-dashboard/pagamentos",
      icon: <FaPaypal />,
      isParent: false,
    },
    {
      name: "Relatórios",
      path: "/admin-dashboard/relatorios",
      icon: <FaAmbulance />,
      isParent: false,
    },
    {
      name: "Categorias",
      path: "/admin-dashboard/categorias",
      icon: <FaTable />,
      isParent: false,
    },
    {
      name: "Users",
      path: "/admin-dashboard/users",
      icon: <FaUsers />,
      isParent: false,
    },
    {
      name: "Profile",
      path: "/admin-dashboard/profile",
      icon: <FaCog />,
      isParent: false,
    },
    {
      name: "Logout",
      path: "admin-dashboard-logout",
      icon: <FaSignOutAlt />,
      isParent: false,
    },
  ];

  return (
    <aside
      className={`menu-area flex flex-col h-screen p-3 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <div className="h-16 flex items-center justify-between px-3">
        <span className={`text-xl font-bold ${!isOpen && "hidden"}`}>
          Inventory MS
        </span>
        <button onClick={toggleSidebar} className="text-xl">
          <FaBars />
        </button>
      </div>
      <nav className="menu">
        <ul className="space-y-2 p-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                end={item.isParent}
                className={({ isActive }) =>
                  (isActive ? "bg-gray-700" : "") +
                  " flex items-center p-2 rounded-md hover:bg-gray-700 transition duration-200"
                }
                to={item.path}
              >
                <span>{item.icon}</span>
                <span className={`ml-4 ${!isOpen && "hidden"}`}>
                  {item.name}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
