import React from 'react';
import { CalendarDays, Clock3 } from 'lucide-react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const weeklyData = [
  { day: 'Mon', scheduled: 24, completed: 21, cancelled: 3 },
  { day: 'Tue', scheduled: 28, completed: 24, cancelled: 2 },
  { day: 'Wed', scheduled: 26, completed: 22, cancelled: 4 },
  { day: 'Thu', scheduled: 32, completed: 27, cancelled: 3 },
  { day: 'Fri', scheduled: 29, completed: 25, cancelled: 2 },
  { day: 'Sat', scheduled: 18, completed: 14, cancelled: 2 },
  { day: 'Sun', scheduled: 12, completed: 9, cancelled: 1 },
];

const meetingsToday = [
  {
    id: 'm1',
    time: '10:00 AM',
    candidate: 'React Developer Interview',
    person: 'John Smith',
    role: 'Technical',
    status: 'Confirmed',
  },
  {
    id: 'm2',
    time: '11:30 AM',
    candidate: 'UX Designer Screening',
    person: 'Sarah Johnson',
    role: 'Screening',
    status: 'Pending',
  },
  {
    id: 'm3',
    time: '02:00 PM',
    candidate: 'Project Kickoff – Mobile App',
    person: 'TechCorp Inc.',
    role: 'Client',
    status: 'Completed',
  },
  {
    id: 'm4',
    time: '04:30 PM',
    candidate: 'Freelance Contract Review',
    person: 'BrightPath Learning',
    role: 'Client',
    status: 'Confirmed',
  },
];

const getStatusClasses = (status) => {
  if (status === 'Confirmed') {
    return 'bg-emerald-50 text-emerald-700 ring-emerald-100';
  }
  if (status === 'Pending') {
    return 'bg-amber-50 text-amber-700 ring-amber-100';
  }
  if (status === 'Completed') {
    return 'bg-sky-50 text-sky-700 ring-sky-100';
  }
  return 'bg-slate-50 text-slate-600 ring-slate-100';
};

const MeetingsTooltip = ({ active, label, payload }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const scheduled = payload.find((item) => item.dataKey === 'scheduled');
  const completed = payload.find((item) => item.dataKey === 'completed');
  const cancelled = payload.find((item) => item.dataKey === 'cancelled');

  return (
    <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-xs shadow-lg shadow-amber-100">
      <div className="text-sm font-semibold text-slate-900">
        {label}
      </div>
      <div className="mt-2 space-y-1">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-slate-500" />
            <span className="text-slate-500">Scheduled</span>
          </div>
          <span className="font-semibold text-slate-900">
            {scheduled ? scheduled.value : '-'}
          </span>
        </div>
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-slate-500">Completed</span>
          </div>
          <span className="font-semibold text-slate-900">
            {completed ? completed.value : '-'}
          </span>
        </div>
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            <span className="text-slate-500">Cancelled</span>
          </div>
          <span className="font-semibold text-slate-900">
            {cancelled ? cancelled.value : '-'}
          </span>
        </div>
      </div>
    </div>
  );
};

const MeetingsScheduleCard = ({ cardRef }) => {
  const totalScheduled = weeklyData.reduce((sum, day) => sum + day.scheduled, 0);
  const totalCompleted = weeklyData.reduce((sum, day) => sum + day.completed, 0);

  return (
    <div
      ref={cardRef}
      className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-700">
            <CalendarDays className="h-3.5 w-3.5" />
            <span>Weekly Meetings & Today’s Schedule</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            90% completion rate this week
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 text-xs text-slate-500">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-slate-900">
              {totalScheduled}
            </span>
            <span>Scheduled</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-emerald-600">
              {totalCompleted}
            </span>
            <span>Completed</span>
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={weeklyData}
              margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#64748b' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#64748b' }}
              />
              <Tooltip
                cursor={{ stroke: '#cbd5f5', strokeWidth: 1 }}
                content={<MeetingsTooltip />}
              />
              <Line
                type="monotone"
                dataKey="scheduled"
                stroke="#facc15"
                strokeWidth={2}
                dot={{ r: 3, fill: '#facc15', strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ r: 3, fill: '#22c55e', strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="cancelled"
                stroke="#f97373"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={{ r: 3, fill: '#f97373', strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
              <Clock3 className="h-3.5 w-3.5" />
              <span>Today’s Schedule</span>
            </div>
            <span className="text-[11px] text-slate-400">
              All times in IST
            </span>
          </div>
          <div className="max-h-48 space-y-2 overflow-y-auto pr-1">
            {meetingsToday.map((meeting) => (
              <div
                key={meeting.id}
                className="group flex items-start justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 px-3 py-2 text-xs text-slate-700 transition-colors hover:border-emerald-200 hover:bg-emerald-50/60"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-slate-700 shadow-sm">
                    {meeting.time}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-900">
                      {meeting.candidate}
                    </div>
                    <div className="mt-0.5 text-[11px] text-slate-500">
                      {meeting.person} • {meeting.role}
                    </div>
                  </div>
                </div>
                <span
                  className={`mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${getStatusClasses(
                    meeting.status,
                  )}`}
                >
                  {meeting.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingsScheduleCard;
