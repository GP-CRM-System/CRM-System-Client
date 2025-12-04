import { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { getAllContacts, createContact } from '../../api/contacts';
import { getAllEmployees } from '../../api/employees';
import PageLayout from '../../components/PageLayout';
import { PermissionGuard } from '../../components';
import ContactTabs from './components/ContactTabs';
import ContactTable from './components/ContactTable';
import ContactFormModal from './components/ContactFormModal';
import Pagination from './components/Pagination';

const Contact = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('All');
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        jobTitle: '',
        owner: '',
        stage: '',
        date: '',
    });
    const [formError, setFormError] = useState('');
    const [selected, setSelected] = useState([]);
    
    const queryClient = useQueryClient();

    // Fetch contacts
    const { data: contactsRaw = {}, isLoading } = useQuery({
        queryKey: ['contacts'],
        queryFn: getAllContacts,
    });
    
    const contacts = contactsRaw?.data?.contacts || [];
    const page = contactsRaw?.data?.page || 1;
    const limit = contactsRaw?.data?.limit || 10;
    const total = contacts.length;

    // Fetch employees
    const { data: employeesRaw, isLoading: isLoadingEmployees } = useQuery({
        queryKey: ['employees'],
        queryFn: getAllEmployees,
    });
    
    let employees = [];
    if (employeesRaw) {
        if (Array.isArray(employeesRaw)) {
            employees = employeesRaw;
        } else if (employeesRaw.data && Array.isArray(employeesRaw.data.employees)) {
            employees = employeesRaw.data.employees;
        } else if (Array.isArray(employeesRaw.employees)) {
            employees = employeesRaw.employees;
        }
    }
    

    // Mutation for creating contact
    const createContactMutation = useMutation({
        mutationFn: (data) => {
            const { ...rest } = data;
            const payload = {
                ...rest,
                owner: data.owner,
                stage: data.stage
                    ? [{
                        name: data.stage,
                        date: (data.date && typeof data.date === 'string')
                            ? new Date(data.date)
                            : (data.date instanceof Date ? data.date : new Date())
                    }]
                    : [],
            };
            return createContact(payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['contacts']);
            setModalOpen(false);
            setForm({
                name: '', email: '', phone: '', address: '',
                jobTitle: '', owner: '', stage: '', date: '',
            });
            setFormError('');
        },
        onError: (error) => {
            setFormError(error?.response?.data?.error || 'Failed to create contact');
        },
    });

    // Filter contacts by tab
    const filteredContacts = contacts.filter(contact => {
        if (activeTab === 'All') return true;
        const stageName = Array.isArray(contact.stage) && contact.stage.length > 0 
            ? contact.stage[contact.stage.length - 1].name 
            : '';
        if (activeTab === 'Customers') return stageName === 'Customer';
        if (activeTab === 'Leads') return stageName === 'Leads' || stageName === 'Lead';
        return true;
    });

    // Selection handlers
    const allSelected = filteredContacts.length > 0 && selected.length === filteredContacts.length;
    
    const handleSelectAll = () => {
        setSelected(allSelected ? [] : filteredContacts.map(c => c._id));
    };
    
    const handleSelectOne = (id) => {
        setSelected(sel => sel.includes(id) ? sel.filter(sid => sid !== id) : [...sel, id]);
    };

    // Form handlers
    const handleFormChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.email) {
            setFormError('Name and Email are required');
            return;
        }
        createContactMutation.mutate(form);
    };

    const handleCreateClick = () => {
        setModalOpen(true);
    };

    // Helper for formatting date
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    return (
        <PageLayout
            title="Contacts"
            createText="Create Contact"
            onCreate={handleCreateClick}
            createPermission="Contact.f"
        >
            <div className="bg-white rounded-lg p-2 sm:p-4 min-h-[600px]">
                <ContactTabs
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />

                <ContactTable
                    contacts={filteredContacts}
                    isLoading={isLoading}
                    selected={selected}
                    allSelected={allSelected}
                    onSelectAll={handleSelectAll}
                    onSelectOne={handleSelectOne}
                    formatDate={formatDate}
                />

                <Pagination
                    page={page}
                    limit={limit}
                    total={total}
                    onPageChange={(newPage) => console.log('Page changed to:', newPage)}
                />

                {/* <PermissionGuard permission="Contact.write"> */}
                    <ContactFormModal
                        open={modalOpen}
                        onClose={() => setModalOpen(false)}
                        form={form}
                        formError={formError}
                        onFormChange={handleFormChange}
                        onSubmit={handleFormSubmit}
                        employees={employees}
                        isLoadingEmployees={isLoadingEmployees}
                        isSubmitting={createContactMutation.isLoading}
                    />
                {/* </PermissionGuard> */}
            </div>
        </PageLayout>
    );
};

export default Contact;
