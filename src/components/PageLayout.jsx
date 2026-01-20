import React from 'react';
import { Link } from 'react-router-dom';
import PermissionGuard from './guard/PermissionGuard';
import { search as searchIcon, filter, plus, crumb } from '../assets';

function PageLayout({ title, createText, onCreate, createPermission, onFilter, breadcrumb, hideSearch, children }) {
    return (
        <div className="flex flex-col">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div>
                    {breadcrumb && breadcrumb.length > 0 && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            {breadcrumb.map((item, index) => (
                                <React.Fragment key={index}>
                                    {item.link ? (
                                        <Link to={item.link} className="hover:text-blue-600 transition-colors text-xs sm:text-sm font-medium text-gray-500 font-poppins">
                                            {item.text}
                                        </Link>
                                    ) : (
                                        <span className="font-medium text-gray-900 text-xs sm:text-sm font-poppins">{item.text}</span>
                                    )}
                                    {index < breadcrumb.length - 1 && <span><img src={crumb} alt="" /></span>}
                                </React.Fragment>
                            ))}
                        </div>
                    )}
                    {title && <h1 className="text-lg sm:text-xl font-semibold text-[#1A1A1A] font-poppins">{title}</h1>}
                </div>
                <div className="flex flex-wrap gap-2 items-center sm:justify-end">

                    {!hideSearch && (
                        <div className="relative flex-1 sm:flex-none w-full sm:w-56">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full pl-10 pr-4 py-1.5 border border-gray-200 rounded-lg 
                                bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm"
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <img src={searchIcon} alt="Search Icon" />
                            </span>
                        </div>
                    )}
                    {onFilter && (
                        <button
                            className="flex items-center gap-2 px-5 sm:px-4 
                            py-1.5 border border-gray-200 rounded-lg bg-white 
                            text-gray-500 hover:bg-gray-50 transition text-sm"
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
                                sm:px-4 py-1.5 rounded-lg transition flex 
                                items-center gap-2  whitespace-nowrap text-sm"
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
