import { useState } from "react";
import { dotsIcon } from "../../../assets";

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
  const getRole = (employeeRole) => {
    if (!employeeRole) return null;

    if (typeof employeeRole === "object" && employeeRole._id) {
      const foundRole = roles?.find((r) => r._id === employeeRole._id);
      return foundRole || employeeRole;
    }

    return roles?.find((r) => r._id === employeeRole);
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
              Employee Name
            </th>
            <th className="py-4 px-4 text-left align-middle font-semibold hidden lg:table-cell">
              Email
            </th>
            <th className="py-4 px-4 text-left align-middle font-semibold">
              Phone
            </th>
            <th className="py-4 px-4 text-center align-middle font-semibold hidden lg:table-cell">
              Job Title
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
              <td colSpan={7} className="p-8 text-center text-gray-400">
                Loading employees...
              </td>
            </tr>
          ) : !employees || employees.length === 0 ? (
            <tr>
              <td colSpan={7} className="p-8 text-center text-gray-400">
                No employees found.
              </td>
            </tr>
          ) : (
            employees.map((employee, idx) => {
              const role = getRole(employee.role?._id);

              return (
                <tr
                  key={employee._id || idx}
                  className="hover:bg-gray-50 group transition-colors border-b border-[var(--color-border)]"
                >
                  <td className="py-4 px-4 text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selected.includes(employee._id)}
                      onChange={() => onSelectOne(employee._id)}
                    />
                  </td>

                  <td className="py-4 px-4 text-left">
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
                      <span className="font-semibold text-[14px]text-(--color-text-title)">
                        {employee.fullName || "-"}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-left hidden lg:table-cell font-semibold text-[14px] text-(--color-text-title)">
                    {employee.email || "-"}
                  </td>

                  <td className="py-4 px-4 text-left font-semibold text-[14px] text-(--color-text-title)">
                    {employee.phone || "-"}
                  </td>

                  <td className="py-4 px-4 text-center font-semibold text-[14px] hidden lg:table-cell">
                    {role?.name || employee.role?.name || "N/A"}
                  </td>

                  <td className="py-4 px-4 ffont-semibold text-[14px] text-sm text-center hidden sm:table-cell">
                    {formatDate(employee.createdAt)}
                  </td>

                  <td className="py-4 px-4 text-center relative">
                    <button
                      className="text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] p-1 rounded-full hover:bg-blue-50 transition-colors"
                      onClick={() =>
                        setOpenMenuId(
                          openMenuId === employee._id ? null : employee._id
                        )
                      }
                    >
                      <img src={dotsIcon} alt="options" />
                    </button>

                    {openMenuId === employee._id && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setOpenMenuId(null)}
                        />

                        <div className="absolute right-8 top-12 z-20 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[120px] group-last:-top-32">
                          <button
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                            onClick={() => {
                              onEdit(employee);
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
                              onDelete(employee._id);
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
