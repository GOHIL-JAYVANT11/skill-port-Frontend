import React, { useState } from 'react';
import { X, Filter as FilterIcon } from 'lucide-react';

const STATUS_OPTIONS = ['All', 'Active', 'Completed', 'Disputed', 'On Hold'];

const FREELANCER_OPTIONS = [
  'All',
  'Anita Sharma',
  'Rahul Verma',
  'Priya Nair',
];

const CLIENT_OPTIONS = [
  'All',
  'TechCorp Inc.',
  'BrightPath Learning Solutions',
  'UrbanWorks Studio',
];

const FreelanceFilter = ({ isOpen, selectedFilters, onChange, onClose }) => {
  const [localFilters, setLocalFilters] = useState(selectedFilters);

  if (!isOpen) {
    return null;
  }

  const updateField = (field, value) => {
    const next = {
      ...localFilters,
      [field]: value,
    };
    setLocalFilters(next);
  };

  const handleReset = () => {
    const reset = {
      status: 'All',
      freelancer: 'All',
      client: 'All',
      budgetMin: '',
      budgetMax: '',
      escrowMin: '',
      escrowMax: '',
      progressMin: '',
      progressMax: '',
    };
    setLocalFilters(reset);
    onChange(reset);
  };

  const handleApply = () => {
    onChange(localFilters);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-slate-900/40">
      <div className="flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-50">
              <FilterIcon className="h-4 w-4 text-sky-600" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">
                Advanced Filters
              </div>
              <div className="text-xs text-slate-500">
                Refine projects by status, budget, escrow and progress.
              </div>
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

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Project Status
            </div>
            <select
              value={localFilters.status}
              onChange={(event) => updateField('status', event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Freelancer
            </div>
            <select
              value={localFilters.freelancer}
              onChange={(event) =>
                updateField('freelancer', event.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            >
              {FREELANCER_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Client
            </div>
            <select
              value={localFilters.client}
              onChange={(event) => updateField('client', event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            >
              {CLIENT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Budget Range (₹)
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                value={localFilters.budgetMin}
                onChange={(event) =>
                  updateField('budgetMin', event.target.value)
                }
                placeholder="Min"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
              <input
                type="number"
                value={localFilters.budgetMax}
                onChange={(event) =>
                  updateField('budgetMax', event.target.value)
                }
                placeholder="Max"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Escrow Amount Range (₹)
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                value={localFilters.escrowMin}
                onChange={(event) =>
                  updateField('escrowMin', event.target.value)
                }
                placeholder="Min"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
              <input
                type="number"
                value={localFilters.escrowMax}
                onChange={(event) =>
                  updateField('escrowMax', event.target.value)
                }
                placeholder="Max"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Progress Percentage
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                value={localFilters.progressMin}
                onChange={(event) =>
                  updateField('progressMin', event.target.value)
                }
                placeholder="Min %"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
              <input
                type="number"
                value={localFilters.progressMax}
                onChange={(event) =>
                  updateField('progressMax', event.target.value)
                }
                placeholder="Max %"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-5 py-4">
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Reset All
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex-1 rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FreelanceFilter;

