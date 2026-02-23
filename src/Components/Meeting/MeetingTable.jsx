import React, { useState } from 'react';
import {
  Activity,
  CalendarDays,
  CheckCircle2,
  Clock3,
  DollarSign,
  Eye,
  FileText,
  History,
  MoreHorizontal,
  User,
  Video,
} from 'lucide-react';

const getStatusClasses = (status) => {
  if (status === 'Live') {
    return 'bg-emerald-50 text-emerald-700 border-emerald-100';
  }
  if (status === 'Scheduled') {
    return 'bg-sky-50 text-sky-700 border-sky-100';
  }
  if (status === 'Completed') {
    return 'bg-slate-50 text-slate-700 border-slate-100';
  }
  if (status === 'Rescheduled') {
    return 'bg-amber-50 text-amber-700 border-amber-100';
  }
  if (status === 'Cancelled') {
    return 'bg-rose-50 text-rose-700 border-rose-100';
  }
  return 'bg-slate-50 text-slate-600 border-slate-100';
};

const getStatusDotClasses = (status) => {
  if (status === 'Live') {
    return 'bg-emerald-500';
  }
  if (status === 'Scheduled') {
    return 'bg-sky-500';
  }
  if (status === 'Completed') {
    return 'bg-slate-500';
  }
  if (status === 'Rescheduled') {
    return 'bg-amber-500';
  }
  if (status === 'Cancelled') {
    return 'bg-rose-500';
  }
  return 'bg-slate-400';
};

const formatDate = (iso) => {
  if (!iso) {
    return '—';
  }
  const date = new Date(iso);
  return date.toLocaleDateString(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const formatTime = (iso) => {
  if (!iso) {
    return '—';
  }
  const date = new Date(iso);
  return date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const MeetingTable = ({
  meetings,
  totalCount,
  selectedIds,
  allSelected,
  onToggleAll,
  onToggleSelect,
  onClearSelection,
  onViewDetails,
  onJoinLive,
  onReschedule,
  onCancel,
  onMarkNoShow,
  onRecordOutcome,
  onViewCommission,
  onAddAdminNote,
  onViewTimeline,
}) => {
  const [activeMenuRowIndex, setActiveMenuRowIndex] = useState(null);
  const selectedCount = selectedIds.length;

  const getMenuPlacementClass = (index) => {
    const isNearBottom = index >= meetings.length - 3;
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
              <th className="px-4 py-3">Meeting</th>
              <th className="px-4 py-3">Candidate</th>
              <th className="px-4 py-3">Recruiter</th>
              <th className="px-4 py-3">Date &amp; Time</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting, index) => {
              const isSelected = selectedIds.includes(meeting.id);
              const status = meeting.status;
              const isCompleted = status === 'Completed';
              const isRescheduled = status === 'Rescheduled';
              return (
                <tr
                  key={meeting.id}
                  className="border-b border-slate-50 last:border-b-0 hover:bg-slate-50/80"
                >
                  <td className="px-4 py-3 align-top">
                    <button
                      type="button"
                      onClick={() => onToggleSelect(meeting.id)}
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
                        <span className="text-sm font-semibold text-slate-800">
                          {meeting.title}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500">{meeting.company}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <User className="h-3.5 w-3.5 text-slate-500" />
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-900">
                          {meeting.candidate}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <User className="h-3.5 w-3.5 text-slate-500" />
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-900">
                          {meeting.recruiter}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top text-xs text-slate-700">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-1 text-[11px] text-slate-600">
                        <CalendarDays className="h-3 w-3 text-slate-500" />
                        <span className="font-medium">
                          {formatDate(meeting.scheduledAt)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Clock3 className="h-3 w-3" />
                        <span>{formatTime(meeting.scheduledAt)}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top text-xs text-slate-700">
                    <div className="flex items-center gap-1">
                      <Clock3 className="h-3 w-3 text-slate-400" />
                      <span>{meeting.durationMinutes} min</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top text-xs text-slate-700">
                    <span className="inline-flex items-center rounded-full bg-slate-50 px-2.5 py-0.5 text-[11px] font-medium text-slate-700">
                      {meeting.meetingType}
                    </span>
                  </td>
                  <td className="px-4 py-3 align-top text-xs text-slate-700">
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2.5 py-0.5 text-[11px] font-medium text-white">
                      <Video className="h-3 w-3" />
                      In-Platform Video
                    </span>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${getStatusClasses(
                        meeting.status,
                      )}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${getStatusDotClasses(
                          meeting.status,
                        )}`}
                      />
                      {meeting.status}
                    </span>
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
                            Meeting Actions
                          </div>
                        </div>

                        {isCompleted ? (
                          <>
                            <button
                              type="button"
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-slate-900 hover:bg-slate-50"
                              onClick={() => {
                                if (onViewDetails) {
                                  onViewDetails(meeting);
                                }
                                setActiveMenuRowIndex(null);
                              }}
                            >
                              <Eye className="h-4 w-4 text-slate-600" />
                              <span className="text-xs font-medium">
                                View Meeting Details
                              </span>
                            </button>

                            <button
                              type="button"
                              className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-slate-900 hover:bg-slate-50"
                              onClick={() => {
                                if (onRecordOutcome) {
                                  onRecordOutcome(meeting);
                                }
                                setActiveMenuRowIndex(null);
                              }}
                            >
                              <Activity className="h-4 w-4 text-emerald-600" />
                              <span className="text-xs font-medium">
                                Record Interview Outcome
                              </span>
                            </button>

                            <button
                              type="button"
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-emerald-700 hover:bg-emerald-50"
                              onClick={() => {
                                if (onRecordOutcome) {
                                  onRecordOutcome(meeting);
                                }
                                setActiveMenuRowIndex(null);
                              }}
                            >
                              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                              <span className="text-xs font-medium">
                                Trigger Hire Confirmation
                              </span>
                            </button>

                            <button
                              type="button"
                              className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-slate-900 hover:bg-slate-50"
                              onClick={() => {
                                if (onViewCommission) {
                                  onViewCommission(meeting);
                                }
                                setActiveMenuRowIndex(null);
                              }}
                            >
                              <DollarSign className="h-4 w-4 text-slate-600" />
                              <span className="text-xs font-medium">
                                View Commission Status
                              </span>
                            </button>

                            <button
                              type="button"
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-slate-900 hover:bg-slate-50"
                              onClick={() => {
                                if (onAddAdminNote) {
                                  onAddAdminNote(meeting);
                                }
                                setActiveMenuRowIndex(null);
                              }}
                            >
                              <FileText className="h-4 w-4 text-slate-600" />
                              <span className="text-xs font-medium">
                                Add Internal Note
                              </span>
                            </button>

                            <button
                              type="button"
                              className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-slate-900 hover:bg-slate-50"
                              onClick={() => {
                                if (onViewTimeline) {
                                  onViewTimeline(meeting);
                                }
                                setActiveMenuRowIndex(null);
                              }}
                            >
                              <History className="h-4 w-4 text-slate-600" />
                              <span className="text-xs font-medium">
                                View Activity Timeline
                              </span>
                            </button>
                          </>
                        ) : isRescheduled ? (
                          <>
                            <button
                              type="button"
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-slate-900 hover:bg-slate-50"
                              onClick={() => {
                                if (onViewDetails) {
                                  onViewDetails(meeting);
                                }
                                setActiveMenuRowIndex(null);
                              }}
                            >
                              <Eye className="h-4 w-4 text-slate-600" />
                              <span className="text-xs font-medium">
                                View Meeting Details
                              </span>
                            </button>

                            <button
                              type="button"
                              className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-slate-900 hover:bg-slate-50"
                              onClick={() => {
                                if (onViewCommission) {
                                  onViewCommission(meeting);
                                }
                                setActiveMenuRowIndex(null);
                              }}
                            >
                              <DollarSign className="h-4 w-4 text-slate-600" />
                              <span className="text-xs font-medium">
                                View Commission Status
                              </span>
                            </button>

                            <button
                              type="button"
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-slate-900 hover:bg-slate-50"
                              onClick={() => {
                                if (onAddAdminNote) {
                                  onAddAdminNote(meeting);
                                }
                                setActiveMenuRowIndex(null);
                              }}
                            >
                              <FileText className="h-4 w-4 text-slate-600" />
                              <span className="text-xs font-medium">
                                Add Internal Note
                              </span>
                            </button>

                            <button
                              type="button"
                              className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-slate-900 hover:bg-slate-50"
                              onClick={() => {
                                if (onViewTimeline) {
                                  onViewTimeline(meeting);
                                }
                                setActiveMenuRowIndex(null);
                              }}
                            >
                              <History className="h-4 w-4 text-slate-600" />
                              <span className="text-xs font-medium">
                                View Activity Timeline
                              </span>
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-slate-900 hover:bg-slate-50"
                              onClick={() => {
                                if (onViewDetails) {
                                  onViewDetails(meeting);
                                }
                                setActiveMenuRowIndex(null);
                              }}
                            >
                              <Eye className="h-4 w-4 text-slate-600" />
                              <span className="text-xs font-medium">
                                View Meeting Details
                              </span>
                            </button>

                            <button
                              type="button"
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-sky-700 hover:bg-sky-50"
                              onClick={() => {
                                if (onJoinLive) {
                                  onJoinLive(meeting);
                                }
                                setActiveMenuRowIndex(null);
                              }}
                            >
                              <Video className="h-4 w-4 text-sky-600" />
                              <span className="text-xs font-medium">
                                Join Live Meeting
                              </span>
                            </button>

                            <button
                              type="button"
                              className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-slate-900 hover:bg-slate-50"
                              onClick={() => {
                                if (onReschedule) {
                                  onReschedule(meeting);
                                }
                                setActiveMenuRowIndex(null);
                              }}
                            >
                              <Clock3 className="h-4 w-4 text-slate-600" />
                              <span className="text-xs font-medium">
                                Reschedule Meeting
                              </span>
                            </button>

                            <button
                              type="button"
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-rose-700 hover:bg-rose-50"
                              onClick={() => {
                                if (onCancel) {
                                  onCancel(meeting);
                                }
                                setActiveMenuRowIndex(null);
                              }}
                            >
                              <Activity className="h-4 w-4 text-rose-600" />
                              <span className="text-xs font-medium">
                                Cancel Meeting
                              </span>
                            </button>

                            <button
                              type="button"
                              className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-slate-900 hover:bg-slate-50"
                              onClick={() => {
                                if (onMarkNoShow) {
                                  onMarkNoShow(meeting);
                                }
                                setActiveMenuRowIndex(null);
                              }}
                            >
                              <Activity className="h-4 w-4 text-slate-600" />
                              <span className="text-xs font-medium">
                                Mark No-Show
                              </span>
                            </button>

                            <button
                              type="button"
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-slate-900 hover:bg-slate-50"
                              onClick={() => {
                                if (onRecordOutcome) {
                                  onRecordOutcome(meeting);
                                }
                                setActiveMenuRowIndex(null);
                              }}
                            >
                              <Activity className="h-4 w-4 text-slate-600" />
                              <span className="text-xs font-medium">
                                Record Interview Outcome
                              </span>
                            </button>

                            <button
                              type="button"
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-slate-900 hover:bg-slate-50"
                              onClick={() => {
                                if (onViewCommission) {
                                  onViewCommission(meeting);
                                }
                                setActiveMenuRowIndex(null);
                              }}
                            >
                              <DollarSign className="h-4 w-4 text-slate-600" />
                              <span className="text-xs font-medium">
                                View Commission Status
                              </span>
                            </button>

                            <button
                              type="button"
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-slate-900 hover:bg-slate-50"
                              onClick={() => {
                                if (onAddAdminNote) {
                                  onAddAdminNote(meeting);
                                }
                                setActiveMenuRowIndex(null);
                              }}
                            >
                              <FileText className="h-4 w-4 text-slate-600" />
                              <span className="text-xs font-medium">
                                Add Internal Admin Notes
                              </span>
                            </button>

                            <div className="my-1 h-px bg-slate-100" />

                            <button
                              type="button"
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-slate-900 hover:bg-slate-50"
                              onClick={() => {
                                if (onViewTimeline) {
                                  onViewTimeline(meeting);
                                }
                                setActiveMenuRowIndex(null);
                              }}
                            >
                              <History className="h-4 w-4 text-slate-600" />
                              <span className="text-xs font-medium">
                                View Meeting Activity Timeline
                              </span>
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {meetings.length === 0 && (
          <div className="flex h-48 flex-col items-center justify-center gap-2 text-xs text-slate-500">
            <Activity className="h-6 w-6 text-slate-300" />
            <div>No meetings found for the selected filters.</div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
        <div>
          Showing{' '}
          <span className="font-semibold">{meetings.length}</span> of{' '}
          <span className="font-semibold">{totalCount}</span> meetings
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
    </div>
  );
};

export default MeetingTable;
