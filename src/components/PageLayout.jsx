import React from 'react';
import PermissionGuard from './guard/PermissionGuard';
import { search as searchIcon, filter , plus } from '../assets';

function PageLayout({ title, createText, onCreate, createPermission, onFilter, children }) {
    return (
        <div className="flex flex-col">
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                <h1 className="text-xl sm:text-2xl font-semibold text-[#1A1A1A] font-poppins">{title}</h1>
                <div className="flex flex-wrap gap-2 items-center sm:justify-end">
                    
                    <div className="relative flex-1 sm:flex-none w-full sm:w-56">
                        
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg 
                            bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <img src={searchIcon} alt="Search Icon" />
                        </span>

                    </div>
                    {onFilter && (
                        <button 
                            className="flex items-center gap-2 px-5 sm:px-4 
                            py-2 border border-gray-200 rounded-lg bg-white 
                            text-gray-500 hover:bg-gray-50 transition " 
                            type="button"
                            onClick={onFilter}
                        >
                            <img src={filter} alt="Filter Icon" />
                            <span className="hidden sm:inline">Filter</span>
                        </button>
                    )}
                    {createText && onCreate && (
                        <PermissionGuard permission={createPermission}>
                            <button
                                className="bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-600)] 
                                text-white font-semibold px-4 
                                sm:px-4 py-2 rounded-lg transition flex 
                                items-center gap-2  whitespace-nowrap"
                                onClick={onCreate}
                                type="button"
                            >
                                <img src={plus} alt="Plus Icon" />
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
