import React, { useState } from "react";
import useCompanies from "./useCompanies";
import PageLayout from "../../../components/PageLayout";
import CompanyTable from "./CompanyTable";
import Pagination from "../Contacts/Pagination";
import CompanyFormModal from "./CompanyFormModal";
import { useCreateCompany } from "./useCreateCompany";
import { useContacts } from "./useContacts";
import { useEmployees } from "./useEmployees";
import { useDeleteCompany } from "./useDeleteCompany";
import toast from "react-hot-toast";
import { useUpdateCompany } from "./useEditCompany";
import { FilterModal } from "../../../components";

const Companies = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [filters, setFilters] = useState({ type: "", industry: "", owner: "", contact: "", website: "" });

  const [form, setForm] = useState({
    name: "",
    owner: "",
    contact: "",
    website: "",
    email: "",
    industry: "",
    type: "",
    address: "",
    numberOfEmployee: "",
  });
  const [formError, setFormError] = useState("");
  const [selected, setSelected] = useState([]);
  //customs hooks
  const { isLoading, companies, total, currentPage, currentLimit, setPage } =
    useCompanies();
  const getErrorMessage = (error) => {
    const errorData = error?.response?.data;
    if (typeof errorData?.error === "string") return errorData.error;
    if (Array.isArray(errorData?.error) && errorData.error.length > 0) {
      return errorData.error[0].message || "Validation error";
    }
    return errorData?.message || error?.message || "An unexpected error occurred";
  };

  const createCompanyMutation = useCreateCompany(
    () => {
      toast.success("Company created successfully!");
      setModalOpen(false);
      setForm({
        name: "",
        owner: "",
        contact: "",
        website: "",
        email: "",
        industry: "",
        type: "",
        address: "",
        numberOfEmployee: "",
      });
      setFormError("");
    },
    (error) => {
      const message = getErrorMessage(error);
      toast.error(message);
      setFormError(message);
    }
  );
  const updateCompanyMutation = useUpdateCompany(
    () => {
      toast.success("Company updated successfully!");
      setModalOpen(false);
      setEditingCompany(null);
      setForm({
        name: "",
        owner: "",
        contact: "",
        website: "",
        email: "",
        industry: "",
        type: "",
        address: "",
        numberOfEmployee: "",
      });
      setFormError("");
    },
    (error) => {
      const message = getErrorMessage(error);
      toast.error(message);
      setFormError(message);
    }
  );
  const { contacts, isLoadingContacts } = useContacts();
  const { employees } = useEmployees();
  const deleteCompanyMutation = useDeleteCompany(
    () => {
      setSelected([]); // Clear selection after successful deletion
      toast.success("Company deleted successfully!");
    },
    (error) => {
      toast.error(getErrorMessage(error));
    }
  );

  //////////////////////////////////////////////

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email) {
      setFormError("Name and Email are required");
      return;
    }
    // Update

    if (editingCompany) {
      updateCompanyMutation.mutate({
        companyId: editingCompany._id,
        data: form,
      });
    } else {
      // Create
      createCompanyMutation.mutate(form);
    }
  };

  // Handle Edit Click
  const handleEditClick = (company) => {
    setEditingCompany(company);
    setForm({
      name: company.name || "",
      owner: company.owner || "",
      contact: company.contact || "",
      website: company.website || "",
      email: company.email || "",
      industry: company.industry || "",
      type: company.type || "",
      address: company.address || "",
      numberOfEmployee: company.numberOfEmployee || "",
    });
    setModalOpen(true);
  };

  // Handle Create Click
  const handleCreateClick = () => {
    setEditingCompany(null);
    setForm({
      name: "",
      owner: "",
      contact: "",
      website: "",
      email: "",
      industry: "",
      type: "",
      address: "",
      numberOfEmployee: "",
    });
    setModalOpen(true);
  };

  // Apply filters to companies
  const filteredCompanies = companies.filter((company) => {
    if (filters.type && company.type !== filters.type) return false;
    if (filters.industry && company.industry !== filters.industry) return false;
    if (filters.owner && company.owner !== filters.owner) return false;
    if (filters.contact && company.contact !== filters.contact) return false;
    if (filters.website && company.website && !company.website.toLowerCase().includes(filters.website.toLowerCase())) return false;
    return true;
  });

  //handel all selctors type
  const allSelected =
    filteredCompanies?.length > 0 && selected.length === filteredCompanies.length;

  const handleSelectAll = () => {
    setSelected(allSelected ? [] : filteredCompanies?.map((c) => c._id) || []);
  };

  const handleSelectOne = (id) => {
    setSelected((sel) =>
      sel.includes(id) ? sel.filter((sid) => sid !== id) : [...sel, id]
    );
  };

  //
  // Form handlers
  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
  //

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
    setFilters({ type: "", industry: "", owner: "", contact: "", website: "" });
  };

  return (
    <PageLayout
      title="Companies"
      createText="Create Company"
      onCreate={handleCreateClick}
      createPermission="Company.write"
      onFilter={() => setFilterModalOpen(true)}
    >
      <div className="bg-white rounded-3xl shadow-2xl p-2 sm:p-4">
        <CompanyTable
          companies={filteredCompanies}
          isLoading={isLoading}
          selected={selected}
          allSelected={allSelected}
          onSelectAll={handleSelectAll}
          onSelectOne={handleSelectOne}
          onEdit={handleEditClick}
          formatDate={formatDate}
          contacts={contacts}
          employees={employees}
          onDelete={(companyId) => {
            {
              deleteCompanyMutation.mutate(companyId);
            }
          }}
        />
        <Pagination
          page={currentPage}
          limit={currentLimit}
          total={total}
          onPageChange={setPage}
        />
        <CompanyFormModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          form={form}
          formError={formError}
          onFormChange={handleFormChange}
          onSubmit={handleFormSubmit}
          contacts={contacts}
          employees={employees}
          isLoadingContacts={isLoadingContacts}
          isSubmitting={createCompanyMutation.isLoading}
          isEditing={!!editingCompany}
        />
        <FilterModal
          open={filterModalOpen}
          onClose={() => setFilterModalOpen(false)}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
          title="Filter Companies"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Owner</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={filters.owner}
              onChange={(e) => setFilters(prev => ({ ...prev, owner: e.target.value }))}
            >
              <option value="">All Owners</option>
              {employees?.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.fullName || emp.name}
                </option>
              ))}
            </select>
          </div>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
            >
              <option value="">All Types</option>
              <option value="Prospect">Prospect</option>
              <option value="Partner">Partner</option>
              <option value="Reseller">Reseller</option>
              <option value="Vendor">Vendor</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={filters.industry}
              onChange={(e) => setFilters(prev => ({ ...prev, industry: e.target.value }))}
            >
              <option value="">All Industries</option>
              <option value="Accounting">Accounting</option>
              <option value="Airlines">Airlines</option>
              <option value="Automotive">Automotive</option>
              <option value="Banking">Banking</option>
              <option value="Biotechnology">Biotechnology</option>
              <option value="Computer Software">Computer Software</option>
              <option value="Construction">Construction</option>
              <option value="Education Management">Education Management</option>
              <option value="Financial Services">Financial Services</option>
              <option value="Health, Wellness & Fitness">Health, Wellness & Fitness</option>
              <option value="Hospital & Health Care">Hospital & Health Care</option>
              <option value="Information Technology & Services">Information Technology & Services</option>
              <option value="Insurance">Insurance</option>
              <option value="Internet">Internet</option>
              <option value="Marketing & Advertising">Marketing & Advertising</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Retail">Retail</option>
              <option value="Telecommunications">Telecommunications</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Search by website..."
              value={filters.website}
              onChange={(e) => setFilters(prev => ({ ...prev, website: e.target.value }))}
            />
          </div>
        </FilterModal>
      </div>
    </PageLayout>
  );
};

export default Companies;
