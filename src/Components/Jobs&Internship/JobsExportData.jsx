import React, { useState } from 'react';
import { Download, FileSpreadsheet, Check, X } from 'lucide-react';

const FIELD_CONFIG = [
  { key: 'title', label: 'Job Title' },
  { key: 'company', label: 'Company' },
  { key: 'location', label: 'Location' },
  { key: 'type', label: 'Job Type' },
  { key: 'status', label: 'Status' },
  { key: 'applicantsCount', label: 'Applicants Count' },
  { key: 'postedDate', label: 'Posted Date' },
  { key: 'duration', label: 'Duration' },
  { key: 'stipend', label: 'Stipend' },
  { key: 'eligibility', label: 'Eligibility' },
  { key: 'budget', label: 'Salary / Budget' },
  { key: 'experienceLevel', label: 'Experience Level' },
  { key: 'recruiter', label: 'Recruiter' },
  { key: 'reportCount', label: 'Reports Count' },
];

const JobsExportData = ({ isOpen, onClose, jobs = [] }) => {
  const [format, setFormat] = useState('csv');
  const [scope, setScope] = useState('all');
  const [fields, setFields] = useState(
    FIELD_CONFIG.map((field) => ({ ...field, selected: true })),
  );

  const allSelected = fields.every((field) => field.selected);
  const selectedCount = fields.filter((field) => field.selected).length;
  const jobCount = jobs.length;

  const handleToggleField = (key) => {
    setFields((prev) =>
      prev.map((field) =>
        field.key === key ? { ...field, selected: !field.selected } : field,
      ),
    );
  };

  const handleSelectAll = () => {
    setFields((prev) =>
      prev.map((field) => ({ ...field, selected: !allSelected })),
    );
  };

  const buildCsvContent = () => {
    const activeFields = fields.filter((field) => field.selected);
    if (!activeFields.length || !jobs.length) {
      return '';
    }

    const headerRow = activeFields
      .map((field) => `"${field.label.replace(/"/g, '""')}"`)
      .join(',');

    const rows = jobs.map((job) => {
      const values = activeFields.map((field) => {
        let value = job[field.key];
        if (value === undefined || value === null) {
          value = '';
        }
        if (Array.isArray(value)) {
          value = value.join(', ');
        }
        return `"${String(value).replace(/"/g, '""')}"`;
      });
      return values.join(',');
    });

    return [headerRow, ...rows].join('\n');
  };

  const handleExport = () => {
    if (format !== 'csv') {
      return;
    }

    const csvContent = buildCsvContent();
    if (!csvContent) {
      return;
    }

    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'jobs-export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    if (onClose) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-100 bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-100 px-6 pt-5 pb-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Export Jobs
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Configure your export settings and download job data.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6 px-6 py-5">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-800">
              Export Format
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormat('csv')}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                  format === 'csv'
                    ? 'border-amber-500 bg-amber-50 text-amber-700 shadow-sm'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-amber-400/70 hover:bg-amber-50/40'
                }`}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-100 bg-white">
                  <Download className="h-4 w-4 text-amber-600" />
                </div>
                <div className="text-left">
                  <div>CSV</div>
                  <p className="text-xs text-slate-500">Comma-separated</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormat('excel')}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                  format === 'excel'
                    ? 'border-amber-500 bg-amber-50 text-amber-700 shadow-sm'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-amber-400/70 hover:bg-amber-50/40'
                }`}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-100 bg-amber-50">
                  <FileSpreadsheet className="h-4 w-4 text-amber-600" />
                </div>
                <div className="text-left">
                  <div>Excel</div>
                  <p className="text-xs text-slate-500">.xlsx format</p>
                </div>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-800">
              Export Scope
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setScope('all')}
                className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                  scope === 'all'
                    ? 'border-amber-500 bg-amber-50 text-amber-700 shadow-sm'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-amber-400/70 hover:bg-amber-50/40'
                }`}
              >
                <div className="text-left">
                  <div>All Jobs</div>
                  <p className="text-xs text-slate-500">{jobCount} jobs</p>
                </div>
                {scope === 'all' && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500">
                    <Check className="h-3.5 w-3.5 text-white" />
                  </div>
                )}
              </button>

              <button
                type="button"
                onClick={() => setScope('filtered')}
                className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                  scope === 'filtered'
                    ? 'border-amber-500 bg-amber-50 text-amber-700 shadow-sm'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-amber-400/70 hover:bg-amber-50/40'
                }`}
              >
                <div className="text-left">
                  <div>Filtered Jobs</div>
                  <p className="text-xs text-slate-500">
                    {jobCount} jobs matching current filters
                  </p>
                </div>
                {scope === 'filtered' && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500">
                    <Check className="h-3.5 w-3.5 text-white" />
                  </div>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-800">
                Fields to Export
              </h3>
              <button
                type="button"
                onClick={handleSelectAll}
                className="inline-flex items-center gap-2 rounded-full border border-amber-500 px-3 py-1 text-xs font-medium text-amber-700 transition-colors hover:bg-amber-50"
              >
                <Check className="h-3.5 w-3.5" />
                <span>{allSelected ? 'Deselect All' : 'Select All'}</span>
              </button>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/60">
              <div className="grid max-h-56 grid-cols-1 gap-2 overflow-y-auto px-4 py-3 sm:grid-cols-2">
                {fields.map((field) => (
                  <button
                    key={field.key}
                    type="button"
                    onClick={() => handleToggleField(field.key)}
                    className={`flex items-center gap-3 rounded-xl border px-3 py-2 text-sm transition-all ${
                      field.selected
                        ? 'border-amber-500 bg-white text-slate-800 shadow-sm'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-amber-400/70'
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full border text-[10px] ${
                        field.selected
                          ? 'border-amber-500 bg-amber-500 text-white'
                          : 'border-slate-300 bg-white text-transparent'
                      }`}
                    >
                      <Check className="h-3 w-3" />
                    </span>
                    <span>{field.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
          <div className="text-xs text-slate-500">
            {selectedCount} of {fields.length} fields selected
          </div>
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobsExportData;

