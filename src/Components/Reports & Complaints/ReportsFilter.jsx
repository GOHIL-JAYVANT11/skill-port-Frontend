import React from 'react';

const ReportsFilter = ({ filters, onChange, open }) => {
  if (!open) {
    return null;
  }

  return (
    <div className="mt-3 grid gap-3 rounded-2xl border border-slate-100 bg-white p-3 text-xs text-slate-700 shadow-sm md:grid-cols-4">
      <div className="space-y-1">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          Report Type
        </div>
        <select
          value={filters.type}
          onChange={(event) =>
            onChange({
              ...filters,
              type: event.target.value,
            })
          }
          className="w-full rounded-xl border border-slate-200 bg-white px-2 py-1 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
        >
          <option value="All">All</option>
          <option value="Job">Job</option>
          <option value="Freelance">Freelance</option>
          <option value="Meeting">Meeting</option>
          <option value="Payment">Payment</option>
          <option value="User Misconduct">User Misconduct</option>
        </select>
      </div>
      <div className="space-y-1">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          Priority
        </div>
        <select
          value={filters.priority}
          onChange={(event) =>
            onChange({
              ...filters,
              priority: event.target.value,
            })
          }
          className="w-full rounded-xl border border-slate-200 bg-white px-2 py-1 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
        >
          <option value="All">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="space-y-1">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          Status
        </div>
        <select
          value={filters.status}
          onChange={(event) =>
            onChange({
              ...filters,
              status: event.target.value,
            })
          }
          className="w-full rounded-xl border border-slate-200 bg-white px-2 py-1 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
        >
          <option value="All">All</option>
          <option value="Open">Open</option>
          <option value="Under Review">Under Review</option>
          <option value="Resolved">Resolved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <div className="space-y-1">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          Date Range
        </div>
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(event) =>
              onChange({
                ...filters,
                dateFrom: event.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-200 px-2 py-1 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
          />
          <input
            type="date"
            value={filters.dateTo}
            onChange={(event) =>
              onChange({
                ...filters,
                dateTo: event.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-200 px-2 py-1 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
          />
        </div>
      </div>
      <div className="space-y-1">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          Reported User
        </div>
        <input
          type="text"
          value={filters.reportedUser}
          onChange={(event) =>
            onChange({
              ...filters,
              reportedUser: event.target.value,
            })
          }
          placeholder="Reported user or company"
          className="w-full rounded-xl border border-slate-200 px-2 py-1 text-xs text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
        />
      </div>
      <div className="space-y-1">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          Repeat Offender
        </div>
        <select
          value={filters.repeatOffender}
          onChange={(event) =>
            onChange({
              ...filters,
              repeatOffender: event.target.value,
            })
          }
          className="w-full rounded-xl border border-slate-200 bg-white px-2 py-1 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
        >
          <option value="All">All</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
    </div>
  );
};

export default ReportsFilter;

