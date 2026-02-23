import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const defaultFilters = {
  type: 'All',
  status: 'All',
  candidate: 'All',
  recruiter: 'All',
  job: 'All',
  dateFrom: '',
  dateTo: '',
};

const MeetingFilter = ({ isOpen, onClose, value, onChange, options }) => {
  const [localFilters, setLocalFilters] = useState(value || defaultFilters);

  useEffect(() => {
    setLocalFilters(value || defaultFilters);
  }, [value]);

  const updateField = (field, fieldValue) => {
    setLocalFilters((current) => ({
      ...current,
      [field]: fieldValue,
    }));
  };

  const handleApply = () => {
    onChange(localFilters);
    onClose();
  };

  const handleReset = () => {
    setLocalFilters(defaultFilters);
    onChange(defaultFilters);
  };

  if (!isOpen) {
    return null;
  }

  const typeOptions = options?.types || ['All', 'Interview', 'Screening', 'Technical'];
  const statusOptions =
    options?.statuses || ['All', 'Scheduled', 'Live', 'Completed', 'Rescheduled', 'Cancelled'];
  const candidateOptions = ['All', ...(options?.candidates || [])];
  const recruiterOptions = ['All', ...(options?.recruiters || [])];
  const jobOptions = ['All', ...(options?.jobs || [])];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-end bg-slate-900/40">
      <div className="h-full w-full max-w-md translate-x-0 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <div className="text-sm font-semibold text-slate-900">
              Advanced Meeting Filters
            </div>
            <div className="mt-0.5 text-xs text-slate-500">
              Refine meetings by type, status, participants and date.
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex h-[calc(100%-120px)] flex-col overflow-y-auto px-5 py-4 text-xs text-slate-700">
          <div className="space-y-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Meeting Type
              </div>
              <select
                value={localFilters.type}
                onChange={(event) => updateField('type', event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              >
                {typeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Meeting Status
              </div>
              <select
                value={localFilters.status}
                onChange={(event) => updateField('status', event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Candidate
                </div>
                <select
                  value={localFilters.candidate}
                  onChange={(event) => updateField('candidate', event.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                >
                  {candidateOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Recruiter
                </div>
                <select
                  value={localFilters.recruiter}
                  onChange={(event) => updateField('recruiter', event.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                >
                  {recruiterOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Job / Project
              </div>
              <select
                value={localFilters.job}
                onChange={(event) => updateField('job', event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              >
                {jobOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Date Range
              </div>
              <div className="mt-1 grid gap-2 md:grid-cols-2">
                <input
                  type="date"
                  value={localFilters.dateFrom}
                  onChange={(event) =>
                    updateField('dateFrom', event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
                <input
                  type="date"
                  value={localFilters.dateTo}
                  onChange={(event) =>
                    updateField('dateTo', event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 px-5 py-3">
          <div className="flex items-center justify-between gap-3 text-xs">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-700"
            >
              Reset all
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApply}
                className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
              >
                Apply filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingFilter;

