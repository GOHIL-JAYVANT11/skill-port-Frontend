import React from 'react';
import { X, Download } from 'lucide-react';

const FreelanceExportData = ({ isOpen, onClose, projects, totalProjects }) => {
  if (!isOpen) {
    return null;
  }

  const total = typeof totalProjects === 'number' ? totalProjects : projects.length;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50">
      <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-50">
              <Download className="h-4 w-4 text-sky-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Export Freelance Projects
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Download a snapshot of freelance projects, escrow and disputes for
                offline analysis.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <span>Total projects in view</span>
            <span className="text-base font-semibold text-slate-900">
              {total}
            </span>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Export Format
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <button
                type="button"
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-slate-700 hover:border-sky-400"
              >
                CSV
              </button>
              <button
                type="button"
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-slate-700 hover:border-sky-400"
              >
                Excel
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Include Data
            </div>
            <ul className="list-disc space-y-1 pl-5 text-xs text-slate-600">
              <li>Project, client and freelancer details</li>
              <li>Milestones, progress and timelines</li>
              <li>Escrow, payouts and on-hold amounts</li>
              <li>Dispute reasons, risk indicators and admin notes</li>
            </ul>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default FreelanceExportData;

