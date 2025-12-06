import React from "react";
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
import PermissionGuard  from './guard/PermissionGuard';

const navItems = [
    { to: "/dashboard", label: "Home", icon: home, end: true },
    { to: "/dashboard/contact", label: "Contact", icon: contact, permission: [{ resource: "Contact", action: "read" }] },
    { to: "/dashboard/companies", label: "Companies", icon: companies, permission: [{ resource: "Company", action: "read" }] },
    { to: "/dashboard/deals", label: "Deals", icon: deals, permission: [{ resource: "Deal", action: "read" }] },
    { to: "/dashboard/tickets", label: "Tickets", icon: tickets, permission: [{ resource: "Ticket", action: "read" }] },
    { to: "/dashboard/order", label: "Order", icon: order, permission: [{ resource: "Order", action: "read" }] },
    { to: "/dashboard/employee", label: "Employee", icon: employee, permission: [{ resource: "Employee", action: "read" }] },
];

const Sidebar = ({ onLogout }) => {
    return (
        <aside className="flex h-screen w-64 flex-col bg-white p-6">
            <nav className="flex-1">
                <ul className="space-y-2">
                    {navItems.map((item) => {
                        const linkContent = (
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
                        );

                        // If item has permission requirement, wrap in PermissionGuard
                        if (item.permission) {
                            console.log(item.permission);
                            return (
                                <PermissionGuard permission={item.permission} any={item.any} key={item.to}>
                                    <li>{linkContent}</li>
                                </PermissionGuard>
                            );
                        }

                        // If no permission requirement, render directly (e.g., Home)
                        return <li key={item.to}>{linkContent}</li>;
                    })}
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