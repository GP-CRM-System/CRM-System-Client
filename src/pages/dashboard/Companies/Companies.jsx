import React, { useState } from "react";
import useCompanies from "./useCompanies";
import PageLayout from "../../../components/PageLayout";
import CompanyTable from "./CompanyTable";
import Pagination from "../Contacts/Pagination";
import CompanyFormModal from "./CompanyFormModal";
import { useCreateCompany } from "./useCreateCompany";
import { useContacts } from "./useContacts";
import { useEmployees } from "./useEmployees";
import { useDeleteCompany } from "./useDeleteCompant";
import toast from "react-hot-toast";
import { useUpdateCompany } from "./useEditCompany";

const Companies = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null); // ← للتعديل

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
  const createCompanyMutation = useCreateCompany(
    () => {
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
      toast.error(error?.response?.data?.error || "Failed to delete company");
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
      toast.error(error?.response?.data?.error || "Failed to update company");
      setFormError(error?.response?.data?.error || "Failed to update company");
    }
  );
  const { contacts, isLoadingContacts } = useContacts();
  const { employees } = useEmployees();
  const deleteCompanyMutation = useDeleteCompany(
    () => {
      toast.success("Company deleted successfully!");
    },
    (error) => {
      toast.error(error?.response?.data?.error || "Failed to delete company");
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
  //handel all selctors type
  const allSelected =
    companies.length > 0 && selected.length === companies.length;

  const handleSelectAll = () => {
    setSelected(allSelected ? [] : companies.map((c) => c._id));
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
  return (
    <PageLayout
      title="Companies"
      createText="Create Company"
      onCreate={handleCreateClick}
      createPermission="Company.write"
    >
      <div className="bg-white rounded-lg shadow-xl p-2 sm:p-4">
        <CompanyTable
          companies={companies}
          isLoading={isLoading}
          selected={selected}
          allSelected={allSelected}
          onSelectAll={handleSelectAll}
          onSelectOne={handleSelectOne}
          onEdit={handleEditClick}
          formatDate={formatDate}
          contacts={contacts}
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
      </div>
    </PageLayout>
  );
};

export default Companies;
