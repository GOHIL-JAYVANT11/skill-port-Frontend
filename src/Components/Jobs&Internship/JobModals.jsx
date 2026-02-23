import React, { useState } from 'react';
import {
  X,
  FileText,
  Users,
  ShieldCheck,
  ShieldX,
  AlertTriangle,
  StickyNote,
  FlagTriangleRight,
  MapPin,
  Briefcase,
  DollarSign,
  Download,
  MessageSquare,
} from 'lucide-react';

const SectionTitle = ({ label }) => (
  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
    {label}
  </div>
);

const getInitials = (value) => {
  if (!value) {
    return '?';
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return '?';
  }
  const parts = trimmed.split(' ');
  const first = parts[0][0] || '';
  const second = parts.length > 1 ? parts[1][0] : '';
  return (first + second).toUpperCase();
};

export const JobDetailsModal = ({ isOpen, onClose, job }) => {
  const [activeTab, setActiveTab] = useState('details');

  if (!isOpen || !job) {
    return null;
  }

  const statusColorClasses =
    job.status === 'Approved'
      ? 'bg-emerald-50 text-emerald-700'
      : job.status === 'Pending'
      ? 'bg-amber-50 text-amber-700'
      : job.status === 'Rejected' || job.status === 'Blocked'
      ? 'bg-rose-50 text-rose-700'
      : 'bg-slate-50 text-slate-700';

  const statusBorderClasses =
    job.status === 'Approved'
      ? 'border-emerald-100'
      : job.status === 'Pending'
      ? 'border-amber-100'
      : job.status === 'Rejected' || job.status === 'Blocked'
      ? 'border-rose-100'
      : 'border-slate-100';

  const notesCount = job.notesCount || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50">
      <div className="flex h-[80vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-100 px-8 pt-6 pb-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-lg font-semibold text-white">
              {getInitials(job.company || job.title)}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                {job.title}
              </h2>
              <p className="mt-0.5 text-sm text-slate-500">{job.company}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusColorClasses} ${statusBorderClasses}`}
            >
              {job.status}
            </span>
            <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
              {job.type}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="border-b border-slate-100 px-8 pb-4 pt-3">
          <div className="grid gap-3 text-xs text-slate-600 sm:grid-cols-4 lg:grid-cols-5">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-slate-400" />
              <div>
                <div className="uppercase tracking-wide text-[10px] text-slate-400">
                  Location
                </div>
                <div className="text-sm text-slate-800">
                  {job.location || 'Not specified'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-slate-400" />
              <div>
                <div className="uppercase tracking-wide text-[10px] text-slate-400">
                  Work Mode
                </div>
                <div className="text-sm text-slate-800">
                  {job.locationType || 'Not specified'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-slate-400" />
              <div>
                <div className="uppercase tracking-wide text-[10px] text-slate-400">
                  Salary / Budget
                </div>
                <div className="text-sm text-slate-800">
                  {job.budget || 'Not specified'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-slate-400" />
              <div>
                <div className="uppercase tracking-wide text-[10px] text-slate-400">
                  Experience
                </div>
                <div className="text-sm text-slate-800">
                  {job.experienceLevel || 'Not specified'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-slate-400" />
              <div>
                <div className="uppercase tracking-wide text-[10px] text-slate-400">
                  Applicants
                </div>
                <div className="text-sm text-slate-800">
                  {job.applicantsCount || 0}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-slate-100 px-8">
          <div className="flex items-center gap-4 pt-3">
            <button
              type="button"
              onClick={() => setActiveTab('details')}
              className={`border-b-2 px-1 pb-3 text-sm font-semibold ${
                activeTab === 'details'
                  ? 'border-emerald-500 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Details
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('recruiter')}
              className={`border-b-2 px-1 pb-3 text-sm font-semibold ${
                activeTab === 'recruiter'
                  ? 'border-emerald-500 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Recruiter
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('notes')}
              className={`border-b-2 px-1 pb-3 text-sm font-semibold ${
                activeTab === 'notes'
                  ? 'border-emerald-500 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Notes ({notesCount})
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <SectionTitle label="Description" />
                <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-line">
                  {job.description ||
                    'We are looking for a strong contributor to join this team and help build amazing experiences for our learners.'}
                </p>
              </div>

              <div className="space-y-2">
                <SectionTitle label="Required Skills" />
                <div className="flex flex-wrap gap-1.5">
                  {(job.skills || []).map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-full bg-slate-900 px-3 py-0.5 text-[11px] font-medium text-slate-50"
                    >
                      {skill}
                    </span>
                  ))}
                  {!job.skills?.length && (
                    <span className="text-xs text-slate-500">
                      No skills specified.
                    </span>
                  )}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <SectionTitle label="Requirements" />
                  <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
                    <li>Solid experience in the core skills listed above.</li>
                    <li>Comfortable working in cross-functional teams.</li>
                    <li>Strong communication and collaboration skills.</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <SectionTitle label="Responsibilities" />
                  <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
                    <li>Deliver high-quality features and improvements.</li>
                    <li>Review and maintain code quality and standards.</li>
                    <li>Collaborate with product and design teams.</li>
                  </ul>
                </div>
              </div>

              {job.type === 'Internship' && (
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-1 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                    <SectionTitle label="Duration" />
                    <div className="text-sm text-slate-700">
                      {job.duration || 'Not specified'}
                    </div>
                  </div>
                  <div className="space-y-1 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                    <SectionTitle label="Stipend" />
                    <div className="text-sm text-slate-700">
                      {job.stipend || 'Not specified'}
                    </div>
                  </div>
                  <div className="space-y-1 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                    <SectionTitle label="Eligibility" />
                    <div className="text-sm text-slate-700">
                      {job.eligibility || 'Not specified'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'recruiter' && (
            <div className="space-y-4">
              <div className="space-y-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-base font-semibold text-white">
                    {getInitials(job.recruiter || job.company)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-semibold text-slate-900">
                        {job.recruiter || 'Unknown recruiter'}
                      </div>
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                        Verified
                      </span>
                    </div>
                    <div className="mt-0.5 text-xs text-slate-500">
                      {job.company}
                    </div>
                  </div>
                </div>
                <div className="space-y-1 text-sm text-slate-700">
                  <div>
                    Email:{' '}
                    <span className="font-medium">
                      {job.recruiterEmail || 'No email provided'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">
                    Recruiter details are visible only to admins.
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="flex h-full flex-col items-center justify-center text-center text-sm text-slate-500">
              <div className="mb-2 text-2xl">📝</div>
              <div className="font-semibold text-slate-800">
                No admin notes yet
              </div>
              <div className="mt-1 max-w-md text-xs text-slate-500">
                Use the “Add Admin Note” action from the jobs table to capture
                moderation context or follow-ups.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const ApproveJobModal = ({ isOpen, onClose, job }) => {
  if (!isOpen || !job) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50">
      <div className="w-full max-w-lg rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-2xl">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
          <ShieldCheck className="h-6 w-6 text-emerald-500" />
        </div>
        <h2 className="text-xl font-semibold text-slate-900">
          Approve Job Posting
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Are you sure you want to approve the job posting:
        </p>
        <div className="mt-4 text-sm">
          <div className="font-semibold text-slate-900">{job.title}</div>
          <div className="text-slate-500">at {job.company}</div>
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
            Approve Job
          </button>
        </div>
      </div>
    </div>
  );
};

export const RejectJobModal = ({ isOpen, onClose, job }) => {
  const [reason, setReason] = useState('');

  if (!isOpen || !job) {
    return null;
  }

  const canSubmit = reason.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50">
      <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center gap-2">
          <ShieldX className="h-5 w-5 text-rose-500" />
          <h2 className="text-lg font-semibold text-slate-900">Reject Job</h2>
        </div>
        <p className="mb-4 text-sm text-slate-600">
          This job will be rejected and not shown to candidates. A rejection
          reason is required and will be visible to the recruiter.
        </p>
        <div className="mb-4 rounded-2xl border border-rose-100 bg-rose-50/60 p-3 text-xs text-slate-700">
          <div className="font-semibold text-rose-800">{job.title}</div>
          <div className="text-slate-500">
            {job.company} • {job.location}
          </div>
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-slate-900">
            Rejection Reason *
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-900 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            placeholder="Explain why this job is being rejected (e.g., incomplete details, policy violation, irrelevant content)..."
          />
          <p className="mt-1 text-xs text-slate-500">
            This reason will be shared with the recruiter and stored for audit
            logs.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!canSubmit}
            className={`flex-1 rounded-xl px-4 py-2 text-sm font-semibold text-white ${
              canSubmit
                ? 'bg-rose-500 hover:bg-rose-600'
                : 'bg-rose-400/60 cursor-not-allowed'
            }`}
          >
            Reject Job
          </button>
        </div>
      </div>
    </div>
  );
};

export const RequestChangesModal = ({ isOpen, onClose, job }) => {
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [message, setMessage] = useState('');

  if (!isOpen || !job) {
    return null;
  }

  const REASONS = [
    'Update job title',
    'Improve job description',
    'Clarify salary information',
    'Update requirements',
    'Add or modify required skills',
    'Verify location details',
    'Add company information',
  ];

  const toggleReason = (reason) => {
    setSelectedReasons((prev) =>
      prev.includes(reason) ? prev.filter((item) => item !== reason) : [...prev, reason],
    );
  };

  const canSubmit = selectedReasons.length > 0 || message.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50">
      <div className="w-full max-w-lg rounded-3xl border border-slate-100 bg-white p-7 shadow-2xl">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50">
              <MessageSquare className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Request Changes
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Request changes from recruiter for:
                <span className="ml-1 font-semibold">{job.title}</span>
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

        <div className="mb-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Select Required Changes
          </div>
          <div className="space-y-2">
            {REASONS.map((reason) => {
              const active = selectedReasons.includes(reason);
              return (
                <button
                  key={reason}
                  type="button"
                  onClick={() => toggleReason(reason)}
                  className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-sm text-slate-700 hover:border-amber-300"
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                      active ? 'border-amber-500 bg-amber-500' : 'border-slate-300 bg-white'
                    }`}
                  >
                    {active && (
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </span>
                  <span className="text-xs">{reason}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-slate-900">
            Additional Message to Recruiter
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            placeholder="Provide specific details about what needs to be changed..."
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
                ? 'bg-amber-500 hover:bg-amber-600'
                : 'bg-amber-400/60 cursor-not-allowed'
            }`}
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
};

export const BlockJobModal = ({ isOpen, onClose, job }) => {
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');

  if (!isOpen || !job) {
    return null;
  }

  const REASONS = [
    'Spam or fraudulent posting',
    'Violates community guidelines',
    'Misleading information',
    'Reported by multiple users',
    'Recruiter account issues',
    'Legal concerns',
    'Other',
  ];

  const canSubmit = reason.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50">
      <div className="w-full max-w-lg rounded-3xl border border-slate-100 bg-white p-7 shadow-2xl">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50">
              <AlertTriangle className="h-5 w-5 text-rose-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Block / Remove Job
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                You are about to block:
              </p>
              <div className="mt-1 text-sm">
                <div className="font-semibold text-slate-900">{job.title}</div>
                <div className="text-slate-500">at {job.company}</div>
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

        <div className="mb-4 rounded-2xl border border-rose-100 bg-rose-50/70 p-3 text-xs text-rose-700">
          This action will remove the job from public listings and notify the
          recruiter.
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-slate-900">
            Block Reason *
          </label>
          <div className="relative">
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            >
              <option value="">Select a reason</option>
              {REASONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-slate-900">
            Additional Details (optional)
          </label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-900 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            placeholder="Provide any extra context for this moderation action..."
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
            Block Job
          </button>
        </div>
      </div>
    </div>
  );
};

export const AdminNoteModal = ({ isOpen, onClose, job }) => {
  const [note, setNote] = useState('');

  if (!isOpen || !job) {
    return null;
  }

  const canSubmit = note.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50">
      <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center gap-2">
          <StickyNote className="h-5 w-5 text-sky-500" />
          <h2 className="text-lg font-semibold text-slate-900">
            Add Internal Admin Note
          </h2>
        </div>
        <p className="mb-4 text-sm text-slate-600">
          Internal notes are only visible to admins and can be used to track
          moderation decisions, recruiter quality, or follow-up actions.
        </p>
        <div className="mb-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-3 text-xs text-slate-700">
          <div className="font-semibold text-slate-800">{job.title}</div>
          <div className="text-slate-500">
            {job.company} • {job.location}
          </div>
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-slate-900">
            Internal Note *
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            placeholder="Example: Recruiter has a history of high-quality roles. Monitor reports in the first week..."
          />
          <p className="mt-1 text-xs text-slate-500">
            Notes are stored in the job audit trail and visible to all admins.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!canSubmit}
            className={`flex-1 rounded-xl px-4 py-2 text-sm font-semibold text-white ${
              canSubmit ? 'bg-sky-500 hover:bg-sky-600' : 'bg-sky-400/60 cursor-not-allowed'
            }`}
          >
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
};

export const ApplicantsModal = ({ isOpen, onClose, job }) => {
  if (!isOpen || !job) {
    return null;
  }

  const applicants = job.applicants || [];

  const total = applicants.length;
  const shortlisted = applicants.filter(
    (a) => a.status === 'Shortlisted',
  ).length;
  const interviewed = applicants.filter(
    (a) => a.status === 'Interviewed',
  ).length;
  const rejected = applicants.filter((a) => a.status === 'Rejected').length;

  const getStatusClasses = (status) => {
    if (status === 'Shortlisted') {
      return 'bg-emerald-50 text-emerald-700';
    }
    if (status === 'Interviewed') {
      return 'bg-sky-50 text-sky-700';
    }
    if (status === 'Rejected') {
      return 'bg-rose-50 text-rose-700';
    }
    return 'bg-slate-50 text-slate-600';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50">
      <div className="flex h-[70vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-100 px-8 pt-6 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
              <Users className="h-3.5 w-3.5" />
              <span>Applicants</span>
            </div>
            <h2 className="mt-2 text-lg font-semibold text-slate-900">
              {job.title}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              {job.company} • Skill match, shortlist and rejection stats.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 hover:border-slate-300"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="border-b border-slate-100 px-8 py-4">
          {applicants.length === 0 ? (
            <div className="text-xs text-slate-500">
              No applicants yet. Once candidates start applying, summary stats
              will appear here.
            </div>
          ) : (
            <div className="grid gap-3 text-center text-sm sm:grid-cols-4">
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Total
                </div>
                <div className="mt-1 text-xl font-semibold text-slate-900">
                  {total}
                </div>
              </div>
              <div className="rounded-2xl bg-emerald-50 px-4 py-3">
                <div className="text-xs font-medium uppercase tracking-wide text-emerald-700">
                  Shortlisted
                </div>
                <div className="mt-1 text-xl font-semibold text-emerald-700">
                  {shortlisted}
                </div>
              </div>
              <div className="rounded-2xl bg-sky-50 px-4 py-3">
                <div className="text-xs font-medium uppercase tracking-wide text-sky-700">
                  Interviewed
                </div>
                <div className="mt-1 text-xl font-semibold text-sky-700">
                  {interviewed}
                </div>
              </div>
              <div className="rounded-2xl bg-rose-50 px-4 py-3">
                <div className="text-xs font-medium uppercase tracking-wide text-rose-700">
                  Rejected
                </div>
                <div className="mt-1 text-xl font-semibold text-rose-700">
                  {rejected}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-4">
          {applicants.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-2 text-3xl">👀</div>
              <div className="text-sm font-semibold text-slate-800">
                No applicants yet
              </div>
              <div className="mt-1 text-xs text-slate-500">
                Once candidates start applying, you will see their skill match
                and status here.
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    <th className="py-2 pr-4">Applicant</th>
                    <th className="py-2 pr-4">Applied Date</th>
                    <th className="py-2 pr-4">Skill Match</th>
                    <th className="py-2 pr-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applicants.map((applicant) => (
                    <tr
                      key={applicant.id}
                      className="border-b border-slate-100 last:border-b-0"
                    >
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-600 text-xs font-semibold text-white">
                            {getInitials(applicant.name)}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900">
                              {applicant.name}
                            </div>
                            <div className="text-xs text-slate-500">
                              {applicant.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-xs text-slate-600">
                        {applicant.appliedDate}
                      </td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <div className="relative h-1.5 w-32 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="absolute inset-y-0 left-0 rounded-full bg-emerald-500"
                              style={{ width: `${applicant.skillMatch || 0}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-emerald-600">
                            {applicant.skillMatch || 0}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 pr-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-0.5 text-xs font-medium ${getStatusClasses(
                            applicant.status,
                          )}`}
                        >
                          {applicant.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end border-t border-slate-100 px-8 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export const JobReportsModal = ({ isOpen, onClose, job }) => {
  if (!isOpen || !job) {
    return null;
  }

  const reports = job.reports || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50">
      <div className="flex h-[70vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-100 px-6 pt-5 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
              <FlagTriangleRight className="h-3.5 w-3.5" />
              <span>Job Reports</span>
            </div>
            <h2 className="mt-2 text-lg font-semibold text-slate-900">
              {job.title}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              See all reports, flags, and moderation context for this job.
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

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {reports.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-2 text-3xl">✅</div>
              <div className="text-sm font-semibold text-slate-800">
                No reports yet
              </div>
              <div className="mt-1 text-xs text-slate-500">
                This job has not been reported by any users so far.
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="space-y-1 rounded-2xl border border-amber-100 bg-amber-50/60 p-3 text-xs text-slate-700"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-amber-800">
                      {report.type}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {report.date}
                    </div>
                  </div>
                  <div className="text-slate-700">{report.message}</div>
                  <div className="text-[11px] text-slate-500">
                    Reported by {report.reporter}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;
