import React, { useState, useEffect } from 'react';
import { MoreVertical, Eye, Pencil, Trash2 } from 'lucide-react';
import { edit, trash } from '../../../../assets';
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

            {/* Bulk Action Bar - Matching ContactTable style */}
            {selectedItems.length > 0 && (
                <div className="p-6 pb-0">
                    <div className="mb-4">
                        <div
                            className="flex items-center justify-between px-6 py-3 rounded-lg"
                            style={{
                                backgroundColor: '#E8F2FD'
                            }}
                        >
                            <span className="text-sm font-medium" style={{ color: '#4A5568' }}>
                                {selectedItems.length} {selectedItems.length === 1 ? 'item' : 'items'} selected
                            </span>
                            <button className="px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-red-700 hover:text-white transition-colors font-medium">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Table Area */}
            <div className="overflow-x-auto min-h-[400px]">
                <table className="w-full text-sm text-[var(--color-text-body)] border-collapse">
                    <thead className="bg-gray-50/50">
                        <tr className="border-y border-gray-100">
                            <th className="py-4 px-4 text-center w-12">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 font-medium cursor-pointer"
                                    checked={selectedItems.length === displayActivities.length && displayActivities.length > 0}
                                    onChange={toggleSelectAll}
                                />
                            </th>
                            <th className="py-4 px-4 text-left font-semibold text-[var(--color-text-body)] uppercase text-md tracking-wider whitespace-nowrap">Process</th>
                            <th className="py-4 px-4 text-center font-semibold text-[var(--color-text-body)] uppercase text-md tracking-wider whitespace-nowrap">Customer Name</th>
                            <th className="py-4 px-4 text-center font-semibold text-[var(--color-text-body)] uppercase text-md tracking-wider whitespace-nowrap hidden md:table-cell">E-mail</th>
                            <th className="py-4 px-4 text-center font-semibold text-[var(--color-text-body)] uppercase text-md tracking-wider whitespace-nowrap hidden lg:table-cell">Company</th>
                            <th className="py-4 px-4 text-center font-semibold text-[var(--color-text-body)] uppercase text-md tracking-wider whitespace-nowrap hidden sm:table-cell">Date</th>
                            <th className="py-4 px-4 text-center font-semibold text-[var(--color-text-body)] uppercase text-md tracking-wider whitespace-nowrap">Status</th>
                            <th className="py-4 px-4 text-center w-12"></th>
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
                                <td colSpan={8} className="py-12 text-center text-gray-500 font-medium">
                                    No recent activities found.
                                </td>
                            </tr>
                        ) : (
                            displayActivities.map((activity, index) => (
                                <tr 
                                    key={index} 
                                    className={`hover:bg-blue-50/30 transition-colors ${
                                        selectedItems.includes(index) ? "bg-blue-50/50" : ""
                                    }`}
                                >
                                    <td className="py-4 px-4 text-center w-12 align-middle">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 font-medium"
                                            checked={selectedItems.includes(index)}
                                            onChange={() => toggleSelect(index)}
                                        />
                                    </td>
                                    <td className="py-4 px-4 text-left whitespace-nowrap align-middle">
                                        <span className="font-medium text-[var(--color-text-title)]">
                                            {activity.process}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-center whitespace-nowrap align-middle">
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
                                    <td className="py-4 px-4 text-center whitespace-nowrap hidden md:table-cell font-medium text-[var(--color-text-title)] align-middle">
                                        {activity.email}
                                    </td>
                                    <td className="py-4 px-4 text-center whitespace-nowrap hidden lg:table-cell font-medium text-[var(--color-text-title)] align-middle">
                                        {activity.company}
                                    </td>
                                    <td className="py-4 px-4 text-center whitespace-nowrap hidden sm:table-cell font-medium text-[var(--color-text-title)] align-middle">
                                        {activity.date}
                                    </td>
                                    <td className="py-4 px-4 text-center whitespace-nowrap align-middle">
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[activity.status] || "bg-gray-100 text-gray-500"}`}>
                                            {activity.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-center relative align-middle">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenMenuId(openMenuId === index ? null : index);
                                            }}
                                            className="text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] p-1.5 rounded-full hover:bg-blue-50 transition-colors flex items-center justify-center"
                                        >
                                            <MoreVertical className="w-5 h-5" />
                                        </button>

                                        {openMenuId === index && (
                                            <div className={`absolute right-full mr-3 ${index >= displayActivities.length - 2 ? 'bottom-0' : 'top-1/2 -translate-y-1/2'} bg-white shadow-xl rounded-xl border border-gray-100 py-2 w-40 z-50`}>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        console.log('View profile:', activity);
                                                        // TODO: Navigate to profile or show details
                                                        setOpenMenuId(null);
                                                    }}
                                                    className="w-full px-4 py-2 text-left text-sm hover:bg-blue-50 text-gray-700 font-medium flex items-center gap-2 transition-colors"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    View Profile
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        console.log('Edit activity:', activity);
                                                        // TODO: Open edit modal or navigate to edit page
                                                        setOpenMenuId(null);
                                                    }}
                                                    className="w-full px-4 py-2 text-left text-sm hover:bg-blue-50 text-gray-700 font-medium flex items-center gap-2 transition-colors"
                                                >
                                                    <img src={edit} alt="Edit" />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (window.confirm(`Are you sure you want to delete this activity for ${activity.customerName}?`)) {
                                                            console.log('Delete activity:', activity);
                                                            // TODO: Call delete API and update state
                                                        }
                                                        setOpenMenuId(null);
                                                    }}
                                                    className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 text-red-600 font-medium flex items-center gap-2 transition-colors"
                                                >
                                                    <img src={trash} alt="Delete" />
                                                    Delete
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
