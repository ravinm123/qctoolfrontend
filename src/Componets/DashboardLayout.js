// src/components/DashboardLayout.js
import React from 'react';
import Sidebar from './Sidebar';
import './DaashboardLayout.css'; // For styling the layout

const DashboardLayout = ({ children }) => {
    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="content">
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;
