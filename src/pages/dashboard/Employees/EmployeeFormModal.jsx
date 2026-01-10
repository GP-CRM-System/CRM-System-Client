import SideModal from "../../../components/SideModal";

export default function EmployeeFormModal({
  open,
  onClose,
  form,
  formError,
  onFormChange,
  onSubmit,
  roles,
  isLoadingRoles,
  isSubmitting,
  isEditing,
}) {
  return (
    <SideModal
      open={open}
      onClose={onClose}
      title={isEditing ? "Update Employee" : "Create Employee"}
    >
      <form id="employee-form" className="space-y-4 pb-20" onSubmit={onSubmit}>
        {formError && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
            {formError}
          </div>
        )}

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-gray-400"
            placeholder="e.g. John Doe"
            value={form.fullName}
            onChange={(e) => onFormChange("fullName", e.target.value)}
            minLength={3}
            maxLength={50}
            pattern="^[a-zA-Z\s]+$"
            title="Only letters and spaces allowed"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            3-50 characters, only letters and spaces
          </p>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-gray-400"
            placeholder="e.g. 1234567890"
            value={form.phone}
            onChange={(e) => onFormChange("phone", e.target.value)}
            minLength={7}
            maxLength={14}
            pattern="^[0-9]+$"
            title="Only numbers allowed"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            7-14 characters, only numbers
          </p>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-gray-400"
            placeholder="john.doe@example.com"
            value={form.email}
            onChange={(e) => onFormChange("email", e.target.value)}
            required
          />
        </div>

        {/* Password */}
        {!isEditing && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-gray-400"
              placeholder="Enter password"
              value={form.password}
              onChange={(e) => onFormChange("password", e.target.value)}
              minLength={8}
              maxLength={64}
              required
            />
            <p className="text-xs text-gray-500 mt-1">8-64 characters</p>
          </div>
        )}

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white hover:border-gray-400 cursor-pointer disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-500 text-gray-700"
              value={form.role}
              onChange={(e) => onFormChange("role", e.target.value)}
              disabled={isLoadingRoles}
              required
            >
              <option value="" className="text-gray-400">
                {isLoadingRoles ? "Loading roles..." : "Select Role"}
              </option>
              {roles
                ?.filter(
                  (role) =>
                    role &&
                    typeof role === "object" &&
                    "_id" in role &&
                    "name" in role
                )
                .map((role) => (
                  <option
                    key={role._id}
                    value={role._id}
                    className="text-gray-700"
                  >
                    {role.name}
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
          form="employee-form"
          className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Employee' : 'Create Employee')}
        </button>
      </div>
    </SideModal>
  );
}
