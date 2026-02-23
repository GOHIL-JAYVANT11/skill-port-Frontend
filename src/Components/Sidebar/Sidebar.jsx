import React from 'react';
import { LayoutDashboard, Users, User, LogOut, Shield, Briefcase, Building, FolderKanban, Award, Calendar, CreditCard, FileText, BarChart2 } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/Images/SkillPORT_logo.png'

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        // Add any logout logic here (clearing tokens, etc.)
        navigate('/');
    };

    return (
        <div className="h-screen w-72 bg-gradient-to-br from-slate-50 via-amber-50 to-slate-100  text-slate-800 flex flex-col shadow-lg fixed left-0 top-0 z-50">
            {/* Logo Section */}
            <div className="p-6 flex items-center gap-1 pt-2 pl-1 ">
                <div className="w-32 h-20  rounded-xl flex items-center justify-center ">
                <img src={logo} alt="SkillPort Logo" className="w-32 h-20" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-slate-800 tracking-wide">SkillPort</h1>
                    <p className="text-xs text-slate-500 font-medium">Admin Panel</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar pt-4">
                {/* Dashboard - Active State */}
                <Link
                    to="/dashboard"
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group ${isActive('/dashboard')
                            ? 'bg-amber-50 text-amber-600 font-semibold shadow-sm border border-amber-100'
                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                        }`}
                >
                    <LayoutDashboard size={20} className={isActive('/dashboard') ? 'text-amber-600' : 'text-slate-400 group-hover:text-slate-600'} />
                    <span>Dashboard</span>
                    {isActive('/dashboard') && (
                        <div className="ml-auto w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                    )}
                </Link>

                {/* Users */}
                <Link
                    to="/user"
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group ${isActive('/user')
                            ? 'bg-amber-50 text-amber-600 font-semibold shadow-sm border border-amber-100'
                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                        }`}
                >
                    <Users size={20} className={isActive('/user') ? 'text-amber-600' : 'text-slate-400 group-hover:text-slate-600'} />
                    <span>Users</span>
                    {isActive('/user') && (
                        <div className="ml-auto w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                    )}
                </Link>

                {/* Jobs & Internships */}
                <Link
                    to="/jobs-internship"
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group ${isActive('/jobs-internship')
                            ? 'bg-amber-50 text-amber-600 font-semibold shadow-sm border border-amber-100'
                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                        }`}
                >
                    <Briefcase size={20} className={isActive('/jobs-internship') ? 'text-amber-600' : 'text-slate-400 group-hover:text-slate-600'} />
                    <span>Jobs & Internships</span>
                    {isActive('/jobs-internship') && (
                        <div className="ml-auto w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                    )}
                </Link>

                {/* Companies */}
                <Link
                    to="/companies"
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group ${isActive('/companies')
                            ? 'bg-amber-50 text-amber-600 font-semibold shadow-sm border border-amber-100'
                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                        }`}
                >
                    <Building size={20} className={isActive('/companies') ? 'text-amber-600' : 'text-slate-400 group-hover:text-slate-600'} />
                    <span>Companies</span>
                    {isActive('/companies') && (
                        <div className="ml-auto w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                    )}
                </Link>

                {/* Freelancers */}
                <Link
                    to="/freelancer"
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group ${isActive('/freelancer')
                            ? 'bg-amber-50 text-amber-600 font-semibold shadow-sm border border-amber-100'
                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                        }`}
                >
                    <User size={20} className={isActive('/freelancer') ? 'text-amber-600' : 'text-slate-400 group-hover:text-slate-600'} />
                    <span>Freelancers</span>
                    {isActive('/freelancer') && (
                        <div className="ml-auto w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                    )}
                </Link>

                {/* Meetings */}
                <Link
                    to="/meeting"
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group ${isActive('/meeting')
                            ? 'bg-amber-50 text-amber-600 font-semibold shadow-sm border border-amber-100'
                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                        }`}
                >
                    <Calendar size={20} className={isActive('/meeting') ? 'text-amber-600' : 'text-slate-400 group-hover:text-slate-600'} />
                    <span>Meetings</span>
                    {isActive('/meeting') && (
                        <div className="ml-auto w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                    )}
                </Link>

                {/* Payments */}
                <Link
                    to="/payments"
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group ${isActive('/payments')
                            ? 'bg-amber-50 text-amber-600 font-semibold shadow-sm border border-amber-100'
                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                        }`}
                >
                    <CreditCard size={20} className={isActive('/payments') ? 'text-amber-600' : 'text-slate-400 group-hover:text-slate-600'} />
                    <span>Payments</span>
                    {isActive('/payments') && (
                        <div className="ml-auto w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                    )}
                </Link>

                {/* Reports & Complaints */}
                <Link
                    to="/reports-complaints"
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group ${isActive('/reports-complaints')
                            ? 'bg-amber-50 text-amber-600 font-semibold shadow-sm border border-amber-100'
                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                        }`}
                >
                    <FileText size={20} className={isActive('/reports-complaints') ? 'text-amber-600' : 'text-slate-400 group-hover:text-slate-600'} />
                    <span>Reports & Complaints</span>
                    {isActive('/reports-complaints') && (
                        <div className="ml-auto w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                    )}
                </Link>

            </nav>

            {/* Bottom Section - User Profile & Logout */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white transition-colors cursor-pointer mb-2 border border-transparent hover:border-slate-200 hover:shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center text-slate-600 font-bold text-sm relative">
                        SA
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <h4 className="text-sm font-semibold text-slate-700 truncate">Super Admin</h4>
                        <div className="flex items-center gap-1">
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-medium border border-amber-200">Super Admin</span>
                        </div>
                    </div>
                     <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 px-1 py-1 text-slate-500 hover:text-red-600 rounded-xl transition-all group"
                >
                    <LogOut size={14} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-[500]">Logout</span>
                </button>
                </div>

               
            </div>
        </div>
    )
}

export default Sidebar
