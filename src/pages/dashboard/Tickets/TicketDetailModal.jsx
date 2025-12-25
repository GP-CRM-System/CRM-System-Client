import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { formatDate } from '../../../utils/formatDate';

const TicketDetailModal = ({ ticket, isOpen, onClose, employee, contact }) => {
    if (!isOpen || !ticket) return null;

    const currentStatus = ticket.status?.[ticket.status.length - 1];
    const contactName = ticket.contact?.name || contact?.name || 'N/A';
    const employeeName = employee?.fullName || employee?.name || ticket.owner?.fullName || 'N/A';

    const getPriorityColor = (priority) => {
        const colors = {
            Low: "bg-green-100 text-green-800",
            Medium: "bg-yellow-100 text-yellow-800",
            High: "bg-red-100 text-red-800",
            Critical: "bg-orange-100 text-orange-800"
        };
        return colors[priority] || "bg-gray-100 text-gray-800";
    };

    const getStatusColor = (statusName) => {
        const colors = {
            New: "bg-blue-100 text-blue-800",
            "Waiting on Contact": "bg-orange-100 text-orange-800",
            "Waiting on Employee": "bg-purple-100 text-purple-800",
            Closed: "bg-gray-100 text-gray-800",
            Resolved: "bg-green-100 text-green-800",
            "In Progress": "bg-yellow-100 text-yellow-800"
        };
        return colors[statusName] || "bg-gray-100 text-gray-800";
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Ticket Details</h2>
                        <p className="text-sm text-gray-500 font-medium">Ticket ID: {ticket._id}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                    >
                        <IoMdClose size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Status</span>
                            <div className="mt-1">
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(currentStatus?.statusType || currentStatus?.name)}`}>
                                    {currentStatus?.statusType || currentStatus?.name || 'New'}
                                </span>
                            </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-red-50/50 border border-red-100">
                            <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Priority</span>
                            <div className="mt-1">
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getPriorityColor(ticket.priority)}`}>
                                    {ticket.priority || 'Medium'}
                                </span>
                            </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-green-50/50 border border-green-100">
                            <span className="text-xs font-bold text-green-400 uppercase tracking-wider">Category</span>
                            <div className="mt-1">
                                <span className="text-sm font-bold text-green-600">
                                    {ticket.category || 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* People Information */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Contact</h3>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold overflow-hidden">
                                    {ticket.contact?.avatar || contact?.avatar ? (
                                        <img src={ticket.contact?.avatar || contact?.avatar} alt={contactName} className="w-full h-full object-cover" />
                                    ) : (
                                        contactName.charAt(0)
                                    )}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">{contactName}</p>
                                    <p className="text-xs text-gray-500 font-medium">{ticket.contact?._id || contact?._id || 'ID N/A'}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Assigned Owner</h3>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold overflow-hidden">
                                    {ticket.owner?.avatar || employee?.avatar ? (
                                        <img src={ticket.owner?.avatar || employee?.avatar} alt={employeeName} className="w-full h-full object-cover" />
                                    ) : (
                                        employeeName.charAt(0)
                                    )}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">{employeeName}</p>
                                    <p className="text-xs text-gray-500 font-medium">{ticket.owner?.email || employee?.email || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Subject</h3>
                            <p className="text-lg font-bold text-gray-900">
                                {ticket.name}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Description</h3>
                            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                <p className="text-sm text-gray-700 leading-relaxed font-medium">
                                    {ticket.description || 'No description provided.'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-gray-100">
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Source</span>
                            <p className="text-sm font-bold text-gray-700 mt-1">{ticket.source || 'Email'}</p>
                        </div>
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Created At</span>
                            <p className="text-sm font-bold text-gray-700 mt-1">{formatDate(ticket.createdAt)}</p>
                        </div>
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Resolution Status</span>
                            <p className="text-sm font-bold text-gray-700 mt-1">{ticket.resolutionStatus || 'Pending'}</p>
                        </div>
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">First Response Due</span>
                            <p className="text-sm font-bold text-gray-700 mt-1">{ticket.firstResponseDueDate ? formatDate(ticket.firstResponseDueDate) : 'N/A'}</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TicketDetailModal;
