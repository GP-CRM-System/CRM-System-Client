import React from "react";
import { notifications } from "../assets/icons/navbar";
import useAuthStore from "../store/authStore";

const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  const userName = user?.fullName;
  const permissions = useAuthStore((state) => state.permissions);
  const roleName = permissions?.name || user?.role?.name;
  return (
    <nav className="bg-white px-6 py-4 flex items-center justify-between gap-4">
      {/* Left section: Search */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative group flex-1">
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-[[var(--color-primary-500)]]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search anything"
            className="w-full max-w-[420px] pl-12 pr-4 py-[10px] bg-gray-50 border border-transparent rounded-xl text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#4A90E2] transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Right Side: Notification & User */}
      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-all">
          <div className="flex justify-center relative">
            <img
              src={notifications}
              className="w-6 h-6"
              alt="notifications"
            />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </div>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
          <div className="text-right hidden sm:block">
            <p className="text-[15px] font-semibold text-gray-900 leading-tight">
              Hello, {userName || "Ahmed"}
            </p>
            <p className="text-[12px] font-medium text-gray-400 mt-0.5">
              {roleName || "Manager"}
            </p>
          </div>
          <div className="relative">
            <img
              src={`https://i.pravatar.cc/150?u=${user?._id || 'default'}`}
              alt={user?.fullName || "User"}
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-gray-100 shadow-sm"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
