import { useState } from "react";
import { useTickets } from "./useTickets";
import { useDeleteTicket } from "./useDeleteTicket";
import toast from "react-hot-toast";
import { useUpdateTicket } from "./useEditTicket";
import { useCreateTicket } from "./useCreateTicket";
import PageLayout from "../../../components/PageLayout";
import Pagination from "../Contacts/Pagination";
import TicketTable from "./TicketTable";
import TicketFormModal from "./TicketFormModal";
import TicketDetailModal from "./TicketDetailModal";
import { useLookupData } from "../../../hooks/useLookupData";
import { FilterModal } from "../../../components";

export default function Tickets() {
  //main hooks
  const [modalOpen, setModalOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [viewTicket, setViewTicket] = useState(null);
  const [filters, setFilters] = useState({ status: "", priority: "" });
  const [form, setForm] = useState({
    name: "",
    status: [
      {
        statusType: "New",
        date: new Date().toISOString(),
      },
    ],
    description: "",
    owner: "",
    priority: "Medium",
    contact: "",
    source: "Email",
  });
  const [formError, setFormError] = useState("");
  const [selected, setSelected] = useState([]);
  ///// custome hooks
  const { isLoading, tickets, total, currentPage, currentLimit, setPage } =
    useTickets();
  const { contacts, employees, isLoading: isLoadingLookups } = useLookupData();
  //create
  const createTicketMutation = useCreateTicket(
    () => {
      setModalOpen(false);
      setForm({
        name: "",
        status: [
          {
            statusType: "New",
            date: new Date().toISOString(),
          },
        ],
        description: "",
        owner: "",
        priority: "Medium",
        contact: "",
        source: "Email",
      });
      setFormError("");
      toast.success("Ticket created successfully!");
    },
    (error) => {
      toast.error(error?.response?.data?.error || "Failed to create ticket");
      setFormError(error?.response?.data?.error || "Failed to create ticket");
    }
  );

  // Update
  const updateTicketMutation = useUpdateTicket(
    () => {
      toast.success("Ticket updated successfully!");
      setModalOpen(false);
      setEditingTicket(null);
      setForm({
        name: "",
        status: [
          {
            statusType: "New",
            date: new Date().toISOString(),
          },
        ],
        description: "",
        owner: "",
        priority: "Medium",
        contact: "",
        source: "Email",
      });
      setFormError("");
    },
    (error) => {
      toast.error(error?.response?.data?.error || "Failed to update ticket");
      setFormError(error?.response?.data?.error || "Failed to update ticket");
    }
  );

  const deleteTicketMutation = useDeleteTicket(
    () => {
      setSelected([]); // Clear selection after successful deletion
      toast.success("Ticket deleted successfully!");
    },
    (error) => {
      toast.error(error?.response?.data?.error || "Failed to delete ticket");
    }
  );
  //
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (!form.name || form.name.trim().length === 0) {
      setFormError("Name is required");
      return;
    }

    if (form.name.length < 3 || form.name.length > 50) {
      setFormError("Name must be between 3 and 50 characters");
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(form.name)) {
      setFormError("Name can only contain letters and spaces");
      return;
    }

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

    const payload = {
      name: form.name.trim(),
      status: form.status || [
        {
          statusType: "New",
          date: new Date().toISOString(),
        },
      ],
      description: form.description.trim(),
      owner: form.owner,
      priority: form.priority || "Medium",
      contact: form.contact,
      source: form.source || "Email",
    };

    // Update Ticket
    if (editingTicket) {
      updateTicketMutation.mutate(
        { ticketId: editingTicket._id, data: payload },
        {
          onError: (error) => {
            const message =
              error?.response?.data?.error ||
              error?.response?.data?.message ||
              "Failed to update ticket";

            setFormError(message);
            toast.error(message);
          },
        }
      );
    } else {
      createTicketMutation.mutate(payload, {
        onError: (error) => {
          const err = error?.response?.data;

          const message = Array.isArray(err?.error)
            ? err.error[0]?.message || err.error[0]
            : err?.error || err?.message || "Failed to create ticket";

          setFormError(message);
          toast.error(message);
        },
      });
    }
  };

  const handleViewTicket = (ticket) => {
    setViewTicket(ticket);
  };

  const handleEditClick = (ticket) => {
    setEditingTicket(ticket);

    const ownerId =
      typeof ticket.owner === "object" && ticket.owner?._id
        ? ticket.owner._id
        : ticket.owner || "";

    const contactId =
      typeof ticket.contact === "object" && ticket.contact?._id
        ? ticket.contact._id
        : ticket.contact || "";

    const formData = {
      name: ticket.name || "",
      status: ticket.status || [
        {
          statusType: "New",
          date: new Date().toISOString(),
        },
      ],
      description: ticket.description || "",
      owner: ownerId,
      priority: ticket.priority || "Medium",
      contact: contactId,
      source: ticket.source || "Email",
    };

    setForm(formData);
    setModalOpen(true);
  };

  const handleCreateClick = () => {
    setEditingTicket(null);
    setForm({
      name: "",
      status: [
        {
          statusType: "New",
          date: new Date().toISOString(),
        },
      ],
      description: "",
      owner: "",
      priority: "Medium",
      contact: "",
      source: "Email",
    });
    setModalOpen(true);
  };

  // Form handlers
  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Apply filters to tickets
  const filteredTickets = tickets.filter((ticket) => {
    const currentStatus = ticket.status && ticket.status.length > 0 
      ? ticket.status[ticket.status.length - 1].statusType 
      : "New";
    
    if (filters.status && currentStatus !== filters.status) return false;
    if (filters.priority && ticket.priority !== filters.priority) return false;
    if (filters.contact && ticket.contact?._id !== filters.contact && ticket.contact !== filters.contact) return false;
    if (filters.owner && ticket.owner?._id !== filters.owner && ticket.owner !== filters.owner) return false;
    if (filters.source && ticket.source !== filters.source) return false;
    return true;
  });

  //handel all selectors type
  const allSelected = filteredTickets?.length > 0 && selected.length === filteredTickets.length;

  const handleSelectAll = () => {
    setSelected(allSelected ? [] : filteredTickets?.map((c) => c._id) || []);
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
      status: "", 
      priority: "",
      contact: "",
      owner: "",
      source: ""
    });
  };

  return (
    <PageLayout
      title="Tickets"
      createText="Create Ticket"
      onCreate={handleCreateClick}
      createPermission="Ticket.write"
      onFilter={() => setFilterModalOpen(true)}
    >
      <div className="bg-white rounded-3xl shadow-2xl p-2 sm:p-4">
        <TicketTable
          tickets={filteredTickets}
          isLoading={isLoading}
          selected={selected}
          allSelected={allSelected}
          onSelectAll={handleSelectAll}
          onSelectOne={handleSelectOne}
          onEdit={handleEditClick}
          formatDate={formatDate}
          contacts={contacts}
          employees={employees}
          onDelete={(ticketId) => deleteTicketMutation.mutate(ticketId)}
          onView={handleViewTicket}
        />
        <TicketFormModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          form={form}
          formError={formError}
          onFormChange={handleFormChange}
          onSubmit={handleFormSubmit}
          contacts={contacts}
          employees={employees}
          isLoadingContacts={isLoadingLookups}
          isSubmitting={
            editingTicket
              ? updateTicketMutation.isLoading
              : createTicketMutation.isLoading
          }
          isEditing={!!editingTicket}
        />
        <Pagination
          page={currentPage}
          limit={currentLimit}
          total={total}
          onPageChange={setPage}
        />
        <FilterModal
          open={filterModalOpen}
          onClose={() => setFilterModalOpen(false)}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
          title="Filter Tickets"
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="">All Statuses</option>
              <option value="New">New</option>
              <option value="Waiting on Contact">Waiting on Contact</option>
              <option value="Waiting on Employee">Waiting on Employee</option>
              <option value="Closed">Closed</option>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={filters.source}
              onChange={(e) => setFilters(prev => ({ ...prev, source: e.target.value }))}
            >
              <option value="">All Sources</option>
              <option value="Chat">Chat</option>
              <option value="Email">Email</option>
              <option value="Phone">Phone</option>
              <option value="Form">Form</option>
            </select>
          </div>
        </FilterModal>
        <TicketDetailModal
          isOpen={!!viewTicket}
          onClose={() => setViewTicket(null)}
          ticket={viewTicket}
          employee={employees?.find(e => e._id === viewTicket?.owner || e._id === viewTicket?.owner?._id)}
          contact={contacts?.find(c => c._id === viewTicket?.contact || c._id === viewTicket?.contact?._id)}
        />
      </div>
    </PageLayout>
  );
}
