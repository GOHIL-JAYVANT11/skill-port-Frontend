import React from 'react';

const PaymentsFilter = ({ view, filters, onChange, open }) => {
  if (!open) {
    return null;
  }

  return (
    <div className="mt-3 grid gap-3 rounded-2xl border border-slate-100 bg-white p-3 text-xs text-slate-700 shadow-sm md:grid-cols-4">
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
          Payment Status
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
          <option value="Paid">Paid</option>
          <option value="Pending">Pending / In Progress</option>
          <option value="On Hold">On Hold</option>
        </select>
      </div>
      <div className="space-y-1">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          {view === 'job' ? 'Company' : 'Client'}
        </div>
        <select
          value={filters.companyOrClient}
          onChange={(event) =>
            onChange({
              ...filters,
              companyOrClient: event.target.value,
            })
          }
          className="w-full rounded-xl border border-slate-200 bg-white px-2 py-1 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
        >
          <option value="All">All</option>
          <option value="TechCorp Inc.">TechCorp Inc.</option>
          <option value="BrightPath Learning">BrightPath Learning</option>
          <option value="UrbanWorks Studio">UrbanWorks Studio</option>
        </select>
      </div>
      <div className="space-y-1">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          Amount Range
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={filters.amountMin}
            onChange={(event) =>
              onChange({
                ...filters,
                amountMin: event.target.value,
              })
            }
            placeholder="Min"
            className="w-full rounded-xl border border-slate-200 px-2 py-1 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
          />
          <input
            type="number"
            value={filters.amountMax}
            onChange={(event) =>
              onChange({
                ...filters,
                amountMax: event.target.value,
              })
            }
            placeholder="Max"
            className="w-full rounded-xl border border-slate-200 px-2 py-1 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
          />
        </div>
      </div>
      {view === 'job' && (
        <div className="space-y-1">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Replacement Status
          </div>
          <select
            value={filters.replacementStatus}
            onChange={(event) =>
              onChange({
                ...filters,
                replacementStatus: event.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-200 bg-white px-2 py-1 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
          >
            <option value="All">All</option>
            <option value="Normal">Normal</option>
            <option value="Replacement Required">Replacement Required</option>
            <option value="Replacement Provided">Replacement Provided</option>
          </select>
        </div>
      )}
      {view === 'freelance' && (
        <div className="space-y-1">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Dispute Status
          </div>
          <select
            value={filters.disputeStatus}
            onChange={(event) =>
              onChange({
                ...filters,
                disputeStatus: event.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-200 bg-white px-2 py-1 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
          >
            <option value="All">All</option>
            <option value="None">No Dispute</option>
            <option value="Under Review">Under Review</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default PaymentsFilter;

