import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Fixed width */}
      <Sidebar />
      
      {/* Main Content Area - Takes remaining width */}
      <div className="flex-1 ml-72 transition-all duration-300">
        <div className="p-8">
            <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
