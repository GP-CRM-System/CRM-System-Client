import React from 'react';
import { Loader } from '../../../../components';


const GeographicalDistributionChart = ({ isLoading, className = "" }) => {
    const data = [
        { city: 'Cairo', value: 121799, max: 150000 },
        { city: 'Mansoura', value: 50799, max: 150000 },
        { city: 'Tanta', value: 25567, max: 150000 },
        { city: 'Alex', value: 5789, max: 150000 },
    ];

    const ticks = [0, 25000, 50000, 75000, 150000];

    const formatValue = (val) => {
        if (val === 0) return '0';
        if (val >= 1000) return `${val / 1000}k`;
        return val;
    };

    return (
        <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 ${className}`}>
            <h3 className="text-lg font-bold text-gray-900 mb-6">Geographical Distribution</h3>
            {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                    <Loader fullScreen={false} text="Loading distribution..." />
                </div>
            ) : (
                <div className="space-y-8 relative">
                    {/* Background Grid Lines */}
                    <div className="absolute inset-x-0 top-0 bottom-8 z-0">
                        {ticks.map((tick, index) => (
                            <div
                                key={`line-${index}`}
                                className="absolute top-0 bottom-0 border-r border-dashed border-gray-100"
                                style={{
                                    left: `${(tick / 150000) * 100}%`,
                                    borderColor: '#f0f0f0'
                                }}
                            />
                        ))}
                    </div>

                    {data.map((item) => (
                        <div key={item.city} className="relative z-10">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-sm font-medium text-gray-700">{item.city}</span>
                                <span className="text-sm font-bold text-blue-500">
                                    {item.value.toLocaleString()}
                                </span>
                            </div>
                            <div className="h-3 w-full bg-gray-50 rounded-full overflow-hidden relative">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-[#1E40AF] to-[#60A5FA]"
                                    style={{ width: `${(item.value / item.max) * 100}%` }}
                                />
                            </div>
                        </div>
                    ))}

                    {/* X-Axis Labels */}
                    <div className="relative h-6 mt-4">
                        {ticks.map((tick, index) => (
                            <div key={index}
                                className="absolute text-xs text-gray-400 font-medium transform -translate-x-1/2"
                                style={{
                                    left: `${(tick / 150000) * 100}%`,
                                    ...(index === 0 ? { left: '0%', transform: 'none' } : {}),
                                    ...(index === ticks.length - 1 ? { left: 'auto', right: '0', transform: 'none' } : {})
                                }}>
                                {formatValue(tick)}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GeographicalDistributionChart;
