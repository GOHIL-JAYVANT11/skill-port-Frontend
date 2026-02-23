import React from 'react';
import { AlertTriangle, MoreHorizontal } from 'lucide-react';

const priorityBadgeClasses = {
  Low: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  Medium: 'bg-amber-50 text-amber-700 ring-amber-100',
  High: 'bg-rose-50 text-rose-700 ring-rose-100',
};

const statusBadgeClasses = {
  Open: 'bg-rose-50 text-rose-700 ring-rose-100',
  'Under Review': 'bg-amber-50 text-amber-700 ring-amber-100',
  Resolved: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  Rejected: 'bg-slate-50 text-slate-600 ring-slate-100',
};

const ReportsTable = ({
  reports,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onAction,
}) => {
  const allSelected =
    reports.length > 0 && selectedIds.length === reports.length;

  return (
    <div className="mt-6 rounded-2xl border border-slate-100 bg-white text-xs text-slate-700 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Reports & Complaints
          </div>
          <div className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600">
            {reports.length} total
          </div>
        </div>
        {selectedIds.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500">
              {selectedIds.length} selected
            </span>
            <button
              type="button"
              onClick={() => onAction('bulk-resolve')}
              className="rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-semibold text-emerald-50 hover:bg-emerald-700"
            >
              Mark Resolved
            </button>
            <button
              type="button"
              onClick={() => onAction('bulk-suspend')}
              className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold text-slate-50 hover:bg-slate-800"
            >
              Suspend Users
            </button>
            <button
              type="button"
              onClick={() => onAction('bulk-export')}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-50"
            >
              Export
            </button>
          </div>
        )}
      </div>
      <div className="max-h-[480px] overflow-y-auto">
        <table className="min-w-full border-separate border-spacing-0 text-left text-xs">
          <thead className="sticky top-0 z-10 bg-slate-50 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="w-9 px-4 py-2">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onToggleSelectAll}
                  className="h-3.5 w-3.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
              </th>
              <th className="w-32 px-2 py-2">Report ID</th>
              <th className="px-2 py-2">Reported By</th>
              <th className="px-2 py-2">Reported User / Company</th>
              <th className="px-2 py-2">Type</th>
              <th className="px-2 py-2">Priority</th>
              <th className="px-2 py-2">Status</th>
              <th className="px-2 py-2">Date Submitted</th>
              <th className="w-10 px-2 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => {
              const priorityClass =
                priorityBadgeClasses[report.priority] ||
                'bg-slate-50 text-slate-600 ring-slate-100';
              const statusClass =
                statusBadgeClasses[report.status] ||
                'bg-slate-50 text-slate-600 ring-slate-100';
              const isSelected = selectedIds.includes(report.id);

              return (
                <tr
                  key={report.id}
                  className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/60"
                >
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelect(report.id)}
                      className="h-3.5 w-3.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                  </td>
                  <td className="px-2 py-2 text-[11px] font-mono text-slate-500">
                    {report.id}
                  </td>
                  <td className="px-2 py-2">
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-900">
                        {report.reportedBy}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {report.reporterRole}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 py-2">
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-900">
                        {report.reportedEntity}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {report.reportedType}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 py-2 text-[11px] text-slate-700">
                    {report.type}
                  </td>
                  <td className="px-2 py-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${priorityClass}`}
                    >
                      {report.priority === 'High' && (
                        <AlertTriangle className="h-3 w-3" />
                      )}
                      <span>{report.priority}</span>
                    </span>
                    {report.fraudFlag && (
                      <span className="ml-1 rounded-full bg-rose-100 px-1.5 py-0.5 text-[9px] font-semibold text-rose-700">
                        Fraud risk
                      </span>
                    )}
                  </td>
                  <td className="px-2 py-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${statusClass}`}
                    >
                      <span>{report.status}</span>
                    </span>
                  </td>
                  <td className="px-2 py-2 text-[11px] text-slate-500">
                    {report.dateSubmitted}
                  </td>
                  <td className="px-2 py-2 text-right">
                    <button
                      type="button"
                      onClick={() => onAction('open-menu', report)}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
            {reports.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="px-4 py-12 text-center text-xs text-slate-500"
                >
                  No reports found for the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsTable;

