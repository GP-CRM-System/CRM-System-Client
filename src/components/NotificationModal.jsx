import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NotificationModal = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState("inbox");
    
    // Mock notifications data - replace with real data from API
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            user: "Omar Nasser",
            avatar: "https://i.pravatar.cc/150?u=omar",
            action: "added a new Lead",
            target: "BlueSky Agency",
            time: "11 hours ago",
            isRead: false,
            isArchived: false
        },
        {
            id: 2,
            user: "Ali Khaled",
            avatar: "https://i.pravatar.cc/150?u=ali",
            action: "converted Lead",
            target: "Customer",
            time: "10 hours ago",
            isRead: false,
            isArchived: false
        },
        {
            id: 3,
            user: "Mona Adel",
            avatar: "https://i.pravatar.cc/150?u=mona",
            action: "created a new Customer",
            target: "",
            time: "9 hours ago",
            isRead: false,
            isArchived: false
        }
    ]);

    const filteredNotifications = notifications.filter(notif => {
        if (activeTab === "inbox") return !notif.isArchived && !notif.isRead;
        if (activeTab === "archived") return notif.isArchived;
        return true; // all
    });

    const unreadCount = notifications.filter(n => !n.isRead && !n.isArchived).length;

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    };

    const archiveRead = () => {
        setNotifications(notifications.map(n => 
            n.isRead ? { ...n, isArchived: true } : n
        ));
    };

    const markAsRead = (id) => {
        setNotifications(notifications.map(n => 
            n.id === id ? { ...n, isRead: true } : n
        ));
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/20 z-40"
            />

            {/* Modal */}
            <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="fixed top-20 right-6 w-full max-w-[420px] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-100"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                            {unreadCount > 0 && (
                                <span className="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                                    {unreadCount}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 mt-4">
                        {["inbox", "archived", "all"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
                                    activeTab === tab
                                        ? "bg-[#4A90E2] text-white shadow-sm"
                                        : "text-gray-600 hover:bg-gray-100"
                                }`}
                            >
                                {tab === "inbox" && `Inbox ${unreadCount > 0 ? `(${unreadCount})` : ""}`}
                                {tab === "archived" && "Archived"}
                                {tab === "all" && "All"}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                {activeTab === "inbox" && filteredNotifications.length > 0 && (
                    <div className="flex gap-2 px-6 py-3 bg-gray-50 border-b border-gray-100">
                        <button
                            onClick={markAllAsRead}
                            className="flex-1 text-xs font-medium text-gray-700 py-2 px-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Mark all as read
                        </button>
                        <button
                            onClick={archiveRead}
                            className="flex-1 text-xs font-medium text-gray-700 py-2 px-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Archive read
                        </button>
                    </div>
                )}

                {/* Notifications List */}
                <div className="max-h-[500px] overflow-y-auto">
                    {filteredNotifications.length === 0 ? (
                        <div className="py-16 text-center">
                            <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <p className="text-gray-500 font-medium">No notifications</p>
                            <p className="text-gray-400 text-sm mt-1">You're all caught up!</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {filteredNotifications.map((notif) => (
                                <motion.div
                                    key={notif.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2 }}
                                    onClick={() => !notif.isRead && markAsRead(notif.id)}
                                    className={`px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                                        !notif.isRead ? "bg-blue-50/30" : ""
                                    }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="relative flex-shrink-0">
                                            <img
                                                src={notif.avatar}
                                                alt={notif.user}
                                                className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                                            />
                                            {!notif.isRead && (
                                                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[#4A90E2] rounded-full border-2 border-white"></span>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-gray-900">
                                                <span className="font-semibold">{notif.user}</span>{" "}
                                                <span className="text-gray-600">{notif.action}</span>
                                                {notif.target && (
                                                    <>
                                                        {" – "}
                                                        <span className="font-medium text-gray-900">{notif.target}</span>
                                                    </>
                                                )}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        </>
    );
};

export default NotificationModal;
