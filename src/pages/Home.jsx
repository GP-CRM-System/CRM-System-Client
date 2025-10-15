import React from 'react';
import { PermissionGuard } from '../components';

const Home = () => (
    <div className="space-y-4">
        <div className="bg-white rounded-lg shadow-sm h-32 flex items-center justify-center">
            {/* Pass multiple permissions as an array (AND logic by default) */}
            <PermissionGuard permission={["user:delete", "project:view"]}>
                <h1 className="text-2xl font-semibold">Home Content (requires both permissions)</h1>
            </PermissionGuard>
        </div>

        <div className="bg-white rounded-lg shadow-sm h-32 flex items-center justify-center">
            {/* OR logic example: any=true will allow if user has at least one permission */}
            <PermissionGuard permission={["user:delete", "project:view"]} any={true}>
                <h1 className="text-2xl font-semibold">Home Content (requires any of the permissions)</h1>
            </PermissionGuard>
        </div>
    </div>
);

export default Home;
