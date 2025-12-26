import React, { useState, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import Loader from "../../../components/ui/Loader";

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
  onView,
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

  const getOwner = (ownerId) => {
    if (!ownerId) return null;
    const id = typeof ownerId === 'object' ? ownerId._id : ownerId;
    return employees?.find((e) => e._id === id);
  };

  const getContact = (contactId) => {
    if (!contactId) return null;
    const id = typeof contactId === 'object' ? contactId._id : contactId;
    return contacts?.find((c) => c._id === id);
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
            <th className="py-4 px-4 text-left font-bold text-gray-400 uppercase text-[11px] tracking-wider whitespace-nowrap">
              Ticket Name
            </th>
            <th className="py-4 px-4 text-left font-bold text-gray-400 uppercase text-[11px] tracking-wider whitespace-nowrap">
              Contact
            </th>
            <th className="py-4 px-4 text-left font-bold text-gray-400 uppercase text-[11px] tracking-wider whitespace-nowrap hidden lg:table-cell">
              Owner
            </th>
            <th className="py-4 px-4 text-center font-bold text-gray-400 uppercase text-[11px] tracking-wider whitespace-nowrap hidden sm:table-cell">
              Status
            </th>
            <th className="py-4 px-4 text-center font-bold text-gray-400 uppercase text-[11px] tracking-wider whitespace-nowrap hidden sm:table-cell">
              Date
            </th>
            <th className="py-4 px-4 text-center font-bold text-gray-400 uppercase text-[11px] tracking-wider whitespace-nowrap hidden lg:table-cell">
              Priority
            </th>

            <th className="py-4 px-4 text-center w-12"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-50">
          {isLoading ? (
            <tr>
              <td colSpan={9} className="p-8">
                <Loader fullScreen={false} text="Loading tickets..." />
              </td>
            </tr>
          ) : !tickets || tickets.length === 0 ? (
            <tr>
              <td colSpan={9} className="p-8 text-center text-gray-400">
                No tickets found.
              </td>
            </tr>
          ) : (
            tickets.map((ticket, itemIndex) => {
              const owner = getOwner(ticket.owner?._id || ticket.owner) || (typeof ticket.owner === 'object' ? ticket.owner : null);
              const contact = getContact(ticket.contact?._id || ticket.contact) || (typeof ticket.contact === 'object' ? ticket.contact : null);
              const contactName = ticket.contact?.name || contact?.name || "-";
              const contactAvatar = ticket.contact?.avatar || contact?.avatar;

              const currentStatus = getCurrentStatus(ticket.status);

              return (
                <tr
                  key={ticket._id || itemIndex}
                  className="hover:bg-gray-50 group transition-colors border-b border-[var(--color-border)] cursor-pointer"
                  onClick={() => onView && onView(ticket)}
                >
                  {/* Checkbox */}
                  <td className="py-4 px-4 text-center align-middle">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 font-medium"
                      checked={selected.includes(ticket._id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        onSelectOne(ticket._id);
                      }}
                    />
                  </td>

                  {/* Ticket Name */}
                  <td className="py-4 px-4 text-left whitespace-nowrap font-medium text-[var(--color-text-title)] align-middle">
                    {ticket.name}
                  </td>

                  {/* Contact */}
                  <td className="py-4 px-4 text-left whitespace-nowrap align-middle">
                    {contactName !== "-" ? (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                          <img
                            src={
                              contactAvatar ||
                              `https://i.pravatar.cc/150?u=${ticket.contact?._id || ticket.contact}`
                            }
                            alt={contactName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                          <div className="w-full h-full hidden items-center justify-center bg-green-100 text-green-600 text-xs font-medium">
                            {contactName.charAt(0)}
                          </div>
                        </div>
                        <span className="font-medium text-[var(--color-text-title)]">
                          {contactName}
                        </span>
                      </div>
                    ) : (
                      <span className="font-medium text-gray-400">-</span>
                    )}
                  </td>

                  {/* Owner */}
                  <td className="py-4 px-4 text-left whitespace-nowrap hidden lg:table-cell font-medium text-[var(--color-text-title)] align-middle">
                    {owner?.fullName || owner?.name || "-"}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4 text-center hidden sm:table-cell align-middle">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(
                        currentStatus?.statusType || currentStatus?.name
                      )}`}
                    >
                      {currentStatus?.statusType || currentStatus?.name || "New"}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="py-4 px-4 text-center whitespace-nowrap hidden sm:table-cell font-medium text-[var(--color-text-title)] align-middle">
                    {formatDate(ticket.createdAt)}
                  </td>

                  {/* Priority */}
                  <td className="py-4 px-4 text-center hidden lg:table-cell align-middle">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                        ticket.priority
                      )}`}
                    >
                      {ticket.priority || "Low"}
                    </span>
                  </td>

                  {/* Options */}
                  <td className="py-4 px-4 text-center relative font-medium text-[var(--color-text-title)] align-middle">
                    <button
                      className="text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] p-1.5 rounded-full hover:bg-blue-50 transition-colors flex items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === ticket._id ? null : ticket._id);
                      }}
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {openMenuId === ticket._id && (
                      <div className={`absolute right-full mr-3 ${itemIndex >= tickets.length - 2 ? 'bottom-0' : 'top-1/2 -translate-y-1/2'} bg-white shadow-xl rounded-xl border border-gray-100 py-2 w-36 z-50`}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(ticket);
                            setOpenMenuId(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700 font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete([ticket._id]);
                            setOpenMenuId(null);
                          }}
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
