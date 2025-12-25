import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart
} from 'recharts';

const SalesGrowthChart = ({ data, isLoading, className = "" }) => {
    return (
        <div className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[396px] w-full max-w-[775px] ${className}`}>
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-gray-900">Sales Grows Overview</h3>
                {/* Period Selector */}
                <div className="relative">
                    <select className="appearance-none bg-gray-50 pr-8 pl-4 py-2 border border-gray-100 rounded-xl text-sm font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer">
                        <option>Last 5 days</option>
                        <option>Last Month</option>
                        <option>Last Year</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full min-h-0">
                {isLoading ? (
                    <div className="w-full h-full animate-pulse bg-gray-50 rounded-lg" />
                ) : (
                    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="0" vertical={false} stroke="#F3F4F6" />
                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 600 }}
                                dy={15}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 600 }}
                                dx={-10}
                            />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: '12px',
                                    border: 'none',
                                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#3B82F6"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorRevenue)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};

export default SalesGrowthChart;
