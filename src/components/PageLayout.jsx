import React from 'react';
import PermissionGuard from './guard/PermissionGuard';

function PageLayout({ title, createText, onCreate, createPermission, children }) {
    return (
        <div className="p-2 flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h1>
                <div className="flex flex-wrap gap-2 items-center sm:justify-end">
                    <div className="relative flex-1 sm:flex-none w-full sm:w-64">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.5 6.5a7.5 7.5 0 0 0 10.6 10.6Z"/></svg>
                        </span>
                    </div>
                    <button className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition text-sm" type="button">
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h18"/></svg>
                        <span className="hidden sm:inline">Filter</span>
                    </button>
                    {createText && onCreate && (
                        <PermissionGuard permission={createPermission}>
                            <button
                                className="bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-600)] text-white font-semibold px-3 sm:px-4 py-2 rounded-lg transition flex items-center gap-2 text-sm whitespace-nowrap"
                                onClick={onCreate}
                                type="button"
                            >
                                <span className="text-lg">+</span> 
                                <span className="hidden sm:inline">{createText}</span>
                                <span className="sm:hidden">Create</span>
                            </button>
                        </PermissionGuard>
                    )}
                </div>
            </div>
            <div className="flex-1 min-h-0">
                {children}
            </div>
        </div>
    );
}

export default PageLayout;
