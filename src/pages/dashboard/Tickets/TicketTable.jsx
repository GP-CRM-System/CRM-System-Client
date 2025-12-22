import { useState } from "react";
import { dotsIcon } from "../../../assets";

export default function TicketTable({
  tickets,
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
}) {
  const [openMenuId, setOpenMenuId] = useState(null);

  const getOwner = (ownerId) => {
    if (!ownerId) return null;
    return employees?.find((e) => e._id === ownerId);
  };

  const getContact = (contactId) => {
    if (!contactId) return null;
    return contacts?.find((c) => c._id === contactId);
  };

  const getCurrentStatus = (statuses) => {
    if (!statuses || statuses.length === 0) return null;
    return statuses[statuses.length - 1];
  };

  const getPriorityColor = (priority) => {
    const colors = {
      Low: "bg-green-100 text-green-800",
      Medium: "bg-yellow-100 text-yellow-800",
      High: "bg-red-100 text-red-800",
    };
    return colors[priority] || "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (statusName) => {
    const colors = {
      New: "bg-blue-100 text-blue-800",
      "Waiting on Contact": "bg-orange-100 text-orange-800",
      "Waiting on Employee": "bg-purple-100 text-purple-800",
      Closed: "bg-gray-100 text-gray-800",
    };
    return colors[statusName] || "bg-gray-100 text-gray-800";
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
              Ticket Name
            </th>
            <th className="py-4 px-4 text-left align-middle font-semibold">
              Contact
            </th>
            <th className="py-4 px-4 text-center align-middle font-semibold hidden lg:table-cell">
              Owner
            </th>
            <th className="py-4 px-4 text-center align-middle font-semibold hidden sm:table-cell">
              Status
            </th>
            <th className="py-4 px-4 text-center align-middle font-semibold hidden sm:table-cell">
              Date
            </th>
            <th className="py-4 px-4 text-center align-middle font-semibold hidden lg:table-cell">
              Priority
            </th>

            <th className="py-4 px-4 text-center align-middle"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-50">
          {isLoading ? (
            <tr>
              <td colSpan={9} className="p-8 text-center text-gray-400">
                Loading tickets...
              </td>
            </tr>
          ) : !tickets || tickets.length === 0 ? (
            <tr>
              <td colSpan={9} className="p-8 text-center text-gray-400">
                No tickets found.
              </td>
            </tr>
          ) : (
            tickets.map((ticket, idx) => {
              const owner = getOwner(ticket.owner?._id);
              const contact = getContact(ticket.contact?._id);
              const currentStatus = getCurrentStatus(ticket.status);

              return (
                <tr
                  key={ticket._id || idx}
                  className="hover:bg-gray-50 group transition-colors border-b border-[var(--color-border)]"
                >
                  {/* Checkbox */}
                  <td className="py-4 px-4 text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selected.includes(ticket._id)}
                      onChange={() => onSelectOne(ticket._id)}
                    />
                  </td>

                  {/* Ticket Name */}
                  <td className="py-4 px-4 text-left">
                    <div className="font-medium text-(--color-text-title)">
                      {ticket.name}
                    </div>
                  </td>

                  {/* Contact */}
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

                  {/* Owner */}
                  <td className="py-4 px-4 text-center hidden lg:table-cell font-medium text-(--color-text-title)">
                    {owner?.fullName || "-"}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4 text-center hidden sm:table-cell">
                    {currentStatus ? (
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          currentStatus.statusType
                        )}`}
                      >
                        {currentStatus.statusType}
                      </span>
                    ) : (
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-500">
                        No Status
                      </span>
                    )}
                  </td>
                  {/* Date */}
                  <td className="py-4 px-4 font-medium text-sm text-center hidden sm:table-cell">
                    {formatDate(ticket.createdAt || ticket.status?.[0]?.date)}
                  </td>
                  {/* Priority */}
                  <td className="py-4 px-4 text-center hidden lg:table-cell">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                        ticket.priority
                      )}`}
                    >
                      {ticket.priority || "Medium"}
                    </span>
                  </td>
                  {/* Actions */}
                  <td className="py-4 px-4 text-center relative">
                    <button
                      className="text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] p-1 rounded-full hover:bg-blue-50 transition-colors"
                      onClick={() =>
                        setOpenMenuId(
                          openMenuId === ticket._id ? null : ticket._id
                        )
                      }
                    >
                      <img src={dotsIcon} alt="options" />
                    </button>

                    {openMenuId === ticket._id && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setOpenMenuId(null)}
                        />

                        <div className="absolute right-8 top-12 z-20 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[120px] group-last:-top-32">
                          <button
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                            onClick={() => {
                              onEdit(ticket);
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
                              onDelete(ticket._id);
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
