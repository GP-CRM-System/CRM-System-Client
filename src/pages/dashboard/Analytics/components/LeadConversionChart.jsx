import React from 'react';
import { Loader } from '../../../../components';


const LeadConversionChart = ({ data, isLoading, className = "" }) => {
    return (
        <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 ${className}`}>
            <h3 className="text-lg font-bold text-gray-900 mb-6">Lead-Customer Flow</h3>
            {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                    <Loader fullScreen={false} text="Loading flow..." />
                </div>
            ) : (
                <div className="space-y-4 py-4">
                    {(() => {
                        // Aggregate data for funnel visualization
                        const totalLeads = data.reduce((sum, lead) => sum + (lead.leadsHandled || 0), 0);
                        const totalConversions = data.reduce((sum, lead) => sum + (lead.conversions || 0), 0);
                        const inProgress = totalLeads - totalConversions;

                        const funnelData = [
                            { label: 'Leads', value: totalLeads, color: 'var(--color-chart-dark)' },
                            { label: 'In-Progress', value: inProgress, color: 'var(--color-chart-secondary)' },
                            { label: 'Converted', value: totalConversions, color: 'var(--color-chart-tertiary)' }
                        ];

                        const maxValue = Math.max(...funnelData.map(d => d.value));

                        return (
                            <>
                                {funnelData.map((item, index) => {
                                    const width = maxValue > 0 ? (item.value / maxValue) * 100 : 0;

                                    return (
                                        <div key={item.label} className="relative">
                                            <div className="w-full bg-gray-50 rounded-lg h-12 relative overflow-hidden">
                                                <div
                                                    className="h-12 rounded-lg flex items-center justify-end pr-4 text-white text-sm font-semibold transition-all duration-500"
                                                    style={{
                                                        width: `${width}%`,
                                                        backgroundColor: item.color,
                                                    }}
                                                >
                                                    {item.value}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* Legend */}
                                <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-gray-100">
                                    {funnelData.map((item) => (
                                        <div key={item.label} className="flex items-center gap-2">
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{ backgroundColor: item.color }}
                                            />
                                            <span className="text-sm text-gray-600">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        );
                    })()}
                </div>
            )}
        </div>
    );
};

export default LeadConversionChart;
