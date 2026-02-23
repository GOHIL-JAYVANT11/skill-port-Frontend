import React, { useState } from 'react';
import {
  AlertTriangle,
  Clock,
  FileText,
  FlagTriangleRight,
  MessageSquare,
  Shield,
  X,
} from 'lucide-react';

export const ReportDetailsModal = ({
  isOpen,
  onClose,
  report,
  onUpdateStatus,
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [internalNote, setInternalNote] = useState('');

  if (!isOpen || !report) {
    return null;
  }

  const handleStatusChange = (status) => {
    onUpdateStatus(report.id, status);
  };

  const handleAddNote = () => {
    if (!internalNote.trim()) {
      return;
    }
    setInternalNote('');
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 px-4 py-6">
      <div className="flex h-[560px] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-slate-50">
              <Shield className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Report {report.id}
              </div>
              <div className="text-sm font-semibold text-slate-900">
                {report.type} • {report.priority} priority
              </div>
              <div className="mt-0.5 text-[11px] text-slate-500">
                Reported by {report.reportedBy} about {report.reportedEntity}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
              <Clock className="h-3 w-3" />
              <span>{report.dateSubmitted}</span>
            </span>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex w-40 flex-col border-r border-slate-100 bg-slate-50/60 p-3 text-[11px] text-slate-600">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`mb-1 inline-flex items-center gap-2 rounded-xl px-2 py-1.5 text-left ${
                activeTab === 'overview'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'hover:bg-white/60'
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Overview</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('linked')}
              className={`mb-1 inline-flex items-center gap-2 rounded-xl px-2 py-1.5 text-left ${
                activeTab === 'linked'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'hover:bg-white/60'
              }`}
            >
              <FlagTriangleRight className="h-3.5 w-3.5" />
              <span>Linked Data</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('risk')}
              className={`mb-1 inline-flex items-center gap-2 rounded-xl px-2 py-1.5 text-left ${
                activeTab === 'risk'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'hover:bg-white/60'
              }`}
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>Risk & History</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('notes')}
              className={`mb-1 inline-flex items-center gap-2 rounded-xl px-2 py-1.5 text-left ${
                activeTab === 'notes'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'hover:bg-white/60'
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Admin Notes</span>
            </button>
          </div>

          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700">Status:</span>
                <span>{report.status}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleStatusChange('Under Review')}
                  className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Mark Under Review
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange('Resolved')}
                  className="rounded-full bg-emerald-600 px-2.5 py-1 text-[11px] font-semibold text-emerald-50 hover:bg-emerald-700"
                >
                  Resolve Case
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange('Rejected')}
                  className="rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-semibold text-slate-50 hover:bg-slate-800"
                >
                  Reject Report
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 text-xs text-slate-700">
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Complaint Description
                    </div>
                    <p className="mt-1 text-xs text-slate-700">
                      {report.description}
                    </p>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                        Evidence
                      </div>
                      <div className="mt-1 space-y-1">
                        {report.evidence && report.evidence.length > 0 ? (
                          report.evidence.map((item) => (
                            <div
                              key={item}
                              className="flex items-center justify-between rounded-xl bg-slate-50 px-2 py-1.5"
                            >
                              <span className="text-[11px] text-slate-600">
                                {item}
                              </span>
                              <span className="text-[11px] text-sky-600">
                                View
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className="rounded-xl bg-slate-50 px-2 py-1.5 text-[11px] text-slate-500">
                            No evidence files attached.
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                        Related Object
                      </div>
                      <div className="mt-1 space-y-1 text-[11px] text-slate-600">
                        {report.relatedJob && (
                          <div className="rounded-xl bg-slate-50 px-2 py-1.5">
                            Job: {report.relatedJob}
                          </div>
                        )}
                        {report.relatedProject && (
                          <div className="rounded-xl bg-slate-50 px-2 py-1.5">
                            Project: {report.relatedProject}
                          </div>
                        )}
                        {report.relatedMeeting && (
                          <div className="rounded-xl bg-slate-50 px-2 py-1.5">
                            Meeting: {report.relatedMeeting}
                          </div>
                        )}
                        {report.relatedPayment && (
                          <div className="rounded-xl bg-slate-50 px-2 py-1.5">
                            Payment: {report.relatedPayment}
                          </div>
                        )}
                        {!report.relatedJob &&
                          !report.relatedProject &&
                          !report.relatedMeeting &&
                          !report.relatedPayment && (
                            <div className="rounded-xl bg-slate-50 px-2 py-1.5">
                              No linked job, project, meeting, or payment.
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'linked' && (
                <div className="space-y-3">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Linked Data View
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-2 rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2">
                      <div className="text-[11px] font-semibold text-slate-700">
                        User Profiles
                      </div>
                      <div className="text-[11px] text-slate-600">
                        Reporter: {report.reportedBy} ({report.reporterRole})
                      </div>
                      <div className="text-[11px] text-slate-600">
                        Reported: {report.reportedEntity} ({report.reportedType})
                      </div>
                    </div>
                    <div className="space-y-2 rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2">
                      <div className="text-[11px] font-semibold text-slate-700">
                        Transactions and Meetings
                      </div>
                      <div className="text-[11px] text-slate-600">
                        Payment: {report.relatedPayment || 'None linked'}
                      </div>
                      <div className="text-[11px] text-slate-600">
                        Meeting: {report.relatedMeeting || 'None linked'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'risk' && (
                <div className="space-y-3">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    User Risk Monitoring
                  </div>
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2">
                      <div className="text-[11px] text-slate-500">
                        Warning Count
                      </div>
                      <div className="mt-1 text-xl font-semibold text-slate-900">
                        {report.warningCount}
                      </div>
                    </div>
                    <div className="rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2">
                      <div className="text-[11px] text-slate-500">
                        Previous Reports
                      </div>
                      <div className="mt-1 text-xl font-semibold text-slate-900">
                        {report.previousReports}
                      </div>
                    </div>
                    <div className="rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2">
                      <div className="text-[11px] text-slate-500">
                        Risk Score
                      </div>
                      <div className="mt-1 text-xl font-semibold text-rose-700">
                        {report.riskScore}
                      </div>
                    </div>
                  </div>
                  {report.fraudFlag && (
                    <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-[11px] font-semibold text-rose-700 ring-1 ring-rose-100">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      <span>Auto-flagged as high fraud risk</span>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-3">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Internal Admin Notes
                  </div>
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2 text-[11px] text-slate-600">
                    Investigation notes are visible only to admins and are part
                    of the trust and safety audit log.
                  </div>
                  <div className="space-y-2">
                    <textarea
                      rows={3}
                      value={internalNote}
                      onChange={(event) => setInternalNote(event.target.value)}
                      placeholder="Add internal note for this case..."
                      className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-500">
                        Notes are timestamped and attributed to the current
                        moderator.
                      </span>
                      <button
                        type="button"
                        onClick={handleAddNote}
                        className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold text-slate-50 hover:bg-slate-800"
                      >
                        Save Note
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Activity Timeline
                    </div>
                    <div className="space-y-1.5 text-[11px] text-slate-600">
                      <div className="rounded-xl bg-slate-50 px-3 py-1.5">
                        Report created and queued for moderation.
                      </div>
                      <div className="rounded-xl bg-slate-50 px-3 py-1.5">
                        Auto-risk engine evaluated potential fraud patterns.
                      </div>
                      <div className="rounded-xl bg-slate-50 px-3 py-1.5">
                        Awaiting manual review by trust and safety admin.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

