import React from 'react';
import { arrowDown, arrowUp } from '../../../../assets';

const HomeStatCard = ({ title, value, change, isPositive, icon: Icon, color = "blue" }) => {
    const colorClasses = {
        blue: "bg-blue-600",
        green: "bg-green-500",
        red: "bg-red-500",
        amber: "bg-amber-500"
    };

    const iconBgClasses = {
        blue: "bg-blue-50 text-blue-600",
        green: "bg-green-50 text-green-600",
        red: "bg-red-50 text-red-600",
        amber: "bg-amber-50 text-amber-600"
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-full hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                    {/* Vertical Bar */}
                    <div className={`w-1 rounded-full self-stretch ${colorClasses[color] || colorClasses.blue}`} />

                    <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
                        <h3 className="text-2xl font-bold text-gray-900">
                            {typeof value === 'number' ? value.toLocaleString() : value || '0'}
                        </h3>
                    </div>
                </div>

                {/* Icon Circle */}
                <div className={`p-3 rounded-full ${iconBgClasses[color] || iconBgClasses.blue}`}>
                    {Icon && <img src={Icon} alt="" className="w-5 h-5 object-contain" />}
                </div>
            </div>

            {/* Trend Indicator */}
            <div className={`flex items-center gap-1.5 text-sm font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                <img src={isPositive ? arrowUp : arrowDown} alt="" className="w-4 h-4" />
                <span>{Math.abs(change || 0)}% Since Last week</span>
            </div>
        </div>
    );
};

export default HomeStatCard;
