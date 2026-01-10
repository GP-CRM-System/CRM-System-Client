import React, { useState, useEffect } from "react";
import { MoreVertical } from 'lucide-react';
import Loader from "../../../components/ui/Loader";

const ContactTable = ({
  contacts,
  isLoading,
  selected,
  allSelected,
  onSelectAll,
  onSelectOne,
  onEdit,
  onDelete,
  formatDate,
}) => {
  const [openMenuId, setOpenMenuId] = useState(null);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    if (openMenuId) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [openMenuId]);
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
      <table className="w-full text-sm text-[var(--color-text-body)] border-collapse">
        <thead className="bg-gray-50/50">
          <tr className="border-y border-gray-100">
            <th className="py-4 px-4 text-center w-12">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 font-medium cursor-pointer"
                checked={allSelected}
                onChange={onSelectAll}
              />
            </th>
            <th className="py-4 px-4 text-left font-semibold text-[var(--color-text-body)] uppercase text-md tracking-wider whitespace-nowrap">Name</th>
            <th className="py-4 px-4 text-center font-semibold text-[var(--color-text-body)] uppercase text-md tracking-wider whitespace-nowrap">Stage</th>
            <th className="py-4 px-4 text-center font-semibold text-[var(--color-text-body)] uppercase text-md tracking-wider whitespace-nowrap hidden md:table-cell">E-mail</th>
            <th className="py-4 px-4 text-center font-semibold text-[var(--color-text-body)] uppercase text-md tracking-wider whitespace-nowrap hidden lg:table-cell">Phone</th>
            <th className="py-4 px-4 text-center font-semibold text-[var(--color-text-body)] uppercase text-md tracking-wider whitespace-nowrap hidden xl:table-cell">Job Title</th>
            <th className="py-4 px-4 text-center font-semibold text-[var(--color-text-body)] uppercase text-md tracking-wider whitespace-nowrap hidden sm:table-cell">Date</th>
            <th className="py-4 px-4 text-center w-12"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {isLoading ? (
            <tr>
              <td colSpan={8} className="p-8">
                <Loader fullScreen={false} text="Refreshing contacts..." />
              </td>
            </tr>
          ) : contacts.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-12 text-center text-gray-500 font-medium">
                No contacts found
              </td>
            </tr>
          ) : (
            contacts.map((contact, index) => {
              const lastStage =
                Array.isArray(contact.stage) && contact.stage.length > 0
                  ? contact.stage[contact.stage.length - 1]
                  : null;
              const stageName = lastStage?.name || "-";
              const stageDate = lastStage?.date;
              const isLastRows = index >= contacts.length - 2;

              return (
                <tr
                  key={contact._id}
                  className={`hover:bg-blue-50/30 transition-colors ${selected.includes(contact._id) ? "bg-blue-50/50" : ""
                    }`}
                >
                  <td className="py-4 px-4 text-center w-12 align-middle">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 font-medium"
                      checked={selected.includes(contact._id)}
                      onChange={() => onSelectOne(contact._id)}
                    />
                  </td>
                  <td className="py-4 px-4 text-left whitespace-nowrap align-middle">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                        <img
                          src={
                            contact.avatar ||
                            `https://i.pravatar.cc/150?u=${contact._id}`
                          }
                          alt={contact.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div className="w-full h-full hidden items-center justify-center bg-blue-100 text-blue-600 text-xs font-medium">
                          {contact.name?.charAt(0) || "U"}
                        </div>
                      </div>
                      <span className="font-medium text-[var(--color-text-title)]">
                        {contact.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center align-middle">
                    {stageName !== "-" && (
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${stageName === "Customer"
                          ? "bg-blue-50 text-blue-500"
                          : "bg-orange-50 text-orange-400"
                          }`}
                      >
                        {stageName}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center whitespace-nowrap hidden md:table-cell font-medium text-[var(--color-text-title)] align-middle">
                    {contact.email}
                  </td>
                  <td className="py-4 px-4 text-center whitespace-nowrap hidden lg:table-cell font-medium text-[var(--color-text-title)] align-middle">
                    {contact.phone || "-"}
                  </td>
                  <td className="py-4 px-4 text-center whitespace-nowrap hidden xl:table-cell font-medium text-[var(--color-text-title)] align-middle">
                    {contact.jobTitle || "-"}
                  </td>
                  <td className="py-4 px-4 font-medium text-sm text-center whitespace-nowrap hidden sm:table-cell text-[var(--color-text-title)] align-middle">
                    {formatDate(stageDate || contact.createdAt)}
                  </td>
                  <td className="py-4 px-4 text-center relative align-middle">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === contact._id ? null : contact._id);
                      }}
                      className="text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] p-1.5 rounded-full hover:bg-blue-50 transition-colors flex items-center justify-center"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {openMenuId === contact._id && (
                      <div className={`absolute right-full mr-3 ${isLastRows ? 'bottom-0' : 'top-1/2 -translate-y-1/2'} bg-white shadow-xl rounded-xl border border-gray-100 py-2 w-36 z-50`}>
                        <button
                          onClick={() => {
                            onEdit && onEdit(contact);
                            setOpenMenuId(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700 font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            onDelete && onDelete([contact._id]);
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
    </div >
  );
};

export default ContactTable;
