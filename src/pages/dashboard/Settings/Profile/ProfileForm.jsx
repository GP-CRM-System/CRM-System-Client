import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { API } from '../../../../api';
import useProfileStore from '../../../../store/profileStore';
import useAuthStore from '../../../../store/authStore';
import { toast } from 'react-hot-toast';
import { CiEdit } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import Loader from '../../../../components/ui/Loader';

const ProfileForm = () => {
    const { isEditing, setIsEditing } = useProfileStore();
    const { user: authUser, setCredentials } = useAuthStore();
    const queryClient = useQueryClient();

    const userId = authUser?._id || authUser?.id;

    // Fetch Profile Data
    const { data: profileData, isLoading } = useQuery({
        queryKey: ['profile', userId],
        queryFn: () => API.Profile.getProfile(userId),
        enabled: !!userId,
    });

    const user = profileData?.data?.profile || {};

    // Local state for form management
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        gender: '',
        bio: '',
        dateOfBirth: '',
        country: '',
        city: '',
    });

    // Sync state with fetched data
    useEffect(() => {
        if (profileData?.data?.profile) {
            const u = profileData.data.profile;
            setFormData(prev => ({
                ...prev,
                fullName: u.fullName || '',
                email: u.email || '',
                phone: u.phone || '',
                gender: u.gender || '',
                bio: u.bio || '',
                dateOfBirth: u.dateOfBirth ? new Date(u.dateOfBirth).toISOString().split('T')[0] : '',
                country: u.country || '',
                city: u.city || '',
            }));
        }
    }, [profileData]);

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Update Profile Mutation
    const updateProfileMutation = useMutation({
        mutationFn: (data) => API.Profile.updateProfile({ id: userId, data }),
        onSuccess: (response) => {
            queryClient.invalidateQueries(['profile']);
            
            // Update auth store with new user data
            if (response?.data?.profile) {
                setCredentials({
                    user: {
                        ...authUser,
                        ...response.data.profile
                    }
                });
            }
            
            setIsEditing(false);
            toast.success("Profile updated successfully");
        },
        onError: (error) => {
            console.error(error);
            const errorMessage = error?.response?.data?.error 
                || error?.response?.data?.message 
                || 'Failed to update profile';
            toast.error(errorMessage);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfileMutation.mutate(formData);
    };

    if (isLoading) {
        return (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex-1">
                <div className="flex items-center justify-center h-96">
                    <Loader fullScreen={false} size="lg" text="Loading Profile..." />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isEditing
                        ? 'bg-red-50 text-red-600 hover:bg-red-100'
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                        }`}
                >
                    {isEditing ? (
                        <>
                            <IoMdClose className="w-4 h-4" /> Cancel
                        </>
                    ) : (
                        <>
                            <CiEdit className="w-5 h-5" /> Edit
                        </>
                    )}
                </button>
            </div>

            {/* Profile Avatar Section */}
            <div className="flex items-center gap-6 mb-10">
                <div className="relative">
                    <img
                        src={`https://i.pravatar.cc/150?u=${user?._id || 'default'}`}
                        alt={user?.fullName || "User"}
                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-xl"
                    />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{user.fullName || 'User Name'}</h3>
                    <p className="text-sm font-medium text-gray-500">{user.role?.name || 'Manager'}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Personal Details */}
                <div className="mb-10">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">Personal Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-2">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-all font-medium text-gray-900"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-2">E-mail Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-all font-medium text-gray-900"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-2">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-all font-medium text-gray-900"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-2">Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-all font-medium text-gray-900"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-2">Bio</label>
                            <input
                                type="text"
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-all font-medium text-gray-900"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-2">Date of Birth</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-all font-medium text-gray-900"
                            />
                        </div>
                    </div>
                </div>

                {/* Address */}
                <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-2">Country</label>
                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-all font-medium text-gray-900"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-2">City/State</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-all font-medium text-gray-900"
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Action */}
                {isEditing && (
                    <div className="flex justify-end pt-6 border-t border-gray-50">
                        <button
                            type="submit"
                            disabled={updateProfileMutation.isLoading}
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg font-semibold disabled:opacity-50 transition-all"
                        >
                            {updateProfileMutation.isLoading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default ProfileForm;
