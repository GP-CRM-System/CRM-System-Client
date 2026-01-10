import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getAllContacts, createContact, updateContact, deleteContact } from "../../../api/contacts";
import { getAllEmployees } from "../../../api/employees";
import PageLayout from "../../../components/PageLayout";
import { PermissionGuard, FilterModal } from "../../../components";
import ContactTabs from "./ContactTabs";
import ContactTable from "./ContactTable";
import ContactFormModal from "./ContactFormModal";
import Pagination from "./Pagination";

const Contact = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [editingContact, setEditingContact] = useState(null);
  const [filters, setFilters] = useState({ stage: "", owner: "" });
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    jobTitle: "",
    owner: "",
    stage: "",
    date: "",
  });
  const [formError, setFormError] = useState("");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const queryClient = useQueryClient();

  // Fetch contacts
  const { data: contactsData = {}, isLoading } = useQuery({
    queryKey: ["contacts", page, limit],
    queryFn: () => getAllContacts({ page, limit }),
    keepPreviousData: true,
  });

  const contacts = contactsData?.data?.data || [];
  const total = contactsData?.data?.total || 0;
  const currentPage = contactsData?.data?.page || page;
  const currentLimit = contactsData?.data?.limit || limit;

  // Fetch employees
  const { data: employeesData, isLoading: isLoadingEmployees } = useQuery({
    queryKey: ["employees"],
    queryFn: getAllEmployees,
  });

  let employees = [];
  if (employeesData) {
    if (Array.isArray(employeesData)) {
      employees = employeesData;
    } else if (
      employeesData.data &&
      Array.isArray(employeesData.data.employees)
    ) {
      employees = employeesData.data.employees;
    } else if (Array.isArray(employeesData.employees)) {
      employees = employeesData.employees;
    }
  }

  // Mutation for creating contact
  const createContactMutation = useMutation({
    mutationFn: (data) => {
      const payload = {
        ...data,
        stage: data.stage
          ? [
            {
              name: data.stage,
              date: data.date ? new Date(data.date) : new Date(),
            },
          ]
          : [],
      };
      return createContact(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);
      setModalOpen(false);
      setForm({
        name: "", email: "", phone: "", address: "", jobTitle: "", owner: "", stage: "", date: "",
      });
      setFormError("");
    },
    onError: (error) => {
      setFormError(error?.response?.data?.error || "Failed to create contact");
    },
  });

  // Mutation for updating contact
  const updateContactMutation = useMutation({
    mutationFn: ({ contactId, data }) => {
      const payload = {
        ...data,
        stage: data.stage
          ? [
            ...(editingContact?.stage || []),
            {
              name: data.stage,
              date: data.date ? new Date(data.date) : new Date(),
            },
          ]
          : editingContact?.stage,
      };
      return updateContact(contactId, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);
      setModalOpen(false);
      setEditingContact(null);
      setForm({
        name: "", email: "", phone: "", address: "", jobTitle: "", owner: "", stage: "", date: "",
      });
      setFormError("");
    },
    onError: (error) => {
      setFormError(error?.response?.data?.error || "Failed to update contact");
    },
  });

  // Mutation for deleting contact
  const deleteContactMutation = useMutation({
    mutationFn: (id) => deleteContact(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);
      setSelected([]); // Clear selection after successful deletion
    },
    onError: (error) => {
      setFormError(error?.response?.data?.error || "Failed to delete contact");
    },
  });

  // Filter contacts by tab and filters
  const filteredContacts = contacts.filter((contact) => {
    // Tab filter
    if (activeTab !== "All") {
      const lastStage = Array.isArray(contact.stage) && contact.stage.length > 0
        ? contact.stage[contact.stage.length - 1].name
        : "";
      if (activeTab === "Customers" && lastStage !== "Customer") return false;
      if (activeTab === "Leads" && lastStage !== "Leads" && lastStage !== "Lead") return false;
    }
    // Additional filters
    if (filters.stage && Array.isArray(contact.stage)) {
      const lastStage = contact.stage[contact.stage.length - 1]?.name;
      if (lastStage !== filters.stage) return false;
    }
    if (filters.owner && contact.owner !== filters.owner) return false;
    return true;
  });

  // Selection handlers
  const allSelected = filteredContacts.length > 0 && selected.length === filteredContacts.length;
  const handleSelectAll = () => setSelected(allSelected ? [] : filteredContacts.map((c) => c._id));
  const handleSelectOne = (id) => setSelected((sel) => sel.includes(id) ? sel.filter((sid) => sid !== id) : [...sel, id]);

  // Form handlers
  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setFormError("Name and Email are required");
      return;
    }
    if (editingContact) {
      updateContactMutation.mutate({ contactId: editingContact._id, data: form });
    } else {
      createContactMutation.mutate(form);
    }
  };

  const handleEditClick = (contact) => {
    setEditingContact(contact);
    const lastStage = Array.isArray(contact.stage) && contact.stage.length > 0
      ? contact.stage[contact.stage.length - 1]
      : null;

    setForm({
      name: contact.name || "",
      email: contact.email || "",
      phone: contact.phone || "",
      address: contact.address || "",
      jobTitle: contact.jobTitle || "",
      owner: contact.owner || "",
      stage: lastStage?.name || "",
      date: lastStage?.date ? new Date(lastStage.date).toISOString().split('T')[0] : "",
    });
    setModalOpen(true);
  };

  const handleCreateClick = () => {
    setEditingContact(null);
    setForm({
      name: "", email: "", phone: "", address: "", jobTitle: "", owner: "", stage: "", date: "",
    });
    setModalOpen(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric",
    });
  };

  const handleApplyFilters = () => {
    setFilterModalOpen(false);
  };

  const handleClearFilters = () => {
    setFilters({ stage: "", owner: "" });
  };

  return (
    <PageLayout
      title="Contacts"
      createText="Create Contact"
      onCreate={handleCreateClick}
      createPermission="Contact.write"
      onFilter={() => setFilterModalOpen(true)}
    >
      <div className="bg-white rounded-3xl shadow-2xl p-2 sm:p-4">
        <ContactTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <ContactTable
          contacts={filteredContacts}
          isLoading={isLoading}
          selected={selected}
          allSelected={allSelected}
          onSelectAll={handleSelectAll}
          onSelectOne={handleSelectOne}
          onEdit={handleEditClick}
          onDelete={(ids) => ids.forEach(id => deleteContactMutation.mutate(id))}
          formatDate={formatDate}
          onClearSelection={() => setSelected([])}
        />
        <Pagination
          page={currentPage}
          limit={currentLimit}
          total={total}
          onPageChange={setPage}
        />
        <ContactFormModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditingContact(null);
          }}
          form={form}
          formError={formError}
          onFormChange={handleFormChange}
          onSubmit={handleFormSubmit}
          employees={employees}
          isLoadingEmployees={isLoadingEmployees}
          isSubmitting={createContactMutation.isLoading || updateContactMutation.isLoading}
        />
        <FilterModal
          open={filterModalOpen}
          onClose={() => setFilterModalOpen(false)}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
          title="Filter Contacts"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={filters.stage}
              onChange={(e) => setFilters(prev => ({ ...prev, stage: e.target.value }))}
            >
              <option value="">All Stages</option>
              <option value="Lead">Lead</option>
              <option value="Customer">Customer</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Owner</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={filters.owner}
              onChange={(e) => setFilters(prev => ({ ...prev, owner: e.target.value }))}
            >
              <option value="">All Owners</option>
              {employees.map(emp => (
                <option key={emp._id} value={emp._id}>{emp.fullName}</option>
              ))}
            </select>
          </div>
        </FilterModal>
      </div>
    </PageLayout>
  );
};

export default Contact;
