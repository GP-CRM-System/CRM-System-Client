import SideModal from "../../../components/SideModal";
import { industries } from "../../../constant/company";

export default function CompanyFormModal({
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
}) {
  return (
    <SideModal open={open} onClose={onClose} title="Create Company">
      <form id="company-form" className="space-y-4 pb-20" onSubmit={onSubmit}>
        {formError && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
            {formError}
          </div>
        )}

        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-gray-400"
            placeholder="e.g. Very beautiful company"
            value={form.name}
            onChange={(e) => onFormChange("name", e.target.value)}
            required
          />
        </div>

        {/* Owner */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Owner
          </label>
          <div className="relative">
            <select
              className="w-full appearance-none border  border-gray-300 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white hover:border-gray-400 cursor-pointer text-gray-700"
              value={form.owner}
              onChange={(e) => onFormChange("owner", e.target.value)}
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

        {/* Website */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Website
          </label>
          <input
            type="url"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-gray-400"
            placeholder="https://www.example.com"
            value={form.website}
            onChange={(e) => onFormChange("website", e.target.value)}
          />
        </div>

        {/* E-mail */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            E-mail <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-gray-400"
            placeholder="company@example.com"
            value={form.email}
            onChange={(e) => onFormChange("email", e.target.value)}
            required
          />
        </div>

        {/* Industry */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Industry
          </label>
          <div className="relative">
            <select
              className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white hover:border-gray-400 cursor-pointer text-gray-700"
              value={form.industry}
              onChange={(e) => onFormChange("industry", e.target.value)}
            >
              <option value="" className="text-gray-400">
                Select Industry
              </option>
              {industries.map((industry) => (
                <option
                  key={industry}
                  value={industry}
                  className="text-gray-700"
                >
                  {industry}
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

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <div className="relative">
            <select
              className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-gray-800 hover:border-gray-400 transition-colors cursor-pointer"
              value={form.type}
              onChange={(e) => onFormChange("type", e.target.value)}
            >
              <option value="" className="text-gray-400">
                Select Type
              </option>
              <option
                value="Prospect"
                className="text-gray-800 bg-white hover:bg-blue-50"
              >
                Prospect
              </option>
              <option
                value="Partner"
                className="text-gray-800 bg-white hover:bg-blue-50"
              >
                Partner
              </option>
              <option
                value="Reseller"
                className="text-gray-800 bg-white hover:bg-blue-50"
              >
                Reseller
              </option>
              <option
                value="Vendor"
                className="text-gray-800 bg-white hover:bg-blue-50"
              >
                Vendor
              </option>

              <option
                value="Other"
                className="text-gray-800 bg-white hover:bg-blue-50"
              >
                Other
              </option>
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

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-gray-400"
            placeholder="123 Main Street, City, Country"
            value={form.address}
            onChange={(e) => onFormChange("address", e.target.value)}
          />
        </div>

        {/* Number of Employees */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Employees
          </label>
          <input
            type="number"
            min="1"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-gray-400"
            placeholder="e.g. 50"
            value={form.numberOfEmployee}
            onChange={(e) => onFormChange("numberOfEmployee", e.target.value)}
          />
        </div>
      </form>
      
      <div className="sticky bottom-0 left-0 w-full px-6 py-4 bg-white border-t border-gray-100 z-20 mt-auto">
        <button
          type="submit"
          form="company-form"
          className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Company'}
        </button>
      </div>
    </SideModal>
  );
}
