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
    const [page, setPage] = useState(1);
    const [limit] = useState(9);
    const queryClient = useQueryClient();

    // Fetch contacts
    const { data: contactsData = {}, isLoading } = useQuery({
        queryKey: ['contacts', page, limit],
        queryFn: () => getAllContacts({ page, limit }),
        keepPreviousData: true,
    });

    const contacts = contactsData?.data?.contacts || [];
    const total = contactsData?.data?.total || contactsData?.data?.contacts?.length || 0;
    const currentPage = contactsData?.data?.page || page;
    const currentLimit = contactsData?.data?.limit || limit;

    // Fetch employees
    const { data: employeesData, isLoading: isLoadingEmployees } = useQuery({
        queryKey: ['employees'],
        queryFn: getAllEmployees,
    });
    
    let employees = [];
    if (employeesData) {
        if (Array.isArray(employeesData)) {
            employees = employeesData;
        } else if (employeesData.data && Array.isArray(employeesData.data.employees)) {
            employees = employeesData.data.employees;
        } else if (Array.isArray(employeesData.employees)) {
            employees = employeesData.employees;
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
                name: '', 
                email: '', 
                phone: '', 
                address: '',
                jobTitle: '', 
                owner: '', 
                stage: '', 
                date: '',
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
            createPermission="Contact.write"
        >
            <div className="bg-white rounded-lg shadow-xl p-2 sm:p-4">
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
                    page={currentPage}
                    limit={currentLimit}
                    total={total}
                    onPageChange={setPage}
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
