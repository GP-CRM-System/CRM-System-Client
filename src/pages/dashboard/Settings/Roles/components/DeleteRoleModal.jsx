import React from 'react';
import { CiTrash } from "react-icons/ci";
import { trash } from '../../../../../assets'

const DeleteRoleModal = ({
    isOpen,
    onClose,
    onConfirm,
    roleName,
    userCount,
    isPending
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                <div className="p-6">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                        <img src={trash} className="w-6 h-6 text-red-600" alt="" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Delete Role</h3>
                    <p className="text-sm text-gray-500 text-center mb-4">
                        Are you sure you want to delete the role <span className="font-semibold text-gray-900">"{roleName}"</span>?
                    </p>
                    {userCount > 0 && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                            <p className="text-sm text-yellow-800">
                                <strong>Warning:</strong> This role is currently assigned to {userCount} user{userCount !== 1 ? 's' : ''}. Deleting it may affect their access.
                            </p>
                        </div>
                    )}
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={isPending}
                            className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors disabled:opacity-50"
                        >
                            {isPending ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteRoleModal;
