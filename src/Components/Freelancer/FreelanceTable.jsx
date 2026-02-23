import React, { useState } from 'react';
import {
  Activity,
  FileText,
  FlagTriangleRight,
  ListChecks,
  MessageSquare,
  MoreHorizontal,
  Star,
  Wallet,
} from 'lucide-react';

const getStatusBadgeClasses = (status) => {
  if (status === 'Active') {
    return 'bg-sky-50 text-sky-700 border-sky-100';
  }
  if (status === 'Completed') {
    return 'bg-emerald-50 text-emerald-700 border-emerald-100';
  }
  if (status === 'Disputed') {
    return 'bg-rose-50 text-rose-700 border-rose-100';
  }
  if (status === 'On Hold') {
    return 'bg-amber-50 text-amber-700 border-amber-100';
  }
  return 'bg-slate-50 text-slate-600 border-slate-100';
};

const getStatusDotClasses = (status) => {
  if (status === 'Active') {
    return 'bg-sky-500';
  }
  if (status === 'Completed') {
    return 'bg-emerald-500';
  }
  if (status === 'Disputed') {
    return 'bg-rose-500';
  }
  if (status === 'On Hold') {
    return 'bg-amber-500';
  }
  return 'bg-slate-400';
};

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

const FreelanceTable = ({
  projects,
  totalCount,
  selectedProjectIds,
  allSelected,
  onToggleAll,
  onToggleProjectSelect,
  onClearSelection,
  onViewDetails,
  onViewMilestones,
  onViewEscrow,
  onResolveDispute,
  onPaymentOverride,
  onAddAdminNote,
  onViewTimeline,
  onViewChat,
}) => {
  const [activeMenuRowIndex, setActiveMenuRowIndex] = useState(null);
  const selectedCount = selectedProjectIds.length;

  const getMenuPlacementClass = (index) => {
    const isNearBottom = index >= projects.length - 3;
    return isNearBottom ? 'bottom-full mb-2 right-0' : 'top-full mt-2 right-0';
  };

  return (
    <div className="mt-6 rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="max-h-[520px] overflow-x-auto overflow-y-auto">
        <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
          <thead className="sticky top-0 z-10 bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-slate-500 backdrop-blur">
            <tr>
              <th className="w-12 px-4 py-3">
                <button
                  type="button"
                  onClick={onToggleAll}
                  className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                    allSelected
                      ? 'border-sky-500 bg-sky-500'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {allSelected && (
                    <span className="h-2 w-2 rounded-full bg-white" />
                  )}
                </button>
              </th>
              <th className="px-4 py-3">Project</th>
              <th className="px-4 py-3">Freelancer</th>
              <th className="px-4 py-3 text-right">Budget</th>
              <th className="px-4 py-3">Progress</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Escrow</th>
              <th className="px-4 py-3 text-right">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => {
              const isSelected = selectedProjectIds.includes(project.id);
              const hasDispute = project.status === 'Disputed' || project.dispute;
              const escrowTotal = project.escrow?.total || 0;
              const escrowReleased = project.escrow?.released || 0;
              const freelancerRating = project.freelancerRating;
              const freelancerDisputeLabel =
                typeof project.freelancerDisputePercent === 'number'
                  ? `${project.freelancerDisputePercent}% disputes`
                  : project.risk?.freelancerDisputeRate || '';

              return (
                <tr
                  key={project.id}
                  className="border-b border-slate-50 last:border-b-0 hover:bg-slate-50/80"
                >
                  <td className="px-4 py-3 align-top">
                    <button
                      type="button"
                      onClick={() => onToggleProjectSelect(project.id)}
                      className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                        isSelected
                          ? 'border-sky-500 bg-sky-500'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && (
                        <span className="h-2 w-2 rounded-full bg-white" />
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-sky-800">
                          {project.name}
                        </span>
                        {hasDispute && (
                          <FlagTriangleRight className="h-3 w-3 text-rose-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-[11px] font-semibold text-slate-600">
                          {getInitials(project.client)}
                        </div>
                        <span className="truncate">{project.client}</span>
                        {project.communication?.unreadCount > 0 && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2 py-0.5 text-[11px] font-medium text-white">
                            <MessageSquare className="h-3 w-3" />
                            {project.communication.unreadCount} unread
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-[11px] font-semibold text-slate-700">
                        {getInitials(project.freelancer)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-900">
                          {project.freelancer}
                        </span>
                        {(freelancerRating || freelancerDisputeLabel) && (
                          <div className="flex items-center gap-1 text-[11px] text-slate-500">
                            {freelancerRating && (
                              <>
                                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                <span>{freelancerRating}</span>
                              </>
                            )}
                            {freelancerRating && freelancerDisputeLabel && (
                              <span>•</span>
                            )}
                            {freelancerDisputeLabel && (
                              <span>{freelancerDisputeLabel}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top text-right text-xs text-slate-800">
                    <div className="text-sm font-semibold text-slate-900">
                      {project.currency}
                      {project.totalBudget.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top text-xs text-slate-700">
                    <div className="flex items-center justify-between gap-2 text-[11px] text-slate-600">
                      <span className="text-xs font-medium text-slate-800">
                        {project.progressPercent}%
                      </span>
                      <span>
                        {project.milestonesCompleted}/{project.milestonesTotal}
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-1.5 rounded-full bg-gradient-to-r from-sky-500 to-emerald-400"
                        style={{ width: `${project.progressPercent}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClasses(
                        project.status,
                      )}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${getStatusDotClasses(
                          project.status,
                        )}`}
                      />
                      {project.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 align-top text-right text-xs text-slate-700">
                    <div className="inline-flex flex-col items-end gap-0.5">
                      <div className="flex items-center gap-1 text-sm font-semibold text-emerald-700">
                        <Wallet className="h-4 w-4 text-emerald-500" />
                        <span>
                          {project.currency}
                          {escrowTotal.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {project.currency}
                        {escrowReleased.toLocaleString()} released
                      </div>
                    </div>
                  </td>
                  <td className="relative px-4 py-3 align-top text-right">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveMenuRowIndex((current) =>
                          current === index ? null : index,
                        )
                      }
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                    {activeMenuRowIndex === index && (
                      <div
                        className={`absolute z-20 w-80 rounded-2xl border border-slate-100 bg-white p-2 text-left shadow-xl ${getMenuPlacementClass(
                          index,
                        )}`}
                      >
                        <div className="px-3 pb-1 pt-1">
                          <div className="text-xs font-semibold text-slate-500">
                            Project Actions
                          </div>
                        </div>

                        <button
                          type="button"
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-slate-900 hover:bg-slate-50"
                          onClick={() => {
                            if (onViewDetails) {
                              onViewDetails(project);
                            }
                            setActiveMenuRowIndex(null);
                          }}
                        >
                          <FileText className="h-4 w-4 text-slate-600" />
                          <span className="text-xs font-medium">
                            View Project Details
                          </span>
                        </button>

                        <button
                          type="button"
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-slate-900 hover:bg-slate-50"
                          onClick={() => {
                            if (onViewMilestones) {
                              onViewMilestones(project);
                            }
                            setActiveMenuRowIndex(null);
                          }}
                        >
                          <ListChecks className="h-4 w-4 text-slate-600" />
                          <span className="text-xs font-medium">
                            View Milestones
                          </span>
                        </button>

                        <button
                          type="button"
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-slate-900 hover:bg-slate-50"
                          onClick={() => {
                            if (onViewEscrow) {
                              onViewEscrow(project);
                            }
                            setActiveMenuRowIndex(null);
                          }}
                        >
                          <Wallet className="h-4 w-4 text-slate-600" />
                          <span className="text-xs font-medium">
                            View Escrow Breakdown
                          </span>
                        </button>

                        {hasDispute && (
                          <button
                            type="button"
                            className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-rose-700 hover:bg-rose-50"
                            onClick={() => {
                              if (onResolveDispute) {
                                onResolveDispute(project);
                              }
                              setActiveMenuRowIndex(null);
                            }}
                          >
                            <FlagTriangleRight className="h-4 w-4 text-rose-600" />
                            <span className="text-xs font-medium">
                              Resolve Dispute
                            </span>
                          </button>
                        )}

                        <button
                          type="button"
                          className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-amber-700 hover:bg-amber-50"
                          onClick={() => {
                            if (onPaymentOverride) {
                              onPaymentOverride(project);
                            }
                            setActiveMenuRowIndex(null);
                          }}
                        >
                          <Wallet className="h-4 w-4 text-amber-600" />
                          <span className="text-xs font-medium">
                            Hold / Release Payment
                          </span>
                        </button>

                        <button
                          type="button"
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-slate-900 hover:bg-slate-50"
                          onClick={() => {
                            if (onAddAdminNote) {
                              onAddAdminNote(project);
                            }
                            setActiveMenuRowIndex(null);
                          }}
                        >
                          <FileText className="h-4 w-4 text-slate-600" />
                          <span className="text-xs font-medium">
                            Add Internal Admin Note
                          </span>
                        </button>

                        <div className="my-1 h-px bg-slate-100" />

                        <button
                          type="button"
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-slate-900 hover:bg-slate-50"
                          onClick={() => {
                            if (onViewTimeline) {
                              onViewTimeline(project);
                            }
                            setActiveMenuRowIndex(null);
                          }}
                        >
                          <Activity className="h-4 w-4 text-slate-600" />
                          <span className="text-xs font-medium">
                            View Project Activity Timeline
                          </span>
                        </button>

                        <button
                          type="button"
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-slate-900 hover:bg-slate-50"
                          onClick={() => {
                            if (onViewChat) {
                              onViewChat(project);
                            }
                            setActiveMenuRowIndex(null);
                          }}
                        >
                          <MessageSquare className="h-4 w-4 text-slate-600" />
                          <span className="text-xs font-medium">
                            View Project Communication
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

        {projects.length === 0 && (
          <div className="flex h-48 flex-col items-center justify-center gap-2 text-xs text-slate-500">
            <Activity className="h-6 w-6 text-slate-300" />
            <div>No freelance projects found for the selected filters.</div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
        <div>
          Showing{' '}
          <span className="font-semibold">{projects.length}</span> of{' '}
          <span className="font-semibold">{totalCount}</span> projects
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
          <div className="pointer-events-auto flex w-full max-w-4xl items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-sky-100 via-sky-50 to-sky-100 px-6 py-3 shadow-xl">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-white">
                {selectedCount}
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-900">
                  Projects Selected
                </span>
                <span className="text-xs text-slate-500">
                  Bulk export, mark completed, or review disputes
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-emerald-400"
              >
                Mark Completed
              </button>
              <button
                type="button"
                className="rounded-full border border-amber-500 bg-white px-4 py-1.5 text-xs font-semibold text-amber-700 hover:bg-amber-50"
              >
                Review Disputes
              </button>
              <button
                type="button"
                className="rounded-full border border-slate-400 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
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

export default FreelanceTable;
