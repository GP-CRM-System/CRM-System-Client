import { useState } from "react";
import { dotsIcon } from "../../../assets";

export default function OrderTable({
  orders,
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

  // Helper function to get employee
  const getEmployee = (employeeId) => {
    if (!employeeId) return null;
    return employees?.find((e) => e._id === employeeId);
  };

  // Helper function to get contact
  const getContact = (contactId) => {
    if (!contactId) return null;
    return contacts?.find((c) => c._id === contactId);
  };

  // Helper function to calculate total price
  const calculateTotalPrice = (products) => {
    if (!products || products.length === 0) return 0;
    return products.reduce((total, product) => {
      return total + product.unitPrice * product.quantity;
    }, 0);
  };

  // Helper function to get current stage
  const getCurrentStage = (stages) => {
    if (!stages || stages.length === 0) return null;
    return stages[stages.length - 1];
  };

  // Helper function to get stage style
  const getStageStyle = (stageName) => {
    const stageType = stageName || "";

    switch (stageType) {
      case "Open":
        return "bg-[#e0ecfa]  text-[#2596be] ";
      case "Processed":
        return "bg-[#fff9e3] text-[#e07706] ";
      case "Shipped":
        return "bg-purple-50 text-purple-600 ";
      case "Delivered":
        return "bg-green-50 text-green-600 ";
      case "Cancelled":
        return "bg-red-50 text-red-600 ";
      default:
        return "bg-gray-50 text-gray-500 ";
    }
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
              Order ID
            </th>
            <th className="py-4 px-4 text-left align-middle font-semibold hidden lg:table-cell">
              Employee
            </th>
            <th className="py-4 px-4 text-left align-middle font-semibold">
              Contact
            </th>
            <th className="py-4 px-4 text-center align-middle font-semibold hidden lg:table-cell">
              Total Price
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
              <td colSpan={9} className="p-8 text-center text-gray-400">
                Loading orders...
              </td>
            </tr>
          ) : !orders || orders.length === 0 ? (
            <tr>
              <td colSpan={9} className="p-8 text-center text-gray-400">
                No orders found.
              </td>
            </tr>
          ) : (
            orders.map((order, idx) => {
              const employee = getEmployee(order.employee?._id);
              const contact = getContact(order.contact?._id);
              const currentStage = getCurrentStage(order.stage);
              const totalPrice = calculateTotalPrice(order.products);

              // Get stage name - support both stageType and name
              const stageName = currentStage?.stageType || currentStage?.name;

              return (
                <tr
                  key={order._id || idx}
                  className="hover:bg-gray-50 group transition-colors border-b border-[var(--color-border)]"
                >
                  {/* Checkbox */}
                  <td className="py-4 px-4 text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selected.includes(order._id)}
                      onChange={() => onSelectOne(order._id)}
                    />
                  </td>

                  {/* Order ID */}
                  <td className="py-4 px-4 text-left font-medium text-gray-700">
                    {order._id}
                  </td>

                  {/* Employee */}
                  <td className="py-4 px-4 text-left hidden lg:table-cell">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                        <img
                          src={
                            employee?.avatar ||
                            `https://i.pravatar.cc/150?u=${employee?._id}`
                          }
                          alt={employee?.fullName || "-"}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div className="w-full h-full hidden items-center justify-center bg-purple-100 text-purple-600 text-xs font-medium">
                          {employee?.fullName?.charAt(0) || "E"}
                        </div>
                      </div>
                      <span className="font-medium text-gray-700">
                        {employee?.fullName || "-"}
                      </span>
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
                      <span className="font-medium text-gray-700">
                        {contact?.name || "-"}
                      </span>
                    </div>
                  </td>

                  {/* Total Price */}
                  <td className="py-4 px-4 text-center hidden lg:table-cell font-semibold text-gray-800">
                    ${totalPrice.toLocaleString()}
                  </td>

                  {/* Date */}
                  <td className="py-4 px-4 font-medium text-sm text-center hidden sm:table-cell text-gray-600">
                    {formatDate(order.createdAt || order.stage?.[0]?.date)}
                  </td>

                  {/* Stage */}
                  <td className="py-4 px-4 text-center hidden sm:table-cell">
                    {stageName ? (
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStageStyle(
                          stageName
                        )}`}
                      >
                        {stageName}
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-500 border border-gray-200">
                        No Stage
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 text-center relative">
                    <button
                      className="text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] p-1 rounded-full hover:bg-blue-50 transition-colors"
                      onClick={() =>
                        setOpenMenuId(
                          openMenuId === order._id ? null : order._id
                        )
                      }
                    >
                      <img src={dotsIcon} alt="options" />
                    </button>

                    {openMenuId === order._id && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setOpenMenuId(null)}
                        />

                        <div className="absolute right-8 top-12 z-20 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[120px] group-last:-top-32">
                          <button
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                            onClick={() => {
                              onEdit(order);
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
                              onDelete(order._id);
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
