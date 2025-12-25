import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar.jsx";
import { Home, Contact, Companies, Deals, Tickets, Order, Employee, Analytics, Settings } from "./";
import useAuthStore from "../../store/authStore";
import { useMutation } from "@tanstack/react-query";
import { logout as logoutAPI } from "../../api/auth";
import Navbar from "../../components/Navbar.jsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const logoutMutation = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      logout();
      navigate("/", { replace: true });
    },
    onError: () => {
      logout();
      navigate("/", { replace: true });
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar
        onLogout={handleLogout}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#F8FAFC]">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="companies" element={<Companies />} />
            <Route path="deals" element={<Deals />} />
            <Route path="tickets" element={<Tickets />} />
            <Route path="order" element={<Order />} />
            <Route path="employee" element={<Employee />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
