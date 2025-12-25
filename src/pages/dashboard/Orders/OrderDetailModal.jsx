import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { formatDate } from '../../../utils/formatDate';
import { 
  FiPackage, 
  FiDollarSign, 
  FiUser, 
  FiTruck, 
  FiCalendar,
  FiCreditCard,
  FiMapPin,
  FiShoppingBag
} from 'react-icons/fi';

const OrderDetailModal = ({ order, isOpen, onClose, employee, contact }) => {
  if (!isOpen || !order) return null;

  const calculateTotal = () => {
    const productsTotal = order.products?.reduce((sum, p) => sum + (p.unitPrice || 0) * (p.quantity || 0), 0) || 0;
    return productsTotal + (order.taxes || 0);
  };

  const getDisplayId = (description, fallback) => {
    if (!description) return fallback;
    const match = description.match(/#\d+/);
    return match ? match[0] : fallback;
  };

  const displayId = getDisplayId(order.description, order._id?.slice(-6));
  const contactName = contact?.name || contact?.fullName || order.contact?.name || order.contact?.fullName || 'N/A';
  const employeeName = employee?.fullName || employee?.name || order.employee?.fullName || order.employee?.name || 'N/A';
  const currentStage = order.stage?.[order.stage.length - 1];
  const currentPayment = order.paymentStatus?.[order.paymentStatus.length - 1];
  const productsTotal = order.products?.reduce((sum, p) => sum + (p.unitPrice || 0) * (p.quantity || 0), 0) || 0;
  const totalAmount = calculateTotal();

  const getStatusColor = (status) => {
    switch (status?.stageType || status) {
      case 'Delivered':
      case 'Paid':
        return 'border-l-[var(--color-success)] bg-[var(--color-success)]/5';
      case 'Shipped':
        return 'border-l-[var(--color-info)] bg-[var(--color-info)]/5';
      case 'Processing':
      case 'Pending':
        return 'border-l-[var(--color-warning)] bg-[var(--color-warning)]/5';
      case 'Cancelled':
      case 'Failed':
      case 'Refunded':
        return 'border-l-[var(--color-error)] bg-[var(--color-error)]/5';
      default:
        return 'border-l-gray-300 bg-gray-50';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[var(--color-primary-100)]">
              <FiShoppingBag className="w-6 h-6 text-[var(--color-primary-600)]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[var(--color-text-title)]">Order Details</h2>
              <p className="text-sm text-[var(--color-text-body)]">{displayId} • {order.orderType}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--color-gray-light)] rounded-lg transition-colors text-[var(--color-text-body)]"
          >
            <IoMdClose size={22} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Total Info Bar */}
          <div className="mb-6 p-5 rounded-xl bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-600)] text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Amount</p>
                <p className="text-3xl font-bold mt-1">${totalAmount.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">Products: ${productsTotal.toLocaleString()}</p>
                <p className="text-sm opacity-90">Taxes: ${order.taxes || 0}</p>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Status Cards */}
              <div className="space-y-4">
                <div className={`p-4 rounded-lg border-l-4 ${getStatusColor(currentStage)}`}>
                  <div className="flex items-center gap-3">
                    <FiPackage className="w-5 h-5 text-[var(--color-text-body)]" />
                    <div>
                      <p className="text-sm text-[var(--color-text-body)]">Order Status</p>
                      <p className="font-bold text-[var(--color-text-title)]">{currentStage?.stageType || 'New'}</p>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-lg border-l-4 ${getStatusColor(currentPayment)}`}>
                  <div className="flex items-center gap-3">
                    <FiCreditCard className="w-5 h-5 text-[var(--color-text-body)]" />
                    <div>
                      <p className="text-sm text-[var(--color-text-body)]">Payment Status</p>
                      <p className="font-bold text-[var(--color-text-title)]">{currentPayment?.stage || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* People */}
              <div className="p-5 rounded-xl border border-[var(--color-border)] bg-white">
                <h3 className="font-bold text-[var(--color-text-title)] mb-4 flex items-center gap-2">
                  <FiUser className="w-4 h-4" />
                  Contact & Employee
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center">
                      <span className="text-[var(--color-primary-600)] font-bold">{contactName.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-[var(--color-text-title)]">{contactName}</p>
                      <p className="text-xs text-[var(--color-text-body)]">Customer</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-purple-600 font-bold">{employeeName.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-[var(--color-text-title)]">{employeeName}</p>
                      <p className="text-xs text-[var(--color-text-body)]">Employee</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Order Info */}
              <div className="p-5 rounded-xl border border-[var(--color-border)] bg-white">
                <h3 className="font-bold text-[var(--color-text-title)] mb-4 flex items-center gap-2">
                  <FiCalendar className="w-4 h-4" />
                  Order Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-[var(--color-border)]">
                    <span className="text-[var(--color-text-body)]">Source</span>
                    <span className="font-medium text-[var(--color-text-title)]">{order.source}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[var(--color-border)]">
                    <span className="text-[var(--color-text-body)]">Created</span>
                    <span className="font-medium text-[var(--color-text-title)]">{formatDate(order.createdAt)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-[var(--color-text-body)]">Expected Delivery</span>
                    <span className="font-medium text-[var(--color-text-title)]">{formatDate(order.expectedDeliveryDate)}</span>
                  </div>
                </div>
              </div>

              {/* Shipping */}
              <div className="p-5 rounded-xl border border-[var(--color-border)] bg-white">
                <h3 className="font-bold text-[var(--color-text-title)] mb-4 flex items-center gap-2">
                  <FiMapPin className="w-4 h-4" />
                  Shipping Address
                </h3>
                <p className="text-[var(--color-text-title)] bg-[var(--color-gray-light)] p-3 rounded-lg">
                  {order.shippingAddress || 'No address provided'}
                </p>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="mt-6">
            <h3 className="font-bold text-[var(--color-text-title)] mb-4">Order Items</h3>
            <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
              {order.products?.map((product) => (
                <div key={product._id} className="p-4 border-b border-[var(--color-border)] last:border-b-0 hover:bg-[var(--color-gray-light)]">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="font-medium text-[var(--color-text-title)]">{product.name}</p>
                      <div className="flex items-center gap-4 mt-1 text-sm text-[var(--color-text-body)]">
                        <span>Qty: {product.quantity}</span>
                        <span>Unit Price: ${product.unitPrice}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[var(--color-text-title)]">
                        ${(product.unitPrice * product.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="mt-6 p-5 rounded-xl bg-[var(--color-gray-light)]">
            <div className="space-y-2">
              <div className="flex justify-between text-[var(--color-text-body)]">
                <span>Products Subtotal</span>
                <span>${productsTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[var(--color-text-body)]">
                <span>Taxes</span>
                <span>${order.taxes || 0}</span>
              </div>
              <div className="pt-3 border-t border-[var(--color-border)] flex justify-between">
                <span className="font-bold text-[var(--color-text-title)]">Total Amount</span>
                <span className="font-bold text-xl text-[var(--color-primary-600)]">${totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[var(--color-border)] bg-white flex justify-between items-center">
          <div className="text-sm text-[var(--color-text-body)]">
            Order ID: <span className="font-mono text-[var(--color-text-title)]">{order._id}</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[var(--color-primary-500)] text-white rounded-lg font-medium hover:bg-[var(--color-primary-600)] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;