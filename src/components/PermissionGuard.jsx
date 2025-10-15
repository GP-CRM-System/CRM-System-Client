import React from 'react';
import { useSelector } from 'react-redux';

const PermissionGuard = ({ permission, children, any = false }) => {
    const { permissions } = useSelector((state) => state.auth);
    if (!permissions || !Array.isArray(permissions)) return null;

    let required = [];
    if (Array.isArray(permission)) {
        required = permission.map(p => String(p).trim()).filter(Boolean);
    } else if (typeof permission === 'string') {
        required = permission.split(',').map(p => p.trim()).filter(Boolean);
    } else if (permission) {
        required = [String(permission)];
    }

    if (required.length === 0) {
        return children;
    }

    const allowed = any
        ? required.some(p => permissions.includes(p))
        : required.every(p => permissions.includes(p));

    if (!allowed) return null;
    return children;
};

export default PermissionGuard;
