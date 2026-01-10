import React, { useState, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import Loader from "../../../components/ui/Loader";

export default function DealsTable({
  deals,
  isLoading,
  selected,
  allSelected,
  onSelectAll,
  onSelectOne,
  onEdit,
  formatDate,
  contacts,
  employees,
  onDelete,
  companies,
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

  const getContact = (contactId) => {
    if (!contactId) return null;
    return contacts?.find((c) => c._id === contactId);
  };

  const getOwner = (ownerId) => {
    if (!ownerId) return null;
    return employees?.find((e) => e._id === ownerId);
  };

  const getCompany = (companyId) => {
    if (!companyId) return null;
    return companies?.find((e) => e._id === companyId);
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
            <th className="py-4 px-4 text-center w-12">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-[var(--color-primary-500)] focus:ring-[var(--color-primary-500)]"
                checked={allSelected}
                onChange={onSelectAll}
              />
            </th>
            <th className="py-4 px-4 text-left font-semibold text-[var(--color-text-body)] uppercase text-md tracking-wider whitespace-nowrap">
              Deal Name
            </th>
            <th className="py-4 px-4 text-left font-semibold text-[var(--color-text-body)] uppercase text-md tracking-wider whitespace-nowrap hidden lg:table-cell">
              Company
            </th>
            <th className="py-4 px-4 text-left font-semibold text-[var(--color-text-body)] uppercase text-md tracking-wider whitespace-nowrap">
              Contact
            </th>
            <th className="py-4 px-4 text-left font-semibold text-[var(--color-text-body)] uppercase text-md tracking-wider whitespace-nowrap hidden lg:table-cell">
              Owner
            </th>
            <th className="py-4 px-4 text-center font-semibold text-[var(--color-text-body)] uppercase text-md tracking-wider whitespace-nowrap hidden sm:table-cell">
              Date
            </th>
            <th className="py-4 px-4 text-center font-bold text-gray-400 uppercase text-[11px] tracking-wider whitespace-nowrap hidden sm:table-cell">
              Stage
            </th>
            <th className="py-4 px-4 text-center w-12"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-50">
          {isLoading ? (
            <tr>
              <td colSpan={8} className="p-8">
                <Loader fullScreen={false} text="Loading deals..." />
              </td>
            </tr>
          ) : !deals || deals.length === 0 ? (
            <tr>
              <td colSpan={8} className="p-8 text-center text-gray-400">
                No deals found.
              </td>
            </tr>
          ) : (
            deals.map((deal, itemIndex) => {
              // Try to get from local lists, fallback to nested object if it exists
              const contact = getContact(deal.contact?._id) || (typeof deal.contact === 'object' ? deal.contact : null);
              const owner = getOwner(deal.owner?._id) || (typeof deal.owner === 'object' ? deal.owner : null);
              const company = getCompany(deal.company?._id) || (typeof deal.company === 'object' ? deal.company : null);

              return (
                <tr
                  key={deal._id || itemIndex}
                  className="hover:bg-gray-50 group transition-colors border-b border-[var(--color-border)]"
                >
                  <td className="py-4 px-4 text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 font-medium"
                      checked={selected.includes(deal._id)}
                      onChange={() => onSelectOne(deal._id)}
                    />
                  </td>

                  <td className="py-4 px-4 text-left whitespace-nowrap font-medium text-[var(--color-text-title)] align-middle">
                    {deal.name}
                  </td>

                  <td className="py-4 px-4 text-left whitespace-nowrap hidden lg:table-cell align-middle">
                    {company ? (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                          <img
                            src={
                              company.logo ||
                              company.avatar ||
                              `https://i.pravatar.cc/150?u=${company._id}`
                            }
                            alt={company.name || "-"}
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
                    ) : (
                      <span className="font-medium text-gray-400">-</span>
                    )}
                  </td>

                  <td className="py-4 px-4 text-left whitespace-nowrap align-middle">
                    {contact ? (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                          <img
                            src={contact.avatar || `https://i.pravatar.cc/150?u=${contact._id}`}
                            alt={contact.name || "-"}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                          <div className="w-full h-full hidden items-center justify-center bg-green-100 text-green-600 text-xs font-medium">
                            {contact.name?.charAt(0) || "U"}
                          </div>
                        </div>
                        <span className="font-medium text-[var(--color-text-title)]">
                          {contact.name}
                        </span>
                      </div>
                    ) : (
                      <span className="font-medium text-gray-400">-</span>
                    )}
                  </td>

                  <td className="py-4 px-4 text-left whitespace-nowrap hidden lg:table-cell font-medium text-[var(--color-text-title)] align-middle">
                    {owner?.fullName || owner?.name || "-"}
                  </td>

                  <td className="py-4 px-4 text-center whitespace-nowrap hidden sm:table-cell font-medium text-[var(--color-text-title)] align-middle">
                    {formatDate(deal.createdAt)}
                  </td>

                  <td className="py-4 px-4 text-center hidden sm:table-cell align-middle">
                    <span className="font-semibold px-3 py-1 bg-blue-50 text-blue-500 rounded-full text-xs uppercase tracking-wider whitespace-nowrap">
                      {Array.isArray(deal.stage) && deal.stage.length > 0
                        ? (deal.stage[deal.stage.length - 1].name || "New")
                        : (typeof deal.stage === 'object' ? (deal.stage?.name || deal.stage?.stageType || "New") : (deal.stage || "New"))}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-center relative font-medium text-[var(--color-text-title)] align-middle">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === deal._id ? null : deal._id);
                      }}
                      className="text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] p-1.5 rounded-full hover:bg-blue-50 transition-colors flex items-center justify-center"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {openMenuId === deal._id && (
                      <div className={`absolute right-full mr-3 ${itemIndex >= deals.length - 2 ? 'bottom-0' : 'top-1/2 -translate-y-1/2'} bg-white shadow-xl rounded-xl border border-gray-100 py-2 w-36 z-50`}>
                        <button
                          onClick={() => { onEdit(deal); setOpenMenuId(null); }}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700 font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => { onDelete([deal._id]); setOpenMenuId(null); }}
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
    </div >
  );
}
