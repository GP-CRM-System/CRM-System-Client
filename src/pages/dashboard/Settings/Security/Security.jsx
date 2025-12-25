import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { CiRead, CiUnread } from "react-icons/ci";
import { API } from '../../../../api';
import useAuthStore from '../../../../store/authStore';

const Security = () => {
    const { user } = useAuthStore();
    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState({
        old: false,
        new: false,
        confirm: false
    });

    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const toggleShow = (field) => {
        setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const changePasswordMutation = useMutation({
        mutationFn: (data) => API.Auth.resetPassword(user?._id, data),
        onSuccess: () => {
            toast.success("Password changed successfully");
            setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || error.response?.data?.message || "Failed to change password");
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!passwords.oldPassword) {
            toast.error("Old password is required");
            return;
        }

        if (passwords.newPassword.length < 8) {
            toast.error("New password must be at least 8 characters long");
            return;
        }

        if (passwords.newPassword !== passwords.confirmPassword) {
            toast.error("New passwords do not match");
            return;
        }

        changePasswordMutation.mutate({
            oldPassword: passwords.oldPassword,
            newPassword: passwords.newPassword,
            confirmNewPassword: passwords.confirmPassword
        });
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-8">Change Password</h2>

            <form onSubmit={handleSubmit} className="max-w-3xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">Old Password</label>
                        <div className="relative">
                            <input
                                type={showPassword.old ? "text" : "password"}
                                name="oldPassword"
                                value={passwords.oldPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900"
                                placeholder="**********"
                            />
                            <button
                                type="button"
                                onClick={() => toggleShow('old')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword.old ? <CiRead className="w-5 h-5" /> : <CiUnread className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">New Password</label>
                        <div className="relative">
                            <input
                                type={showPassword.new ? "text" : "password"}
                                name="newPassword"
                                value={passwords.newPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900"
                                placeholder="**********"
                            />
                            <button
                                type="button"
                                onClick={() => toggleShow('new')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword.new ? <CiRead className="w-5 h-5" /> : <CiUnread className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-500 mb-2">Confirm Password</label>
                    <div className="relative">
                        <input
                            type={showPassword.confirm ? "text" : "password"}
                            name="confirmPassword"
                            value={passwords.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900"
                            placeholder="**********"
                        />
                        <button
                            type="button"
                            onClick={() => toggleShow('confirm')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword.confirm ? <CiRead className="w-5 h-5" /> : <CiUnread className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={changePasswordMutation.isPending}
                        className="bg-blue-600 text-white px-8 py-2.5 rounded-lg hover:bg-blue-700 shadow-sm font-medium transition-colors disabled:opacity-50"
                    >
                        {changePasswordMutation.isPending ? 'Saving...' : 'Save'}
                    </button>
                    <button
                        type="button"
                        onClick={() => setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' })}
                        className="bg-white text-red-500 border border-red-200 px-8 py-2.5 rounded-lg hover:bg-red-50 font-medium transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Security;
