import React from 'react';

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { Loader } from '../../../../components';

const TicketDistributionChart = ({ data, isLoading, className = "" }) => {
    const PIE_COLORS = ['var(--color-chart-dark)', 'var(--color-chart-secondary)', 'var(--color-chart-tertiary)'];

    return (
        <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 ${className}`}>
            <h3 className="text-lg font-bold text-gray-900 mb-6">Ticket Distribution</h3>
            {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                    <Loader fullScreen={false} text="Loading distribution..." />
                </div>
            ) : (
                <div className="flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={320} minWidth={0} minHeight={0}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={0}
                                outerRadius={90}
                                fill="#8884d8"
                                paddingAngle={0}
                                dataKey="value"
                                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                                    const RADIAN = Math.PI / 180;

                                    // Position for percentage inside the slice
                                    const radiusInner = innerRadius + (outerRadius - innerRadius) * 0.5;
                                    const xInner = cx + radiusInner * Math.cos(-midAngle * RADIAN);
                                    const yInner = cy + radiusInner * Math.sin(-midAngle * RADIAN);

                                    // Dot position - slightly inside the chart (85% from center)
                                    const radiusDot = outerRadius * 0.85;
                                    const xDot = cx + radiusDot * Math.cos(-midAngle * RADIAN);
                                    const yDot = cy + radiusDot * Math.sin(-midAngle * RADIAN);

                                    // Short line endpoint (30px from edge)
                                    const radiusLine = outerRadius + 30;
                                    const xLine = cx + radiusLine * Math.cos(-midAngle * RADIAN);
                                    const yLine = cy + radiusLine * Math.sin(-midAngle * RADIAN);

                                    // Label position
                                    const radiusLabel = outerRadius + 40;
                                    const xLabel = cx + radiusLabel * Math.cos(-midAngle * RADIAN);
                                    const yLabel = cy + radiusLabel * Math.sin(-midAngle * RADIAN);

                                    // Determine label alignment
                                    const angle = (-midAngle + 360) % 360;
                                    const isLeft = angle > 90 && angle < 270;

                                    const ticket = data[index];

                                    // Calculate label box position
                                    const labelX = isLeft ? xLabel - 75 : xLabel - 5;

                                    return (
                                        <g>
                                            {/* Percentage inside slice */}
                                            <text
                                                x={xInner}
                                                y={yInner}
                                                fill="white"
                                                textAnchor="middle"
                                                dominantBaseline="central"
                                                className="text-base font-semibold"
                                            >
                                                {`${(percent * 100).toFixed(0)}%`}
                                            </text>

                                            {/* Short connecting line */}
                                            <line
                                                x1={xDot}
                                                y1={yDot}
                                                x2={xLine}
                                                y2={yLine}
                                                stroke="var(--color-chart-axis)"
                                                strokeWidth={1.5}
                                            />

                                            {/* Dark blue dot at the edge */}
                                            <circle
                                                cx={xDot}
                                                cy={yDot}
                                                r={4.5}
                                                fill="var(--color-chart-dot)"
                                                stroke="none"
                                            />

                                            {/* Label box */}
                                            <foreignObject
                                                x={labelX}
                                                y={yLabel - 20}
                                                width="80"
                                                height="40"
                                            >
                                                <div
                                                    style={{
                                                        backgroundColor: 'var(--color-chart-label-bg)',
                                                        borderRadius: '8px',
                                                        padding: '10px 16px',
                                                        color: 'white',
                                                        fontSize: '14px',
                                                        fontWeight: '600',
                                                        textAlign: 'center',
                                                        whiteSpace: 'nowrap',
                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                    }}
                                                >
                                                    {ticket?.name}
                                                </div>
                                            </foreignObject>
                                        </g>
                                    );
                                }}
                            >
                                {data.map((entry, index) => {
                                    const colorMap = {
                                        'open': 'var(--color-chart-dark)',
                                        'pending': 'var(--color-chart-secondary)',
                                        'closed': 'var(--color-chart-tertiary)'
                                    };
                                    return (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={colorMap[entry.status] || PIE_COLORS[index % PIE_COLORS.length]}
                                        />
                                    );
                                })}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};

export default TicketDistributionChart;
