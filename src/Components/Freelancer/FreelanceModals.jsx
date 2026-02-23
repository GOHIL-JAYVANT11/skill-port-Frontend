import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  FlagTriangleRight,
  Gavel,
  ListChecks,
  MessageSquare,
  User,
  Wallet,
  X,
  Clock3,
} from 'lucide-react';

const SectionTitle = ({ label }) => (
  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
    {label}
  </div>
);

const getInitials = (value) => {
  if (!value) {
    return '';
  }
  return value
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
};

export const ProjectDetailsModal = ({ isOpen, onClose, project }) => {
  if (!isOpen || !project) {
    return null;
  }

  const skills = project.summary?.requiredSkills || [];
  const scopeOfWork = project.summary?.scopeOfWork || [];
  const contractTerms = project.summary?.contractTerms || {};
  const timeline = project.summary?.timeline || {};
  const escrow = project.escrow || {};
  const totalEscrow = escrow.total || 0;
  const releasedEscrow = escrow.released || 0;
  const pendingEscrow = escrow.pending || 0;
  const heldEscrow = escrow.onHold || 0;
  const inEscrow = pendingEscrow + heldEscrow;
  const contractDetails = project.summary?.contractDetails || [];
  const adminNotes = project.adminNotes || [];

  const [activeTab, setActiveTab] = useState('details');

  const descriptionText =
    project.summary?.description ||
    'This project does not have a detailed description yet.';

  const getTabClasses = (value) =>
    `flex-1 rounded-full px-4 py-1.5 text-xs font-semibold transition ${
      activeTab === value
        ? 'bg-white text-slate-900 shadow-sm'
        : 'text-slate-500 hover:text-slate-700'
    }`;

  return (
    <div className="fixed inset-0 z-90 flex items-center justify-center bg-slate-900/60 px-4 py-6">
      <div className="flex w-full max-w-5xl max-h-[88vh] flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl">
        <div className="border-b border-slate-100 px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                {getInitials(project.name)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-slate-900">
                    {project.name}
                  </h2>
                  {project.status && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-0.5 text-[11px] font-medium text-slate-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                      {project.status}
                    </span>
                  )}
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  Client {project.client} • Freelancer {project.freelancer}
                </div>
                <p className="mt-2 max-w-2xl text-sm text-slate-600">
                  {descriptionText}
                </p>
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

          <div className="mt-5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Project Progress</span>
              <span className="font-semibold text-slate-700">
                {project.progressPercent}% (
                {project.milestonesCompleted}/{project.milestonesTotal})
              </span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-emerald-400 via-sky-500 to-slate-900"
                style={{ width: `${project.progressPercent}%` }}
              />
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-xs text-slate-600 shadow-sm">
              <div className="flex items-center gap-2 text-slate-500">
                <DollarSign className="h-4 w-4" />
                <span>Total Budget</span>
              </div>
              <div className="mt-2 text-lg font-semibold text-slate-900">
                {project.currency}
                {project.totalBudget.toLocaleString()}
              </div>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-xs text-emerald-700 shadow-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>Released</span>
              </div>
              <div className="mt-2 text-lg font-semibold text-emerald-900">
                {project.currency}
                {releasedEscrow.toLocaleString()}
              </div>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-xs text-amber-800 shadow-sm">
              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                <span>In Escrow</span>
              </div>
              <div className="mt-2 text-lg font-semibold text-amber-900">
                {project.currency}
                {inEscrow.toLocaleString()}
              </div>
            </div>
            <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-xs text-rose-800 shadow-sm">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                <span>Held</span>
              </div>
              <div className="mt-2 text-lg font-semibold text-rose-900">
                {project.currency}
                {heldEscrow.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-4">
          <div className="rounded-full bg-slate-100 p-1 text-xs font-medium text-slate-600">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className={getTabClasses('details')}
                onClick={() => setActiveTab('details')}
              >
                Details
              </button>
              <button
                type="button"
                className={getTabClasses('parties')}
                onClick={() => setActiveTab('parties')}
              >
                Parties
              </button>
              <button
                type="button"
                className={getTabClasses('contract')}
                onClick={() => setActiveTab('contract')}
              >
                Contract
              </button>
              <button
                type="button"
                className={getTabClasses('notes')}
                onClick={() => setActiveTab('notes')}
              >
                Notes
              </button>
            </div>
          </div>

          {activeTab === 'details' && (
            <div className="mt-5 space-y-6">
              {scopeOfWork.length > 0 && (
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Scope of Work
                  </div>
                  <ul className="mt-2 space-y-1 text-sm text-slate-700">
                    {scopeOfWork.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {skills.length > 0 && (
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Required Skills
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid gap-4 text-xs text-slate-600 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Start Date
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    {timeline.startDate || '—'}
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Deadline
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    {timeline.endDate || '—'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'parties' && (
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 text-xs text-slate-700">
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <User className="h-4 w-4" />
                  <span>Client</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-xs font-semibold text-emerald-700">
                    {getInitials(project.client)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      {project.client}
                    </div>
                    <div className="mt-1 text-[11px] text-slate-500">
                      Disputes: {project.risk?.clientDisputes ?? 0}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 text-xs text-slate-700">
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <User className="h-4 w-4" />
                  <span>Freelancer</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-50 text-xs font-semibold text-sky-700">
                    {getInitials(project.freelancer)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      {project.freelancer}
                    </div>
                    <div className="mt-1 text-[11px] text-slate-500">
                      Rating:{' '}
                      {project.freelancerRating || project.performance?.rating || '—'}
                    </div>
                    <div className="mt-0.5 text-[11px] text-slate-500">
                      Dispute Rate:{' '}
                      {typeof project.freelancerDisputePercent === 'number'
                        ? `${project.freelancerDisputePercent}%`
                        : project.risk?.freelancerDisputeRate || '—'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contract' && (
            <div className="mt-5 space-y-5 text-xs text-slate-700">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Billing Type
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    {contractTerms.billingType || 'Not specified'}
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Revision Rounds
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    {contractTerms.revisionRounds || 'Not specified'}
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Cancellation
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    {contractTerms.cancellationPolicy || 'Not specified'}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-semibold text-slate-900">
                  Contract Details
                </div>
                <ul className="space-y-1 text-sm text-slate-700">
                  {contractDetails.length > 0 &&
                    contractDetails.map((item) => <li key={item}>{item}</li>)}
                  {contractDetails.length === 0 && (
                    <>
                      <li>
                        Billing is {contractTerms.billingType || 'not specified'}.
                      </li>
                      <li>
                        Revisions:{' '}
                        {contractTerms.revisionRounds || 'no specific revision terms.'}
                      </li>
                      <li>
                        Cancellation:{' '}
                        {contractTerms.cancellationPolicy ||
                          'no special cancellation policy defined.'}
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="mt-5 space-y-3 text-xs text-slate-700">
              {adminNotes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
                >
                  <div className="text-[11px] font-semibold text-slate-500">
                    {note.author} • {note.createdAt}
                  </div>
                  <div className="mt-1 text-sm text-slate-800">{note.note}</div>
                </div>
              ))}
              {adminNotes.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-4 text-xs text-slate-500">
                  No internal notes have been added for this project yet. Use the
                  “Add Internal Admin Note” action from the table to record context.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const MilestonesModal = ({ isOpen, onClose, project }) => {
  if (!isOpen || !project) {
    return null;
  }

  const milestones = project.milestones || [];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 px-4 py-6">
      <div className="flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Project Milestones
            </h2>
            <div className="mt-1 text-xs text-slate-500">
              {project.name} • {milestones.length} milestone
              {milestones.length !== 1 ? 's' : ''}
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

        <div className="max-h-[420px] space-y-3 overflow-y-auto px-6 py-4">
          {milestones.map((milestone) => {
            const isDisputed = milestone.status === 'Disputed';
            const isCompleted = milestone.status === 'Released';

            return (
              <div
                key={milestone.id}
                className="flex items-start justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-700"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-[11px] font-semibold text-white">
                    <ListChecks className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-semibold text-slate-900">
                        {milestone.title}
                      </div>
                      {isDisputed && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-medium text-rose-700">
                          <AlertTriangle className="h-3 w-3" />
                          In dispute
                        </span>
                      )}
                      {isCompleted && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                          Released
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-[11px] text-slate-500">
                      Due {milestone.dueDate || '—'}
                    </div>
                  </div>
                </div>
                <div className="text-right text-xs">
                  <div className="font-semibold text-slate-900">
                    {project.currency}
                    {milestone.amount.toLocaleString()}
                  </div>
                  <div className="mt-1 text-[11px] text-slate-500">
                    Status {milestone.status}
                  </div>
                </div>
              </div>
            );
          })}

          {milestones.length === 0 && (
            <div className="flex h-40 flex-col items-center justify-center text-xs text-slate-500">
              <ListChecks className="mb-2 h-5 w-5 text-slate-300" />
              <div>No milestones defined for this project yet.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const EscrowBreakdownModal = ({ isOpen, onClose, project }) => {
  if (!isOpen || !project) {
    return null;
  }

  const escrow = project.escrow || {};
  const total = escrow.total || 0;
  const released = escrow.released || 0;
  const pending = escrow.pending || 0;
  const onHold = escrow.onHold || 0;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 px-4 py-6">
      <div className="w-full max-w-lg rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Escrow Breakdown
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              {project.name} • {project.client}
            </p>
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
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Total Escrow
              </div>
              <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Wallet className="h-4 w-4 text-slate-500" />
                <span>
                  {project.currency}
                  {total.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-emerald-800">
                Released To Freelancer
              </div>
              <div className="mt-1 text-sm font-semibold text-emerald-900">
                {project.currency}
                {released.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-amber-100 bg-amber-50/70 px-4 py-3">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-amber-800">
                Pending Release
              </div>
              <div className="mt-1 text-sm font-semibold text-amber-900">
                {project.currency}
                {pending.toLocaleString()}
              </div>
            </div>
            <div className="rounded-2xl border border-rose-100 bg-rose-50/80 px-4 py-3">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-rose-800">
                On Hold (Admin)
              </div>
              <div className="mt-1 text-sm font-semibold text-rose-900">
                {project.currency}
                {onHold.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-700">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Admin Notes
            </div>
            <p className="mt-1">
              Escrow controls are fully admin-managed. Use the dispute resolution
              flow and payment override tools before adjusting holds and releases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DisputeResolutionModal = ({ isOpen, onClose, project }) => {
  const [decision, setDecision] = useState('split');
  const [notes, setNotes] = useState('');

  if (!isOpen || !project || !project.dispute) {
    return null;
  }

  const dispute = project.dispute;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 px-4 py-6">
      <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-50">
              <AlertTriangle className="h-4 w-4 text-rose-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Resolve Dispute
              </h2>
              <div className="mt-1 text-xs text-slate-500">
                {project.name} • Opened {dispute.openedOn}
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

        <div className="grid gap-6 px-6 py-5 md:grid-cols-3">
          <div className="space-y-3 md:col-span-2">
            <SectionTitle label="Dispute Reason & Evidence" />
            <div className="mt-2 rounded-2xl border border-rose-100 bg-rose-50/70 px-4 py-3 text-xs text-rose-900">
              <div className="text-[11px] font-semibold uppercase tracking-wide">
                Reason ({dispute.raisedBy})
              </div>
              <p className="mt-1">{dispute.reason}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-700">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Summary
              </div>
              <p className="mt-1">{dispute.summary}</p>
            </div>
            <div>
              <SectionTitle label="Evidence" />
              <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-700">
                {(dispute.evidence || []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <SectionTitle label="Admin Decision" />
              <div className="mt-2 space-y-2 text-xs text-slate-700">
                <button
                  type="button"
                  onClick={() => setDecision('client')}
                  className={`flex w-full items-center gap-2 rounded-2xl border px-3 py-2 text-left ${
                    decision === 'client'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span className="text-xs font-medium">
                    Decide in favour of client
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setDecision('freelancer')}
                  className={`flex w-full items-center gap-2 rounded-2xl border px-3 py-2 text-left ${
                    decision === 'freelancer'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span className="text-xs font-medium">
                    Decide in favour of freelancer
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setDecision('split')}
                  className={`flex w-full items-center gap-2 rounded-2xl border px-3 py-2 text-left ${
                    decision === 'split'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <Wallet className="h-4 w-4" />
                  <span className="text-xs font-medium">
                    Split payment and close dispute
                  </span>
                </button>
              </div>
            </div>

            <div>
              <SectionTitle label="Admin Notes For Audit Trail" />
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={6}
                className="mt-2 w-full rounded-2xl border border-slate-200 p-3 text-xs text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                placeholder="Explain the rationale behind your dispute decision. This is visible in internal audit logs."
              />
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <Gavel className="h-4 w-4" />
              <span>Confirm Decision And Update Escrow</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PaymentOverrideModal = ({ isOpen, onClose, project }) => {
  const [holdAmount, setHoldAmount] = useState('');
  const [releaseAmount, setReleaseAmount] = useState('');

  if (!isOpen || !project) {
    return null;
  }

  const escrow = project.escrow || {};

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 px-4 py-6">
      <div className="w-full max-w-lg rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Hold / Release Payment
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Admin override controls for escrow on this project.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 text-xs text-slate-700">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Total Escrow
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-900">
                {project.currency}
                {(escrow.total || 0).toLocaleString()}
              </div>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-emerald-800">
                Released
              </div>
              <div className="mt-1 text-sm font-semibold text-emerald-900">
                {project.currency}
                {(escrow.released || 0).toLocaleString()}
              </div>
            </div>
            <div className="rounded-2xl border border-rose-100 bg-rose-50/80 px-4 py-3">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-rose-800">
                On Hold
              </div>
              <div className="mt-1 text-sm font-semibold text-rose-900">
                {project.currency}
                {(escrow.onHold || 0).toLocaleString()}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <SectionTitle label="Place Amount On Hold" />
              <div className="mt-2 flex gap-2">
                <input
                  type="number"
                  value={holdAmount}
                  onChange={(event) => setHoldAmount(event.target.value)}
                  placeholder="Amount to hold"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                />
                <button
                  type="button"
                  className="rounded-xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-600"
                >
                  Hold
                </button>
              </div>
            </div>

            <div>
              <SectionTitle label="Release Amount To Freelancer" />
              <div className="mt-2 flex gap-2">
                <input
                  type="number"
                  value={releaseAmount}
                  onChange={(event) => setReleaseAmount(event.target.value)}
                  placeholder="Amount to release"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
                <button
                  type="button"
                  className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
                >
                  Release
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-amber-100 bg-amber-50/70 px-4 py-3 text-[11px] text-amber-900">
              Use overrides only when you have completed a dispute review or
              fraud investigation. All overrides are logged in the audit trail.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdminNoteModal = ({ isOpen, onClose, project }) => {
  const [noteText, setNoteText] = useState('');

  if (!isOpen || !project) {
    return null;
  }

  const adminNotes = project.adminNotes || [];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 px-4 py-6">
      <div className="flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Internal Admin Notes
            </h2>
            <div className="mt-1 text-xs text-slate-500">
              {project.name} • {project.client}
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

        <div className="grid gap-6 px-6 py-5 md:grid-cols-3">
          <div className="space-y-3 md:col-span-2">
            <SectionTitle label="Existing Notes" />
            <div className="mt-2 space-y-2 text-xs text-slate-700">
              {adminNotes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
                >
                  <div className="text-[11px] font-semibold text-slate-500">
                    {note.author} • {note.createdAt}
                  </div>
                  <div className="mt-1 text-sm text-slate-800">{note.note}</div>
                </div>
              ))}
              {adminNotes.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
                  No admin notes have been added for this project yet.
                </div>
              )}
            </div>
          </div>
          <div className="space-y-3">
            <SectionTitle label="Add New Note" />
            <textarea
              value={noteText}
              onChange={(event) => setNoteText(event.target.value)}
              rows={7}
              className="w-full rounded-2xl border border-slate-200 p-3 text-xs text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              placeholder="Add private notes that help future admins understand the context and risk profile for this project."
            />
            <button
              type="button"
              className="w-full rounded-2xl bg-slate-900 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Save Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProjectActivityTimelineModal = ({ isOpen, onClose, project }) => {
  if (!isOpen || !project) {
    return null;
  }

  const items = project.activityTimeline || [];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 px-4 py-6">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Project Activity Timeline
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              {project.name} • {project.client}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-2 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-700">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between gap-3 rounded-xl bg-white px-3 py-2"
            >
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  {item.title}
                </div>
                {item.subtitle && (
                  <div className="text-[11px] text-slate-500">{item.subtitle}</div>
                )}
              </div>
              <div className="text-right text-[11px] text-slate-500">
                {item.meta}
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="flex h-32 flex-col items-center justify-center text-xs text-slate-500">
              <Activity className="mb-2 h-5 w-5 text-slate-300" />
              <div>No activity recorded for this project yet.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const ProjectChatModal = ({ isOpen, onClose, project }) => {
  if (!isOpen || !project) {
    return null;
  }

  const messages = project.communication?.previewMessages || [];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 px-4 py-6">
      <div className="flex w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Project Communication (Read-only)
            </h2>
            <div className="mt-1 text-xs text-slate-500">
              {project.name} • {project.client}
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

        <div className="flex-1 space-y-3 overflow-y-auto px-6 py-4 text-xs text-slate-700">
          {messages.map((message) => (
            <div
              key={message.id}
              className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3"
            >
              <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-[11px] font-semibold text-white">
                {message.author
                  .split(' ')
                  .map((part) => part[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-900">
                      {message.author}
                    </span>
                    {message.role && (
                      <span className="inline-flex items-center rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-medium text-white">
                        {message.role}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-500">{message.at}</span>
                </div>
                <p className="mt-1 text-xs text-slate-800">{message.content}</p>
              </div>
            </div>
          ))}
          {messages.length === 0 && (
            <div className="flex h-40 flex-col items-center justify-center text-xs text-slate-500">
              <MessageSquare className="mb-2 h-5 w-5 text-slate-300" />
              <div>No chat messages available for this project yet.</div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-6 py-3">
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <AlertTriangle className="h-3 w-3 text-rose-500" />
            <span>
              Admins have read-only oversight. Use the flag below for abuse or
              fraud.
            </span>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-rose-500 bg-white px-4 py-1.5 text-[11px] font-semibold text-rose-600 hover:bg-rose-50"
          >
            <FlagTriangleRight className="h-3 w-3" />
            <span>Flag Conversation For Review</span>
          </button>
        </div>
      </div>
    </div>
  );
};
