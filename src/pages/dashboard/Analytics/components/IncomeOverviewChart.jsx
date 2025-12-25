import React from 'react';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Loader } from '../../../../components';

const IncomeOverviewChart = ({ isLoading, className = "" }) => {
    const data = [
        { name: 'Income', value: 100 }, // Full circle background or just use start/end angle
    ];

    const chartData = [
        { name: 'New', value: 65, color: '#3B82F6' }, // Blue
        { name: 'Rating', value: 35, color: '#93C5FD' }, // Light Blue
    ];

    return (
        <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 ${className}`}>
            <h3 className="text-lg font-bold text-gray-900 mb-6">Income Overview</h3>
            {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                    <Loader fullScreen={false} text="Loading overview..." />
                </div>
            ) : (
                <div className="relative flex flex-col items-center justify-center w-full">
                    <div className="h-[250px] w-full" style={{ minWidth: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    startAngle={200}
                                    endAngle={-20}
                                    innerRadius={80}
                                    outerRadius={100}
                                    cornerRadius={10}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>

                        {/* Centered Text */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                            <p className="text-gray-400 text-sm font-medium">Total income</p>
                            <h2 className="text-2xl font-bold text-gray-900">$54,000.00</h2>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="flex gap-8 mt-2">
                        {chartData.map((item) => (
                            <div key={item.name} className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: item.name === 'New' ? '#4F46E5' : '#93C5FD' }}
                                />
                                <span className="text-sm font-semibold text-gray-700">
                                    {item.name} <span className="text-gray-900 ml-1">{item.value}%</span>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default IncomeOverviewChart;
