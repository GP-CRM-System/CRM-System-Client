import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const DealsStageChart = ({ data, isLoading, className = "" }) => {
    // Stage colors matching the design
    const COLORS = ['#0F172A', '#93C5FD', '#3B82F6'];

    return (
        <div className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-[396px] w-full max-w-[335px] flex flex-col ${className}`}>
            <h3 className="text-lg font-bold text-gray-900 mb-8">Deals By stage</h3>

            <div className="flex-1 w-full min-h-[250px]">
                {isLoading ? (
                    <div className="w-full h-full animate-pulse bg-gray-50 rounded-lg" />
                ) : (
                    <>
                        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={2}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    iconType="circle"
                                    iconSize={8}
                                    formatter={(value) => <span className="text-xs font-semibold text-gray-600">{value}</span>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </>
                )}
            </div>
        </div>
    );
};

export default DealsStageChart;
