import React, { useState, useEffect } from 'react';
import { dotsIcon } from '../../../../assets';
import Loader from '../../../../components/ui/Loader';

const RecentActivitiesTable = ({ activities = [], isLoading }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [openMenuId, setOpenMenuId] = useState(null);

    // Close menu on click outside
    useEffect(() => {
        const handleClickOutside = () => setOpenMenuId(null);
        if (openMenuId !== null) {
            document.addEventListener("click", handleClickOutside);
        }
        return () => document.removeEventListener("click", handleClickOutside);
    }, [openMenuId]);

    // Mock data if none provided
    const displayActivities = activities && activities.length > 0 ? activities : [
        { id: 1, process: "New Contact", customerName: "Sarah Ali", email: "sarahali44@gmail.com", company: "RetailMate", date: "Nov 8th, 2025", status: "Pending" },
        { id: 2, process: "New Contact", customerName: "Sarah Ali", email: "sarahali44@gmail.com", company: "RetailMate", date: "Nov 8th, 2025", status: "Cancelled" },
        { id: 3, process: "New Contact", customerName: "Sarah Ali", email: "sarahali44@gmail.com", company: "RetailMate", date: "Nov 8th, 2025", status: "Pending" },
        { id: 4, process: "New Contact", customerName: "Sarah Ali", email: "sarahali44@gmail.com", company: "RetailMate", date: "Nov 8th, 2025", status: "Pending" },
        { id: 5, process: "New Contact", customerName: "Sarah Ali", email: "sarahali44@gmail.com", company: "RetailMate", date: "Nov 8th, 2025", status: "Pending" },
        { id: 6, process: "New Contact", customerName: "Sarah Ali", email: "sarahali44@gmail.com", company: "RetailMate", date: "Nov 8th, 2025", status: "Cancelled" },
    ];

    const toggleSelectAll = () => {
        if (selectedItems.length === displayActivities.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(displayActivities.map((_, index) => index));
        }
    };

    const toggleSelect = (index) => {
        if (selectedItems.includes(index)) {
            setSelectedItems(selectedItems.filter(i => i !== index));
        } else {
            setSelectedItems([...selectedItems, index]);
        }
    };

    const statusStyles = {
        Pending: "bg-blue-50 text-blue-500",
        Cancelled: "bg-orange-50 text-orange-400",
        Completed: "bg-green-50 text-green-500"
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden pb-4">
            {/* Header */}
            <div className="p-6 flex items-center justify-between border-b border-[var(--color-border)]">
                <h3 className="text-lg font-bold text-[var(--color-text-title)]">Recent Activities</h3>
                <button className="text-[var(--color-primary-600)] text-sm font-semibold hover:underline">View all</button>
            </div>

            {/* Bulk Action Bar - Perfectly aligned as per user's last edit */}
            {selectedItems.length > 0 && (
                <div className="px-6 py-4">
                    <div
                        className="flex items-center justify-between px-4"
                        style={{
                            height: '64px',
                            background: 'rgba(108, 165, 231, 0.15)',
                            borderRadius: '8px'
                        }}
                    >
                        <div className="flex items-center">
                            <span className="text-gray-900 font-medium text-lg">
                                {selectedItems.length} {selectedItems.length === 1 ? 'item' : 'items'} selected
                            </span>
                        </div>

                        <div className="flex items-center">
                            <button className="bg-white text-red-500 px-10 py-2.5 rounded-xl text-sm font-bold border border-red-50 hover:bg-red-50 transition-colors shadow-sm">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Table Area */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-[var(--color-text-body)] border-b border-[var(--color-border)]">
                            <th className="py-4 w-10 text-center pl-6">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-gray-300 text-[var(--color-primary-500)] focus:ring-[var(--color-primary-500)] cursor-pointer"
                                    checked={selectedItems.length === displayActivities.length && displayActivities.length > 0}
                                    onChange={toggleSelectAll}
                                />
                            </th>
                            <th className="py-4 font-semibold text-left pl-4">Process</th>
                            <th className="py-4 font-semibold text-center">Customer Name</th>
                            <th className="py-4 font-semibold text-center hidden md:table-cell">E-mail</th>
                            <th className="py-4 font-semibold text-center hidden lg:table-cell">Company</th>
                            <th className="py-4 font-semibold text-center hidden sm:table-cell">Date</th>
                            <th className="py-4 font-semibold text-center">Status</th>
                            <th className="py-4 w-10 text-center pr-6"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {isLoading ? (
                            <tr>
                                <td colSpan={8} className="p-8">
                                    <Loader fullScreen={false} text="Refreshing activities..." />
                                </td>
                            </tr>
                        ) : displayActivities.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="p-8 text-center text-gray-400">
                                    No recent activities found.
                                </td>
                            </tr>
                        ) : (
                            displayActivities.map((activity, index) => (
                                <tr key={index} className="hover:bg-gray-50 group transition-colors border-b border-[var(--color-border)]">
                                    <td className="py-4 text-center pl-6 font-medium">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-gray-300 text-[var(--color-primary-500)] focus:ring-[var(--color-primary-500)] cursor-pointer"
                                            checked={selectedItems.includes(index)}
                                            onChange={() => toggleSelect(index)}
                                        />
                                    </td>
                                    <td className="py-4 text-left pl-4 whitespace-nowrap text-sm font-medium text-[var(--color-text-title)]">
                                        {activity.process}
                                    </td>
                                    <td className="py-4 whitespace-nowrap">
                                        <div className="flex items-center justify-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                                                <img
                                                    src={`https://i.pravatar.cc/150?u=${activity.id || index}`}
                                                    alt={activity.customerName}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.style.display = "none";
                                                        e.target.nextSibling.style.display = "flex";
                                                    }}
                                                />
                                                <div className="w-full h-full hidden items-center justify-center bg-blue-100 text-blue-600 text-xs font-medium">
                                                    {activity.customerName?.charAt(0) || "U"}
                                                </div>
                                            </div>
                                            <span className="font-medium text-[var(--color-text-title)]">{activity.customerName}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 text-center whitespace-nowrap text-sm font-medium text-[var(--color-text-title)] hidden md:table-cell">
                                        {activity.email}
                                    </td>
                                    <td className="py-4 text-center whitespace-nowrap text-sm font-medium text-[var(--color-text-title)] hidden lg:table-cell">
                                        {activity.company}
                                    </td>
                                    <td className="py-4 text-center whitespace-nowrap text-sm font-medium text-[var(--color-text-title)] hidden sm:table-cell">
                                        {activity.date}
                                    </td>
                                    <td className="py-4 text-center whitespace-nowrap">
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusStyles[activity.status] || "bg-gray-100 text-gray-500"}`}>
                                            {activity.status}
                                        </span>
                                    </td>
                                    <td className="py-4 text-center pr-6 text-[var(--color-text-title)] relative">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenMenuId(openMenuId === index ? null : index);
                                            }}
                                            className="text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] p-1 rounded-full hover:bg-blue-50 transition-colors"
                                        >
                                            <img src={dotsIcon} alt="options" />
                                        </button>

                                        {openMenuId === index && (
                                            <div className={`absolute right-full mr-3 ${index >= displayActivities.length - 2 ? 'bottom-0' : 'top-1/2 -translate-y-1/2'} bg-white shadow-xl rounded-xl border border-gray-100 py-2 w-36 z-50`}>
                                                <button
                                                    onClick={() => {
                                                        // Activity specific action or generic edit
                                                        setOpenMenuId(null);
                                                    }}
                                                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700 font-medium"
                                                >
                                                    View Details
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setOpenMenuId(null);
                                                    }}
                                                    className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 text-red-600 font-medium"
                                                >
                                                    Ignore
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentActivitiesTable;
