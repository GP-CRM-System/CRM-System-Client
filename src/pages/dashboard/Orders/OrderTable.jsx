import React, { useState, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import Loader from "../../../components/ui/Loader";

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



  const getEmployee = (employeeId) => {
    if (!employeeId) return null;
    const id = typeof employeeId === 'object' ? employeeId._id : employeeId;
    return employees?.find((e) => e._id === id);
  };

  // Helper function to get contact
  const getContact = (contactId) => {
    if (!contactId) return null;
    return contacts?.find((c) => c._id === contactId);
  };

  // Helper function to calculate total price
  const calculateTotalPrice = (order) => {
    const products = order?.products || [];
    const taxes = order?.taxes || 0;
    const productsTotal = products.reduce((total, product) => {
      return total + (product.unitPrice || 0) * (product.quantity || 0);
    }, 0);
    return productsTotal + taxes;
  };

  // Helper function to extract #XXXX from description
  const getDisplayOrderId = (description, fallbackId) => {
    if (!description) return fallbackId;
    const match = description.match(/#\d+/);
    return match ? match[0] : fallbackId;
  };

  // Helper function to get current stage
  const getCurrentStage = (stages) => {
    if (!stages || stages.length === 0) return null;
    return stages[stages.length - 1];
  };

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
              Order ID
            </th>
            <th className="py-2.5 px-3 text-left font-semibold text-[var(--color-text-body)] uppercase text-[11px] tracking-wider whitespace-nowrap hidden lg:table-cell">
              Employee
            </th>
            <th className="py-2.5 px-3 text-left font-semibold text-[var(--color-text-body)] uppercase text-[11px] tracking-wider whitespace-nowrap">
              Contact
            </th>
            <th className="py-2.5 px-3 text-center font-semibold text-[var(--color-text-body)] uppercase text-[11px] tracking-wider whitespace-nowrap hidden lg:table-cell">
              Total Price
            </th>
            <th className="py-2.5 px-3 text-center font-semibold text-[var(--color-text-body)] uppercase text-[11px] tracking-wider whitespace-nowrap hidden sm:table-cell">
              Date
            </th>
            <th className="py-2.5 px-3 text-center font-semibold text-[var(--color-text-body)] uppercase text-[11px] tracking-wider whitespace-nowrap hidden sm:table-cell">
              Stage
            </th>
            <th className="py-2.5 px-3 text-center w-10"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-50">
          {isLoading ? (
            <tr>
              <td colSpan={9} className="p-8">
                <Loader fullScreen={false} text="Loading orders..." />
              </td>
            </tr>
          ) : !orders || orders.length === 0 ? (
            <tr>
              <td colSpan={9} className="p-8 text-center text-gray-400">
                No orders found.
              </td>
            </tr>
          ) : (
            orders.map((order, itemIndex) => {
              const employee = getEmployee(order.employee);
              // Prioritize nested object names from API response
              const contactName = order.contact?.name || order.contact?.fullName || getContact(order.contact?._id || order.contact)?.fullName || "-";
              const contactAvatar = order.contact?.avatar || getContact(order.contact?._id || order.contact)?.avatar;

              const currentStage = getCurrentStage(order.stage);
              const totalPrice = calculateTotalPrice(order);

              const stageName = currentStage?.stageType || currentStage?.name;
              const displayId = getDisplayOrderId(order.description, order._id);

              return (
                <tr
                  key={order._id || itemIndex}
                  className="hover:bg-gray-50 group transition-colors border-b border-[var(--color-border)] font-medium cursor-pointer"
                  onClick={() => onView && onView(order)}
                >
                  {/* Checkbox */}
                  <td className="py-2.5 px-3 text-center align-middle">
                    <input
                      type="checkbox"
                      className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selected.includes(order._id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        onSelectOne(order._id);
                      }}
                    />
                  </td>

                  {/* Order ID */}
                  <td className="py-2.5 px-3 text-left whitespace-nowrap font-medium text-[var(--color-text-title)] align-middle text-xs">
                    {displayId}
                  </td>

                  {/* Employee */}
                  <td className="py-2.5 px-3 text-left whitespace-nowrap hidden lg:table-cell align-middle">
                    {employee ? (
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                          <img
                            src={
                              employee.avatar ||
                              `https://i.pravatar.cc/150?u=${employee._id}`
                            }
                            alt={employee.fullName || employee.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                          <div className="w-full h-full hidden items-center justify-center bg-blue-100 text-blue-600 text-[10px] font-medium">
                            {employee.fullName?.charAt(0) || "E"}
                          </div>
                        </div>
                        <span className="font-medium text-[var(--color-text-title)] text-xs">
                          {employee.fullName || employee.name}
                        </span>
                      </div>
                    ) : (
                      <span className="font-medium text-gray-400 text-xs">-</span>
                    )}
                  </td>

                  {/* Contact */}
                  <td className="py-2.5 px-3 text-left whitespace-nowrap align-middle">
                    {contactName !== "-" ? (
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                          <img
                            src={
                              contactAvatar ||
                              `https://i.pravatar.cc/150?u=${order.contact?._id || order.contact}`
                            }
                            alt={contactName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                          <div className="w-full h-full hidden items-center justify-center bg-green-100 text-green-600 text-[10px] font-medium">
                            {contactName.charAt(0)}
                          </div>
                        </div>
                        <span className="font-medium text-[var(--color-text-title)] text-xs">
                          {contactName}
                        </span>
                      </div>
                    ) : (
                      <span className="font-medium text-gray-400 text-xs">-</span>
                    )}
                  </td>

                  {/* Total Price */}
                  <td className="py-2.5 px-3 text-center whitespace-nowrap hidden lg:table-cell font-medium text-[var(--color-text-title)] align-middle text-xs">
                    ${totalPrice.toLocaleString()}
                  </td>

                  {/* Date */}
                  <td className="py-2.5 px-3 text-center whitespace-nowrap hidden sm:table-cell font-medium text-[var(--color-text-title)] align-middle text-xs">
                    {formatDate(order.createdAt)}
                  </td>

                  {/* Stage */}
                  <td className="py-2.5 px-3 text-center hidden sm:table-cell align-middle">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize whitespace-nowrap ${getStageStyle(
                        stageName
                      )}`}
                    >
                      {stageName || "New"}
                    </span>
                  </td>

                  {/* Options */}
                  <td className="py-2.5 px-3 text-center relative font-medium text-[var(--color-text-title)] align-middle">
                    <button
                      className="text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] p-1 rounded-full hover:bg-blue-50 transition-colors flex items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === order._id ? null : order._id);
                      }}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {openMenuId === order._id && (
                      <div className={`absolute right-full mr-3 ${itemIndex >= orders.length - 2 ? 'bottom-0' : 'top-1/2 -translate-y-1/2'} bg-white shadow-xl rounded-xl border border-gray-100 py-2 w-36 z-50`}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(order);
                            setOpenMenuId(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700 font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete([order._id]);
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
