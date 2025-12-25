import React from 'react';
import useProfileStore from '../../../../store/profileStore';
import { CiUser, CiLock, CiBadgeDollar, CiSettings } from "react-icons/ci";
import { HiOutlineUser } from "react-icons/hi";


const SettingsSidebar = () => {
    const { activeTab, setActiveTab } = useProfileStore();

    const menuItems = [
        {
            id: 'profile',
            label: 'My Profile',
            icon: <CiUser className="w-5 h-5" />
        },
        {
            id: 'security',
            label: 'Security Options',
            icon: <CiLock className="w-5 h-5" />
        },
        {
            id: 'role',
            label: 'Role',
            icon: <CiBadgeDollar className="w-5 h-5" />
        },
        {
            id: 'preferences',
            label: 'Preferences',
            icon: <CiSettings className="w-5 h-5" />
        }
    ];

    return (
        <div className="w-full lg:w-64 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit min-h-[500px]">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Settings</h2>
            <p className="text-sm text-gray-500 mb-8">You can Find all settings here</p>

            <div className="space-y-2">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium rounded-lg transition-all duration-200
                            ${activeTab === item.id
                                ? 'bg-blue-50 text-blue-600 shadow-sm'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                    >
                        <span className={`transition-colors duration-200 ${activeTab === item.id ? 'text-blue-600' : 'text-gray-400'}`}>
                            {item.icon}
                        </span>
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SettingsSidebar;
