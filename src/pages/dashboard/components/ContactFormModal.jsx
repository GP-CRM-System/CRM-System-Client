import React from 'react';
import SideModal from '../../../components/SideModal';

const ContactFormModal = ({
    open,
    onClose,
    form,
    formError,
    onFormChange,
    onSubmit,
    employees,
    isLoadingEmployees,
    isSubmitting
}) => {
    return (
        <SideModal open={open} onClose={onClose} title="Create Contact">
            <form className="space-y-4" onSubmit={onSubmit}>
                {formError && (
                    <div className="bg-red-50 text-red-600 p-3 rounded text-sm">{formError}</div>
                )}
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                    <input
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="e.g. Sarah Ali"
                        value={form.name}
                        onChange={e => onFormChange('name', e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                    <input
                        type="email"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="example@gmail.com"
                        value={form.email}
                        onChange={e => onFormChange('email', e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                        type="tel"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="010..."
                        value={form.phone}
                        onChange={e => onFormChange('phone', e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Address"
                        value={form.address}
                        onChange={e => onFormChange('address', e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                    <input
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="e.g. CEO"
                        value={form.jobTitle}
                        onChange={e => onFormChange('jobTitle', e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Owner</label>
                    <select
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        value={form.owner}
                        onChange={e => onFormChange('owner', e.target.value)}
                        disabled={isLoadingEmployees}
                    >
                        <option value="">Select Owner</option>
                        {employees
                            .filter(emp => emp && typeof emp === 'object' && '_id' in emp && 'fullName' in emp)
                            .map(emp => (
                                <option key={emp._id} value={emp._id}>{emp.fullName}</option>
                            ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
                    <select
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        value={form.stage}
                        onChange={e => onFormChange('stage', e.target.value)}
                    >
                        <option value="">Select Stage</option>
                        <option value="Lead">Lead</option>
                        <option value="Customer">Customer</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                        type="date"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        value={form.date}
                        onChange={e => onFormChange('date', e.target.value)}
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Creating...' : 'Create Contact'}
                    </button>
                </div>
            </form>
        </SideModal>
    );
};

export default ContactFormModal;
