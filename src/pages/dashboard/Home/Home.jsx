import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { API } from '../../../api';
import {
    HomeStatCard,
    SalesGrowthChart,
    DealsStageChart,
    RecentActivitiesTable
} from './components';
import {
    contact as contactIcon,
    companies as companyIcon,
    deals as dealsIcon,
    tickets as ticketsIcon
} from '../../../assets';
import Loader from '../../../components/ui/Loader';

const Home = () => {
    const { data: dashboardData, isLoading } = useQuery({
        queryKey: ['dashboard'],
        queryFn: API.Analytics.getDashboard,
    });

    if (isLoading) {
        return <Loader text="Loading Dashboard..." />;
    }

    const data = dashboardData?.data || {};

    console.log(data);

    const stats = [
        {
            title: "Total Contacts",
            value: data.totalContacts,
            change: 7,
            isPositive: true,
            icon: contactIcon,
            color: "blue"
        },
        {
            title: "Total Companies",
            value: data.totalCompanies,
            change: 5,
            isPositive: true,
            icon: companyIcon,
            color: "blue"
        },
        {
            title: "Deals",
            value: data.totalDeals,
            change: 3,
            isPositive: false,
            icon: dealsIcon,
            color: "blue"
        },
        {
            title: "Tickets Pending",
            value: data.totalPendingTickets,
            change: 2,
            isPositive: true,
            icon: ticketsIcon,
            color: "blue"
        }
    ];

    return (
        <div className="min-h-screen space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <HomeStatCard key={index} {...stat} />
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sales Growth Overview (2/3 width) */}
                <SalesGrowthChart
                    data={data.salesOverview}
                    isLoading={isLoading}
                    className="lg:col-span-2"
                />

                {/* Deals By Stage (1/3 width) */}
                <DealsStageChart
                    data={data.ticketOverview}
                    isLoading={isLoading}
                    className="lg:col-span-1"
                />
            </div>

            {/* Recent Activities Section */}
            <RecentActivitiesTable
                activities={data.recentActivities}
                isLoading={isLoading}
            />
        </div>
    );
};

export default Home;
