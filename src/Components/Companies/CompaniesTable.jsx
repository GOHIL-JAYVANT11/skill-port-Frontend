import React from 'react';
import { createPortal } from 'react-dom';
import {
  MoreHorizontal,
  Eye,
  Activity,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  AlertTriangle,
  FileText,
  Briefcase,
  Building2,
  UserX,
  Ban,
} from 'lucide-react';

const getVerificationBadgeClasses = (status) => {
  if (status === 'Verified') {
    return 'bg-emerald-50 text-emerald-700 border-emerald-100';
  }
  if (status === 'Pending') {
    return 'bg-amber-50 text-amber-700 border-amber-100';
  }
  return 'bg-rose-50 text-rose-700 border-rose-100';
};

const getAccountStatusClasses = (status) => {
  if (status === 'Active') {
    return 'bg-emerald-50 text-emerald-700 border-emerald-100';
  }
  if (status === 'Suspended') {
    return 'bg-amber-50 text-amber-700 border-amber-100';
  }
  return 'bg-rose-50 text-rose-700 border-rose-100';
};

const CompaniesTable = ({
  companies,
  selectedCompanyIds,
  onToggleSelectCompany,
  onToggleSelectAll,
  onOpenDetails,
  onVerify,
  onRejectVerification,
  onSuspend,
  onBlacklist,
  onReactivate,
  onViewJobs,
  onViewProjects,
  onViewPayments,
  onViewDisputes,
  onAddAdminNote,
  onViewTimeline,
}) => {
  const [activeMenuRowIndex, setActiveMenuRowIndex] = React.useState(null);
  const [activeMenuCompany, setActiveMenuCompany] = React.useState(null);
  const [menuPosition, setMenuPosition] = React.useState({ top: 0, left: 0 });

  const handleRowMenuToggle = (index, e, company) => {
    if (activeMenuRowIndex === index) {
      setActiveMenuRowIndex(null);
      setActiveMenuCompany(null);
      return;
    }
    const r = e.currentTarget.getBoundingClientRect();
    const width = 288;
    const gap = 8;
    let left = Math.min(window.innerWidth - width - gap, Math.max(gap, r.right - width));
    let top = r.bottom + gap;
    const approxHeight = 360;
    if (top + approxHeight > window.innerHeight) {
      top = Math.max(gap, r.top - approxHeight - gap);
    }
    setMenuPosition({ top, left });
    setActiveMenuCompany(company);
    setActiveMenuRowIndex(index);
  };

  React.useEffect(() => {
    if (activeMenuRowIndex === null) return;
    const close = () => setActiveMenuRowIndex(null);
    window.addEventListener('resize', close);
    window.addEventListener('scroll', close, true);
    return () => {
      window.removeEventListener('resize', close);
      window.removeEventListener('scroll', close, true);
    };
  }, [activeMenuRowIndex]);

  const isAnySelected = selectedCompanyIds.length > 0;
  const allSelected =
    companies.length > 0 && selectedCompanyIds.length === companies.length;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
      <div className="max-h-[520px] overflow-y-auto">
        <table className="min-w-full border-separate border-spacing-0 text-left text-xs">
          <thead className="sticky top-0 z-10 bg-slate-50/80 backdrop-blur">
            <tr className="text-[11px] uppercase tracking-wide text-slate-500">
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                  checked={allSelected}
                  onChange={onToggleSelectAll}
                />
              </th>
              <th className="px-3 py-3 font-medium">Company</th>
              <th className="px-3 py-3 font-medium">Primary Recruiter</th>
              <th className="px-3 py-3 font-medium">Industry</th>
              <th className="px-3 py-3 font-medium text-right">
                Jobs
              </th>
              <th className="px-3 py-3 font-medium text-right">
                Projects
              </th>
              <th className="px-3 py-3 font-medium">Verification</th>
              <th className="px-3 py-3 font-medium">Account</th>
              <th className="px-3 py-3 font-medium">Risk</th>
              <th className="px-3 py-3 font-medium">Joined</th>
              <th className="px-4 py-3 text-right">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => {
              const isSelected = selectedCompanyIds.includes(company.id);
              const verificationStatus = company.verificationStatus;
              const accountStatus = company.accountStatus;
              const isActiveAccount = accountStatus === 'Active';
              const isSuspendedAccount = accountStatus === 'Suspended';
              const isVerified = verificationStatus === 'Verified';
              const isPendingVerification = verificationStatus === 'Pending';

              return (
                <tr
                  key={company.id}
                  className={`border-b border-slate-50 text-xs ${
                    isSelected ? 'bg-sky-50/40' : 'bg-white'
                  }`}
                >
                  <td className="px-4 py-3 align-top">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                      checked={isSelected}
                      onChange={() => onToggleSelectCompany(company.id)}
                    />
                  </td>
                  <td className="px-3 py-3 align-top">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50">
                        {company.logoUrl ? (
                          <img
                            src={company.logoUrl}
                            alt={company.name}
                            className="h-7 w-7 rounded-lg object-contain"
                          />
                        ) : (
                          <Building2 className="h-4 w-4 text-slate-400" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="text-xs font-semibold text-slate-900">
                            {company.name}
                          </div>
                          {company.risk?.level === 'High' && (
                            <AlertTriangle className="h-3 w-3 text-amber-500" />
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {company.email} • {company.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 align-top">
                    <div className="text-xs font-medium text-slate-900">
                      {company.primaryRecruiter}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {company.primaryRole}
                    </div>
                  </td>
                  <td className="px-3 py-3 align-top text-xs text-slate-700">
                    {company.industry}
                  </td>
                  <td className="px-3 py-3 align-top text-right text-xs text-slate-700">
                    {company.stats.totalJobs}
                  </td>
                  <td className="px-3 py-3 align-top text-right text-xs text-slate-700">
                    {company.stats.totalProjects}
                  </td>
                  <td className="px-3 py-3 align-top">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${getVerificationBadgeClasses(
                        company.verificationStatus,
                      )}`}
                    >
                      {company.verificationStatus === 'Verified' && (
                        <ShieldCheck className="h-3 w-3" />
                      )}
                      {company.verificationStatus === 'Pending' && (
                        <ShieldAlert className="h-3 w-3" />
                      )}
                      {company.verificationStatus === 'Rejected' && (
                        <ShieldX className="h-3 w-3" />
                      )}
                      {company.verificationStatus}
                    </span>
                  </td>
                  <td className="px-3 py-3 align-top">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${getAccountStatusClasses(
                        company.accountStatus,
                      )}`}
                    >
                      {company.accountStatus}
                    </span>
                  </td>
                  <td className="px-3 py-3 align-top text-xs text-slate-700">
                    <div className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2 py-0.5">
                      <AlertTriangle className="h-3 w-3 text-amber-500" />
                      <span>
                        {(company.risk?.reports ?? 0).toLocaleString()} reports
                        {' • '}
                        {(company.risk?.disputes ?? 0).toLocaleString()} disputes
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-3 align-top text-xs text-slate-700">
                    {company.joinedDate}
                  </td>
                  <td className="relative px-4 py-3 align-top text-right">
                    <button
                      type="button"
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                      onClick={(e) => handleRowMenuToggle(index, e, company)}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {companies.length === 0 && (
          <div className="flex h-48 flex-col items-center justify-center gap-2 text-xs text-slate-500">
            <Building2 className="h-6 w-6 text-slate-300" />
            <div>No companies found for the selected filters.</div>
          </div>
        )}
      </div>

      {activeMenuRowIndex !== null &&
        activeMenuCompany &&
        createPortal(
          <div
            className="fixed inset-0 z-[200]"
            onClick={() => setActiveMenuRowIndex(null)}
          >
            <div
              className="absolute w-72 rounded-2xl border border-slate-100 bg-white p-2 text-left shadow-xl"
              style={{ top: menuPosition.top, left: menuPosition.left }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-3 pb-1 pt-1">
                <div className="text-xs font-semibold text-slate-500">
                  Company Actions
                </div>
              </div>
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-slate-800 hover:bg-slate-50"
                onClick={() => {
                  if (onOpenDetails) {
                    onOpenDetails(activeMenuCompany);
                  }
                  setActiveMenuRowIndex(null);
                }}
              >
                <Eye className="h-4 w-4 text-slate-600" />
                <span className="text-xs font-medium">View Company Details</span>
              </button>
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-slate-800 hover:bg-slate-50"
                onClick={() => {
                  if (onViewTimeline) {
                    onViewTimeline(activeMenuCompany);
                  }
                  setActiveMenuRowIndex(null);
                }}
              >
                <Activity className="h-4 w-4 text-slate-600" />
                <span className="text-xs font-medium">View Activity Timeline</span>
              </button>
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-slate-800 hover:bg-slate-50"
                onClick={() => {
                  if (onAddAdminNote) {
                    onAddAdminNote(activeMenuCompany);
                  }
                  setActiveMenuRowIndex(null);
                }}
              >
                <FileText className="h-4 w-4 text-slate-600" />
                <span className="text-xs font-medium">Add Internal Admin Note</span>
              </button>
              <div className="my-1 h-px bg-slate-100" />
              {activeMenuCompany?.verificationStatus === 'Verified' &&
                activeMenuCompany?.accountStatus === 'Active' && (
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-amber-700 hover:bg-amber-50"
                    onClick={() => {
                      if (onRejectVerification) {
                        onRejectVerification(activeMenuCompany);
                      }
                      setActiveMenuRowIndex(null);
                    }}
                  >
                    <ShieldX className="h-4 w-4 text-amber-500" />
                    <span className="text-xs font-medium">Revoke Verification</span>
                  </button>
                )}
              {activeMenuCompany?.verificationStatus !== 'Verified' && (
                <button
                  type="button"
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-emerald-700 hover:bg-emerald-50"
                  onClick={() => {
                    if (onVerify) {
                      onVerify(activeMenuCompany);
                    }
                    setActiveMenuRowIndex(null);
                  }}
                >
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span className="text-xs font-medium">Manage Verification</span>
                </button>
              )}
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-slate-800 hover:bg-slate-50"
                onClick={() => {
                  if (onViewJobs) {
                    onViewJobs(activeMenuCompany);
                  }
                  setActiveMenuRowIndex(null);
                }}
              >
                <Briefcase className="h-4 w-4 text-slate-600" />
                <span className="text-xs font-medium">View Posted Jobs</span>
              </button>
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-slate-800 hover:bg-slate-50"
                onClick={() => {
                  if (onViewProjects) {
                    onViewProjects(activeMenuCompany);
                  }
                  setActiveMenuRowIndex(null);
                }}
              >
                <FileText className="h-4 w-4 text-slate-600" />
                <span className="text-xs font-medium">View Freelance Projects</span>
              </button>
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-slate-800 hover:bg-slate-50"
                onClick={() => {
                  if (onViewPayments) {
                    onViewPayments(activeMenuCompany);
                  }
                  setActiveMenuRowIndex(null);
                }}
              >
                <FileText className="h-4 w-4 text-slate-600" />
                <span className="text-xs font-medium">View Payments & Commission</span>
              </button>
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-amber-700 hover:bg-amber-50"
                onClick={() => {
                  if (onViewDisputes) {
                    onViewDisputes(activeMenuCompany);
                  }
                  setActiveMenuRowIndex(null);
                }}
              >
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span className="text-xs font-medium">View Disputes & Reports</span>
              </button>
              <div className="my-1 h-px bg-slate-100" />
              {activeMenuCompany?.accountStatus === 'Suspended' ? (
                <>
                  <button
                    type="button"
                    className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-emerald-700 hover:bg-emerald-50"
                    onClick={() => {
                      if (onReactivate) {
                        onReactivate(activeMenuCompany);
                      }
                      setActiveMenuRowIndex(null);
                    }}
                  >
                    <UserX className="h-4 w-4 text-emerald-600" />
                    <span className="text-xs font-medium">Reactivate From Suspension</span>
                  </button>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-rose-700 hover:bg-rose-50"
                    onClick={() => {
                      if (onBlacklist) {
                        onBlacklist(activeMenuCompany);
                      }
                      setActiveMenuRowIndex(null);
                    }}
                  >
                    <Ban className="h-4 w-4 text-rose-600" />
                    <span className="text-xs font-medium">Blacklist Company</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-amber-700 hover:bg-amber-50"
                    onClick={() => {
                      if (onSuspend) {
                        onSuspend(activeMenuCompany);
                      }
                      setActiveMenuRowIndex(null);
                    }}
                  >
                    <UserX className="h-4 w-4 text-amber-500" />
                    <span className="text-xs font-medium">Suspend Company</span>
                  </button>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-rose-700 hover:bg-rose-50"
                    onClick={() => {
                      if (onBlacklist) {
                        onBlacklist(activeMenuCompany);
                      }
                      setActiveMenuRowIndex(null);
                    }}
                  >
                    <Ban className="h-4 w-4 text-rose-600" />
                    <span className="text-xs font-medium">Blacklist Company</span>
                  </button>
                </>
              )}
            </div>
          </div>,
          document.body
        )}

      <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-[11px] text-slate-500">
        <div>
          Showing {companies.length} of {companies.length} companies
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="rounded-full bg-slate-50 px-3 py-1 font-medium text-slate-600 hover:bg-slate-100"
          >
            Bulk Verify
          </button>
          <button
            type="button"
            className="rounded-full bg-slate-50 px-3 py-1 font-medium text-slate-600 hover:bg-slate-100"
          >
            Bulk Suspend
          </button>
          <button
            type="button"
            className="rounded-full bg-slate-50 px-3 py-1 font-medium text-slate-600 hover:bg-slate-100"
          >
            Export CSV
          </button>
          <button
            type="button"
            className="rounded-full bg-slate-50 px-3 py-1 font-medium text-slate-600 hover:bg-slate-100"
          >
            Export Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompaniesTable;
