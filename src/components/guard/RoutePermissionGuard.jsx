import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import UnauthorizedModal from '../ui/UnauthorizedModal';

const RoutePermissionGuard = ({ permission, children, any = false }) => {
    const permissions = useAuthStore((state) => state.permissions);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login', { replace: true });
            return;
        }

        if (!permission) {
            return;
        }

        if (!permissions || typeof permissions !== 'object') {
            console.log('RoutePermissionGuard: No permissions found');
            setShowModal(true);
            return;
        }

        let permissionsToCheck = [];
        
        if (typeof permission === 'string') {
            const [resource, action] = permission.split('.');
            permissionsToCheck = [{ resource, action }];
        } else if (Array.isArray(permission)) {
            if (permission.length === 0) {
                setShowModal(true);
                return;
            }
            if (typeof permission[0] === 'string') {
                permissionsToCheck = permission.map(perm => {
                    const [resource, action] = perm.split('.');
                    return { resource, action };
                });
            } else {
                permissionsToCheck = permission;
            }
        } else {
            setShowModal(true);
            return;
        }

        const allowed = any
            ? permissionsToCheck.some(({ resource, action }) => 
                permissions[resource]?.[action] === true
            )
            : permissionsToCheck.every(({ resource, action }) => 
                permissions[resource]?.[action] === true
            );

        if (!allowed) {
            console.log('RoutePermissionGuard: Access denied for', permissionsToCheck);
            console.log('RoutePermissionGuard: Current permissions:', permissions);
            setShowModal(true);
        } else {
            setShowModal(false);
        }
    }, [permission, permissions, isAuthenticated, any, navigate]);

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/dashboard/home', { replace: true });
    };

    if (!isAuthenticated) {
        return null;
    }

    if (!permission) {
        return children;
    }

    if (!permissions || typeof permissions !== 'object') {
        return <UnauthorizedModal isOpen={showModal} onClose={handleCloseModal} />;
    }

    let permissionsToCheck = [];
    
    if (typeof permission === 'string') {
        const [resource, action] = permission.split('.');
        permissionsToCheck = [{ resource, action }];
    } else if (Array.isArray(permission)) {
        if (permission.length === 0) {
            return <UnauthorizedModal isOpen={showModal} onClose={handleCloseModal} />;
        }
        if (typeof permission[0] === 'string') {
            permissionsToCheck = permission.map(perm => {
                const [resource, action] = perm.split('.');
                return { resource, action };
            });
        } else {
            permissionsToCheck = permission;
        }
    } else {
        return <UnauthorizedModal isOpen={showModal} onClose={handleCloseModal} />;
    }

    const allowed = any
        ? permissionsToCheck.some(({ resource, action }) => 
            permissions[resource]?.[action] === true
        )
        : permissionsToCheck.every(({ resource, action }) => 
            permissions[resource]?.[action] === true
        );

    if (!allowed) {
        return <UnauthorizedModal isOpen={showModal} onClose={handleCloseModal} />;
    }

    return children;
};

export default RoutePermissionGuard;
