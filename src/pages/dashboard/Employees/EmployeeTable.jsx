import React, { useState, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import Loader from "../../../components/ui/Loader";

export default function EmployeeTable({
  employees,
  isLoading,
  selected,
  allSelected,
  onSelectAll,
  onSelectOne,
  onEdit,
  formatDate,
  onDelete,
  roles,
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
  const getRole = (employeeRole) => {
    if (!employeeRole) return null;

    if (typeof employeeRole === "object" && employeeRole._id) {
      const foundRole = roles?.find((r) => r._id === employeeRole._id);
      return foundRole || employeeRole;
    }

    return roles?.find((r) => r._id === employeeRole);
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
              Employee Name
            </th>
            <th className="py-4 px-4 text-left font-bold text-gray-400 uppercase text-[11px] tracking-wider whitespace-nowrap hidden lg:table-cell">
              Email
            </th>
            <th className="py-4 px-4 text-left font-bold text-gray-400 uppercase text-[11px] tracking-wider whitespace-nowrap">
              Phone
            </th>
            <th className="py-4 px-4 text-center font-bold text-gray-400 uppercase text-[11px] tracking-wider whitespace-nowrap hidden lg:table-cell">
              Job Title
            </th>
            <th className="py-4 px-4 text-center font-bold text-gray-400 uppercase text-[11px] tracking-wider whitespace-nowrap hidden sm:table-cell">
              Date
            </th>
            <th className="py-4 px-4 text-center w-12"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-50">
          {isLoading ? (
            <tr>
              <td colSpan={7} className="p-8">
                <Loader fullScreen={false} text="Loading employees..." />
              </td>
            </tr>
          ) : !employees || employees.length === 0 ? (
            <tr>
              <td colSpan={7} className="p-8 text-center text-gray-400">
                No employees found.
              </td>
            </tr>
          ) : (
            employees.map((employee, itemIndex) => {
              const role = getRole(employee.role?._id);

              return (
                <tr
                  key={employee._id || itemIndex}
                  className="hover:bg-gray-50 group transition-colors border-b border-[var(--color-border)]"
                >
                  <td className="py-4 px-4 text-center align-middle">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 font-medium"
                      checked={selected.includes(employee._id)}
                      onChange={() => onSelectOne(employee._id)}
                    />
                  </td>

                  <td className="py-4 px-4 text-left whitespace-nowrap font-medium align-middle">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                        <img
                          src={
                            employee.avatar ||
                            `https://i.pravatar.cc/150?u=${employee._id}`
                          }
                          alt={employee.fullName || "-"}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div className="w-full h-full hidden items-center justify-center bg-blue-100 text-blue-600 text-xs font-medium">
                          {employee.fullName?.charAt(0) || "E"}
                        </div>
                      </div>
                      <span className="font-medium text-[var(--color-text-title)]">
                        {employee.fullName || "-"}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-left whitespace-nowrap hidden lg:table-cell font-medium text-[var(--color-text-title)] align-middle">
                    {employee.email || "-"}
                  </td>

                  <td className="py-4 px-4 text-left whitespace-nowrap font-medium text-[var(--color-text-title)] align-middle">
                    {employee.phone || "-"}
                  </td>

                  <td className="py-4 px-4 text-center whitespace-nowrap font-medium text-[var(--color-text-title)] hidden lg:table-cell align-middle">
                    <span className="font-semibold px-3 py-1 bg-blue-50 text-blue-500 rounded-full text-[10px] uppercase tracking-wider whitespace-nowrap">
                      {role?.name || employee.role?.name || "N/A"}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-center whitespace-nowrap hidden sm:table-cell font-medium text-[var(--color-text-title)] align-middle">
                    {formatDate(employee.createdAt)}
                  </td>

                  <td className="py-4 px-4 text-center relative font-medium text-[var(--color-text-title)] align-middle">
                    <button
                      className="text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] p-1.5 rounded-full hover:bg-blue-50 transition-colors flex items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === employee._id ? null : employee._id);
                      }}
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {openMenuId === employee._id && (
                      <div className={`absolute right-full mr-3 ${itemIndex >= employees.length - 2 ? 'bottom-0' : 'top-1/2 -translate-y-1/2'} bg-white shadow-xl rounded-xl border border-gray-100 py-2 w-36 z-50`}>
                        <button
                          onClick={() => {
                            onEdit(employee);
                            setOpenMenuId(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700 font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            onDelete([employee._id]);
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
