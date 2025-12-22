import { useState } from "react";
import { dotsIcon } from "../../../assets";

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
    <div className="overflow-x-auto">
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
              Deal Name
            </th>
            <th className="py-4 px-4 text-left align-middle font-semibold hidden lg:table-cell">
              Company
            </th>
            <th className="py-4 px-4 text-left align-middle font-semibold">
              Contact
            </th>
            <th className="py-4 px-4 text-center align-middle font-semibold hidden lg:table-cell">
              Owner
            </th>
            <th className="py-4 px-4 text-center align-middle font-semibold hidden sm:table-cell">
              Date
            </th>
            <th className="py-4 px-4 text-center align-middle font-semibold hidden sm:table-cell">
              Stage
            </th>
            <th className="py-4 px-4 text-center align-middle"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-50">
          {isLoading ? (
            <tr>
              <td colSpan={8} className="p-8 text-center text-gray-400">
                Loading deals...
              </td>
            </tr>
          ) : !deals || deals.length === 0 ? (
            <tr>
              <td colSpan={8} className="p-8 text-center text-gray-400">
                No deals found.
              </td>
            </tr>
          ) : (
            deals.map((deal, idx) => {
              const contact = getContact(deal.contact?._id);
              const owner = getOwner(deal.owner?._id);
              const company = getCompany(deal.company?._id);

              return (
                <tr
                  key={deal._id || idx}
                  className="hover:bg-gray-50 group transition-colors border-b border-[var(--color-border)]"
                >
                  <td className="py-4 px-4 text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selected.includes(deal._id)}
                      onChange={() => onSelectOne(deal._id)}
                    />
                  </td>

                  <td className="py-4 px-4 text-left font-medium text-(--color-text-title)">
                    {deal.name}
                  </td>

                  <td className="py-4 px-4 text-center hidden lg:table-cell">
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
                        <span className="font-medium text-(--color-text-title)">
                          {company.name}
                        </span>
                      </div>
                    ) : (
                      <span className="font-medium text-gray-400">-</span>
                    )}
                  </td>

                  <td className="py-4 px-4 text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                        <img
                          src={
                            contact?.avatar ||
                            `https://i.pravatar.cc/150?u=${contact?._id}`
                          }
                          alt={contact?.name || "-"}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div className="w-full h-full hidden items-center justify-center bg-green-100 text-green-600 text-xs font-medium">
                          {contact?.name?.charAt(0) || "C"}
                        </div>
                      </div>
                      <span className="font-medium text-(--color-text-title)">
                        {contact?.name || "-"}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-center hidden lg:table-cell font-medium text-(--color-text-title)">
                    {owner?.fullName || "-"}
                  </td>

                  <td className="py-4 px-4 font-medium text-sm text-center hidden sm:table-cell">
                    {formatDate(deal.createdAt)}
                  </td>

                  <td className="py-4 px-4 text-center hidden sm:table-cell">
                    {deal.stage && deal.stage.length > 0 ? (
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          deal.stage[
                            deal.stage.length - 1
                          ].name.toLowerCase() === "closed won"
                            ? "bg-blue-50 text-blue-500"
                            : deal.stage[
                                deal.stage.length - 1
                              ].name.toLowerCase() === "closed lost"
                            ? "bg-red-50 text-red-500"
                            : "bg-orange-50 text-orange-400"
                        }`}
                      >
                        {deal.stage[deal.stage.length - 1].name}
                      </span>
                    ) : (
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-500">
                        No Stage
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-4 text-center relative">
                    <button
                      className="text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] p-1 rounded-full hover:bg-blue-50 transition-colors"
                      onClick={() =>
                        setOpenMenuId(openMenuId === deal._id ? null : deal._id)
                      }
                    >
                      <img src={dotsIcon} alt="options" />
                    </button>

                    {openMenuId === deal._id && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setOpenMenuId(null)}
                        />

                        <div className="absolute right-8 top-12 z-20 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[120px] group-last:-top-32">
                          <button
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                            onClick={() => {
                              onEdit(deal);
                              setOpenMenuId(null);
                            }}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                            Edit
                          </button>
                          <button
                            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                            onClick={() => {
                              onDelete(deal._id);
                              setOpenMenuId(null);
                            }}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </>
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
