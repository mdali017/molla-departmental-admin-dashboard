import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  MdLogout,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowDown,
  MdNotificationsNone,
  MdOutlineNotes,
  MdMenu,
  MdClose,
  MdSearch,
} from "react-icons/md";
import {
  FiHome,
  FiGrid,
  FiList,
  FiUsers,
  FiPieChart,
  FiSettings,
} from "react-icons/fi";
import { RiCouponLine } from "react-icons/ri";

const Main = () => {
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebar_items = [
    {
      id: 1,
      title: "Dashboard",
      link: "/dashboard",
      icon: <FiHome size={20} />,
    },
    {
      id: 2,
      title: "Products",
      link: "/dashboard",
      icon: <FiGrid size={20} />,
      subItems: [
        { id: 21, title: "All Products", link: "/dashboard/products" },
        { id: 22, title: "Add New", link: "/dashboard/add-new-product" },
        { id: 23, title: "Categories", link: "/dashboard/category" },
        { id: 24, title: "Bulk Actions", link: "/dashboard/bulk-actions" },
      ],
    },
    {
      id: 3,
      title: "Orders",
      link: "",
      icon: <FiList size={20} />,
      subItems: [
        { id: 31, title: "Order List", link: "/all-orders" },
        { id: 32, title: "Processing", link: "/processing-order" },
        { id: 33, title: "Completed", link: "/completed-orders" },
        { id: 34, title: "Returns", link: "/returns-refunds" },
      ],
    },
    {
      id: 4,
      title: "Customers",
      link: "",
      icon: <FiUsers size={20} />,
      subItems: [
        { id: 41, title: "Customer List", link: "/customer-list" },
        { id: 42, title: "Segments", link: "/customer-segments" },
      ],
    },
    {
      id: 5,
      title: "Marketing",
      link: "",
      icon: <RiCouponLine size={20} />,
      subItems: [
        { id: 51, title: "Promotions", link: "/promotions" },
        { id: 52, title: "Coupons", link: "/coupons" },
      ],
    },
    {
      id: 6,
      title: "Reports",
      link: "/reports",
      icon: <FiPieChart size={20} />,
    },
    {
      id: 7,
      title: "Settings",
      link: "/settings",
      icon: <FiSettings size={20} />,
    },
  ];

  const handleToggleSubMenu = (id: number) => {
    setOpenSubMenu(openSubMenu === id ? null : id);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    setOpenSubMenu(null);
  };

  // Close mobile sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-gray-100 font-inter">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50 lg:z-0 
        ${isCollapsed ? "w-16" : "w-64"} 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        transition-all duration-300 ease-in-out
        bg-white border-r border-gray-200/60 shadow-xl lg:shadow-none
        backdrop-blur-md bg-white/95
      `}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200/60 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mr-3 shadow-lg">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            {!isCollapsed && (
              <span className="text-xl font-bold text-white tracking-tight">
                Molla
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleCollapse}
              className="hidden lg:flex p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            >
              <MdOutlineKeyboardArrowRight
                className={`text-white transform transition-transform ${
                  isCollapsed ? "rotate-180" : ""
                }`}
                size={18}
              />
            </button>
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            >
              <MdClose className="text-white" size={18} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {!isCollapsed && (
          <div className="p-4 border-b border-gray-200/60">
            <div className="relative">
              <MdSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search menu..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {sidebar_items.map((item, index) => (
            <div key={index} className="group">
              {item.subItems ? (
                <>
                  <button
                    onClick={() => !isCollapsed && handleToggleSubMenu(item.id)}
                    className={`flex items-center w-full px-3 py-3 text-sm rounded-xl transition-all duration-200 ${
                      openSubMenu === item.id
                        ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    } ${isCollapsed ? "justify-center" : ""}`}
                    title={isCollapsed ? item.title : ""}
                  >
                    <span
                      className={`${
                        !isCollapsed ? "mr-3" : ""
                      } transition-colors`}
                    >
                      {item.icon}
                    </span>
                    {!isCollapsed && (
                      <>
                        <span className="font-medium flex-1 text-left">
                          {item.title}
                        </span>
                        <span className="ml-auto transition-transform duration-200">
                          {openSubMenu === item.id ? (
                            <MdOutlineKeyboardArrowDown size={18} />
                          ) : (
                            <MdOutlineKeyboardArrowRight size={18} />
                          )}
                        </span>
                      </>
                    )}
                  </button>

                  {!isCollapsed && (
                    <div
                      className={`ml-6 pl-6 border-l-2 border-gray-100 space-y-1 overflow-hidden transition-all duration-300 ${
                        openSubMenu === item.id
                          ? "max-h-96 py-2 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      {item.subItems.map((subItem) => (
                        <NavLink
                          key={subItem.id}
                          to={subItem.link}
                          className={({ isActive }) =>
                            `block px-4 py-2.5 text-sm rounded-lg transition-all duration-200 relative ${
                              isActive
                                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md transform scale-105"
                                : "text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:text-gray-900"
                            }`
                          }
                        >
                          {subItem.title}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-3 text-sm rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg transform scale-105"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    } ${isCollapsed ? "justify-center" : ""}`
                  }
                  title={isCollapsed ? item.title : ""}
                >
                  <span
                    className={`${
                      !isCollapsed ? "mr-3" : ""
                    } transition-colors`}
                  >
                    {item.icon}
                  </span>
                  {!isCollapsed && (
                    <span className="font-medium">{item.title}</span>
                  )}
                </NavLink>
              )}
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200/60 bg-gradient-to-r from-gray-50 to-gray-100/50">
          <div
            className={`flex items-center ${
              isCollapsed ? "justify-center" : ""
            } p-3 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group`}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-md">
                <span className="text-white font-semibold text-sm">M</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            </div>

            {!isCollapsed && (
              <>
                <div className="flex-1 ml-3">
                  <p className="text-sm font-semibold text-gray-800">
                    Mohabbat
                  </p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <button className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1.5 rounded-lg hover:bg-red-50">
                  <MdLogout size={18} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/60 h-16 flex items-center px-4 md:px-6 shadow-sm">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="p-2 mr-3 rounded-xl hover:bg-gray-100 lg:hidden transition-colors duration-200"
              >
                <MdMenu className="h-6 w-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">
                  Welcome back, Mohabbat
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="p-2.5 rounded-xl hover:bg-gray-100 relative transition-all duration-200 hover:scale-105">
                <MdNotificationsNone size={22} className="text-gray-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">3</span>
                </span>
              </button>

              <button className="p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:scale-105">
                <MdOutlineNotes size={22} className="text-gray-600" />
              </button>

              <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                    <span className="text-white font-semibold text-sm">M</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-gray-800">
                    Mohabbat
                  </p>
                  <p className="text-xs text-gray-500">Online</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 to-gray-100 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Main;
