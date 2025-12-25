import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { API } from '../../../api';
import {
    StatCard,
    RevenueChart,
    ProductPerformanceChart,
    TicketDistributionChart,
    LeadConversionChart,
    GeographicalDistributionChart,
    IncomeOverviewChart
} from './components';

const Analytics = () => {
    // Fetch all analytics data
    const { data: cardsData, isLoading: cardsLoading } = useQuery({
        queryKey: ['analytics', 'cards'],
        queryFn: API.Analytics.getCards,
    });

    const { data: revenueData, isLoading: revenueLoading } = useQuery({
        queryKey: ['analytics', 'revenue'],
        queryFn: API.Analytics.getRevenueTrends,
    });

    const { data: ticketData, isLoading: ticketLoading } = useQuery({
        queryKey: ['analytics', 'tickets'],
        queryFn: API.Analytics.getTicketStatuses,
    });

    const { data: productData, isLoading: productLoading } = useQuery({
        queryKey: ['analytics', 'products'],
        queryFn: API.Analytics.getProductPerformance,
    });

    const { data: leadData, isLoading: leadLoading } = useQuery({
        queryKey: ['analytics', 'leads'],
        queryFn: API.Analytics.getLeadConversions,
    });

    const cards = cardsData?.data || {};
    const revenue = revenueData?.data || [];
    const tickets = ticketData?.data || [];
    const products = (productData?.data || []).slice(0, 6); // Top 6 products
    const leads = (leadData?.data || []).slice(0, 3); // Top 3 leads

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatCard
                    title="Total Revenue"
                    value={cards.totalRevenue}
                    change={cards.revenueChange}
                    isPositive={cards.revenueChange >= 0}
                    isLoading={cardsLoading}
                />
                <StatCard
                    title="Total Orders"
                    value={cards.numberOfOrders}
                    change={cards.ordersChange}
                    isPositive={cards.ordersChange >= 0}
                    isLoading={cardsLoading}
                />
                <StatCard
                    title="Conversion Rate"
                    value={cards.conversionRate}
                    change={cards.conversionChange}
                    isPositive={cards.conversionChange <= 0}
                    isLoading={cardsLoading}
                />
                <StatCard
                    title="Collection Rate"
                    value={cards.cancellationRate}
                    change={cards.cancellationChange}
                    isPositive={cards.cancellationChange >= 0}
                    isLoading={cardsLoading}
                />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Total Order Line Chart (60%) */}
                <RevenueChart data={revenue} isLoading={revenueLoading} className="lg:col-span-3" />

                {/* Product Standings Bar Chart (40%) */}
                <ProductPerformanceChart data={products} isLoading={productLoading} className="lg:col-span-2" />

                {/* Ticket Distribution Pie Chart (60%) */}
                <TicketDistributionChart data={tickets} isLoading={ticketLoading} className="lg:col-span-2" />

                {/* Lead-Customer Flow Horizontal Bar Chart (40%) */}
                <LeadConversionChart data={leads} isLoading={leadLoading} className="lg:col-span-3" />

                {/* Geographical Distribution Chart (60%) */}
                <GeographicalDistributionChart isLoading={false} className="lg:col-span-3" />

                {/* Income Overview Chart (40%) */}
                <IncomeOverviewChart isLoading={false} className="lg:col-span-2" />
            </div>
        </div>
    );
};

export default Analytics;
