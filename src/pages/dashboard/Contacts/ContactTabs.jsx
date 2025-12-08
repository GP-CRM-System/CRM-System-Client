import React from 'react';

const ContactTabs = ({ activeTab, onTabChange }) => {
    const tabs = ['All', 'Customers', 'Leads'];
    
    return (
        <div className="flex gap-4 sm:gap-8 px-2 mb-6 border-b-0 overflow-x-auto">
            {tabs.map(tab => (
                <button
                    key={tab}
                    type="button"
                    className={`pb-2 text-sm sm:text-base font-semibold transition-all relative whitespace-nowrap ${
                        activeTab === tab
                            ? 'text-[var(--color-primary-500)]'
                            : 'text-[var(--color-text-body)] hover:text-[var(--color-text-title)]'
                    }`}
                    onClick={() => onTabChange(tab)}
                >
                    {tab}
                    {activeTab === tab && (
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-primary-500)] rounded-full"></span>
                    )}
                </button>
            ))}
        </div>
    );
};

export default ContactTabs;
