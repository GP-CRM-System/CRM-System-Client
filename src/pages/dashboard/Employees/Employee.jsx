import { useState } from "react";
import PageLayout from "../../../components/PageLayout";
import useEmployees from "./useEmployees";
import { useCreateEmployee } from "./useCreateEployee";
import toast from "react-hot-toast";
import { useUpdateEmployee } from "./useEditEmployee";
import { useDeleteEmployee } from "./useDeleteEmployee";
import EmployeeTable from "./EmployeeTable";
import Pagination from "../Contacts/Pagination";
import { useRoles } from "./useRoles";
import EmployeeFormModal from "./EmployeeFormModal";

export default function Emplotee() {
  //main hooks
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    role: "",
  });

  const [formError, setFormError] = useState("");
  const [selected, setSelected] = useState([]);
  //customs hooks
  const { isLoading, employees, total, currentPage, currentLimit, setPage } =
    useEmployees();
  const { roles, isLoadingRoles } = useRoles(); // Create

  const createEmployeeMutation = useCreateEmployee(
    () => {
      setModalOpen(false);
      setForm({
        fullName: "",
        phone: "",
        email: "",
        password: "",
        role: "",
      });
      setFormError("");
      toast.success("Employee created successfully!");
    },
    (error) => {
      toast.error(error?.response?.data?.error || "Failed to create employee");
      setFormError(error?.response?.data?.error || "Failed to create employee");
    }
  );
  // Update
  const updateEmployeeMutation = useUpdateEmployee(
    () => {
      toast.success("Deal updated successfully!");
      setModalOpen(false);
      setEditingEmployee(null);
      setForm({
        fullName: "",
        phone: "",
        email: "",
        password: "",
        role: "",
      });
      setFormError("");
    },
    (error) => {
      toast.error(error?.response?.data?.error || "Failed to update employee");
      setFormError(error?.response?.data?.error || "Failed to update employee");
    }
  );
  //delete
  const deleteEmployeeMutation = useDeleteEmployee(
    () => {
      toast.success("Employee deleted successfully!");
    },
    (error) => {
      toast.error(error?.response?.data?.error || "Failed to delete employee");
    }
  );
  //handel submit

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!form.fullName || !form.phone || !form.email || !form.role) {
      setFormError("All fields are required");
      return;
    }

    if (form.fullName.length < 3 || form.fullName.length > 50) {
      setFormError("Full name must be between 3 and 50 characters");
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(form.fullName)) {
      setFormError("Full name must contain only letters and spaces");
      return;
    }

    if (form.phone.length < 7 || form.phone.length > 14) {
      setFormError("Phone must be between 7 and 14 digits");
      return;
    }
    if (!/^\d+$/.test(form.phone)) {
      setFormError("Phone must contain only numbers");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setFormError("Please enter a valid email address");
      return;
    }

    if (!editingEmployee || form.password) {
      if (
        !form.password ||
        form.password.length < 8 ||
        form.password.length > 64
      ) {
        setFormError("Password must be between 8 and 64 characters");
        return;
      }
    }

    const payload = {
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      role: form.role,
    };

    if (form.password) {
      payload.password = form.password;
    }

    if (editingEmployee) {
      updateEmployeeMutation.mutate(
        { employeeId: editingEmployee._id, data: payload },
        {
          onError: (error) => {
            const message =
              error?.response?.data?.error ||
              error?.response?.data?.message ||
              "Failed to update employee";

            setFormError(message);
            toast.error(message);
          },
        }
      );
    } else {
      createEmployeeMutation.mutate(payload, {
        onError: (error) => {
          const err = error?.response?.data;

          const message = Array.isArray(err?.error)
            ? err.error[0]?.message || err.error[0]
            : err?.error || err?.message || "Failed to create employee";

          setFormError(message);
          toast.error(message);
        },
      });
    }
  };
  ///
  const handleEditClick = (employee) => {
    console.log("📝 Editing employee:", employee);

    setEditingEmployee(employee);

    const roleId =
      typeof employee.role === "object" && employee.role?._id
        ? employee.role._id
        : employee.role || "";

    const formData = {
      fullName: employee.fullName || "",
      phone: employee.phone || "",
      email: employee.email || "",
      password: "", // optinal
      role: roleId,
    };

    setForm(formData);
    setModalOpen(true);
  };

  const handleCreateClick = () => {
    setEditingEmployee(null);
    setForm({
      fullName: "",
      phone: "",
      email: "",
      password: "",
      role: "",
    });
    setModalOpen(true);
  };
  //handel all selectors type
  const allSelected =
    employees?.length > 0 && selected.length === employees.length;

  const handleSelectAll = () => {
    setSelected(allSelected ? [] : employees?.map((c) => c._id) || []);
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
      title="Employees"
      createText="Create Employee"
      onCreate={handleCreateClick}
      createPermission="Employee.write"
    >
      <div className="bg-white rounded-3xl shadow-2xl p-2 sm:p-4">
        <EmployeeTable
          employees={employees}
          isLoading={isLoading}
          roles={roles}
          selected={selected}
          allSelected={allSelected}
          onSelectAll={handleSelectAll}
          onSelectOne={handleSelectOne}
          onEdit={handleEditClick}
          formatDate={formatDate}
          onDelete={(employeeId) => deleteEmployeeMutation.mutate(employeeId)}
        />
        <Pagination
          page={currentPage}
          limit={currentLimit}
          total={total}
          onPageChange={setPage}
        />
        <EmployeeFormModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          form={form}
          formError={formError}
          onFormChange={handleFormChange}
          onSubmit={handleFormSubmit}
          roles={roles}
          isSubmitting={
            editingEmployee
              ? updateEmployeeMutation.isLoading
              : createEmployeeMutation.isLoading
          }
          isEditing={!!editingEmployee}
          isLoadingRoles={isLoadingRoles}
        />
      </div>
    </PageLayout>
  );
}
