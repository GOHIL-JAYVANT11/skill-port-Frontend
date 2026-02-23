import React from 'react';
import {
  UserPlus,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { month: 'Jan', users: 900, jobs: 120, freelance: 80 },
  { month: 'Feb', users: 1100, jobs: 140, freelance: 90 },
  { month: 'Mar', users: 1300, jobs: 160, freelance: 110 },
  { month: 'Apr', users: 1650, jobs: 180, freelance: 130 },
  { month: 'May', users: 2000, jobs: 200, freelance: 150 },
  { month: 'Jun', users: 2300, jobs: 220, freelance: 170 },
  { month: 'Jul', users: 2500, jobs: 240, freelance: 190 },
  { month: 'Aug', users: 2700, jobs: 260, freelance: 210 },
  { month: 'Sep', users: 3000, jobs: 280, freelance: 230 },
  { month: 'Oct', users: 3200, jobs: 300, freelance: 250 },
  { month: 'Nov', users: 3400, jobs: 320, freelance: 270 },
  { month: 'Dec', users: 3600, jobs: 340, freelance: 290 },
];

const formatUsers = (value) => {
  if (!value && value !== 0) {
    return '';
  }
  return value.toLocaleString();
};

const UserGrowthTooltip = ({ active, label, payload }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const users = payload.find((item) => item.dataKey === 'users');
  const jobs = payload.find((item) => item.dataKey === 'jobs');
  const freelance = payload.find((item) => item.dataKey === 'freelance');

  return (
    <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-xs shadow-lg shadow-sky-100">
      <div className="text-sm font-semibold text-slate-900">
        {label}
      </div>
      <div className="mt-2 space-y-1">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-slate-500">Users</span>
          </div>
          <span className="font-semibold text-slate-900">
            {users ? users.value.toLocaleString() : '-'}
          </span>
        </div>
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-sky-500" />
            <span className="text-slate-500">Jobs</span>
          </div>
          <span className="font-semibold text-slate-900">
            {jobs ? jobs.value.toLocaleString() : '-'}
          </span>
        </div>
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span className="text-slate-500">Freelance</span>
          </div>
          <span className="font-semibold text-slate-900">
            {freelance ? freelance.value.toLocaleString() : '-'}
          </span>
        </div>
      </div>
    </div>
  );
};

const UserGrowthCard = ({ cardRef }) => {
  return (
    <div
      ref={cardRef}
      className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-[11px] font-semibold text-sky-700">
            <UserPlus className="h-3.5 w-3.5" />
            <span>User Growth</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            New user registrations by type
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-[11px] font-medium text-emerald-700">
            +2,847 this month
          </span>
          <span className="text-[11px] text-slate-500">
            Candidates, jobs, freelance signups
          </span>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 8, left: 0, bottom: 0 }}
            barCategoryGap={12}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#64748b' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#64748b' }}
              tickFormatter={formatUsers}
            />
            <Tooltip
              content={<UserGrowthTooltip />}
              cursor={{ fill: 'rgba(148,163,184,0.12)' }}
            />
            <Bar
              dataKey="users"
              fill="#10b981"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="jobs"
              fill="#0ea5e9"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="freelance"
              fill="#f97316"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 flex items-center gap-4 text-[11px] text-slate-500">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>Candidates</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-sky-500" />
          <span>Jobs</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <span>Freelancers</span>
        </div>
      </div>
    </div>
  );
};

export default UserGrowthCard;
