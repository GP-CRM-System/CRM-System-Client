import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import { Home, Contact, Companies, Deals, Tickets, Order, Employee } from './dashboard/index.js';
import useAuthStore from '../store/authStore';
import { useMutation } from '@tanstack/react-query';
import { logout as logoutAPI } from '../api/auth';

const Dashboard = () => {
	const navigate = useNavigate();
	const logout = useAuthStore((state) => state.logout);
	const [sidebarOpen, setSidebarOpen] = useState(true);

	const logoutMutation = useMutation({
		mutationFn: logoutAPI,
		onSuccess: () => {
			logout();
			navigate('/', { replace: true });
		},
		onError: () => {
			logout();
			navigate('/', { replace: true });
		},
	});

	const handleLogout = () => {
		logoutMutation.mutate();
	};

	return (
		<div className="flex h-screen overflow-hidden bg-gray-50">
			<Sidebar onLogout={handleLogout} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Mobile menu button */}
				<div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center">
					<button
						onClick={() => setSidebarOpen(!sidebarOpen)}
						type="button"
						className="text-gray-500 hover:text-gray-700"
					>
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					</button>
					<h1 className="ml-4 text-lg font-semibold text-gray-900">Dashboard</h1>
				</div>
				<main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="contact" element={<Contact />} />
						<Route path="companies" element={<Companies />} />
						<Route path="deals" element={<Deals />} />
						<Route path="tickets" element={<Tickets />} />
						<Route path="order" element={<Order />} />
						<Route path="employee" element={<Employee />} />
					</Routes>
				</main>
			</div>
		</div>
	);
};

export default Dashboard;