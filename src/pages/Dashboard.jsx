import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import{ Home, Contact, Companies, Deals, Tickets, Order, Employee } from '../pages'

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-[#e6ecf5]">
      <Sidebar />
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