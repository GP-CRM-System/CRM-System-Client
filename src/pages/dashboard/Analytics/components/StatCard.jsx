import React from 'react';
import { arrowDown, arrowUp } from '../../../../assets';
import Loader from '../../../../components/ui/Loader';

const StatCard = ({ title, value, change, isPositive, isLoading }) => (
    <div className="stat-card bg-white p-5 rounded-lg shadow-md">
        {isLoading ? (
            <div className="h-20 flex items-center justify-center">
                <Loader fullScreen={false} size="small" text="" />
            </div>
        ) : (
            <div className="flex flex-col">
                <div className="flex gap-4 mb-4">
                    {/* Blue Vertical Bar */}
                    <div className="w-[3px] bg-chart-primary rounded-full self-stretch opacity-90" style={{ backgroundColor: 'var(--color-chart-primary)' }} />

                    <div>
                        <p className="text-[var(--color-text-body)] text-sm font-medium mb-1 ">{title}</p>
                        <h2 className="text-2xl text-[var(--color-text-title)] tracking-tight">
                            {typeof value === 'number' && title.includes('Revenue')
                                ? `$${value.toLocaleString()}`
                                : typeof value === 'string' && (title.includes('Rate') || title.includes('Collection'))
                                    ? `${value}%`
                                    : value?.toLocaleString() || '0'}
                        </h2>
                    </div>
                </div>

                <div className={`flex items-center text-sm font-semibold ${isPositive ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>
                    <span className="text-lg mr-2">{isPositive ? <img src={arrowUp} alt="" /> : <img src={arrowDown} />}</span>
                    <span className="tracking-wide">
                        {isPositive ? '+' : ''} {Math.abs(change || 0)}% Since Last week
                    </span>
                </div>
            </div>
        )}
    </div>
);

export default StatCard;
