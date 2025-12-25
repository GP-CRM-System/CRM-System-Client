import React from 'react';
import { IoMdClose } from "react-icons/io";
import { edit } from '../../../../../assets';

const ViewRoleModal = ({
    isOpen,
    onClose,
    roleData,
    resources,
    onEdit
}) => {
    if (!isOpen || !roleData) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">{roleData.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">Full details and permissions for this role</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <IoMdClose className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6">
                    {roleData.description && (
                        <div className="mb-8">
                            <h4 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wider">Description</h4>
                            <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-100 italic">
                                "{roleData.description}"
                            </p>
                        </div>
                    )}

                    <div className="mb-8">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Permissions Matrix</h4>
                        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                            <div className="grid grid-cols-4 text-xs font-bold text-gray-400 bg-gray-50/50 py-3 px-4 border-b border-gray-100 uppercase tracking-widest">
                                <div className="col-span-1">Resource</div>
                                <div className="text-center">Read</div>
                                <div className="text-center">Write</div>
                                <div className="text-center">Delete</div>
                            </div>

                            <div className="divide-y divide-gray-50">
                                {resources.map((res) => {
                                    const perms = roleData.permissions?.[res] || { read: false, write: false, delete: false };
                                    const hasAny = perms.read || perms.write || perms.delete;

                                    return (
                                        <div key={res} className={`grid grid-cols-4 items-center py-3 px-4 transition-colors ${hasAny ? 'bg-white' : 'bg-gray-50/30'}`}>
                                            <div className={`text-sm font-medium ${hasAny ? 'text-gray-900' : 'text-gray-400'}`}>{res}</div>
                                            <div className="text-center flex justify-center">
                                                <div className={`w-2.5 h-2.5 rounded-full ${perms.read ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-gray-200'}`}></div>
                                            </div>
                                            <div className="text-center flex justify-center">
                                                <div className={`w-2.5 h-2.5 rounded-full ${perms.write ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-gray-200'}`}></div>
                                            </div>
                                            <div className="text-center flex justify-center">
                                                <div className={`w-2.5 h-2.5 rounded-full ${perms.delete ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-gray-200'}`}></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <div className="flex gap-4 items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                                <span className="text-[10px] text-gray-500 font-medium">Read</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                                <span className="text-[10px] text-gray-500 font-medium">Write</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                                <span className="text-[10px] text-gray-500 font-medium">Delete</span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                className="px-6 py-2.5 text-gray-500 hover:bg-gray-50 rounded-lg font-medium transition-colors border border-transparent hover:border-gray-200"
                            >
                                Close
                            </button>
                            <button
                                onClick={onEdit}
                                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm transition-colors flex items-center gap-2"
                            >
                                <img src={edit} className="w-4 h-4 brightness-0 invert" alt="" />
                                Edit Role
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewRoleModal;
