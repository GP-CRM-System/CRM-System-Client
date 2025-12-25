import React from 'react';
import { Loader } from '../../../../components';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell,
    ResponsiveContainer
} from 'recharts';


const ProductPerformanceChart = ({ data, isLoading, className = "" }) => {
    return (
        <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 ${className}`}>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Product Standings</h3>
                <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Months</option>
                    <option>Days</option>
                    <option>Years</option>
                </select>
            </div>
            {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                    <Loader fullScreen={false} text="Loading standings..." />
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-chart-grid)" />
                        <XAxis dataKey="name" stroke="var(--color-chart-axis)" tick={{ fontSize: 12 }} />
                        <YAxis stroke="var(--color-chart-axis)" />
                        <Tooltip />
                        <Bar dataKey="sales" fill="var(--color-chart-secondary)" radius={[8, 8, 0, 0]}>
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={index === data.length - 1 ? 'var(--color-chart-dark)' : 'var(--color-chart-secondary)'}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default ProductPerformanceChart;
