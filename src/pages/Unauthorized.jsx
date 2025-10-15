import React from 'react';

const Unauthorized = () => (
    <div className="flex items-center justify-center h-full">
        <div className="bg-white p-8 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Unauthorized</h2>
            <p className="text-gray-600">You don't have permission to view this page.</p>
        </div>
    </div>
);

export default Unauthorized;
