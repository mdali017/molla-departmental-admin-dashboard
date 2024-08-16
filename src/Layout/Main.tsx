import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import {
  FaHome,
  FaHospitalUser,
  FaUserFriends,
  FaChevronUp,
} from "react-icons/fa";
import { AiOutlineAppstore } from "react-icons/ai";
import { TiThList } from "react-icons/ti";
import { TbReport } from "react-icons/tb";

const Main = () => {
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const sidebar_items = [
    { id: 1, title: "Home", link: "/", icon: <FaHome /> },
    {
      id: 2,
      title: "Products Management",
      link: "",
      icon: <AiOutlineAppstore />,
      subItems: [
        { id: 22, title: "All Products", link: "/all-products" },
        { id: 21, title: "Add New Product", link: "/add-product" },
        { id: 23, title: "Manage Categories", link: "/manage-categories" },
        { id: 24, title: "Bulk Actions", link: "/bulk-actions" },
      ],
    },
    {
      id: 3,
      title: "Order Management",
      link: "",
      icon: <TiThList />,
      subItems: [
        { id: 31, title: "Order List", link: "/order-list" },
        { id: 32, title: "Pending Order", link: "/pending-order" },
        { id: 33, title: "Completed Order", link: "/completed-order" },
        { id: 34, title: "Returns & Refunds", link: "/returns-refunds" },
      ],
    },
    {
      id: 4,
      title: "User Management",
      link: "",
      icon: <FaUserFriends />,
      subItems: [
        { id: 41, title: "User Roles", link: "/user-roles" },
        { id: 42, title: "Permissions", link: "/permissions" },
        { id: 43, title: "User Activity Logs", link: "/user-activity-logs" },
      ],
    },
    {
      id: 5,
      title: "Customer Management",
      link: "",
      icon: <FaHospitalUser />,
      subItems: [{ id: 51, title: "Customer List", link: "/customer-list" }],
    },
    { id: 6, title: "Reports", link: "/reports", icon: <TbReport /> },
  ];

  const handleToggleSubMenu = (id: any) => {
    setOpenSubMenu(openSubMenu === id ? null : id);
  };

  return (
    <div className="relative h-screen overflow-hidden bg-gray-100">
      <div className="flex items-start justify-between">
        {/* Sidebar */}
        <div className="hidden h-screen shadow-lg lg:block w-80 bg-gray-700">
          <div className="flex items-center justify-start pt-6 ml-8">
            <p className="text-md font-bold text-white">Molla Departmental</p>
          </div>
          <nav className="mt-6 h-[550px] flex flex-col justify-between">
            <div>
              {sidebar_items.map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() => handleToggleSubMenu(item.id)}
                    className="flex items-center w-full p-2 pl-6 my-2 text-white border-l-4 border-transparent"
                  >
                    <span>{item?.icon}</span>
                    <span className="mx-2 text-sm font-normal">
                      {item.title}
                    </span>
                    {item.subItems && (
                      <span className="ml-auto">
                        <FaChevronUp
                          className={`transition-transform duration-500 text-sm text-gray-400 ${
                            openSubMenu === item.id ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                    )}
                  </button>
                  {item.subItems && (
                    <div
                      className={`ml-6 transition-[max-height] duration-500 ease-in-out overflow-hidden ${
                        openSubMenu === item.id ? "max-h-48" : "max-h-0"
                      }`}
                    >
                      {item.subItems.map((subItem) => (
                        <NavLink
                          key={subItem.id}
                          to={subItem.link}
                          className={({ isActive }) =>
                            `flex items-center w-full p-2 pl-6 my-2 border-l-4 ${
                              isActive
                                ? "text-blue-500 bg-gray-600 border-blue-500"
                                : "text-gray-300 border-transparent"
                            }`
                          }
                        >
                          <span className="mx-2 text-sm font-normal">
                            {subItem.title}
                          </span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center p-2 pl-6 text-white">
              <MdLogout />
              <NavLink className="ml-2" to={"/"}>
                Logout
              </NavLink>
            </div>
          </nav>
        </div>
        {/* Main Content */}
        <div className="flex flex-col w-full">
          <header className="z-40 flex items-center justify-between w-full h-16 bg-slate-400">
            <button className="block ml-6 lg:hidden p-2 bg-white rounded-full shadow text-gray-500"></button>
            <div className="flex items-center justify-end w-full px-3 space-x-4">
              <button className="p-2 bg-white rounded-full shadow text-gray-400 hover:text-gray-700"></button>
              <button className="p-2 bg-white rounded-full shadow text-gray-400 hover:text-gray-700"></button>
              <span className="w-1 h-8 bg-gray-200 rounded-lg"></span>
              <a href="#" className="relative block">
                <img
                  alt="profile"
                  src="https://i.ibb.co/xMvD3KQ/Mohabbat.jpg"
                  className="mx-auto object-cover rounded-full h-10 w-10"
                />
              </a>
              <button className="flex items-center text-md">
                Mohabbat
                <svg
                  width="20"
                  height="20"
                  className="ml-2"
                  fill="currentColor"
                ></svg>
              </button>
            </div>
          </header>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;
