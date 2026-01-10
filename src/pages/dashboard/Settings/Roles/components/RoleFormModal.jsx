import React from 'react';
import { IoMdClose } from "react-icons/io";

const RoleFormModal = ({
    isOpen,
    onClose,
    onSave,
    roleData,
    setRoleData,
    resources,
    togglePermission,
    isPending
}) => {
    if (!isOpen) return null;

    const isEditMode = !!roleData?._id;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="text-lg font-bold text-gray-900">{isEditMode ? 'Edit Role' : 'Create New Role'}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <IoMdClose className="w-6 h-6" />
                    </button>
                </div>

                <div className="pl-6 pr-3 pb-6 pt-6">
                    <p className="text-sm text-gray-500 mb-6">Define role name and set permissions for each resource</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Role Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Sales Manager"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                value={roleData.name}
                                onChange={(e) => setRoleData({ ...roleData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <input
                                type="text"
                                placeholder="Brief Description of this Role"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                value={roleData.description}
                                onChange={(e) => setRoleData({ ...roleData, description: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="mb-8">
                        <h4 className="font-bold text-gray-900 mb-4">Permissions</h4>
                        <div className="space-y-4">
                            {/* Header Row */}
                            <div className="grid grid-cols-5 text-sm text-gray-500 border-b border-gray-100 pb-2">
                                <div className="col-span-1">Resource</div>
                                <div className="text-center">All</div>
                                <div className="text-center">Read</div>
                                <div className="text-center">Write</div>
                                <div className="text-center">Delete</div>
                            </div>

                            {resources.map((res) => (
                                <div key={res} className="grid grid-cols-5 items-center py-2 border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                    <div className="font-medium text-gray-700">{res}</div>
                                    <div className="text-center flex justify-center">
                                        <input
                                            type="checkbox"
                                            checked={roleData.permissions[res].all}
                                            onChange={() => togglePermission(res, 'all')}
                                            className="w-5 h-5 rounded border-gray-300 text-[var(--color-secondary-500)] focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="text-center flex justify-center">
                                        <input
                                            type="checkbox"
                                            checked={roleData.permissions[res].read}
                                            onChange={() => togglePermission(res, 'read')}
                                            className="w-5 h-5 rounded border-gray-300 text-[var(--color-secondary-500)] focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="text-center flex justify-center">
                                        <input
                                            type="checkbox"
                                            checked={roleData.permissions[res].write}
                                            onChange={() => togglePermission(res, 'write')}
                                            className="w-5 h-5 rounded border-gray-300 text-[var(--color-secondary-500)] focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="text-center flex justify-center">
                                        <input
                                            type="checkbox"
                                            checked={roleData.permissions[res].delete}
                                            onChange={() => togglePermission(res, 'delete')}
                                            className="w-5 h-5 rounded border-gray-300 text-[var(--color-secondary-500)] focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="sticky bottom-0 left-0 w-full bg-white border-t border-gray-100 z-20 flex justify-end gap-3 pt-4 pb-4 pl-6 pr-3">
                        <button
                            onClick={onSave}
                            disabled={isPending}
                            className="px-22 py-2.5 bg-[var(--color-secondary-500)] hover:bg-[var(--color-primary-600)] text-white rounded-lg font-medium shadow-sm transition-colors disabled:opacity-50 "
                        >
                            {isEditMode ? (isPending ? 'Saving...' : 'Save Changes') : 'Create'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleFormModal;
