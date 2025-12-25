import React from 'react';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { Loader } from '../../../../components';

const RevenueChart = ({ data, isLoading, className = "" }) => {
    return (
        <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 ${className}`}>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Total Order</h3>
                <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Months</option>
                    <option>Days</option>
                    <option>Years</option>
                </select>
            </div>
            {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                    <Loader fullScreen={false} text="Loading orders..." />
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={250} minWidth={0} minHeight={0}>
                    <LineChart data={data}>
                        <defs>
                            <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-chart-primary)" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="var(--color-chart-primary)" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="var(--color-chart-tertiary)" />
                                <stop offset="100%" stopColor="var(--color-chart-primary)" />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-chart-grid)" vertical={false} />
                        <XAxis
                            dataKey="month"
                            stroke="var(--color-chart-axis)"
                            axisLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
                            tickLine={false}
                            tick={{ fontWeight: 'bold', fill: '#000000', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            stroke="var(--color-chart-axis)"
                            axisLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
                            tickLine={false}
                            tick={{ fontWeight: 'bold', fill: '#000000', fontSize: 12 }}
                        />
                        <Tooltip />
                        <Line
                            type="natural"
                            dataKey="orders"
                            stroke="url(#strokeGradient)"
                            strokeWidth={3}
                            dot={false}
                            fill="url(#colorOrders)"
                            fillOpacity={1}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default RevenueChart;
