import SideModal from "../../../components/SideModal";

const STATUS_OPTIONS = [
  "New",
  "Waiting on Contact",
  "Waiting on Employee",
  "Closed",
];
const PRIORITY_OPTIONS = ["Low", "Medium", "High"];
const SOURCE_OPTIONS = ["Chat", "Email", "Phone", "Form"];

export default function TicketFormModal({
  open,
  onClose,
  form,
  formError,
  onFormChange,
  onSubmit,
  contacts,
  employees,
  isLoadingContacts,
  isSubmitting,
  isEditing,
}) {
  const handleStatusChange = (newStatus) => {
    const currentStatuses = form.status || [];
    const newStatusObj = {
      statusType: newStatus,
      date: new Date().toISOString(),
    };
    onFormChange("status", [...currentStatuses, newStatusObj]);
  };

  const getCurrentStatus = () => {
    if (!form.status || form.status.length === 0) return "New";
    return form.status[form.status.length - 1].statusType;
  };

  return (
    <SideModal
      open={open}
      onClose={onClose}
      title={isEditing ? "Edit Ticket" : "Create Ticket"}
    >
      <div className="space-y-4 pb-20">
        {formError && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
            {formError}
          </div>
        )}

        {/* Name */}
        <div className="my-4">
          <label className="block text-[20px] mb-4 font-medium text-gray-700">
            Ticket Name
          </label>
          <input
            type="text"
            placeholder="Enter ticket name"
            value={form.name || ""}
            onChange={(e) => onFormChange("name", e.target.value)}
            maxLength={50}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        {/* Status */}
        <div className="my-4">
          <label className="block text-[20px] font-medium text-gray-700 mb-4">
            Status
          </label>
          <div className="relative">
            <select
              value={getCurrentStatus()}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition pr-10"
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {/* Status History */}
          {form.status && form.status.length > 1 && (
            <div className="mt-3 p-3 my-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs font-medium text-gray-600 mb-2">
                Status History:
              </p>
              <div className="space-y-1">
                {form.status.map((status, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="font-medium text-gray-700">
                      {status.statusType}
                    </span>
                    <span className="text-gray-500">
                      {new Date(status.date).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Source */}
        <div className="my-4">
          <label className="block text-[20px] font-medium text-gray-700 mb-4">
            Source
          </label>
          <div className="relative">
            <select
              value={form.source || ""}
              onChange={(e) => onFormChange("source", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition pr-10"
            >
              <option value="">Select Source</option>
              {SOURCE_OPTIONS.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Priority */}
        <div className="my-4">
          <label className="block text-[20px] font-medium text-gray-700 mb-4">
            Priority
          </label>
          <div className="relative">
            <select
              value={form.priority || ""}
              onChange={(e) => onFormChange("priority", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition pr-10"
            >
              <option value="">Select Priority</option>
              {PRIORITY_OPTIONS.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="my-4">
          <label className="block text-[20px] font-medium text-gray-700 mb-4">
            Description
          </label>
          <textarea
            placeholder="Type a short description"
            value={form.description || ""}
            onChange={(e) => onFormChange("description", e.target.value)}
            maxLength={100}
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            {(form.description || "").length}/100 characters
          </p>
        </div>

        {/* Associate Ticket With Section */}
        <div className="pt-2 mt-22">
          <h3 className="text-base font-medium text-[24px] text-gray-800 mb-4">
            Associate Ticket With
          </h3>

          {/* Contact */}
          <div className="mb-5">
            <label className="block text-[20px] font-medium text-gray-700 mb-4">
              Contact
            </label>
            <div className="relative">
              <select
                value={form.contact || ""}
                onChange={(e) => onFormChange("contact", e.target.value)}
                disabled={isLoadingContacts}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition pr-10 disabled:bg-gray-50"
              >
                <option value="">
                  {isLoadingContacts ? "Loading contacts..." : "Select Contact"}
                </option>
                {contacts?.map((con) => (
                  <option key={con._id} value={con._id}>
                    {con.fullName || con.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Owner */}
          <div>
            <label className="block text-[20px] font-medium text-gray-700 mb-4">
              Owner
            </label>
            <div className="relative">
              <select
                value={form.owner || ""}
                onChange={(e) => onFormChange("owner", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition pr-10"
              >
                <option value="">Select Owner</option>
                {employees?.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.fullName || emp.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="sticky bottom-0 left-0 w-full px-6 py-4 bg-white border-t border-gray-100 z-20 mt-auto">
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Ticket' : 'Create Ticket')}
        </button>
      </div>
    </SideModal>
  );
}
