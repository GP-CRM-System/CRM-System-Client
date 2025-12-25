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
        <div className="px-6 py-4">
          <div
            className="flex items-center justify-between px-6"
            style={{
              height: '64px',
              background: 'rgba(108, 165, 231, 0.15)',
              borderRadius: '8px'
            }}
          >
            <div className="flex items-center">
              <span className="text-gray-900 font-medium text-lg">
                {selected.length} {selected.length === 1 ? 'item' : 'items'} selected
              </span>
            </div>

            <div className="flex items-center">
              <button
                onClick={() => onDelete && onDelete(selected)}
                className="bg-white text-red-500 px-10 py-2.5 rounded-xl text-sm font-bold border border-red-50 hover:bg-red-50 transition-colors shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[var(--color-text-body)] border-b border-[var(--color-border)]">
            <th className="py-4 px-4 text-center align-middle font-semibold">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-[var(--color-primary-500)] focus:ring-[var(--color-primary-500)]"
                checked={allSelected}
                onChange={onSelectAll}
              />
            </th>

            <th className="py-4 pl-2 pr-4 text-left align-middle font-semibold">
              Company Name
            </th>

            <th className="py-4 px-4 text-left align-middle font-semibold">
              Contact
            </th>

            <th className="py-4 px-4 text-left align-middle font-semibold hidden md:table-cell">
              E-mail
            </th>

            <th className="py-4 px-4 text-center align-middle font-semibold hidden lg:table-cell">
              Type
            </th>

            <th className="py-4 px-4 text-center align-middle font-semibold hidden sm:table-cell">
              Date
            </th>

            <th className="py-4 px-4 text-center align-middle"></th>
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
                  <td className="py-4 px-4 text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 font-medium"
                      checked={selected.includes(company._id)}
                      onChange={() => onSelectOne(company._id)}
                    />
                  </td>
                  <td className="py-4 px-4 text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
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
                        <div className="w-full h-full hidden items-center justify-center bg-blue-100 text-blue-600 text-xs font-medium">
                          {company.name?.charAt(0) || "C"}
                        </div>
                      </div>
                      <span className="font-medium text-[var(--color-text-title)]">
                        {company.name}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-left">
                    {getContactName(company.contact) !== "-" ? (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
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
                          <div className="w-full h-full hidden items-center justify-center bg-green-100 text-green-600 text-xs font-medium">
                            {getContactName(company.contact)?.charAt(0) || "C"}
                          </div>
                        </div>

                        <span className="font-medium text-[var(--color-text-title)]">
                          {getContactName(company.contact)}
                        </span>
                      </div>
                    ) : (
                      <span className="font-medium text-gray-400">-</span>
                    )}
                  </td>

                  <td className="py-4 px-4 text-left hidden md:table-cell font-medium text-[var(--color-text-title)]">
                    {company.email || "-"}
                  </td>

                  <td className="py-4 px-4 text-center hidden lg:table-cell">
                    {/* <span className="font-medium px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-xs"> */}
                    {company.type || "N/A"}
                    {/* </span> */}
                  </td>

                  <td className="py-4 px-4 text-center hidden sm:table-cell font-medium text-[var(--color-text-title)]">
                    {formatDate(company.createdAt)}
                  </td>

                  <td className="py-4 px-4 text-center relative font-medium text-[var(--color-text-title)]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === company._id ? null : company._id);
                      }}
                      className="text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] p-1.5 rounded-full hover:bg-blue-50 transition-colors flex items-center justify-center"
                    >
                      <MoreVertical className="w-5 h-5" />
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
