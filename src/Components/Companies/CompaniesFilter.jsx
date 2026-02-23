import React, { useState } from 'react';
import { X, Filter as FilterIcon } from 'lucide-react';

const INDUSTRY_OPTIONS = [
  'All Industries',
  'Technology',
  'Finance',
  'Healthcare',
  'Education',
  'E-commerce',
  'Consulting',
  'Design & Creative',
];

const VERIFICATION_OPTIONS = ['All', 'Verified', 'Pending', 'Rejected'];

const ACCOUNT_STATUS_OPTIONS = ['All', 'Active', 'Suspended', 'Blacklisted'];

const CompaniesFilter = ({ selectedFilters, onChange, onClose, onApply }) => {
  const [localFilters, setLocalFilters] = useState(selectedFilters);

  const updateField = (field, value) => {
    const next = {
      ...localFilters,
      [field]: value,
    };
    setLocalFilters(next);
  };

  const handleReset = () => {
    const reset = {
      industry: 'All Industries',
      verificationStatus: 'All',
      accountStatus: 'All',
      commissionMin: '',
      commissionMax: '',
      joinedFrom: '',
      joinedTo: '',
      disputeMin: '',
      disputeMax: '',
      onlyHighRisk: false,
    };
    setLocalFilters(reset);
    onChange(reset);
  };

  const handleApply = () => {
    onChange(localFilters);
    if (onApply) {
      onApply();
    }
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
                Refine companies by verification, risk and revenue.
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
              Industry
            </div>
            <select
              value={localFilters.industry}
              onChange={(e) => updateField('industry', e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            >
              {INDUSTRY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Verification Status
            </div>
            <select
              value={localFilters.verificationStatus}
              onChange={(e) => updateField('verificationStatus', e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            >
              {VERIFICATION_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Account Status
            </div>
            <select
              value={localFilters.accountStatus}
              onChange={(e) => updateField('accountStatus', e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            >
              {ACCOUNT_STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Commission Range (₹)
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                value={localFilters.commissionMin}
                onChange={(e) => updateField('commissionMin', e.target.value)}
                placeholder="Min"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
              <input
                type="number"
                value={localFilters.commissionMax}
                onChange={(e) => updateField('commissionMax', e.target.value)}
                placeholder="Max"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Joined Date Range
            </div>
            <div className="flex gap-2">
              <input
                type="date"
                value={localFilters.joinedFrom}
                onChange={(e) => updateField('joinedFrom', e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
              <input
                type="date"
                value={localFilters.joinedTo}
                onChange={(e) => updateField('joinedTo', e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Dispute Count
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                value={localFilters.disputeMin}
                onChange={(e) => updateField('disputeMin', e.target.value)}
                placeholder="Min"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
              <input
                type="number"
                value={localFilters.disputeMax}
                onChange={(e) => updateField('disputeMax', e.target.value)}
                placeholder="Max"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-sm font-medium text-slate-700">
              Show High Risk Companies Only
            </div>
            <button
              type="button"
              onClick={() =>
                updateField('onlyHighRisk', !localFilters.onlyHighRisk)
              }
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                localFilters.onlyHighRisk ? 'bg-rose-500' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                  localFilters.onlyHighRisk ? 'translate-x-4' : 'translate-x-1'
                }`}
              />
            </button>
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

export default CompaniesFilter;

