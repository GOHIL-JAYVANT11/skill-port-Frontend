import React, { useMemo, useState } from 'react';
import { X, Download } from 'lucide-react';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';

const buildRows = (companies) => {
  return companies.map((company) => ({
    'Company Name': company.name,
    Industry: company.industry || '',
    'Recruiter Name': company.primaryRecruiter || '',
    Email: company.email || '',
    Phone: company.phone || '',
    'Total Jobs Posted': company.stats?.totalJobs ?? 0,
    'Total Freelance Projects': company.stats?.totalProjects ?? 0,
    'Verification Status': company.verificationStatus || '',
    'Account Status': company.accountStatus || '',
    'Commission Generated': company.financials?.totalCommission ?? 0,
    'Joined Date': company.joinedDate || '',
  }));
};

const exportCsv = (rows, fileName) => {
  if (!rows.length) {
    return;
  }

  const headers = Object.keys(rows[0]);
  const headerRow = headers
    .map((header) => `"${header.replace(/"/g, '""')}"`)
    .join(',');

  const lines = rows.map((row) =>
    headers
      .map((key) => {
        let value = row[key];
        if (value === undefined || value === null) {
          value = '';
        }
        return `"${String(value).replace(/"/g, '""')}"`;
      })
      .join(','),
  );

  const csvContent = [headerRow, ...lines].join('\n');

  const blob = new Blob([csvContent], {
    type: 'text/csv;charset=utf-8;',
  });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

const exportXlsx = (rows, fileName) => {
  if (!rows.length) {
    return;
  }
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Companies');
  XLSX.writeFile(workbook, fileName);
};

const CompaniesExportData = ({
  isOpen,
  onClose,
  companies,
  filteredCompanies,
}) => {
  const [scope, setScope] = useState('all');
  const [format, setFormat] = useState('csv');
  const [isExporting, setIsExporting] = useState(false);

  const dataToExport = useMemo(() => {
    if (!companies || !companies.length) {
      return [];
    }
    if (scope === 'verified') {
      return companies.filter((c) => c.verificationStatus === 'Verified');
    }
    if (scope === 'suspended') {
      return companies.filter((c) => c.accountStatus === 'Suspended');
    }
    if (scope === 'filtered') {
      return filteredCompanies || [];
    }
    return companies;
  }, [companies, filteredCompanies, scope]);

  if (!isOpen) {
    return null;
  }

  const total = companies.length;
  const exportCount = dataToExport.length;

  const handleExport = () => {
    if (!exportCount) {
      toast.error('No companies available to export.');
      return;
    }
    setIsExporting(true);

    const rows = buildRows(dataToExport);
    const baseName =
      scope === 'verified'
        ? 'companies-verified'
        : scope === 'suspended'
          ? 'companies-suspended'
          : scope === 'filtered'
            ? 'companies-filtered'
            : 'companies-all';

    try {
      if (format === 'csv') {
        exportCsv(rows, `${baseName}.csv`);
      } else {
        exportXlsx(rows, `${baseName}.xlsx`);
      }
      toast.success('Companies export generated successfully.');
      if (onClose) {
        onClose();
      }
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-end bg-transparent px-4 pt-20">
      <div className="w-full max-w-sm rounded-3xl border border-slate-100 bg-white p-5 shadow-2xl">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-50">
              <Download className="h-4 w-4 text-sky-600" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">
                Export Companies
              </div>
              <div className="mt-0.5 text-[11px] text-slate-500">
                Choose scope and format, then download.
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            disabled={isExporting}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 text-xs text-slate-700">
          <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-2.5">
            <span>Total companies in view</span>
            <span className="text-sm font-semibold text-slate-900">
              {total}
            </span>
          </div>

          <div className="space-y-2">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Export Filters
            </div>
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setScope('all')}
                disabled={isExporting}
                className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-xs ${
                  scope === 'all'
                    ? 'border-sky-500 bg-sky-50 text-sky-800'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-sky-400 hover:bg-sky-50/40'
                }`}
              >
                <span>Export All Companies</span>
                <span className="text-[11px] text-slate-500">
                  {companies.length}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setScope('verified')}
                disabled={isExporting}
                className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-xs ${
                  scope === 'verified'
                    ? 'border-sky-500 bg-sky-50 text-sky-800'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-sky-400 hover:bg-sky-50/40'
                }`}
              >
                <span>Export Verified Companies</span>
              </button>
              <button
                type="button"
                onClick={() => setScope('suspended')}
                disabled={isExporting}
                className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-xs ${
                  scope === 'suspended'
                    ? 'border-sky-500 bg-sky-50 text-sky-800'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-sky-400 hover:bg-sky-50/40'
                }`}
              >
                <span>Export Suspended Companies</span>
              </button>
              <button
                type="button"
                onClick={() => setScope('filtered')}
                disabled={isExporting}
                className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-xs ${
                  scope === 'filtered'
                    ? 'border-sky-500 bg-sky-50 text-sky-800'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-sky-400 hover:bg-sky-50/40'
                }`}
              >
                <span>Export Filtered Results</span>
                <span className="text-[11px] text-slate-500">
                  {(filteredCompanies || []).length}
                </span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Export Format
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <button
                type="button"
                onClick={() => setFormat('csv')}
                disabled={isExporting}
                className={`rounded-xl border px-3 py-2 text-xs ${
                  format === 'csv'
                    ? 'border-amber-500 bg-amber-50 text-amber-800'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-amber-400 hover:bg-amber-50/40'
                }`}
              >
                CSV
              </button>
              <button
                type="button"
                onClick={() => setFormat('xlsx')}
                disabled={isExporting}
                className={`rounded-xl border px-3 py-2 text-xs ${
                  format === 'xlsx'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-400 hover:bg-emerald-50/40'
                }`}
              >
                Excel (.xlsx)
              </button>
            </div>
          </div>

          <div className="space-y-1 text-[11px] text-slate-500">
            <div>Included fields:</div>
            <div>
              Company, industry, recruiter, contact details, jobs, projects,
              verification, account status, commission and joined date.
            </div>
            {exportCount === 0 && (
              <div className="text-amber-700">
                No companies available to export for the selected filter.
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isExporting}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleExport}
            disabled={isExporting || !exportCount}
            className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-sky-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isExporting && (
              <span className="h-3 w-3 animate-spin rounded-full border border-white/40 border-t-white" />
            )}
            <span>
              {format === 'csv' ? 'Export CSV' : 'Export Excel'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompaniesExportData;
