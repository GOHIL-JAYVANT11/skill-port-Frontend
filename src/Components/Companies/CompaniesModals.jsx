import React, { useState } from 'react';
import {
  X,
  Building2,
  UserCircle2,
  Globe,
  MapPin,
  ShieldCheck,
  ShieldX,
  AlertTriangle,
  Activity,
  StickyNote,
  FileText,
  Briefcase,
  Wallet,
  Gavel,
  Mail,
  Phone,
  ExternalLink,
} from 'lucide-react';

const SectionTitle = ({ label }) => (
  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
    {label}
  </div>
);

export const CompanyDetailsModal = ({ isOpen, onClose, company }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [verificationRejectReason, setVerificationRejectReason] = useState('');
  const [adminNoteDraft, setAdminNoteDraft] = useState('');

  if (!isOpen || !company) {
    return null;
  }

  const statBox = (label, value, tone = 'default') => {
    const tones = {
      default: 'border-slate-100 bg-slate-50',
      green: 'border-emerald-100 bg-emerald-50/60',
      amber: 'border-amber-100 bg-amber-50/70',
      soft: 'border-slate-100 bg-white',
    };
    const toneClass = tones[tone] || tones.default;

    return (
      <div className={`rounded-2xl px-4 py-3 ${toneClass}`}>
        <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </div>
        <div className="mt-1 text-sm font-semibold text-slate-900">{value}</div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-90 flex items-center justify-center bg-slate-900/50 px-4 py-6">
      <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-700 text-sm font-semibold text-white">
              {company.name
                .split(' ')
                .map((part) => part[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-slate-900">
                  {company.name}
                </h2>
                {company.isVerified && (
                  <span className="flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700">
                    <ShieldCheck className="h-3 w-3" />
                    Verified
                  </span>
                )}
              </div>
              <div className="mt-1 text-xs text-slate-500">
                {company.industry} • Joined {company.joinedDate}
              </div>
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

        <div className="flex border-b border-slate-100 px-6">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'verification', label: 'Verification' },
            { id: 'jobs-projects', label: 'Jobs & Projects' },
            { id: 'financials', label: 'Financials' },
            { id: 'risk-fraud', label: 'Risk & Fraud' },
            { id: 'admin-notes', label: 'Admin Notes' },
            { id: 'activity', label: 'Activity Timeline' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-3 text-xs font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-slate-900'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-slate-900" />
              )}
            </button>
          ))}
        </div>

        <div className="px-6 py-5">
          {activeTab === 'overview' && (
            <>
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <SectionTitle label="Company Profile" />
                  <p className="mt-2 text-sm text-slate-700">
                    {company.description ||
                      'No description provided by this company yet.'}
                  </p>
                </div>
                <div>
                  <SectionTitle label="Contact" />
                  <div className="mt-2 space-y-1 text-sm text-slate-700">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-slate-400" />
                      <span>{company.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-slate-400" />
                      <span>{company.phone}</span>
                    </div>
                    {company.website && (
                      <div className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-slate-400" />
                        <span className="text-sky-600">{company.website}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <SectionTitle label="Location" />
                  <div className="mt-2 flex items-start gap-2 text-sm text-slate-700">
                    <MapPin className="mt-0.5 h-4 w-4 text-slate-400" />
                    <span>{company.location}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-4">
                {statBox(
                  'Total Jobs',
                  company.stats.totalJobs.toLocaleString(),
                  'soft',
                )}
                {statBox(
                  'Freelance Projects',
                  company.stats.totalProjects.toLocaleString(),
                  'soft',
                )}
                {statBox(
                  'Active Hires',
                  company.stats.activeHires.toLocaleString(),
                  'soft',
                )}
                {statBox(
                  'Completed Hires',
                  (company.stats.completedHires || 0).toLocaleString(),
                  'soft',
                )}
              </div>
            </>
          )}

          {activeTab === 'verification' && (
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-6 md:col-span-2">
                <div>
                  <SectionTitle label="Verification Status" />
                  <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                    <ShieldCheck className="h-3 w-3" />
                    <span>{company.verificationStatus}</span>
                  </div>
                </div>

                <div>
                  <SectionTitle label="Registration Documents" />
                  <div className="mt-3 space-y-3">
                    {(company.verificationDocuments || []).map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-700"
                      >
                        <div>
                          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                            <FileText className="h-4 w-4 text-slate-500" />
                            <span>{doc.name}</span>
                          </div>
                          <div className="mt-1 text-[11px] text-slate-500">
                            Uploaded {doc.uploadedOn}
                          </div>
                        </div>
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                          {doc.status}
                        </span>
                      </div>
                    ))}
                    {(company.verificationDocuments || []).length === 0 && (
                      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
                        No verification documents uploaded yet.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <SectionTitle label="Reject Verification" />
                <p className="text-xs text-slate-500">
                  Provide a clear reason when rejecting verification so the
                  company can correct and re-submit.
                </p>
                <div className="space-y-2">
                  <div className="text-xs font-medium text-slate-900">
                    Rejection Reason
                  </div>
                  <textarea
                    value={verificationRejectReason}
                    onChange={(e) =>
                      setVerificationRejectReason(e.target.value)
                    }
                    rows={5}
                    className="w-full rounded-2xl border border-slate-200 p-3 text-xs text-slate-900 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                    placeholder="Explain why the verification is being rejected..."
                  />
                </div>
                <button
                  type="button"
                  className="mt-2 w-full rounded-2xl bg-rose-500 py-2.5 text-sm font-semibold text-white hover:bg-rose-600"
                >
                  Reject Verification
                </button>
              </div>
            </div>
          )}

          {activeTab === 'jobs-projects' && (
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
                  <SectionTitle label="Jobs Posted" />
                  <span>
                    {(company.jobsPosted || []).length} Records
                  </span>
                </div>
                <div className="space-y-2">
                  {(company.jobsPosted || []).map((job) => (
                    <div
                      key={job.id}
                      className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3 text-xs"
                    >
                      <div>
                        <div className="text-sm font-semibold text-slate-900">
                          {job.title}
                        </div>
                        <div className="mt-1 text-[11px] text-slate-500">
                          {job.type} • {job.date}
                        </div>
                        <div className="mt-0.5 text-[11px] text-slate-500">
                          {job.applicants} applicants
                        </div>
                      </div>
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                        {job.status}
                      </span>
                    </div>
                  ))}
                  {(company.jobsPosted || []).length === 0 && (
                    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
                      No jobs posted yet.
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
                  <SectionTitle label="Freelance Projects" />
                  <span>
                    {(company.projectsPosted || []).length} Records
                  </span>
                </div>
                <div className="space-y-2">
                  {(company.projectsPosted || []).map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3 text-xs"
                    >
                      <div>
                        <div className="text-sm font-semibold text-slate-900">
                          {project.title}
                        </div>
                        <div className="mt-1 text-[11px] text-slate-500">
                          {project.budget}
                        </div>
                        <div className="mt-0.5 text-[11px] text-slate-500">
                          {project.escrow}
                        </div>
                      </div>
                      <span className="rounded-full bg-sky-50 px-3 py-1 text-[11px] font-semibold text-sky-700">
                        {project.status}
                      </span>
                    </div>
                  ))}
                  {(company.projectsPosted || []).length === 0 && (
                    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
                      No freelance projects posted yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'financials' && (
            <div className="space-y-5">
              <div className="grid gap-4 md:grid-cols-4">
                {statBox(
                  'Total Commission',
                  `₹ ${company.financials.totalCommission.toLocaleString()}`,
                  'green',
                )}
                {statBox(
                  'Total Payments',
                  `₹ ${company.financials.totalPaid.toLocaleString()}`,
                  'soft',
                )}
                {statBox(
                  'Pending Commission',
                  `₹ ${company.financials.pendingCommission.toLocaleString()}`,
                  'amber',
                )}
                <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-xs text-slate-700">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Escrow Activity
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-[11px] text-emerald-600">
                        ↑ In
                      </div>
                      <div className="text-sm font-semibold text-slate-900">
                        ₹
                        {company.financials.escrowIn.toLocaleString()}
                      </div>
                    </div>
                    <div className="space-y-1 text-right">
                      <div className="text-[11px] text-rose-600">
                        ↓ Out
                      </div>
                      <div className="text-sm font-semibold text-slate-900">
                        ₹
                        {company.financials.escrowOut.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'risk-fraud' && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-4">
                {statBox(
                  'Reports',
                  company.risk.reports.toLocaleString(),
                  'soft',
                )}
                <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Disputes
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    {company.risk.disputes.toLocaleString()}
                  </div>
                  <div className="mt-1 text-[11px] text-slate-500">
                    Frequency: {company.risk.frequency || 'LOW'}
                  </div>
                </div>
                {statBox(
                  'Warnings',
                  company.risk.warnings.toLocaleString(),
                  'soft',
                )}
                {statBox('Last Dispute', company.risk.lastDispute || '—', 'soft')}
              </div>

              <div className="space-y-2">
                <SectionTitle label="Risk Indicators" />
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  <li>Account status: {company.accountStatus}</li>
                  <li>
                    Activity log entries:{' '}
                    {(company.activityTimeline || []).length}
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'admin-notes' && (
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-3 md:col-span-2">
                <SectionTitle label="Existing Notes" />
                <div className="space-y-2">
                  {(company.adminNotes || []).map((note) => (
                    <div
                      key={note.id}
                      className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-700"
                    >
                      <div className="text-[11px] font-semibold text-slate-500">
                        {note.author} • {note.createdAt}
                      </div>
                      <div className="mt-1 text-sm text-slate-800">
                        {note.note}
                      </div>
                    </div>
                  ))}
                  {(company.adminNotes || []).length === 0 && (
                    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
                      No internal admin notes added yet.
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-3">
                <SectionTitle label="Add New Note" />
                <textarea
                  value={adminNoteDraft}
                  onChange={(e) => setAdminNoteDraft(e.target.value)}
                  rows={6}
                  className="w-full rounded-2xl border border-slate-200 p-3 text-xs text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  placeholder="Add private note about this company. Only visible to admins."
                />
                <button
                  type="button"
                  className="w-full rounded-2xl bg-slate-900 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Save Note
                </button>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-3">
              <SectionTitle label="Company Activity Timeline" />
              <div className="mt-2 space-y-2 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-700">
                {(company.activityTimeline || []).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-3 rounded-xl bg-white px-3 py-2"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        {item.title}
                      </div>
                      {item.subtitle && (
                        <div className="text-[11px] text-slate-500">
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                    <div className="text-right text-[11px] text-slate-500">
                      {item.meta}
                    </div>
                  </div>
                ))}
                {(company.activityTimeline || []).length === 0 && (
                  <div className="flex h-32 flex-col items-center justify-center text-xs text-slate-500">
                    <Activity className="mb-2 h-5 w-5 text-slate-300" />
                    <div>No activity recorded for this company yet.</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const VerifyCompanyModal = ({ isOpen, onClose, company }) => {
  if (!isOpen || !company) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50">
      <div className="w-full max-w-lg rounded-3xl border border-slate-100 bg-white p-7 text-center shadow-2xl">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
          <ShieldCheck className="h-6 w-6 text-emerald-500" />
        </div>
        <h2 className="text-lg font-semibold text-slate-900">
          Verify Company
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Confirm that you have reviewed the company documents and want to mark
          this company as verified.
        </p>
        <div className="mt-4 text-sm">
          <div className="font-semibold text-slate-900">{company.name}</div>
          <div className="text-slate-500">{company.industry}</div>
        </div>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600"
          >
            Verify Company
          </button>
        </div>
      </div>
    </div>
  );
};

export const RejectVerificationModal = ({ isOpen, onClose, company }) => {
  const [reason, setReason] = useState('');

  if (!isOpen || !company) {
    return null;
  }

  const canSubmit = reason.trim().length > 0;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50">
      <div className="w-full max-w-lg rounded-3xl border border-slate-100 bg-white p-7 shadow-2xl">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50">
              <ShieldX className="h-5 w-5 text-rose-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Reject Verification
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Provide a clear reason. This will be shared with the company
                owner.
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

        <div className="mb-4 rounded-2xl border border-rose-100 bg-rose-50/70 px-4 py-3 text-xs text-slate-700">
          <div className="font-semibold text-slate-900">{company.name}</div>
          <div className="text-slate-500">
            Primary recruiter: {company.primaryRecruiter}
          </div>
        </div>

        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-slate-900">
            Reason for Rejection *
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-900 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            placeholder="Example: Documents do not match legal entity, incomplete registration details, or missing tax information..."
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!canSubmit}
            className={`rounded-xl px-4 py-2 text-sm font-semibold text-white ${
              canSubmit
                ? 'bg-rose-500 hover:bg-rose-600'
                : 'bg-rose-400/60 cursor-not-allowed'
            }`}
          >
            Reject Verification
          </button>
        </div>
      </div>
    </div>
  );
};

export const AccountStatusModal = ({
  isOpen,
  onClose,
  company,
  mode = 'suspend',
}) => {
  if (!isOpen || !company) {
    return null;
  }

  const isBlacklist = mode === 'blacklist';
  const isReactivate = mode === 'reactivate';

  const title = isReactivate
    ? 'Reactivate Company'
    : isBlacklist
    ? 'Blacklist Company'
    : 'Suspend Company';

  const description = isReactivate
    ? 'Reactivate this company and restore access to the platform.'
    : isBlacklist
    ? 'Blacklist this company. This is a permanent action and will block new activity.'
    : 'Temporarily suspend this company. They will not be able to post new jobs or projects.';

  const confirmLabel = isReactivate
    ? 'Reactivate'
    : isBlacklist
    ? 'Blacklist'
    : 'Suspend';

  const color =
    mode === 'reactivate'
      ? 'emerald'
      : mode === 'blacklist'
      ? 'rose'
      : 'amber';

  const colorClasses = {
    emerald: {
      iconBg: 'bg-emerald-50',
      iconText: 'text-emerald-500',
      button: 'bg-emerald-500 hover:bg-emerald-600',
    },
    rose: {
      iconBg: 'bg-rose-50',
      iconText: 'text-rose-500',
      button: 'bg-rose-500 hover:bg-rose-600',
    },
    amber: {
      iconBg: 'bg-amber-50',
      iconText: 'text-amber-500',
      button: 'bg-amber-500 hover:bg-amber-600',
    },
  }[color];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50">
      <div className="w-full max-w-lg rounded-3xl border border-slate-100 bg-white p-7 shadow-2xl">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${colorClasses.iconBg}`}
            >
              <AlertTriangle
                className={`h-5 w-5 ${colorClasses.iconText}`}
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {title}
              </h2>
              <p className="mt-1 text-xs text-slate-500">{description}</p>
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

        <div className="mb-5 rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3 text-xs text-slate-700">
          <div className="font-semibold text-slate-900">{company.name}</div>
          <div className="text-slate-500">
            Primary recruiter: {company.primaryRecruiter}
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            Current account status:{' '}
            <span className="font-semibold text-slate-800">
              {company.accountStatus}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            className={`rounded-xl px-4 py-2 text-sm font-semibold text-white ${colorClasses.button}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export const AdminNoteModal = ({ isOpen, onClose, company }) => {
  const [note, setNote] = useState('');

  if (!isOpen || !company) {
    return null;
  }

  const canSubmit = note.trim().length > 0;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50">
      <div className="w-full max-w-lg rounded-3xl border border-slate-100 bg-white p-7 shadow-2xl">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50">
              <StickyNote className="h-5 w-5 text-slate-700" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Add Internal Note
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Notes are only visible to internal admins and moderators.
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

        <div className="mb-4 rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3 text-xs text-slate-700">
          <div className="font-semibold text-slate-900">{company.name}</div>
          <div className="text-slate-500">
            Primary recruiter: {company.primaryRecruiter}
          </div>
        </div>

        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-slate-900">
            Note *
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            placeholder="Example: Company has consistent hiring activity with low dispute rate. Verified GST and registration documents."
          />
          <p className="mt-1 text-xs text-slate-500">
            Automatically added to the company moderation history.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!canSubmit}
            className={`rounded-xl px-4 py-2 text-sm font-semibold text-white ${
              canSubmit
                ? 'bg-sky-600 hover:bg-sky-700'
                : 'bg-sky-400/60 cursor-not-allowed'
            }`}
          >
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
};

export const MostProfitableCompaniesModal = ({
  isOpen,
  onClose,
  companies,
  formatCurrency,
}) => {
  if (!isOpen) {
    return null;
  }

  const formatter =
    formatCurrency ||
    ((amount) =>
      new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(amount));

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 px-4 py-6">
      <div className="w-full max-w-xl rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-slate-50">
              <Building2 className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Most Profitable Companies
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Ranked by total commission contributed across jobs and freelance
                projects.
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

        <div className="max-h-[360px] space-y-2 overflow-y-auto rounded-2xl border border-slate-100 bg-slate-50 p-3 text-xs text-slate-700">
          {(companies || []).map((company, index) => (
            <div
              key={company.name}
              className="flex items-center justify-between rounded-xl bg-white px-3 py-2"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-[11px] font-semibold text-slate-50">
                  {index + 1}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    {company.name}
                  </div>
                  {company.industry && (
                    <div className="text-[11px] text-slate-500">
                      {company.industry}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right text-[11px] font-semibold text-slate-900">
                {formatter(company.amount)}
              </div>
            </div>
          ))}
          {(companies || []).length === 0 && (
            <div className="flex h-32 flex-col items-center justify-center text-xs text-slate-500">
              <Building2 className="mb-2 h-5 w-5 text-slate-300" />
              <div>No profitable companies data available yet.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const SimpleListModal = ({
  isOpen,
  onClose,
  company,
  title,
  icon,
  items,
}) => {
  if (!isOpen || !company) {
    return null;
  }

  const IconComponent = icon || FileText;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 px-4 py-6">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50">
              <IconComponent className="h-4 w-4 text-slate-700" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
              <p className="mt-1 text-xs text-slate-500">
                {company.name} • {company.industry}
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

        <div className="max-h-[360px] space-y-2 overflow-y-auto rounded-2xl border border-slate-100 bg-slate-50 p-3 text-xs text-slate-700">
          {items && items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-3 rounded-xl bg-white px-3 py-2"
              >
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </div>
                  {item.subtitle && (
                    <div className="text-[11px] text-slate-500">
                      {item.subtitle}
                    </div>
                  )}
                </div>
                {item.meta && (
                  <div className="text-right text-[11px] text-slate-500">
                    {item.meta}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="flex h-32 flex-col items-center justify-center text-xs text-slate-500">
              <FileText className="mb-2 h-5 w-5 text-slate-300" />
              <div>No records available for this company yet.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const AddCompanyModal = ({ isOpen, onClose, onSave }) => {
  const [form, setForm] = useState({
    companyName: '',
    companyLogoName: '',
    industry: '',
    companyEmail: '',
    phone: '',
    website: '',
    companySize: '',
    headquarters: '',
    foundedYear: '',
    description: '',
    recruiterName: '',
    recruiterEmail: '',
    recruiterPhone: '',
    recruiterDesignation: '',
    registrationDocName: '',
    taxDocName: '',
    businessLicense: '',
    accountStatus: 'Active',
    allowJobPosting: true,
    allowFreelancePosting: true,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) {
    return null;
  }

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleFileChange = (field, event) => {
    const file = event.target.files && event.target.files[0];
    updateField(field, file ? file.name : '');
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.companyName.trim()) {
      nextErrors.companyName = 'Company name is required';
    }
    if (!form.companyEmail.trim()) {
      nextErrors.companyEmail = 'Official email is required';
    }
    if (!form.recruiterName.trim()) {
      nextErrors.recruiterName = 'Primary recruiter name is required';
    }
    if (!form.recruiterEmail.trim()) {
      nextErrors.recruiterEmail = 'Recruiter email is required';
    }
    if (!form.registrationDocName) {
      nextErrors.registrationDocName = 'Registration document is required';
    }

    return nextErrors;
  };

  const resetState = () => {
    setForm({
      companyName: '',
      companyLogoName: '',
      industry: '',
      companyEmail: '',
      phone: '',
      website: '',
      companySize: '',
      headquarters: '',
      foundedYear: '',
      description: '',
      recruiterName: '',
      recruiterEmail: '',
      recruiterPhone: '',
      recruiterDesignation: '',
      registrationDocName: '',
      taxDocName: '',
      businessLicense: '',
      accountStatus: 'Active',
      allowJobPosting: true,
      allowFreelancePosting: true,
    });
    setErrors({});
    setIsSubmitting(false);
  };

  const handleSubmit = (mode) => {
    if (isSubmitting) {
      return;
    }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    const now = new Date();
    const joinedDate = now.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });

    const isVerified = mode === 'verify';

    const newCompany = {
      id: `new-${now.getTime()}`,
      name: form.companyName.trim(),
      logoUrl: '',
      primaryRecruiter: form.recruiterName.trim(),
      primaryRole: form.recruiterDesignation.trim() || 'Recruiter',
      email: form.companyEmail.trim(),
      phone: form.phone.trim(),
      industry: form.industry || 'Other',
      location: form.headquarters.trim(),
      verificationStatus: isVerified ? 'Verified' : 'Pending',
      accountStatus: form.accountStatus || 'Active',
      isVerified,
      joinedDate,
      website: form.website.trim(),
      description: form.description.trim(),
      verificationReviewedAt: isVerified ? joinedDate : null,
      riskTag: '',
      stats: {
        totalJobs: 0,
        totalProjects: 0,
        openJobs: 0,
        closedJobs: 0,
        activeProjects: 0,
        completedProjects: 0,
        activeHires: 0,
      },
      financials: {
        totalCommission: 0,
        totalPaid: 0,
        pendingCommission: 0,
        escrowIn: 0,
        escrowOut: 0,
        activeEscrows: 0,
        disputedEscrows: 0,
        payoutTime: '',
        lastPayout: '',
      },
      risk: {
        reports: 0,
        disputes: 0,
        warnings: 0,
        lastIncident: '',
        lastDispute: '',
        frequency: 'LOW',
        level: 'Low',
      },
      adminNotes: [],
      paymentsHistory: [],
      disputesHistory: [],
      activityTimeline: [],
      permissions: {
        allowJobPosting: form.allowJobPosting,
        allowFreelancePosting: form.allowFreelancePosting,
      },
      documents: {
        registrationDocName: form.registrationDocName,
        taxDocName: form.taxDocName,
        businessLicense: form.businessLicense.trim(),
      },
    };

    if (onSave) {
      onSave(newCompany, { verified: isVerified });
    }

    resetState();
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl transition-transform duration-200">
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Add New Company
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Capture core company, recruiter and verification details.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              resetState();
              if (onClose) {
                onClose();
              }
            }}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5 text-xs text-slate-700">
          <div className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Basic Company Details
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="block text-[11px] font-medium text-slate-600">
                  Company Name
                </label>
                <input
                  type="text"
                  value={form.companyName}
                  onChange={(e) => updateField('companyName', e.target.value)}
                  className="mt-1 h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
                {errors.companyName && (
                  <div className="mt-1 text-[11px] text-rose-600">
                    {errors.companyName}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600">
                  Company Logo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange('companyLogoName', e)}
                  className="mt-1 block w-full text-[11px] text-slate-600 file:mr-2 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-slate-700"
                />
                {form.companyLogoName && (
                  <div className="mt-1 text-[11px] text-slate-500">
                    {form.companyLogoName}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600">
                  Industry
                </label>
                <select
                  value={form.industry}
                  onChange={(e) => updateField('industry', e.target.value)}
                  className="mt-1 h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                >
                  <option value="">Select industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Education">Education</option>
                  <option value="Design & Creative">Design & Creative</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600">
                  Official Company Email
                </label>
                <input
                  type="email"
                  value={form.companyEmail}
                  onChange={(e) => updateField('companyEmail', e.target.value)}
                  className="mt-1 h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
                {errors.companyEmail && (
                  <div className="mt-1 text-[11px] text-rose-600">
                    {errors.companyEmail}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="mt-1 h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600">
                  Website URL
                </label>
                <input
                  type="text"
                  value={form.website}
                  onChange={(e) => updateField('website', e.target.value)}
                  className="mt-1 h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600">
                  Company Size
                </label>
                <select
                  value={form.companySize}
                  onChange={(e) => updateField('companySize', e.target.value)}
                  className="mt-1 h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                >
                  <option value="">Select size</option>
                  <option value="1-10">1–10</option>
                  <option value="11-50">11–50</option>
                  <option value="51-200">51–200</option>
                  <option value="200+">200+</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600">
                  Headquarters Location
                </label>
                <input
                  type="text"
                  value={form.headquarters}
                  onChange={(e) => updateField('headquarters', e.target.value)}
                  className="mt-1 h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600">
                  Founded Year
                </label>
                <input
                  type="number"
                  value={form.foundedYear}
                  onChange={(e) => updateField('foundedYear', e.target.value)}
                  className="mt-1 h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[11px] font-medium text-slate-600">
                  Company Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  rows={3}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Recruiter Details
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="block text-[11px] font-medium text-slate-600">
                  Primary Recruiter Name
                </label>
                <input
                  type="text"
                  value={form.recruiterName}
                  onChange={(e) => updateField('recruiterName', e.target.value)}
                  className="mt-1 h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
                {errors.recruiterName && (
                  <div className="mt-1 text-[11px] text-rose-600">
                    {errors.recruiterName}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600">
                  Recruiter Email
                </label>
                <input
                  type="email"
                  value={form.recruiterEmail}
                  onChange={(e) => updateField('recruiterEmail', e.target.value)}
                  className="mt-1 h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
                {errors.recruiterEmail && (
                  <div className="mt-1 text-[11px] text-rose-600">
                    {errors.recruiterEmail}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600">
                  Recruiter Phone
                </label>
                <input
                  type="text"
                  value={form.recruiterPhone}
                  onChange={(e) => updateField('recruiterPhone', e.target.value)}
                  className="mt-1 h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600">
                  Designation
                </label>
                <input
                  type="text"
                  value={form.recruiterDesignation}
                  onChange={(e) =>
                    updateField('recruiterDesignation', e.target.value)
                  }
                  className="mt-1 h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Verification Details
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="block text-[11px] font-medium text-slate-600">
                  Registration Document
                </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange('registrationDocName', e)}
                  className="mt-1 block w-full text-[11px] text-slate-600 file:mr-2 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-slate-700"
                />
                {form.registrationDocName && (
                  <div className="mt-1 text-[11px] text-slate-500">
                    {form.registrationDocName}
                  </div>
                )}
                {errors.registrationDocName && (
                  <div className="mt-1 text-[11px] text-rose-600">
                    {errors.registrationDocName}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600">
                  Tax/GST Document
                </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange('taxDocName', e)}
                  className="mt-1 block w-full text-[11px] text-slate-600 file:mr-2 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-slate-700"
                />
                {form.taxDocName && (
                  <div className="mt-1 text-[11px] text-slate-500">
                    {form.taxDocName}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600">
                  Business License Number
                </label>
                <input
                  type="text"
                  value={form.businessLicense}
                  onChange={(e) =>
                    updateField('businessLicense', e.target.value)
                  }
                  className="mt-1 h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600">
                  Default Verification Status
                </label>
                <div className="mt-1 inline-flex items-center rounded-full border border-amber-100 bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-800">
                  Pending
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Account Controls
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="block text-[11px] font-medium text-slate-600">
                  Account Status
                </label>
                <select
                  value={form.accountStatus}
                  onChange={(e) => updateField('accountStatus', e.target.value)}
                  className="mt-1 h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                >
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Blacklisted">Blacklisted</option>
                </select>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-600">
                    Allow Job Posting
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updateField('allowJobPosting', !form.allowJobPosting)
                    }
                    className={`inline-flex h-5 w-9 items-center rounded-full border px-0.5 text-[11px] transition-colors ${
                      form.allowJobPosting
                        ? 'border-emerald-400 bg-emerald-500'
                        : 'border-slate-300 bg-slate-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                        form.allowJobPosting ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-600">
                    Allow Freelance Posting
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updateField(
                        'allowFreelancePosting',
                        !form.allowFreelancePosting,
                      )
                    }
                    className={`inline-flex h-5 w-9 items-center rounded-full border px-0.5 text-[11px] transition-colors ${
                      form.allowFreelancePosting
                        ? 'border-emerald-400 bg-emerald-500'
                        : 'border-slate-300 bg-slate-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                        form.allowFreelancePosting
                          ? 'translate-x-4'
                          : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 bg-slate-50 px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-[11px] text-slate-500">
              New companies will appear at the top of the table with Pending
              verification.
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  resetState();
                  if (onClose) {
                    onClose();
                  }
                }}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSubmit('save')}
                disabled={isSubmitting}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Saving...' : 'Save Company'}
              </button>
              <button
                type="button"
                onClick={() => handleSubmit('verify')}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-emerald-500/40 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting && (
                  <span className="h-3 w-3 animate-spin rounded-full border border-white/40 border-t-white" />
                )}
                <span>Save & Verify</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PaymentsModal = (props) => (
  <SimpleListModal
    {...props}
    title="Payment & Commission History"
    icon={Wallet}
  />
);

export const DisputesModal = (props) => (
  <SimpleListModal {...props} title="Disputes & Reports" icon={Gavel} />
);

export const ActivityTimelineModal = (props) => (
  <SimpleListModal
    {...props}
    title="Company Activity Timeline"
    icon={Activity}
  />
);

export default CompanyDetailsModal;
