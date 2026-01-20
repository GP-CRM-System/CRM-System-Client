import React, { useState, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import Loader from "../../../components/ui/Loader";

export default function CompanyTable({
  companies,
  isLoading,
  selected,
  allSelected,
  onSelectAll,
  onSelectOne,
  formatDate,
  contacts,
  onDelete,
  onEdit,
}) {
  const [openMenuId, setOpenMenuId] = useState(null);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    if (openMenuId) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [openMenuId]);

  const getContactName = (contactId) => {
    if (!contactId) return "-";
    const contact = contacts?.find((c) => c._id === contactId);
    return contact?.fullName || contact?.name || "-";
  };
  return (
    <div className="overflow-x-auto min-h-[400px]">
      {/* Bulk Action Bar - As requested */}
      {selected.length > 0 && (
        <div className="mb-4">
          <div
            className="flex items-center justify-between px-6 py-3 rounded-lg"
            style={{
              backgroundColor: '#E8F2FD'
            }}
          >
            <span className="text-sm font-medium" style={{ color: '#4A5568' }}>
              {selected.length} item selected
            </span>
            <button
              onClick={() => onDelete && onDelete(selected)}
              className="px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-red-700 hover:text-white transition-colors font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      )}
      <table className="w-full text-sm border-collapse">
        <thead className="bg-gray-50/50">
          <tr className="border-y border-gray-100">
            <th className="py-2.5 px-3 text-center w-10">
              <input
                type="checkbox"
                className="w-3.5 h-3.5 rounded border-gray-300 text-[var(--color-primary-500)] focus:ring-[var(--color-primary-500)]"
                checked={allSelected}
                onChange={onSelectAll}
              />
            </th>

            <th className="py-2.5 px-3 text-left font-semibold text-[var(--color-text-body)] uppercase text-[11px] tracking-wider whitespace-nowrap">
              Company Name
            </th>

            <th className="py-2.5 px-3 text-left font-semibold text-[var(--color-text-body)] uppercase text-[11px] tracking-wider whitespace-nowrap">
              Contact
            </th>

            <th className="py-2.5 px-3 text-center font-semibold text-[var(--color-text-body)] uppercase text-[11px] tracking-wider whitespace-nowrap hidden md:table-cell">
              E-mail
            </th>

            <th className="py-2.5 px-3 text-center font-semibold text-[var(--color-text-body)] uppercase text-[11px] tracking-wider whitespace-nowrap hidden lg:table-cell">
              Type
            </th>

            <th className="py-2.5 px-3 text-center font-semibold text-[var(--color-text-body)] uppercase text-[11px] tracking-wider whitespace-nowrap hidden sm:table-cell">
              Date
            </th>

            <th className="py-2.5 px-3 text-center w-10"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-50">
          {isLoading ? (
            <tr>
              <td colSpan={7} className="p-8">
                <Loader fullScreen={false} text="Loading companies..." />
              </td>
            </tr>
          ) : companies.length === 0 ? (
            <tr>
              <td colSpan={7} className="p-8 text-center text-gray-400">
                No companies found.
              </td>
            </tr>
          ) : (
            companies.map((company, itemIndex) => {
              return (
                <tr
                  key={company._id || itemIndex}
                  className="hover:bg-gray-50 group transition-colors border-b border-[var(--color-border)]"
                >
                  <td className="py-2.5 px-3 text-center w-10 align-middle">
                    <input
                      type="checkbox"
                      className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 font-medium"
                      checked={selected.includes(company._id)}
                      onChange={() => onSelectOne(company._id)}
                    />
                  </td>
                  <td className="py-2.5 px-3 text-left whitespace-nowrap align-middle">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                        <img
                          src={`https://i.pravatar.cc/150?u=${company._id || itemIndex
                            }`}
                          alt={company.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div className="w-full h-full hidden items-center justify-center bg-blue-100 text-blue-600 text-[10px] font-medium">
                          {company.name?.charAt(0) || "C"}
                        </div>
                      </div>
                      <span className="font-medium text-[var(--color-text-title)] text-xs">
                        {company.name}
                      </span>
                    </div>
                  </td>

                  <td className="py-2.5 px-3 text-left whitespace-nowrap align-middle">
                    {getContactName(company.contact) !== "-" ? (
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                          <img
                            src={
                              contacts?.find((c) => c._id === company.contact)
                                ?.avatar ||
                              `https://i.pravatar.cc/150?u=${company.contact}`
                            }
                            alt={getContactName(company.contact)}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                          <div className="w-full h-full hidden items-center justify-center bg-green-100 text-green-600 text-[10px] font-medium">
                            {getContactName(company.contact)?.charAt(0) || "C"}
                          </div>
                        </div>

                        <span className="font-medium text-[var(--color-text-title)] text-xs">
                          {getContactName(company.contact)}
                        </span>
                      </div>
                    ) : (
                      <span className="font-medium text-gray-400 text-xs">-</span>
                    )}
                  </td>

                  <td className="py-2.5 px-3 text-center whitespace-nowrap hidden md:table-cell font-medium text-[var(--color-text-title)] align-middle text-xs">
                    {company.email || "-"}
                  </td>

                  <td className="py-2.5 px-3 text-center whitespace-nowrap hidden lg:table-cell font-medium text-[var(--color-text-title)] align-middle text-xs">
                    {company.type || "N/A"}
                  </td>

                  <td className="py-2.5 px-3 text-center whitespace-nowrap hidden sm:table-cell font-medium text-[var(--color-text-title)] align-middle text-xs">
                    {formatDate(company.createdAt)}
                  </td>

                  <td className="py-2.5 px-3 text-center relative font-medium text-[var(--color-text-title)] align-middle">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === company._id ? null : company._id);
                      }}
                      className="text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] p-1 rounded-full hover:bg-blue-50 transition-colors flex items-center justify-center"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {openMenuId === company._id && (
                      <div className={`absolute right-full mr-3 ${itemIndex >= companies.length - 2 ? 'bottom-0' : 'top-1/2 -translate-y-1/2'} bg-white shadow-xl rounded-xl border border-gray-100 py-2 w-36 z-50`}>
                        <button
                          onClick={() => { onEdit(company); setOpenMenuId(null); }}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700 font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => { onDelete([company._id]); setOpenMenuId(null); }}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 text-red-600 font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
