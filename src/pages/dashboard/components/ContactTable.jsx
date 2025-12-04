import React from 'react';

const ContactTable = ({ 
    contacts, 
    isLoading, 
    selected, 
    allSelected, 
    onSelectAll, 
    onSelectOne,
    formatDate 
}) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="text-gray-500 border-b border-gray-100">
                        <th className="py-4 w-10 text-center">
                            <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                checked={allSelected}
                                onChange={onSelectAll}
                            />
                        </th>
                        <th className="py-4 font-semibold text-left pl-4">Name</th>
                        <th className="py-4 font-semibold text-center">Stage</th>
                        <th className="py-4 font-semibold text-center hidden md:table-cell">E-mail</th>
                        <th className="py-4 font-semibold text-center hidden lg:table-cell">Phone</th>
                        <th className="py-4 font-semibold text-center hidden xl:table-cell">Job Title</th>
                        <th className="py-4 font-semibold text-center hidden sm:table-cell">Date</th>
                        <th className="py-4 w-10 text-center"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {isLoading ? (
                        <tr><td colSpan={8} className="p-8 text-center text-gray-400">Loading contacts...</td></tr>
                    ) : contacts.length === 0 ? (
                        <tr><td colSpan={8} className="p-8 text-center text-gray-400">No contacts found.</td></tr>
                    ) : (
                        contacts.map((contact, idx) => {
                            const currentStage = Array.isArray(contact.stage) && contact.stage.length > 0
                                ? contact.stage[contact.stage.length - 1]
                                : null;
                            const stageName = currentStage ? currentStage.name : '-';
                            const stageDate = currentStage ? currentStage.date : null;
                            
                            return (
                                <tr key={contact._id || idx} className="hover:bg-gray-50 group transition-colors">
                                    <td className="py-4 text-center">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            checked={selected.includes(contact._id)}
                                            onChange={() => onSelectOne(contact._id)}
                                        />
                                    </td>
                                    <td className="py-4 text-left pl-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                                                <img 
                                                    src={`https://i.pravatar.cc/150?u=${contact._id || idx}`} 
                                                    alt={contact.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }}
                                                />
                                                <div className="w-full h-full hidden items-center justify-center bg-blue-100 text-blue-600 text-xs font-bold">
                                                    {contact.name?.charAt(0) || 'U'}
                                                </div>
                                            </div>
                                            <span className="font-semibold text-gray-900">{contact.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 text-center">
                                        {stageName !== '-' && (
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                                stageName === 'Customer' 
                                                    ? 'bg-blue-50 text-blue-500' 
                                                    : 'bg-orange-50 text-orange-400'
                                            }`}>
                                                {stageName}
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-4 text-center hidden md:table-cell">{contact.email}</td>
                                    <td className="py-4 text-center hidden lg:table-cell">{contact.phone || '-'}</td>
                                    <td className="py-4 text-center hidden xl:table-cell">{contact.jobTitle || '-'}</td>
                                    <td className="py-4 font-bold text-sm text-center hidden sm:table-cell">
                                        {formatDate(stageDate || contact.createdAt)}
                                    </td>
                                    <td className="py-4 text-center">
                                        <button className="text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] p-1 rounded-full hover:bg-blue-50 transition-colors">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12" cy="8" r="2" fill="currentColor" />
                                                <circle cx="12" cy="12" r="2" fill="currentColor" />
                                                <circle cx="12" cy="16" r="2" fill="currentColor" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ContactTable;
