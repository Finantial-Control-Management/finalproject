import React from "react";
import "./Sidebar.css";
import {
  FaHome,
  FaBox,
  FaCog,
  FaSignOutAlt,
  FaTable,
  FaTruck,
  FaUsers,
  FaPaypal,
  FaAmbulance,
} from "react-icons/fa";
import { NavLink } from "react-router";
const Sidebar = () => {
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
    <aside className=" menu-area flex flex-col h-screen p-3 w-16 md:w-64">
      <div className="h-16 flex flex-items justify-center">
        <span className="hidden md:block text-xl font-bold">Inventory MS</span>
        <span className="md:hidden text-xl font-bold">IMS</span>
      </div>
      <nav className="menu">
        <ul className="space-y-2 p-2">
          {menuItems.map((item) => (
            <li
              key={item.name}
              //className="flex items-center p-2 text-red-900 rounded-lg hover:bg-gray-100"
            >
              <NavLink
                end={item.isParent}
                className={({ isActive }) =>
                  (isActive ? "bg-gray-700" : "") +
                  "flex items-center p-2 rounded-md hover:bg-gray-700 transition duration-200"
                }
                to={item.path}
              >
                <span>{item.icon}</span>
                <span className="ml-4 hidden md:block">{item.name}</span>
              </NavLink>
              {/* <span className="text-xl">{item.icon}</span>
              <a href={item.path} className="ml-3">
                {item.name}
              </a> */}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
