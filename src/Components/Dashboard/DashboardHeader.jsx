import React from 'react';
import { RefreshCw } from 'lucide-react';

const DashboardHeader = ({ firstName, onRefresh, headerRef, refreshButtonRef }) => {
  return (
    <div
      ref={headerRef}
      className="mb-8 flex items-start justify-between gap-4  px-6 py-0.5 "
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Welcome back, {firstName}!
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Here’s a comprehensive overview of your SkillPort platform performance.
        </p>
      </div>
      <button
        type="button"
        ref={refreshButtonRef}
        onClick={onRefresh}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-50 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-slate-800 hover:shadow-md"
      >
        <RefreshCw className="h-4 w-4" />
        <span>Refresh Dashboard</span>
      </button>
    </div>
  );
};

export default DashboardHeader;

