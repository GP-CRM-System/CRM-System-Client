import { useState } from "react";
import useDeals from "./useDeals";
import { useCreateDeal } from "./useCreateDeals";
import toast from "react-hot-toast";
import { useUpdateDeal } from "./useEditDeals";
import { useDeleteDeal } from "./useDeleteDeals";
import { useContacts } from "../Companies/useContacts";
import { useEmployees } from "../Companies/useEmployees";
import PageLayout from "../../../components/PageLayout";
import DealsTable from "./DealsTable";
import DealsFormModal from "./DealsFormModal";
import Pagination from "../Contacts/Pagination";
import useCompanies from "../Companies/useCompanies";

export default function Deals() {
  //main hooks
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState(null);
  const [form, setForm] = useState({
    name: "",
    amount: "",
    owner: "",
    contact: "",
    priority: "Medium",
    stage: "Contract Sent",
    company: "",
  });

  const [formError, setFormError] = useState("");
  const [selected, setSelected] = useState([]);

  //// customs hooks
  const { isLoading, deals, total, currentPage, currentLimit, setPage } =
    useDeals();
  const { contacts, isLoadingContacts } = useContacts();
  const { employees } = useEmployees();
  const { companies } = useCompanies();

  // Create
  const createDealMutation = useCreateDeal(
    () => {
      setModalOpen(false);
      setForm({
        name: "",
        amount: "",
        owner: "",
        contact: "",
        priority: "Medium",
        stage: "Contract Sent",
        company: "",
      });
      setFormError("");
      toast.success("Deal created successfully!");
    },
    (error) => {
      toast.error(error?.response?.data?.error || "Failed to create deal");
      setFormError(error?.response?.data?.error || "Failed to create deal");
    }
  );

  // Update
  const updateDealMutation = useUpdateDeal(
    () => {
      toast.success("Deal updated successfully!");
      setModalOpen(false);
      setEditingDeal(null);
      setForm({
        name: "",
        amount: "",
        owner: "",
        contact: "",
        priority: "Medium",
        stage: "Contract Sent",
        company: "",
      });
      setFormError("");
    },
    (error) => {
      toast.error(error?.response?.data?.error || "Failed to update deal");
      setFormError(error?.response?.data?.error || "Failed to update deal");
    }
  );

  const deleteDealMutation = useDeleteDeal(
    () => {
      toast.success("Deal deleted successfully!");
    },
    (error) => {
      toast.error(error?.response?.data?.error || "Failed to delete deal");
    }
  );

  //handel submit
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.owner) {
      setFormError("Name and Owner are required");
      return;
    }

    const payload = {
      ...form,
      amount: Number(form.amount) || 0,
      priority: form.priority
        ? form.priority.charAt(0).toUpperCase() + form.priority.slice(1)
        : "Medium",
      stage: form.stage || "Contract Sent",
    };

    if (editingDeal) {
      updateDealMutation.mutate(
        { dealId: editingDeal._id, data: payload },
        {
          onError: (error) => {
            const message =
              error?.response?.data?.error ||
              error?.response?.data?.message ||
              "Failed to update deal";

            setFormError(message);
            toast.error(message);
          },
        }
      );
    } else {
      createDealMutation.mutate(payload, {
        onError: (error) => {
          const err = error?.response?.data;

          const message = Array.isArray(err?.error)
            ? err.error[0]?.message || err.error[0]
            : err?.error || err?.message || "Failed to create deal";

          setFormError(message);
          toast.error(message);
        },
      });
    }
  };

  // Handle Edit Click
  const handleEditClick = (deal) => {
    setEditingDeal(deal);

    const currentStage =
      deal.stage && deal.stage.length > 0
        ? deal.stage[deal.stage.length - 1].name
        : "Contract Sent";

    const ownerId =
      typeof deal.owner === "object" && deal.owner?._id
        ? deal.owner._id
        : deal.owner || "";

    const contactId =
      typeof deal.contact === "object" && deal.contact?._id
        ? deal.contact._id
        : deal.contact || "";

    const companyId =
      typeof deal.company === "object" && deal.company?._id
        ? deal.company._id
        : deal.company || "";

    const formData = {
      name: deal.name,
      amount: deal.amount,
      owner: ownerId,
      contact: contactId,
      priority: deal.priority || "Medium",
      company: companyId,
      stage: currentStage,
    };

    setForm(formData);
    setModalOpen(true);
  };

  const handleCreateClick = () => {
    setEditingDeal(null);
    setForm({
      name: "",
      amount: "",
      owner: "",
      contact: "",
      priority: "Medium",
      stage: "Contract Sent",
      company: "",
    });
    setModalOpen(true);
  };

  //handel all selectors type
  const allSelected = deals?.length > 0 && selected.length === deals.length;

  const handleSelectAll = () => {
    setSelected(allSelected ? [] : deals?.map((c) => c._id) || []);
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
      title="Deals"
      createText="Create Deal"
      onCreate={handleCreateClick}
      createPermission="Deal.write"
    >
      <div className="bg-white rounded-lg shadow-xl p-2 sm:p-4">
        <DealsTable
          deals={deals}
          isLoading={isLoading}
          selected={selected}
          allSelected={allSelected}
          onSelectAll={handleSelectAll}
          onSelectOne={handleSelectOne}
          onEdit={handleEditClick}
          formatDate={formatDate}
          contacts={contacts}
          companies={companies}
          employees={employees}
          onDelete={(dealId) => deleteDealMutation.mutate(dealId)}
        />

        <Pagination
          page={currentPage}
          limit={currentLimit}
          total={total}
          onPageChange={setPage}
        />

        <DealsFormModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          form={form}
          formError={formError}
          onFormChange={handleFormChange}
          onSubmit={handleFormSubmit}
          contacts={contacts}
          employees={employees}
          companies={companies}
          isLoadingContacts={isLoadingContacts}
          isSubmitting={
            editingDeal
              ? updateDealMutation.isLoading
              : createDealMutation.isLoading
          }
          isEditing={!!editingDeal}
        />
      </div>
    </PageLayout>
  );
}
