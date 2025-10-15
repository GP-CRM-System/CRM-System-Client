import React from "react";
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import {
    home,
    contact,
    companies,
    deals,
    tickets,
    order,
    employee,
    logout
} from "../assets";

const navItems = [
    // Only show to users with the permission ==> add -> permission: 'order:view'
    { to: "/dashboard", label: "Home", icon: home, end: true },
    { to: "/dashboard/contact", label: "Contact", icon: contact },
    { to: "/dashboard/companies", label: "Companies", icon: companies },
    { to: "/dashboard/deals", label: "Deals", icon: deals },
    { to: "/dashboard/tickets", label: "Tickets", icon: tickets },
    { to: "/dashboard/order", label: "Order", icon: order },
    { to: "/dashboard/employee", label: "Employee", icon: employee },
];

const Sidebar = ({ onLogout }) => {
    const { permissions = [] } = useSelector(state => state.auth || {});

    // helper to determine if nav item should be visible
    const hasPermission = (required, any = false) => {
        if (!required) return true; // no permission required
        let req = [];
        if (Array.isArray(required)) req = required.map(r => String(r).trim()).filter(Boolean);
        else if (typeof required === 'string') req = required.split(',').map(r => r.trim()).filter(Boolean);
        else req = [String(required)];

        if (req.length === 0) return true;
        return any ? req.some(r => permissions.includes(r)) : req.every(r => permissions.includes(r));
    };

    return (
        <aside className="flex h-screen w-64 flex-col bg-white p-6">
            <nav className="flex-1">
                <ul className="space-y-2">
                    {navItems.filter(item => hasPermission(item.permission, item.any)).map((item) => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                end={item.end}
                                className={({ isActive }) =>
                                    `flex items-center rounded-lg px-4 py-3 font-medium transition-colors ${
                                        isActive
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-500 hover:bg-gray-100'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <img
                                            src={item.icon}
                                            alt={`${item.label} icon`}
                                            className={`mr-4 h-6 w-6 transition-all ${isActive ? 'filter-white' : ''}`}
                                            style={isActive ? { filter: 'brightness(0) invert(1)' } : {}}
                                        />
                                        <span className="ml-1">{item.label}</span>
                                    </>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <button
                onClick={onLogout}
                className="mt-auto flex items-center rounded-lg px-4 py-3 font-medium text-(--color-error) transition-colors hover:bg-red-50"
            >
                <img src={logout} alt="Logout icon" className="mr-4 h-6 w-6" />
                    Logout
            </button>
        </aside>
    );
};

export default Sidebar;