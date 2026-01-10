import React from 'react';
import { NavLink } from 'react-router-dom';
import { CiUser, CiLock, CiBadgeDollar, CiSettings } from "react-icons/ci";
import PermissionGuard from '../../../../components/guard/PermissionGuard';

const SettingsSidebar = () => {
    const menuItems = [
        {
            id: 'my-profile',
            label: 'My Profile',
            icon: <CiUser className="w-5 h-5" />,
            path: '/dashboard/settings/my-profile'
        },
        {
            id: 'change-password',
            label: 'Security Options',
            icon: <CiLock className="w-5 h-5" />,
            path: '/dashboard/settings/change-password'
        },
        {
            id: 'roles',
            label: 'Role',
            icon: <CiBadgeDollar className="w-5 h-5" />,
            path: '/dashboard/settings/roles',
            permission: 'Role.read'
        },
        {
            id: 'preferences',
            label: 'Preferences',
            icon: <CiSettings className="w-5 h-5" />,
            path: '/dashboard/settings/preferences'
        }
    ];

    return (
        <div className="w-full lg:w-64 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit min-h-[500px]">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Settings</h2>
            <p className="text-sm text-gray-500 mb-8">You can Find all settings here</p>

            <div className="space-y-2">
                {menuItems.map((item) => {
                    const linkContent = (
                        <NavLink
                            key={item.id}
                            to={item.path}
                            className={({ isActive }) =>
                                `w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                                    isActive
                                        ? 'bg-blue-50 text-blue-600 shadow-sm'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <span className={`transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                                        {item.icon}
                                    </span>
                                    {item.label}
                                </>
                            )}
                        </NavLink>
                    );

                    if (item.permission) {
                        return (
                            <PermissionGuard key={item.id} permission={item.permission}>
                                {linkContent}
                            </PermissionGuard>
                        );
                    }

                    return linkContent;
                })}
            </div>
        </div>
    );
};

export default SettingsSidebar;
