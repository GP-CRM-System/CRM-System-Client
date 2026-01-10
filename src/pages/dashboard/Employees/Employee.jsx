import { useState, useEffect } from "react";
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
import UnauthorizedModal from "../../../components/ui/UnauthorizedModal";
import useAuthStore from "../../../store/authStore";
import { FilterModal } from "../../../components";

export default function Emplotee() {
  //main hooks
  const [modalOpen, setModalOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showUnauthorized, setShowUnauthorized] = useState(false);
  const [filters, setFilters] = useState({ role: "" });
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    role: "",
  });

  const [formError, setFormError] = useState("");
  const [selected, setSelected] = useState([]);
  const { permissions } = useAuthStore();
  //customs hooks
  const { isLoading, employees, total, currentPage, currentLimit, setPage, error } =
    useEmployees();
  const { roles, isLoadingRoles } = useRoles(); // Create

  // Check for permission errors
  useEffect(() => {
    if (error?.response?.status === 401) {
      setShowUnauthorized(true);
    }
  }, [error]);

  // Check permissions on mount
  useEffect(() => {
    if (!permissions?.Employee?.read) {
      setShowUnauthorized(true);
    }
  }, [permissions]);

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
      setSelected([]); // Clear selection after successful deletion
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
  // Form handlers
  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Apply filters to employees
  const filteredEmployees = employees.filter((employee) => {
    if (filters.role && employee.role?._id !== filters.role && employee.role !== filters.role) return false;
    if (filters.email && !employee.email?.toLowerCase().includes(filters.email.toLowerCase())) return false;
    if (filters.phone && !employee.phone?.includes(filters.phone)) return false;
    return true;
  });

  //handel all selectors type
  const allSelected = filteredEmployees?.length > 0 && selected.length === filteredEmployees.length;

  const handleSelectAll = () => {
    setSelected(allSelected ? [] : filteredEmployees?.map((c) => c._id) || []);
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
      role: "",
      email: "",
      phone: ""
    });
  };

  return (
    <>
      <UnauthorizedModal 
        isOpen={showUnauthorized} 
        onClose={() => setShowUnauthorized(false)} 
      />
      <PageLayout
        title="Employees"
        createText="Create Employee"
        onCreate={handleCreateClick}
        createPermission="Employee.write"
        onFilter={() => setFilterModalOpen(true)}
      >
      <div className="bg-white rounded-3xl shadow-2xl p-2 sm:p-4">
        <EmployeeTable
          employees={filteredEmployees}
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
        <FilterModal
          open={filterModalOpen}
          onClose={() => setFilterModalOpen(false)}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
          title="Filter Employees"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={filters.role}
              onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
            >
              <option value="">All Roles</option>
              {roles?.map((role) => (
                <option key={role._id} value={role._id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Search by email..."
              value={filters.email}
              onChange={(e) => setFilters(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Search by phone..."
              value={filters.phone}
              onChange={(e) => setFilters(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>
        </FilterModal>
      </div>
    </PageLayout>
    </>
  );
}
