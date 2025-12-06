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
    logout,
    analytics
} from "../assets";
import PermissionGuard  from './guard/PermissionGuard';

const navItems = [
    { to: "/dashboard", label: "Home", icon: home, end: true },
    { to: "/dashboard/contact", label: "Contact", icon: contact, permission: "Contact.read" },
    { to: "/dashboard/companies", label: "Companies", icon: companies, permission: "Company.read" },
    { to: "/dashboard/deals", label: "Deals", icon: deals, permission: "Deal.read" },
    { to: "/dashboard/tickets", label: "Tickets", icon: tickets, permission: "Ticket.read" },
    { to: "/dashboard/order", label: "Order", icon: order, permission: "Order.read" },
    { to: "/dashboard/employee", label: "Employee", icon: employee, permission: "Employee.read" },
    {to: "/dashboard/analytics", label: "Analytics", icon: analytics }
];

const Sidebar = ({ onLogout, isOpen, setIsOpen }) => {
    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
            
            {/* Sidebar */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-30
                flex h-screen flex-col bg-white border-r border-gray-200
                transition-all duration-300 ease-in-out
                ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'}
                custom-scrollbar
            `}>
                <nav className="flex-1 p-4 overflow-y-auto custom-scrollbar">
                    {/* Toggle button - desktop only */}
                    <div className="hidden lg:flex items-center justify-end mb-2">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                            type="button"
                        >
                            <svg 
                                className="w-4 h-4 transition-transform duration-300" 
                                style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)' }}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    </div>

                    <ul className="space-y-2">
                        {navItems.map((item) => {
                            const linkContent = (
                                <NavLink
                                    to={item.to}
                                    end={item.end}
                                    onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
                                    className={({ isActive }) =>
                                        `flex items-center rounded-lg px-4 py-3 font-medium transition-colors group ${
                                            isActive
                                                ? 'bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-600)] text-white'
                                                : 'text-gray-600 hover:bg-gray-100'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <img
                                                src={item.icon}
                                                alt={`${item.label} icon`}
                                                className={`h-6 w-6 transition-all flex-shrink-0 ${
                                                    isActive ? 'filter-white' : ''
                                                }`}
                                                style={isActive ? { filter: 'brightness(0) invert(1)' } : {}}
                                            />
                                            <span className={`ml-4 transition-opacity duration-300 whitespace-nowrap ${
                                                isOpen ? 'opacity-100' : 'opacity-0 lg:hidden'
                                            }`}>
                                                {item.label}
                                            </span>
                                        </>
                                    )}
                                </NavLink>
                            );

                            if (item.permission) {
                                return (
                                    <PermissionGuard permission={item.permission} any={item.any} key={item.to}>
                                        <li>{linkContent}</li>
                                    </PermissionGuard>
                                );
                            }

                            return <li key={item.to}>{linkContent}</li>;
                        })}

                        {/* Spacer */}
                        <li className="pt-30"></li>

                        {/* Settings */}
                        <li>
                            <NavLink
                                to='/dashboard/settings'
                                onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center rounded-lg px-4 py-3 font-medium transition-colors group ${
                                        isActive
                                            ? 'bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-600)] text-white'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <img
                                            src={contact}
                                            alt="Settings icon"
                                            className={`h-6 w-6 transition-all flex-shrink-0 ${
                                                isActive ? 'filter-white' : ''
                                            }`}
                                            style={isActive ? { filter: 'brightness(0) invert(1)' } : {}}
                                        />
                                        <span className={`ml-4 transition-opacity duration-300 whitespace-nowrap ${
                                            isOpen ? 'opacity-100' : 'opacity-0 lg:hidden'
                                        }`}>
                                            Settings
                                        </span>
                                    </>
                                )}
                            </NavLink>
                        </li>

                        {/* Logout */}
                        <li>
                            <button
                                onClick={onLogout}
                                className="w-full flex items-center rounded-lg px-4 py-3 font-medium text-red-600 transition-colors hover:bg-red-50 group"
                            >
                                <img src={logout} alt="Logout icon" className="h-6 w-6 flex-shrink-0" />
                                <span className={`ml-4 transition-opacity duration-300 whitespace-nowrap ${
                                    isOpen ? 'opacity-100' : 'opacity-0 lg:hidden'
                                }`}>
                                    Logout
                                </span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                    background: #f3f4f6;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: var(--color-primary-500, #2563eb);
                    border-radius: 6px;
                }
                .custom-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: var(--color-primary-500, #2563eb) #f3f4f6;
                }
            `}</style>
        </>
    );
};

export default Sidebar;