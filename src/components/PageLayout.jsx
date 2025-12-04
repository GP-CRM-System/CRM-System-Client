import React from 'react';
import PermissionGuard from './guard/PermissionGuard';

function PageLayout({ title, createText, onCreate, createPermission, children }) {
    return (
        <div className="p-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                <div className="flex flex-1 gap-2 items-center md:justify-end">
                    <div className="relative w-full max-w-xs">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.5 6.5a7.5 7.5 0 0 0 10.6 10.6Z"/></svg>
                        </span>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition" type="button">
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h18"/></svg>
                        <span className="hidden sm:inline">Filter</span>
                    </button>
                    {createText && onCreate && (
                        createPermission ? (
                            <PermissionGuard permission={createPermission}>
                                <button
                                    className="ml-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition flex items-center gap-2"
                                    onClick={onCreate}
                                    type="button"
                                >
                                    <span className="text-lg">+</span> {createText}
                                </button>
                            </PermissionGuard>
                        ) : (
                            <button
                                className="ml-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition flex items-center gap-2"
                                onClick={onCreate}
                                type="button"
                            >
                                <span className="text-lg">+</span> {createText}
                            </button>
                        )
                    )}
                </div>
            </div>
            {children}
        </div>
    );
}

export default PageLayout;
