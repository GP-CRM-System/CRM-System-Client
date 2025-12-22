import React from "react";
import { notifications } from "../assets/icons/navbar";
import useAuthStore from "../store/authStore";

const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  const userName = user?.fullName;
  const permissions = useAuthStore((state) => state.permissions);
  const roleName = permissions?.name || user?.role?.name;
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 md:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5"
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
              className="w-[393px] max-sm:w-[300px] pl-9 md:pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Right Side: Notification & User */}
        <div className="flex items-center  gap-2 md:gap-4">
          {/* Notification Bell */}
          <button className="relative w-[46px] h-[48px] p-2 text-gray-500 hover:text-gray-700  hover:bg-gray-100 rounded-full transition-colors">
            <div className="flex justify-center">
              <img
                src={notifications}
                className="w-[24px] h-[24px]"
                alt="notifications"
              />
            </div>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2 md:gap-3 pl-2 md:pl-0">
            <img
              src={`https://i.pravatar.cc/150?u=${user?._id}`}
              alt={user?.fullName || "User"}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover
            border-2 border-gray-200"
            />
            <div className="hidden md:block">
              <p className="text-[16px] font-medium  text-gray-900">
                Hello, <span>{userName || "User"}</span>
              </p>
              <p className="font-medium mt-1 text-[#8A8A8A] text-[12px]">
                {roleName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
