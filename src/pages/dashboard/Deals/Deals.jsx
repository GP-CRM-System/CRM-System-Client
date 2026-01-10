import { useState } from "react";
import useDeals from "./useDeals";
import { useCreateDeal } from "./useCreateDeals";
import toast from "react-hot-toast";
import { useUpdateDeal } from "./useEditDeals";
import { useDeleteDeal } from "./useDeleteDeals";
import PageLayout from "../../../components/PageLayout";
import DealsTable from "./DealsTable";
import DealsFormModal from "./DealsFormModal";
import Pagination from "../Contacts/Pagination";
import { useLookupData } from "../../../hooks/useLookupData";
import { FilterModal } from "../../../components";

export default function Deals() {
  //main hooks
  const [modalOpen, setModalOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState(null);
  const [filters, setFilters] = useState({ priority: "", stage: "", owner: "", company: "", contact: "", minAmount: "", maxAmount: "" });
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
  const { contacts, companies, employees, isLoading: isLoadingLookups } = useLookupData();

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
      setSelected([]); // Clear selection after successful deletion
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

  // Form handlers
  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Apply filters to deals
  const filteredDeals = deals.filter((deal) => {
    if (filters.priority && deal.priority?.toLowerCase() !== filters.priority.toLowerCase()) return false;
    if (filters.stage && deal.stage !== filters.stage) return false;
    if (filters.company && deal.company?._id !== filters.company && deal.company !== filters.company) return false;
    if (filters.contact && deal.contact?._id !== filters.contact && deal.contact !== filters.contact) return false;
    if (filters.owner && deal.owner?._id !== filters.owner && deal.owner !== filters.owner) return false;
    if (filters.minAmount && deal.amount < parseFloat(filters.minAmount)) return false;
    if (filters.maxAmount && deal.amount > parseFloat(filters.maxAmount)) return false;
    return true;
  });

  //handel all selectors type
  const allSelected = filteredDeals?.length > 0 && selected.length === filteredDeals.length;

  const handleSelectAll = () => {
    setSelected(allSelected ? [] : filteredDeals?.map((c) => c._id) || []);
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
    setFilters({ priority: "", stage: "", owner: "", company: "", contact: "", minAmount: "", maxAmount: "" });
  };

  return (
    <PageLayout
      title="Deals"
      createText="Create Deal"
      onCreate={handleCreateClick}
      createPermission="Deal.write"
      onFilter={() => setFilterModalOpen(true)}
    >
      <div className="bg-white rounded-3xl shadow-2xl p-2 sm:p-4">
        <DealsTable
          deals={filteredDeals}
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
          isLoadingContacts={isLoadingLookups}
          isSubmitting={
            editingDeal
              ? updateDealMutation.isLoading
              : createDealMutation.isLoading
          }
          isEditing={!!editingDeal}
        />
        <FilterModal
          open={filterModalOpen}
          onClose={() => setFilterModalOpen(false)}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
          title="Filter Deals"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={filters.company}
              onChange={(e) => setFilters(prev => ({ ...prev, company: e.target.value }))}
            >
              <option value="">All Companies</option>
              {companies?.map((comp) => (
                <option key={comp._id} value={comp._id}>
                  {comp.name}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={filters.priority}
              onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
            >
              <option value="">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
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
              <option value="Qualification">Qualification</option>
              <option value="Needs Analysis">Needs Analysis</option>
              <option value="Value Proposition">Value Proposition</option>
              <option value="Identify Decision Makers">Identify Decision Makers</option>
              <option value="Perception Analysis">Perception Analysis</option>
              <option value="Proposal/Price Quote">Proposal/Price Quote</option>
              <option value="Negotiation/Review">Negotiation/Review</option>
              <option value="Closed Won">Closed Won</option>
              <option value="Closed Lost">Closed Lost</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Min Amount</label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Minimum amount"
              value={filters.minAmount}
              onChange={(e) => setFilters(prev => ({ ...prev, minAmount: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Amount</label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Maximum amount"
              value={filters.maxAmount}
              onChange={(e) => setFilters(prev => ({ ...prev, maxAmount: e.target.value }))}
            />
          </div>
        </FilterModal>
      </div>
    </PageLayout>
  );
}
