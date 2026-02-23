import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  Clock3,
  DollarSign,
  Mail,
  Mic,
  MicOff,
  PhoneOff,
  Star,
  User,
  Users,
  Video,
  X,
} from 'lucide-react';

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

export const MeetingDetailsModal = ({ isOpen, onClose, meeting }) => {
  if (!isOpen || !meeting) {
    return null;
  }

  const participants = meeting.participants || {};
  const agendaItems = meeting.agenda || [];

  const handleOpenRoom = () => {
    const link = meeting.room?.link;
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="fixed inset-0 z-90 flex items-center justify-center bg-slate-900/60 px-4 py-6">
      <div className="flex w-full max-w-3xl max-h-[88vh] flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl">
        <div className="border-b border-slate-100 px-6 py-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700">
                <CalendarDays className="h-3.5 w-3.5" />
                <span>Meeting Details</span>
              </div>
              <h2 className="mt-3 text-lg font-semibold text-slate-900">
                {meeting.title}
              </h2>
              <div className="mt-1 text-sm text-slate-500">{meeting.company}</div>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px]">
                {meeting.status && (
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-0.5 font-medium text-slate-700">
                    {meeting.status}
                  </span>
                )}
                {meeting.meetingType && (
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-0.5 font-medium text-slate-700">
                    {meeting.meetingType}
                  </span>
                )}
                <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-0.5 font-medium text-slate-700">
                  In-Platform
                </span>
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
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-4">
          <div className="space-y-6">
            <section>
              <div className="text-sm font-semibold text-slate-900">
                Participants
              </div>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-700">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Candidate
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-[11px] font-semibold text-emerald-700">
                      {getInitials(meeting.candidate)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        {meeting.candidate}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {participants.candidateEmail || 'Candidate'}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-700">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Recruiter
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-50 text-[11px] font-semibold text-sky-700">
                      {getInitials(meeting.recruiter)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        {meeting.recruiter}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {participants.recruiterEmail || 'Recruiter'}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-700">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Admin / Moderator
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-[11px] font-semibold text-white">
                      {getInitials(participants.admin || 'Admin User')}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        {participants.admin || 'Admin User'}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        admin@skillport.com
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="border-t border-slate-100 pt-6">
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-slate-500" />
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                        Date &amp; Time
                      </div>
                      <div className="mt-1 text-sm font-semibold text-slate-900">
                        {meeting.scheduledAtFormatted}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-slate-500" />
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                        Duration
                      </div>
                      <div className="mt-1 text-sm font-semibold text-slate-900">
                        {meeting.durationMinutes} minutes
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="border-t border-slate-100 pt-6">
              <div className="text-sm font-semibold text-slate-900">Linked Job</div>
              <div className="mt-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-700">
                <div className="text-sm font-semibold text-slate-900">
                  {meeting.linkedJob || meeting.linkedProject || 'Not linked yet'}
                </div>
                <div className="mt-1 text-[11px] text-slate-500">
                  {meeting.linkedJob
                    ? 'Job'
                    : meeting.linkedProject
                    ? 'Project'
                    : 'Link a job or project to track outcomes'}
                </div>
              </div>
            </section>

            <section className="border-t border-slate-100 pt-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="text-sm font-semibold text-slate-900">Agenda</div>
                  {agendaItems.length === 0 && (
                    <p className="mt-2 text-xs text-slate-500">
                      Technical discussion, system design and culture fit assessment.
                    </p>
                  )}
                  {agendaItems.length > 0 && (
                    <ul className="mt-2 space-y-1 text-sm text-slate-700">
                      {agendaItems.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="space-y-4">
                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 text-xs text-emerald-800">
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
                      SkillPort Meeting Link
                    </div>
                    <div className="mt-2 break-all text-xs">
                      {meeting.room?.link || 'https://meet.skillport.com/room'}
                    </div>
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={handleOpenRoom}
                        className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700"
                      >
                        <Video className="h-3.5 w-3.5" />
                        <span>Open Room</span>
                      </button>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-700">
                    <div className="text-sm font-semibold text-slate-900">
                      Admin Notes
                    </div>
                    <p className="mt-2 text-xs text-slate-600">
                      Candidate has 5+ years experience with React. Add more notes after the
                      interview to keep a central record.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MeetingRoomModal = ({ isOpen, onClose, meeting }) => {
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [sharing, setSharing] = useState(false);

  if (!isOpen || !meeting) {
    return null;
  }

  const participants = meeting.participants || {};

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-center bg-slate-900/90 px-4 py-6">
      <div className="flex w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-slate-700 bg-slate-950/60 shadow-2xl backdrop-blur">
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-slate-50">
                {meeting.title}
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Live
              </span>
            </div>
            <div className="mt-0.5 text-[11px] text-slate-400">
              {meeting.company} • {meeting.meetingType} • In-Platform Video
            </div>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-300">
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-slate-400" />
              <span>Admin, Candidate, Recruiter</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 px-6 py-4 text-xs text-slate-100">
          <div className="grid flex-1 gap-3 md:grid-cols-3">
            <div className="md:col-span-2 grid grid-rows-2 gap-3">
              <div className="flex items-center justify-center rounded-2xl bg-slate-900/60">
                <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-slate-800 text-3xl font-semibold text-slate-100">
                  {getInitials(participants.admin || 'Admin')}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center justify-center rounded-2xl bg-slate-900/60">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-800 text-xl font-semibold text-slate-100">
                    {getInitials(meeting.candidate)}
                  </div>
                </div>
                <div className="flex items-center justify-center rounded-2xl bg-slate-900/60">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-800 text-xl font-semibold text-slate-100">
                    {getInitials(meeting.recruiter)}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Meeting Link
                </div>
                <div className="mt-2 rounded-xl bg-slate-900/80 px-3 py-2 text-[11px] text-slate-200">
                  {meeting.room?.link || 'Generated by SkillPort'}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Admin Controls
                </div>
                <ul className="mt-2 space-y-1 text-[11px] text-slate-300">
                  <li>Mute any participant</li>
                  <li>Remove participant from room</li>
                  <li>Monitor meeting duration and behaviour</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between rounded-full bg-slate-900/70 px-4 py-2">
            <div className="flex items-center gap-2 text-[11px] text-slate-300">
              <Clock3 className="h-3.5 w-3.5 text-slate-400" />
              <span>Meeting timer running</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMicOn((current) => !current)}
                className={`flex h-9 w-9 items-center justify-center rounded-full ${
                  micOn ? 'bg-slate-100 text-slate-900' : 'bg-slate-800 text-slate-200'
                }`}
              >
                {micOn ? (
                  <Mic className="h-4 w-4" />
                ) : (
                  <MicOff className="h-4 w-4" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setCameraOn((current) => !current)}
                className={`flex h-9 w-9 items-center justify-center rounded-full ${
                  cameraOn ? 'bg-slate-100 text-slate-900' : 'bg-slate-800 text-slate-200'
                }`}
              >
                <Video className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setSharing((current) => !current)}
                className={`flex h-9 w-9 items-center justify-center rounded-full ${
                  sharing ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-200'
                }`}
              >
                <Activity className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 items-center justify-center rounded-full bg-rose-500 px-4 text-xs font-semibold text-white hover:bg-rose-600"
              >
                <PhoneOff className="mr-1 h-4 w-4" />
                Leave
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MeetingRescheduleModal = ({ isOpen, onClose, meeting }) => {
  const [reason, setReason] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  if (!isOpen || !meeting) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 px-4 py-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700">
              <CalendarDays className="h-3.5 w-3.5" />
              <span>Reschedule Meeting</span>
            </div>
            <p className="mt-3 text-sm font-semibold text-slate-900">
              Reschedule &quot;{meeting.title}&quot; to a new date and time
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 space-y-5 text-xs text-slate-700">
          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-xs text-slate-700">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Current Schedule
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-900">
              {meeting.scheduledAtFormatted}
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-1">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                New Date
              </div>
              <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
                <input
                  type="date"
                  value={newDate}
                  onChange={(event) => setNewDate(event.target.value)}
                  className="h-7 flex-1 border-0 bg-transparent text-xs text-slate-900 focus:outline-none"
                />
                <CalendarDays className="h-4 w-4 text-slate-400" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                New Time
              </div>
              <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
                <input
                  type="time"
                  value={newTime}
                  onChange={(event) => setNewTime(event.target.value)}
                  className="h-7 flex-1 border-0 bg-transparent text-xs text-slate-900 focus:outline-none"
                />
                <Clock3 className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>

          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Reason for Rescheduling
            </div>
            <textarea
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              rows={4}
              className="mt-2 w-full rounded-2xl border border-slate-200 p-3 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              placeholder="Enter the reason for rescheduling this meeting..."
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
          >
            Confirm Reschedule
          </button>
        </div>
      </div>
    </div>
  );
};

export const MeetingCancelModal = ({ isOpen, onClose, meeting }) => {
  const [reason, setReason] = useState('');

  if (!isOpen || !meeting) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 px-4 py-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-rose-300 bg-rose-50 text-rose-600">
                <X className="h-4 w-4" />
              </div>
              <h2 className="text-lg font-semibold text-rose-600">
                Cancel Meeting
              </h2>
            </div>
            <p className="mt-2 text-xs text-slate-600">
              Are you sure you want to cancel this meeting?
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-xs text-slate-700">
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-[11px] text-rose-700">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span>
                This action will notify all participants and cannot be undone.
              </span>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-xs text-slate-700">
            <div className="text-sm font-semibold text-slate-900">
              {meeting.title}
            </div>
            <div className="mt-1 text-[11px] text-slate-500">
              {meeting.company}
            </div>
            {meeting.scheduledAtFormatted && (
              <div className="mt-1 text-[11px] text-slate-500">
                Scheduled: {meeting.scheduledAtFormatted}
              </div>
            )}
          </div>

          <div>
            <div className="text-sm font-semibold text-slate-900">
              Reason for Cancellation
            </div>
            <textarea
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              rows={4}
              className="mt-2 w-full rounded-2xl border border-emerald-500/70 p-3 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              placeholder="Enter the reason for cancelling this meeting..."
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Keep Meeting
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-700"
          >
            <X className="h-3.5 w-3.5" />
            <span>Cancel Meeting</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const MeetingOutcomeModal = ({ isOpen, onClose, meeting }) => {
  const [noShow, setNoShow] = useState('candidate');
  const [notes, setNotes] = useState('');

  if (!isOpen || !meeting) {
    return null;
  }

  const getOptionClasses = (value) =>
    `flex w-full items-center gap-2 rounded-2xl border px-3 py-2 text-xs ${
      noShow === value
        ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
        : 'border-slate-200 bg-white text-slate-700'
    }`;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 px-4 py-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                <Users className="h-4 w-4" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900">
                Mark No-Show
              </h2>
            </div>
            <p className="mt-2 text-xs text-slate-600">
              Record which participant did not attend the meeting.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 space-y-4 text-xs text-slate-700">
          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-xs text-slate-700">
            <div className="text-sm font-semibold text-slate-900">
              {meeting.title}
            </div>
            <div className="mt-1 text-[11px] text-slate-500">
              {meeting.company}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold text-slate-900">
              Who did not show up?
            </div>
            <button
              type="button"
              onClick={() => setNoShow('candidate')}
              className={getOptionClasses('candidate')}
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-full border border-emerald-500">
                {noShow === 'candidate' && (
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                )}
              </span>
              <span>
                Candidate: <span className="font-semibold">{meeting.candidate}</span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => setNoShow('recruiter')}
              className={getOptionClasses('recruiter')}
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-full border border-emerald-500">
                {noShow === 'recruiter' && (
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                )}
              </span>
              <span>
                Recruiter:{' '}
                <span className="font-semibold">{meeting.recruiter}</span>
              </span>
            </button>
          </div>

          <div>
            <div className="text-sm font-semibold text-slate-900">
              Additional Notes (Optional)
            </div>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={4}
              className="mt-2 w-full rounded-2xl border border-slate-200 p-3 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              placeholder="Any additional details about the no-show..."
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-700"
          >
            <Users className="h-3.5 w-3.5" />
            <span>Mark No-Show</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const MeetingCommissionModal = ({ isOpen, onClose, meeting }) => {
  if (!isOpen || !meeting) {
    return null;
  }

  const commission = meeting.commission || {};
  const status = commission.status || 'Pending';

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 px-4 py-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700">
              <DollarSign className="h-3.5 w-3.5" />
              <span>Commission Status</span>
            </div>
            <p className="mt-2 text-xs text-slate-600">
              View commission details for this meeting.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 space-y-5 text-xs text-slate-700">
          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-xs text-slate-700">
            <div className="text-sm font-semibold text-slate-900">
              {meeting.title}
            </div>
            <div className="mt-1 text-[11px] text-slate-500">
              {meeting.company}
            </div>
            <div className="mt-1 text-[11px] text-slate-500">
              Candidate: {meeting.candidate}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-900">
              <span>Status</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                <Clock3 className="h-3 w-3 text-slate-500" />
                {status}
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full w-1/3 bg-emerald-500" />
            </div>
            <div className="mt-2 flex justify-between text-[11px] text-slate-500">
              <span>Pending</span>
              <span>Calculated</span>
              <span>Paid</span>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-xs text-slate-700">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Interview Outcome
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-900">
              Pending
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-[11px] text-slate-600">
            Commission will be calculated after hire confirmation.
          </div>
        </div>
      </div>
    </div>
  );
};

export const MeetingAdminNotesModal = ({ isOpen, onClose, meeting }) => {
  const [noteText, setNoteText] = useState('');

  if (!isOpen || !meeting) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 px-4 py-6">
      <div className="w-full max-w-lg rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700">
              <Activity className="h-3.5 w-3.5" />
              <span>Admin Notes</span>
            </div>
            <p className="mt-2 text-xs text-slate-600">
              Internal notes for &quot;{meeting.title}&quot;
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 space-y-5 text-xs text-slate-700">
          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-xs text-slate-700">
            <div className="text-sm font-semibold text-slate-900">
              Candidate has 5+ years experience with React
            </div>
            <div className="mt-1 text-[11px] text-slate-500">
              {meeting.recruiter || 'Recruiter'} (Recruiter) • Feb 23, 2026, 11:57 PM
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <div className="text-sm font-semibold text-slate-900">
              Add New Note
            </div>
            <textarea
              value={noteText}
              onChange={(event) => setNoteText(event.target.value)}
              rows={4}
              className="mt-2 w-full rounded-2xl border border-emerald-500/70 p-3 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              placeholder="Enter your internal note..."
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Close
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Note</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const GenerateSkillPortMeetingModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [candidate, setCandidate] = useState('');
  const [recruiter, setRecruiter] = useState('');
  const [company, setCompany] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('60');
  const [meetingType, setMeetingType] = useState('Interview');
  const [agenda, setAgenda] = useState('');

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 px-4 py-6">
      <div className="flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl">
        <div className="border-b border-slate-100 px-6 py-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700">
                <Video className="h-3.5 w-3.5" />
                <span>Generate SkillPort Meeting</span>
              </div>
              <p className="mt-2 text-xs text-slate-600">
                Create a new in-platform meeting with video, audio and screen sharing.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-4 pt-3">
          <div className="space-y-5 text-xs text-slate-700">
            <div className="space-y-2">
              <div className="text-sm font-semibold text-slate-900">
                Meeting Title *
              </div>
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="e.g., Senior Developer Interview"
                className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="text-sm font-semibold text-slate-900">
                  Candidate *
                </div>
                <select
                  value={candidate}
                  onChange={(event) => setCandidate(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="">Select candidate</option>
                  <option value="Anita Sharma">Anita Sharma</option>
                  <option value="Karan Mehta">Karan Mehta</option>
                  <option value="Meera Iyer">Meera Iyer</option>
                </select>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-semibold text-slate-900">
                  Recruiter *
                </div>
                <select
                  value={recruiter}
                  onChange={(event) => setRecruiter(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="">Select recruiter</option>
                  <option value="Rahul Verma">Rahul Verma</option>
                  <option value="Priya Nair">Priya Nair</option>
                  <option value="Devansh Shah">Devansh Shah</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-semibold text-slate-900">
                Company
              </div>
              <input
                type="text"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                placeholder="Company name"
                className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <div className="text-sm font-semibold text-slate-900">
                  Date *
                </div>
                <input
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <div className="space-y-2">
                <div className="text-sm font-semibold text-slate-900">
                  Time *
                </div>
                <input
                  type="time"
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <div className="space-y-2">
                <div className="text-sm font-semibold text-slate-900">
                  Duration
                </div>
                <select
                  value={duration}
                  onChange={(event) => setDuration(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="30">30 min</option>
                  <option value="45">45 min</option>
                  <option value="60">60 min</option>
                  <option value="90">90 min</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-semibold text-slate-900">
                Meeting Type
              </div>
              <select
                value={meetingType}
                onChange={(event) => setMeetingType(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="Interview">Interview</option>
                <option value="Screening">Screening Call</option>
                <option value="Review">Portfolio Review</option>
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-900">
                  Agenda (Optional)
                </div>
              </div>
              <textarea
                value={agenda}
                onChange={(event) => setAgenda(event.target.value)}
                rows={3}
                placeholder="Meeting agenda and topics to discuss..."
                className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="mt-2 flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-medium text-slate-800">
              <Video className="mr-2 h-4 w-4 text-slate-700" />
              <span>Generate Meeting Link</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 px-6 py-4">
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
            >
              <Video className="h-3.5 w-3.5" />
              <span>Schedule Meeting</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MeetingInterviewOutcomeModal = ({ isOpen, onClose, meeting }) => {
  const [outcome, setOutcome] = useState('Selected');
  const [rating, setRating] = useState(3);
  const [comments, setComments] = useState('');

  if (!isOpen || !meeting) {
    return null;
  }

  const getOptionClasses = (value) =>
    `flex w-full items-center gap-2 rounded-2xl border px-3 py-2 text-xs ${
      outcome === value
        ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
        : 'border-slate-200 bg-white text-slate-700'
    }`;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 px-4 py-6">
      <div className="w-full max-w-lg rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Record Interview Outcome</span>
            </div>
            <p className="mt-2 text-xs text-slate-600">
              Record the outcome of the interview with {meeting.candidate}.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 space-y-5 text-xs text-slate-700">
          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-xs text-slate-700">
            <div className="text-sm font-semibold text-slate-900">
              {meeting.title}
            </div>
            <div className="mt-1 text-[11px] text-slate-500">
              {meeting.company}
            </div>
            <div className="mt-1 text-[11px] text-slate-500">
              Candidate: {meeting.candidate}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold text-slate-900">
              Interview Outcome
            </div>
            <button
              type="button"
              onClick={() => setOutcome('Selected')}
              className={getOptionClasses('Selected')}
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-full border border-emerald-500">
                {outcome === 'Selected' && (
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                )}
              </span>
              <span>Selected</span>
            </button>
            <button
              type="button"
              onClick={() => setOutcome('Rejected')}
              className={getOptionClasses('Rejected')}
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-full border border-emerald-500">
                {outcome === 'Rejected' && (
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                )}
              </span>
              <span>Rejected</span>
            </button>
            <button
              type="button"
              onClick={() => setOutcome('On Hold')}
              className={getOptionClasses('On Hold')}
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-full border border-emerald-500">
                {outcome === 'On Hold' && (
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                )}
              </span>
              <span>On Hold</span>
            </button>
            <button
              type="button"
              onClick={() => setOutcome('No Show')}
              className={getOptionClasses('No Show')}
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-full border border-emerald-500">
                {outcome === 'No Show' && (
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                )}
              </span>
              <span>No Show</span>
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-700">
              <span className="font-semibold">
                Overall Rating: {rating}/5
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={5}
              value={rating}
              onChange={(event) => setRating(Number(event.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>Poor</span>
              <span>Excellent</span>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-slate-900">
              Comments
            </div>
            <textarea
              value={comments}
              onChange={(event) => setComments(event.target.value)}
              rows={4}
              className="mt-2 w-full rounded-2xl border border-slate-200 p-3 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              placeholder="Add any feedback or notes about the interview..."
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
          >
            Save Outcome
          </button>
        </div>
      </div>
    </div>
  );
};

export const MeetingActivityTimelineModal = ({ isOpen, onClose, meeting }) => {
  if (!isOpen || !meeting) {
    return null;
  }

  const items = meeting.activityTimeline || [];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 px-4 py-6">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Meeting Activity Timeline
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              {meeting.title} • {meeting.company}
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
              <div>No activity recorded for this meeting yet.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
