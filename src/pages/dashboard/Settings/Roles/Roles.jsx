
import React, { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import { HiPlus } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { API } from '../../../../api';
import RoleFormModal from './components/RoleFormModal';
import DeleteRoleModal from './components/DeleteRoleModal';
import ViewRoleModal from './components/ViewRoleModal';
import Loader from '../../../../components/ui/Loader';
import { trash, edit, user } from '../../../../assets';
import PermissionGuard from '../../../../components/guard/PermissionGuard';
import UnauthorizedModal from '../../../../components/ui/UnauthorizedModal';
import useAuthStore from '../../../../store/authStore';

const Roles = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRole, setEditingRole] = useState(null);
    const [deletingRole, setDeletingRole] = useState(null);
    const [viewingRole, setViewingRole] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showUnauthorized, setShowUnauthorized] = useState(false);
    const queryClient = useQueryClient();
    const { permissions } = useAuthStore();

    const initialRoleState = {
        name: '',
        description: '',
        permissions: {
            Employee: { all: false, read: false, write: false, delete: false },
            Contact: { all: false, read: false, write: false, delete: false },
            Company: { all: false, read: false, write: false, delete: false },
            Deal: { all: false, read: false, write: false, delete: false },
            Ticket: { all: false, read: false, write: false, delete: false },
            Order: { all: false, read: false, write: false, delete: false },
            Role: { all: false, read: false, write: false, delete: false },
            Analytics: { all: false, read: false, write: false },
        }
    };

    const [newRole, setNewRole] = useState(initialRoleState);

    const resources = ['Employee', 'Contact', 'Company', 'Deal', 'Ticket', 'Order', 'Role', 'Analytics'];

    const { data: rolesData, isLoading } = useQuery({
        queryKey: ['roles'],
        queryFn: () => API.Role.getRoles(),
        retry: false,
        onError: (err) => {
            if (err.response?.status === 401) {
                setShowUnauthorized(true);
                toast.error('You don\'t have permission to view roles');
            }
        }
    });

    // Check permissions on mount
    useEffect(() => {
        if (!permissions?.Role?.read) {
            setShowUnauthorized(true);
        }
    }, [permissions]);
    
    const createRoleMutation = useMutation({
        mutationFn: (data) => API.Role.createRole(data),
        onSuccess: () => {
            queryClient.invalidateQueries(['roles']);
            handleCloseModal();
            toast.success('Role created successfully!');
        },
        onError: (error) => {
            toast.error(`Failed to create role: ${error.message}`);
        }
    });

    const updateRoleMutation = useMutation({
        mutationFn: ({ id, data }) => API.Role.updateRole(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['roles']);
            handleCloseModal();
            toast.success('Role updated successfully!');
        },
        onError: (error) => {
            toast.error(`Failed to update role: ${error.message}`);
        }
    });

    const deleteRoleMutation = useMutation({
        mutationFn: (id) => API.Role.deleteRole(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['roles']);
            setDeletingRole(null);
            toast.success('Role deleted successfully!');
        },
        onError: (error) => {
            toast.error(`Failed to delete role: ${error.message}`);
        }
    });

    const roles = rolesData?.data?.roles || [];

    const processRoleData = (role) => {
        let totalPerms = 0;
        let grantedPerms = 0;
        const activeResources = [];

        resources.forEach(res => {
            if (role[res]) {
                const perms = role[res];
                totalPerms += 3;
                if (perms.read) grantedPerms++;
                if (perms.write) grantedPerms++;
                if (perms.delete) grantedPerms++;

                if (perms.read || perms.write || perms.delete) {
                    activeResources.push(res === 'Employee' ? 'Employees' : res === 'Contact' ? 'Contacts' : res === 'Company' ? 'Companies' : res);
                }
            }
        });

        // Dynamic Tags Logic: 3 shown + N more
        const tags = activeResources.slice(0, 3);
        const moreCount = activeResources.length - 3;
        if (moreCount > 0) {
            tags.push(`+${moreCount} More`);
        }

        const progress = totalPerms > 0 ? (grantedPerms / totalPerms) * 100 : 0;
        const access = progress === 100 ? 'Full Access to all resources' : progress > 0 ? 'Custom Access to resources' : 'No Access';

        return {
            ...role,
            users: role.userCount || 0,
            tags,
            access,
            progress,
            grantedPerms,
            totalPerms,
            icon: role.name.charAt(0).toUpperCase()
        };
    };

    const togglePermission = (resource, type) => {
        const setter = editingRole ? setEditingRole : setNewRole;

        setter(prev => {
            const resourcePerms = { ...prev.permissions[resource] };

            if (type === 'all') {
                const newVal = !resourcePerms.all;
                resourcePerms.all = newVal;
                resourcePerms.read = newVal;
                resourcePerms.write = newVal;
                resourcePerms.delete = newVal;
            } else {
                resourcePerms[type] = !resourcePerms[type];
                if (!resourcePerms[type]) resourcePerms.all = false;
                if (resourcePerms.read && resourcePerms.write && resourcePerms.delete) resourcePerms.all = true;
            }

            return {
                ...prev,
                permissions: { ...prev.permissions, [resource]: resourcePerms }
            };
        });
    };

    const handleEditRole = (role, viewOnly = false) => {
        const permissions = {};
        resources.forEach(res => {
            if (role[res]) {
                const perms = role[res];
                const all = perms.read && perms.write && perms.delete;
                permissions[res] = {
                    all,
                    read: perms.read || false,
                    write: perms.write || false,
                    delete: perms.delete || false
                };
            } else {
                permissions[res] = { all: false, read: false, write: false, delete: false };
            }
        });

        const formattedRole = {
            _id: role._id,
            name: role.name,
            description: role.description || '',
            permissions,
            originalRole: role // Store original role to prevent data loss
        };

        if (viewOnly) {
            setViewingRole(formattedRole);
        } else {
            setEditingRole(formattedRole);
            setViewingRole(null); // Close view modal if opening edit
        }
    };

    const handleSaveRole = () => {
        const roleData = editingRole || newRole;

        const apiPermissions = {};
        resources.forEach(res => {
            apiPermissions[res] = {
                read: roleData.permissions[res].read,
                write: roleData.permissions[res].write,
                delete: roleData.permissions[res].delete
            };
        });

        const payload = {
            name: roleData.name,
            description: roleData.description,
            ...apiPermissions
        };

        if (editingRole) {
            // Update existing role
            updateRoleMutation.mutate({ id: editingRole._id, data: payload });
        } else {
            // Create new role
            createRoleMutation.mutate(payload);
        }
    };

    const handleDeleteRole = () => {
        if (deletingRole) {
            deleteRoleMutation.mutate(deletingRole._id);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingRole(null);
        setNewRole(initialRoleState);
    };

    if (isLoading) {
        return (
            <PermissionGuard permission="Role.read">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex-1">
                    <div className="flex items-center justify-center h-96">
                        <Loader fullScreen={false} size="lg" text="Loading Roles..." />
                    </div>
                </div>
            </PermissionGuard>
        );
    }

    // Show unauthorized modal if no permission
    if (showUnauthorized || !permissions?.Role?.read) {
        return <UnauthorizedModal isOpen={true} onClose={() => setShowUnauthorized(false)} />;
    }

    const displayRoles = roles.map(processRoleData);

    return (
        <PermissionGuard permission="Role.read">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex-1">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <h2 className="text-xl font-bold text-gray-900">Role</h2>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search"
                                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm w-64"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-[var(--color-primary-500)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-primary-600)] flex items-center gap-2 text-sm font-medium transition-colors"
                        >
                            <HiPlus className="w-4 h-4" /> Create Role
                        </button>
                    </div>
                </div>

                {/* Roles Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
                    {displayRoles.map((role) => (
                        <div
                            key={role._id}
                            onClick={() => handleEditRole(role, true)}
                            className="w-[237px] h-[206px] border border-gray-100 
                            rounded-xl p-5 hover:shadow-md transition-all flex flex-col justify-between 
                            cursor-pointer group hover:border-blue-200"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex gap-3">
                                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 font-bold text-base flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                                            <img src={user} alt="" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-medium text-sm leading-tight mb-0.5 transition-colors truncate" style={{ color: 'var(--color-text-title)' }} title={role.name}>
                                                {role.name.length > 11 ? role.name.slice(0, 11) + '…' : role.name}
                                            </h3>
                                            <p className="text-xs" style={{ color: 'var(--color-text-body)' }}>{role.users} Users</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                                        <button
                                            onClick={() => handleEditRole(role)}
                                            className="p-1 hover:bg-blue-50 rounded-lg text-gray-400 hover:text-blue-600 transition-colors"
                                        >
                                            <img src={edit} alt="" />
                                        </button>
                                        <button
                                            onClick={() => setDeletingRole(role)}
                                            className="p-1 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <img src={trash} alt="" />
                                        </button>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <p className="text-xs mb-2 truncate" style={{ color: 'var(--color-text-body)' }} title={role.access}>{role.access}</p>
                                    <div className="w-full rounded-full h-1.5" style={{ backgroundColor: 'var(--color-primary-100)' }}>
                                        <div className="h-1.5 rounded-full" style={{ width: `${role.progress}%`, backgroundColor: 'var(--color-primary-500)' }}></div>
                                    </div>
                                    <p className="text-[10px] text-right mt-1" style={{ color: 'var(--color-text-input)' }}>{role.grantedPerms}/{role.totalPerms}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-1.5 mt-auto">
                                {role.tags.map((tag, idx) => (
                                    <span key={idx} className={`text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 whitespace-nowrap ${tag.includes('+') ? 'bg-gray-100 text-gray-900 font-bold' : ''} `}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Create/Edit Role Modal */}
                <RoleFormModal
                    isOpen={isModalOpen || !!editingRole}
                    onClose={handleCloseModal}
                    onSave={handleSaveRole}
                    roleData={editingRole || newRole}
                    setRoleData={editingRole ? setEditingRole : setNewRole}
                    resources={resources}
                    togglePermission={togglePermission}
                    isPending={updateRoleMutation.isPending || createRoleMutation.isPending}
                />

                {/* Delete Confirmation Modal */}
                <DeleteRoleModal
                    isOpen={!!deletingRole}
                    onClose={() => setDeletingRole(null)}
                    onConfirm={handleDeleteRole}
                    roleName={deletingRole?.name}
                    userCount={deletingRole?.userCount}
                    isPending={deleteRoleMutation.isPending}
                />

                {/* View Role Modal */}
                <ViewRoleModal
                    isOpen={!!viewingRole}
                    onClose={() => setViewingRole(null)}
                    roleData={viewingRole}
                    resources={resources}
                    onEdit={(role) => handleEditRole(role)}
                />
            </div>
        </PermissionGuard>
    );
};

export default Roles;
