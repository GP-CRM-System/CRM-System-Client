import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import { Home, Contact, Companies, Deals, Tickets, Order, Employee } from './dashboard/index.js';
import useAuthStore from '../store/authStore';
import { useMutation } from '@tanstack/react-query';
import { logout as logoutAPI } from '../api/auth';

const Dashboard = () => {
	const navigate = useNavigate();
	const logout = useAuthStore((state) => state.logout);

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
		<div className="flex h-screen bg-[#e6ecf5]">
			<Sidebar onLogout={handleLogout} />
			<div className="flex-1 flex flex-col">
				<main className="flex-1 px-8 py-6">
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