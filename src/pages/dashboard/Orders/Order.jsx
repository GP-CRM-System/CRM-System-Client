import { useState } from "react";
import PageLayout from "../../../components/PageLayout";
import useOrders from "./useOrder";
import { useContacts } from "../Companies/useContacts";
import { useEmployees } from "../Companies/useEmployees";
import { useCreateOrder } from "./useCreateOrder";
import toast from "react-hot-toast";
import { useUpdateOrder } from "./useEditOrder";
import { useDeleteOrder } from "./useDeleteOrder";
import OrderTable from "./OrderTable";
import Pagination from "../Contacts/Pagination";
import OrderFormModal from "./OrderFormModal";
import OrderDetailModal from "./OrderDetailModal";
import { FilterModal } from "../../../components";

export default function Order() {
  //main hooks
  const [modalOpen, setModalOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [viewOrder, setViewOrder] = useState(null);
  const [filters, setFilters] = useState({ stage: "" });
  const [form, setForm] = useState({
    description: "",
    owner: "",
    stage: [
      {
        stageType: "Open",
        date: new Date().toISOString().split("T")[0],
      },
    ],
    contact: "",
    employee: "",
    products: [],
  });
  const [formError, setFormError] = useState("");
  const [selected, setSelected] = useState([]);
  //// customs hooks
  const { isLoading, orders, total, currentPage, currentLimit, setPage } =
    useOrders();
  const { contacts, isLoadingContacts } = useContacts();
  const { employees } = useEmployees();
  //

  // Create
  const createOrderMutation = useCreateOrder(
    () => {
      setModalOpen(false);
      setForm({
        description: "",
        owner: "",
        stage: [
          {
            stageType: "Open",
            date: new Date().toISOString().split("T")[0],
          },
        ],
        contact: "",
        employee: "",
        products: [],
      });
      setFormError("");
      toast.success("Order created successfully!");
    },
    (error) => {
      toast.error(error?.response?.data?.error || "Failed to create order");
      setFormError(error?.response?.data?.error || "Failed to create order");
    }
  );
  // Update
  const updateOrderMutation = useUpdateOrder(
    () => {
      toast.success("Order updated successfully!");
      setModalOpen(false);
      setEditingOrder(null);
      setForm({
        description: "",
        owner: "",
        contact: "",
        employee: "",
        products: "",
        stage: "",
      });
      setFormError("");
    },
    (error) => {
      toast.error(error?.response?.data?.error || "Failed to update order");
      setFormError(error?.response?.data?.error || "Failed to update order");
    }
  );
  const deleteOrderMutation = useDeleteOrder(
    () => {
      setSelected([]); // Clear selection after successful deletion
      toast.success("Order deleted successfully!");
    },
    (error) => {
      toast.error(error?.response?.data?.error || "Failed to delete Order");
    }
  );
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (!form.description || form.description.trim().length === 0) {
      setFormError("Description is required");
      return;
    }

    if (form.description.length < 3 || form.description.length > 100) {
      setFormError("Description must be between 3 and 100 characters");
      return;
    }

    if (!/^[a-zA-Z0-9\s]+$/.test(form.description)) {
      setFormError("Description can only contain letters, numbers, and spaces");
      return;
    }

    if (!form.owner || form.owner.trim().length === 0) {
      setFormError("Owner is required");
      return;
    }

    if (!form.contact || form.contact.trim().length === 0) {
      setFormError("Contact is required");
      return;
    }

    if (!form.employee || form.employee.trim().length === 0) {
      setFormError("Employee is required");
      return;
    }

    const payload = {
      description: form.description.trim(),
      owner: form.owner,
      stage: form.stage || [
        {
          name: "Open",
          date: new Date().toISOString().split("T")[0],
        },
      ],
      contact: form.contact,
      employee: form.employee,
      products: form.products || [],
    };

    // Update Order
    if (editingOrder) {
      updateOrderMutation.mutate(
        { orderId: editingOrder._id, data: payload },
        {
          onError: (error) => {
            const message =
              error?.response?.data?.error ||
              error?.response?.data?.message ||
              "Failed to update order";

            setFormError(message);
            toast.error(message);
          },
        }
      );
    } else {
      createOrderMutation.mutate(payload, {
        onError: (error) => {
          const err = error?.response?.data;

          const message = Array.isArray(err?.error)
            ? err.error[0]?.message || err.error[0]
            : err?.error || err?.message || "Failed to create order";

          setFormError(message);
          toast.error(message);
        },
      });
    }
  };
  // Handle View Click
  const handleViewOrder = (order) => {
    setViewOrder(order);
  };
  // Handle Edit Click
  const handleEditClick = (order) => {
    setEditingOrder(order);

    const ownerId =
      typeof order.owner === "object" && order.owner?._id
        ? order.owner._id
        : order.owner || "";

    const contactId =
      typeof order.contact === "object" && order.contact?._id
        ? order.contact._id
        : order.contact || "";

    const employeeId =
      typeof order.employee === "object" && order.employee?._id
        ? order.employee._id
        : order.employee || "";

    const formData = {
      description: order.description || "",
      owner: ownerId,
      stage: order.stage || [
        {
          name: "Open",
          date: new Date().toISOString().split("T")[0],
        },
      ],
      contact: contactId,
      employee: employeeId,
      products: order.products || [],
    };

    setForm(formData);
    setModalOpen(true);
  };

  const handleCreateClick = () => {
    setEditingOrder(null);
    setForm({
      description: "",
      owner: "",
      stage: [
        {
          name: "Open",
          date: new Date().toISOString().split("T")[0],
        },
      ],
      contact: "",
      employee: "",
      products: [],
    });
    setModalOpen(true);
  };
  // Form handlers
  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Apply filters to orders
  const filteredOrders = orders.filter((order) => {
    const currentStage = order.stage && order.stage.length > 0
      ? order.stage[order.stage.length - 1].name
      : "Open";
    
    if (filters.stage && currentStage !== filters.stage) return false;
    if (filters.contact && order.contact?._id !== filters.contact && order.contact !== filters.contact) return false;
    if (filters.employee && order.employee?._id !== filters.employee && order.employee !== filters.employee) return false;
    
    const orderTotal = order.products?.reduce((sum, p) => sum + (p.unitPrice * p.quantity), 0) || 0;
    if (filters.minTotal && orderTotal < parseFloat(filters.minTotal)) return false;
    if (filters.maxTotal && orderTotal > parseFloat(filters.maxTotal)) return false;
    
    return true;
  });

  //handel all selectors type
  const allSelected = filteredOrders?.length > 0 && selected.length === filteredOrders.length;

  const handleSelectAll = () => {
    setSelected(allSelected ? [] : filteredOrders?.map((c) => c._id) || []);
  };

  const handleSelectOne = (id) => {
    setSelected((sel) =>
      sel.includes(id) ? sel.filter((sid) => sid !== id) : [...sel, id]
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleApplyFilters = () => {
    setFilterModalOpen(false);
  };

  const handleClearFilters = () => {
    setFilters({ 
      stage: "",
      contact: "",
      employee: "",
      minTotal: "",
      maxTotal: ""
    });
  };

  return (
    <PageLayout
      title="Orders"
      createText="Create Order"
      onCreate={handleCreateClick}
      createPermission="Order.write"
      onFilter={() => setFilterModalOpen(true)}
    >
      <div className="bg-white rounded-3xl shadow-2xl p-2 sm:p-4">
        <OrderTable
          orders={filteredOrders}
          isLoading={isLoading}
          selected={selected}
          allSelected={allSelected}
          onSelectAll={handleSelectAll}
          onSelectOne={handleSelectOne}
          onEdit={handleEditClick}
          formatDate={formatDate}
          contacts={contacts}
          employees={employees}
          onDelete={(orderId) => deleteOrderMutation.mutate(orderId)}
          onView={handleViewOrder}
        />
        <Pagination
          page={currentPage}
          limit={currentLimit}
          total={total}
          onPageChange={setPage}
        />

        <OrderFormModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          form={form}
          formError={formError}
          onFormChange={handleFormChange}
          onSubmit={handleFormSubmit}
          contacts={contacts}
          employees={employees}
          isLoadingContacts={isLoadingContacts}
          isSubmitting={
            editingOrder
              ? updateOrderMutation.isLoading
              : createOrderMutation.isLoading
          }
          isEditing={!!editingOrder}
        />

        <FilterModal
          open={filterModalOpen}
          onClose={() => setFilterModalOpen(false)}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
          title="Filter Orders"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={filters.contact}
              onChange={(e) => setFilters(prev => ({ ...prev, contact: e.target.value }))}
            >
              <option value="">All Contacts</option>
              {contacts?.map((contact) => (
                <option key={contact._id} value={contact._id}>
                  {contact.fullName || contact.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={filters.employee}
              onChange={(e) => setFilters(prev => ({ ...prev, employee: e.target.value }))}
            >
              <option value="">All Employees</option>
              {employees?.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.fullName || emp.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={filters.stage}
              onChange={(e) => setFilters(prev => ({ ...prev, stage: e.target.value }))}
            >
              <option value="">All Stages</option>
              <option value="Open">Open</option>
              <option value="Processed">Processed</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Min Total</label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Minimum total"
              value={filters.minTotal}
              onChange={(e) => setFilters(prev => ({ ...prev, minTotal: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Total</label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Maximum total"
              value={filters.maxTotal}
              onChange={(e) => setFilters(prev => ({ ...prev, maxTotal: e.target.value }))}
            />
          </div>
        </FilterModal>

        <OrderDetailModal
          isOpen={!!viewOrder}
          onClose={() => setViewOrder(null)}
          order={viewOrder}
          employee={employees?.find(e => e._id === viewOrder?.employee || e._id === viewOrder?.employee?._id)}
          contact={contacts?.find(c => c._id === viewOrder?.contact || c._id === viewOrder?.contact?._id)}
        />
      </div>
    </PageLayout>
  );
}
