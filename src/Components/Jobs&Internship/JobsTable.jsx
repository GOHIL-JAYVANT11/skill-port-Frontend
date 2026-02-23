import React, { useState } from 'react';
import {
  MoreHorizontal,
  FlagTriangleRight,
  Briefcase,
  Eye,
  Users,
  CheckCircle2,
  XCircle,
  MessageSquare,
  FileText,
  AlertTriangle,
} from 'lucide-react';

const formatDate = (isoDateString) => {
  if (!isoDateString) return '-';
  const date = new Date(isoDateString);
  if (Number.isNaN(date.getTime())) return isoDateString;
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const JobsTable = ({
  jobs,
  totalCount,
  selectedJobIds,
  allSelected,
  onToggleAll,
  onToggleJobSelect,
  onClearSelection,
  onOpenJobDetails,
  onOpenApplicants,
  onOpenJobReports,
  onApproveJob,
  onRejectJob,
  onRequestChanges,
  onBlockJob,
  onAddAdminNote,
}) => {
  const [activeMenuRowIndex, setActiveMenuRowIndex] = useState(null);
  const selectedCount = selectedJobIds.length;

  return (
    <div className="mt-6 rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <th className="w-12 px-4 py-3">
                <button
                  type="button"
                  onClick={onToggleAll}
                  className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                    allSelected ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300 bg-white'
                  }`}
                >
                  {allSelected && <span className="h-2 w-2 rounded-full bg-white" />}
                </button>
              </th>
              <th className="px-4 py-3">Job Title</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Job Type</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Applicants</th>
              <th className="px-4 py-3">Posted</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => {
              const isSelected = selectedJobIds.includes(job.id);
              const isNearBottom = index >= jobs.length - 5;

              const statusColorClasses =
                job.status === 'Approved'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                  : job.status === 'Pending'
                  ? 'bg-amber-50 text-amber-700 border-amber-100'
                  : job.status === 'Rejected'
                  ? 'bg-rose-50 text-rose-700 border-rose-100'
                  : job.status === 'Blocked'
                  ? 'bg-rose-50 text-rose-700 border-rose-100'
                  : 'bg-slate-50 text-slate-600 border-slate-100';

              const hasReports = job.reportCount && job.reportCount > 0;
              const isApproved = job.status === 'Approved';
              const isPending = job.status === 'Pending';

              return (
                <tr
                  key={`${job.id}-${index}`}
                  className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/60"
                >
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => onToggleJobSelect(job.id)}
                      className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                        isSelected ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <span className="h-2 w-2 rounded-full bg-white" />}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900">
                          {job.title}
                        </span>
                        {job.isFlagged && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-medium text-rose-600">
                            <FlagTriangleRight className="h-3 w-3" />
                            Flagged
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>{job.company}</span>
                        {job.reportCount > 0 && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700">
                            <FlagTriangleRight className="h-3 w-3" />
                            {job.reportCount} reports
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">
                    {job.location}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-0.5 text-[11px] font-medium text-slate-700">
                      <Briefcase className="h-3 w-3 text-slate-400" />
                      {job.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColorClasses}`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-xs text-slate-700">
                    {job.applicantsCount}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">
                    {formatDate(job.postedDate)}
                  </td>
                  <td className="relative px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveMenuRowIndex((current) =>
                          current === index ? null : index,
                        )
                      }
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                    {activeMenuRowIndex === index && (
                      <div
                        className={`absolute z-20 w-72 rounded-2xl border border-slate-100 bg-white p-2 text-left shadow-xl ${
                          isNearBottom
                            ? 'bottom-full mb-2 right-0'
                            : 'top-full mt-2 right-0'
                        }`}
                      >
                        <button
                          type="button"
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-slate-900 hover:bg-slate-50"
                          onClick={() => {
                            if (onOpenJobDetails) {
                              onOpenJobDetails(job);
                            }
                            setActiveMenuRowIndex(null);
                          }}
                        >
                          <Eye className="h-4 w-4 text-slate-700" />
                          <span className="text-xs font-medium">View Job Details</span>
                        </button>
                        <button
                          type="button"
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-slate-900 hover:bg-slate-50"
                          onClick={() => {
                            if (onOpenApplicants) {
                              onOpenApplicants(job);
                            }
                            setActiveMenuRowIndex(null);
                          }}
                        >
                          <Users className="h-4 w-4 text-slate-700" />
                          <span className="text-xs font-medium">
                            View Applicants ({job.applicantsCount || 0})
                          </span>
                        </button>
                        {isPending && (
                          <>
                            <button
                              type="button"
                              className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-emerald-600 hover:bg-emerald-50"
                              onClick={() => {
                                if (onApproveJob) {
                                  onApproveJob(job);
                                }
                                setActiveMenuRowIndex(null);
                              }}
                            >
                              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                              <span className="text-xs font-medium">Approve Job</span>
                            </button>
                            <button
                              type="button"
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-rose-600 hover:bg-rose-50"
                              onClick={() => {
                                if (onRejectJob) {
                                  onRejectJob(job);
                                }
                                setActiveMenuRowIndex(null);
                              }}
                            >
                              <XCircle className="h-4 w-4 text-rose-600" />
                              <span className="text-xs font-medium">Reject Job</span>
                            </button>
                            <button
                              type="button"
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-amber-700 hover:bg-amber-50"
                              onClick={() => {
                                if (onRequestChanges) {
                                  onRequestChanges(job);
                                }
                                setActiveMenuRowIndex(null);
                              }}
                            >
                              <MessageSquare className="h-4 w-4 text-amber-600" />
                              <span className="text-xs font-medium">Request Changes</span>
                            </button>
                          </>
                        )}
                        {isApproved && (
                          <button
                            type="button"
                            className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-rose-600 hover:bg-rose-50"
                            onClick={() => {
                              if (onBlockJob) {
                                onBlockJob(job);
                              }
                              setActiveMenuRowIndex(null);
                            }}
                          >
                            <AlertTriangle className="h-4 w-4 text-rose-600" />
                            <span className="text-xs font-medium">Block / Remove Job</span>
                          </button>
                        )}
                        <button
                          type="button"
                          className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-slate-900 hover:bg-slate-50"
                          onClick={() => {
                            if (onAddAdminNote) {
                              onAddAdminNote(job);
                            }
                            setActiveMenuRowIndex(null);
                          }}
                        >
                          <FileText className="h-4 w-4 text-slate-700" />
                          <span className="text-xs font-medium">Add Admin Note</span>
                        </button>
                        <button
                          type="button"
                          className={`mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left ${
                            hasReports
                              ? 'text-amber-700 hover:bg-amber-50'
                              : 'text-slate-500 hover:bg-slate-50'
                          }`}
                          onClick={() => {
                            if (onOpenJobReports) {
                              onOpenJobReports(job);
                            }
                            setActiveMenuRowIndex(null);
                          }}
                        >
                          <FlagTriangleRight
                            className={`h-4 w-4 ${
                              hasReports ? 'text-amber-600' : 'text-slate-400'
                            }`}
                          />
                          <span className="text-xs font-medium">
                            View Reports{hasReports ? ` (${job.reportCount})` : ''}
                          </span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
        <div>
          Showing <span className="font-semibold">{jobs.length}</span> of{' '}
          <span className="font-semibold">{totalCount}</span> jobs
        </div>
        {selectedCount > 0 && (
          <button
            type="button"
            onClick={onClearSelection}
            className="text-xs font-medium text-slate-500 hover:text-slate-700"
          >
            Clear selection
          </button>
        )}
      </div>

      {selectedCount > 0 && (
        <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 ml-56 flex justify-center">
          <div className="pointer-events-auto flex w-full max-w-4xl items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 px-6 py-3 shadow-xl">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-white">
                {selectedCount}
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-900">
                  Jobs Selected
                </span>
                <span className="text-xs text-slate-500">
                  Bulk approve, reject, delete, or export
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-emerald-400"
              >
                Approve Selected
              </button>
              <button
                type="button"
                className="rounded-full border border-rose-500 bg-white px-4 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50"
              >
                Reject Selected
              </button>
              <button
                type="button"
                className="rounded-full border border-rose-500 bg-white px-4 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50"
              >
                Delete Selected
              </button>
              <button
                type="button"
                className="rounded-full border border-amber-500 bg-white px-4 py-1.5 text-xs font-semibold text-amber-700 hover:bg-amber-50"
              >
                Export Selected
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsTable;
