import SideModal from "../../../components/SideModal";

const PRIORITY_OPTIONS = ["low", "medium", "high"];

export default function DealsFormModal({
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
  companies,
}) {
  return (
    <SideModal
      open={open}
      onClose={onClose}
      title={isEditing ? "Edit Deal" : "Create Deal"}
    >
      <form id="deal-form" className="space-y-4 pb-20" onSubmit={onSubmit}>
        {formError && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
            {formError}
          </div>
        )}

        {/* Deal Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deal Name <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-gray-400"
            placeholder="e.g. Q4 Enterprise Deal"
            value={form.name}
            onChange={(e) => onFormChange("name", e.target.value)}
            required
          />
        </div>
        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company
          </label>
          <div className="relative">
            <select
              className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white hover:border-gray-400 cursor-pointer text-gray-700"
              value={form.company}
              onChange={(e) => onFormChange("company", e.target.value)}
            >
              <option value="" className="text-gray-400">
                Select Company
              </option>

              {companies?.map((comp) => (
                <option
                  key={comp._id}
                  value={comp._id}
                  className="text-gray-700"
                >
                  {comp.name}
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

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-gray-400"
            placeholder="e.g. 50000"
            value={form.amount}
            onChange={(e) => onFormChange("amount", e.target.value)}
          />
        </div>

        {/* Owner */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Owner <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white hover:border-gray-400 cursor-pointer text-gray-700"
              value={form.owner}
              onChange={(e) => onFormChange("owner", e.target.value)}
              required
            >
              <option value="" className="text-gray-400">
                Select Owner
              </option>
              {employees
                ?.filter(
                  (emp) =>
                    emp &&
                    typeof emp === "object" &&
                    "_id" in emp &&
                    ("fullName" in emp || "name" in emp)
                )
                .map((emp) => (
                  <option
                    key={emp._id}
                    value={emp._id}
                    className="text-gray-700 hover:text-blue-500"
                  >
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

        {/* Contact */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact
          </label>
          <div className="relative">
            <select
              className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white hover:border-gray-400 cursor-pointer disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-500 text-gray-700"
              value={form.contact}
              onChange={(e) => onFormChange("contact", e.target.value)}
              disabled={isLoadingContacts}
            >
              <option value="" className="text-gray-400">
                {isLoadingContacts ? "Loading contacts..." : "Select Contact"}
              </option>
              {contacts
                ?.filter(
                  (con) =>
                    con &&
                    typeof con === "object" &&
                    "_id" in con &&
                    ("fullName" in con || "name" in con)
                )
                .map((con) => (
                  <option
                    key={con._id}
                    value={con._id}
                    className="text-gray-700"
                  >
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
        {/* Stage */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stage
          </label>
          <div className="relative">
            <select
              className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white hover:border-gray-400 cursor-pointer text-gray-700"
              value={form.stage || "Contract Sent"}
              onChange={(e) => onFormChange("stage", e.target.value)}
            >
              <option value="Contract Sent">Contract Sent</option>
              <option value="Closed Won">Closed Won</option>
              <option value="Closed Lost">Closed Lost</option>
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <div className="relative">
            <select
              className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white hover:border-gray-400 cursor-pointer text-gray-700"
              value={form.priority}
              onChange={(e) => onFormChange("priority", e.target.value)}
            >
              <option value="" className="text-gray-400">
                Select Priority
              </option>
              {PRIORITY_OPTIONS.map((priority) => (
                <option
                  key={priority}
                  value={priority}
                  className="text-gray-700"
                >
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
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

      </form>
      
      <div className="sticky bottom-0 left-0 w-full px-6 py-4 bg-white border-t border-gray-100 z-20 mt-auto">
        <button
          type="submit"
          form="deals-form"
          className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Deal' : 'Create Deal')}
        </button>
      </div>
    </SideModal>
  );
}
