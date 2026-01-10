import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar.jsx";
import { Home, Contact, Companies, Deals, Tickets, Order, Employee, Analytics, Settings } from "./";
import useAuthStore from "../../store/authStore";
import { useMutation } from "@tanstack/react-query";
import { logout as logoutAPI } from "../../api/auth";
import Navbar from "../../components/Navbar.jsx";
import RoutePermissionGuard from "../../components/guard/RoutePermissionGuard";

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
            <Route 
              path="contact" 
              element={
                <RoutePermissionGuard permission="Contact.read">
                  <Contact />
                </RoutePermissionGuard>
              } 
            />
            <Route 
              path="companies" 
              element={
                <RoutePermissionGuard permission="Company.read">
                  <Companies />
                </RoutePermissionGuard>
              } 
            />
            <Route 
              path="deals" 
              element={
                <RoutePermissionGuard permission="Deal.read">
                  <Deals />
                </RoutePermissionGuard>
              } 
            />
            <Route 
              path="tickets" 
              element={
                <RoutePermissionGuard permission="Ticket.read">
                  <Tickets />
                </RoutePermissionGuard>
              } 
            />
            <Route 
              path="order" 
              element={
                <RoutePermissionGuard permission="Order.read">
                  <Order />
                </RoutePermissionGuard>
              } 
            />
            <Route 
              path="employee" 
              element={
                <RoutePermissionGuard permission="Employee.read">
                  <Employee />
                </RoutePermissionGuard>
              } 
            />
            <Route 
              path="analytics" 
              element={
                <RoutePermissionGuard permission="Analytics.read">
                  <Analytics />
                </RoutePermissionGuard>
              } 
            />
            <Route path="settings/*" element={<div className="lg:-m-6"><Settings /></div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
