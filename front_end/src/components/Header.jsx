// src/components/Header.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Menu,
  Search,
  Bell,
  HelpCircle,
  Settings,
  LogOut,
  ChevronDown,
  User,
} from "lucide-react";

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.name) return "U";
    const names = user.name.split(" ");
    return names
      .map((name) => name[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header className="bg-gradient-to-r from-indigo-50 to-indigo-100 shadow-sm z-10 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left section - Logo and search */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="mr-4 p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none md:hidden"
            >
              <Menu size={24} />
            </button>

            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-8 h-8 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <h1 className="ml-3 text-xl font-bold text-gray-900 hidden sm:block">
                  Payments Dashboard
                </h1>
              </div>
            </div>

            <div className="hidden md:block ml-10">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Right section - User profile and actions */}
          <div className="flex items-center">
            <div className="hidden md:flex items-center space-x-4">
              <button className="p-1.5 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
              </button>

              <button className="p-1.5 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none">
                <HelpCircle size={20} />
              </button>

              <button className="p-1.5 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none">
                <Settings size={20} />
              </button>
            </div>

            {user && (
              <div className="ml-4 relative flex items-center">
                <div
                  className="flex-shrink-0 cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="flex items-center">
                    {user.avatar ? (
                      <img
                        className="h-8 w-8 rounded-full object-cover"
                        src={user.avatar}
                        alt={user.name}
                      />
                    ) : (
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-8 w-8 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {getUserInitials()}
                        </span>
                      </div>
                    )}
                    <div className="ml-3 hidden md:block">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-xs text-gray-500">{user.role}</div>
                    </div>
                    <ChevronDown
                      size={16}
                      className="ml-1 text-gray-500 hidden md:block"
                    />
                  </div>
                </div>

                {/* Profile dropdown */}
                {isDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-48 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="py-1" role="none">
                      <div className="px-4 py-2 border-b">
                        <p className="text-sm text-gray-900 font-medium">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <User size={16} className="mr-3 text-gray-500" />
                        <span>Your Profile</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Settings size={16} className="mr-3 text-gray-500" />
                        <span>Settings</span>
                      </a>
                      <button
                        onClick={logout}
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                      >
                        <LogOut size={16} className="mr-3 text-gray-500" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
