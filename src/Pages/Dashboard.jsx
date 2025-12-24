import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any auth tokens if needed
    // localStorage.removeItem('token'); 
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
            <p className="text-slate-500">Welcome to your dashboard</p>
          </div>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors font-medium"
          >
            Logout
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Profile Stats</h3>
            <p className="text-slate-500">View your latest activity and profile statistics.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Recent Applications</h3>
            <p className="text-slate-500">Track your recent job applications.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Notifications</h3>
            <p className="text-slate-500">Check your latest notifications and alerts.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
