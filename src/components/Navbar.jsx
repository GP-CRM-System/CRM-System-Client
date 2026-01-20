import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { notification } from "../assets/icons/navbar";
import { logoSvg, symbolSvg } from "../assets";
import useAuthStore from "../store/authStore";
import NotificationModal from "./NotificationModal";

const Navbar = ({ isOpen, setIsOpen }) => {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const user = useAuthStore((state) => state.user);
    const userName = user?.fullName;
    const permissions = useAuthStore((state) => state.permissions);
    const roleName = permissions?.name || user?.role?.name;
    const refreshPermissions = useAuthStore((state) => state.refreshPermissions);

    // Auto-refresh permissions on mount and periodically
    useEffect(() => {
        if (!user?._id) return;

        // Refresh on component mount (page load/refresh)
        refreshPermissions(user._id);

        // Set up periodic refresh every 5 minutes
        const interval = setInterval(() => {
            refreshPermissions(user._id);
        }, 5 * 60 * 1000); // 5 minutes

        return () => clearInterval(interval);
    }, [user?._id, refreshPermissions]);

    return (
        <nav className="bg-white px-6 py-4 flex items-center justify-between gap-4 border-b border-gray-100">
            {/* Left section: Hamburger, Logo & Search */}
            <div className="flex items-center gap-4 lg:gap-8 flex-1">
                {/* Mobile Hamburger */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden p-1.5 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <Link to="/dashboard" className="flex-shrink-0">
                    <img src={logoSvg} className="hidden lg:block h-7 w-auto" alt="Logo" />
                    <img src={symbolSvg} className="lg:hidden h-8 w-auto" alt="Logo Symbol" />
                </Link>

                <div className="flex items-center gap-4 flex-1 max-w-xl">
                    <div className="relative group flex-1">
                        <svg
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-[var(--color-primary-500)]"
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
            </div>

            <div className="flex items-center gap-6">
                {/* Notification Bell */}
                <button
                    onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                    className="relative p-2 text-gray-400 border rounded-full border-gray-200 hover:text-gray-600 hover:bg-gray-50 transition-all"
                >
                    <div className="flex justify-center relative">
                        <img
                            src={notification}
                            className="w-6 h-6"
                            alt="notification"
                        />
                        {/* Notification Badge - small red dot */}
                        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                    </div>
                </button>

                {/* Notification Modal */}
                <AnimatePresence>
                    {isNotificationOpen && (
                        <NotificationModal
                            isOpen={isNotificationOpen}
                            onClose={() => setIsNotificationOpen(false)}
                        />
                    )}
                </AnimatePresence>

                {/* User Profile */}
                <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
                    <div className="relative">
                        <img
                            src={`https://i.pravatar.cc/150?u=${user?._id || 'default'}`}
                            alt={user?.fullName || "User"}
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100 shadow-sm"
                        />
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-[15px] font-semibold text-gray-900 leading-tight">
                            Hello, {userName || "user"}
                        </p>
                        <p className="text-[12px] font-medium text-gray-400 mt-0.5">
                            {roleName || "Manager"}
                        </p>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
