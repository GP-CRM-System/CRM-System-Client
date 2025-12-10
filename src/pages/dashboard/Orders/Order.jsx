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

export default function Order() {
  //main hooks
  const [modalOpen, setModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [form, setForm] = useState({
    description: "",
    owner: "",
    stage: [
      {
        stageType: "Open", // 🔥 غير name لـ stageType
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
  // Handle Edit Click
  const handleEditClick = (order) => {
    console.log("📝 Editing order:", order);

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
  //handel all selectors type
  const allSelected = orders?.length > 0 && selected.length === orders.length;

  const handleSelectAll = () => {
    setSelected(allSelected ? [] : orders?.map((c) => c._id) || []);
  };

  const handleSelectOne = (id) => {
    setSelected((sel) =>
      sel.includes(id) ? sel.filter((sid) => sid !== id) : [...sel, id]
    );
  };
  // Form handlers
  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
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
  return (
    <PageLayout
      title="Orders"
      createText="Create Order"
      onCreate={handleCreateClick}
      createPermission="Order.write"
    >
      <div className="bg-white rounded-lg shadow-xl p-2 sm:p-4">
        <OrderTable
          orders={orders}
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
      </div>
    </PageLayout>
  );
}
