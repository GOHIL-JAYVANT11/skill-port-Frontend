import React from 'react';
import {
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { month: 'Jan', revenue: 48000, freelance: 16000, jobs: 26000 },
  { month: 'Feb', revenue: 52000, freelance: 18000, jobs: 28000 },
  { month: 'Mar', revenue: 54000, freelance: 19000, jobs: 30000 },
  { month: 'Apr', revenue: 58000, freelance: 21000, jobs: 32000 },
  { month: 'May', revenue: 62000, freelance: 23000, jobs: 34000 },
  { month: 'Jun', revenue: 67000, freelance: 25000, jobs: 42000 },
  { month: 'Jul', revenue: 70000, freelance: 26000, jobs: 44000 },
  { month: 'Aug', revenue: 74000, freelance: 28000, jobs: 46000 },
  { month: 'Sep', revenue: 78000, freelance: 30000, jobs: 48000 },
  { month: 'Oct', revenue: 82000, freelance: 32000, jobs: 50000 },
  { month: 'Nov', revenue: 86000, freelance: 34000, jobs: 52000 },
  { month: 'Dec', revenue: 91000, freelance: 36000, jobs: 54000 },
];

const formatCurrency = (value) => {
  if (!value && value !== 0) {
    return '';
  }
  const thousands = Math.round(value / 1000);
  return `$${thousands}k`;
};

const RevenueTooltip = ({ active, label, payload }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const revenue = payload.find((item) => item.dataKey === 'revenue');
  const freelance = payload.find((item) => item.dataKey === 'freelance');
  const jobs = payload.find((item) => item.dataKey === 'jobs');

  return (
    <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-xs shadow-lg shadow-emerald-100">
      <div className="text-sm font-semibold text-slate-900">
        {label}
      </div>
      <div className="mt-2 space-y-1">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-slate-500">Revenue</span>
          </div>
          <span className="font-semibold text-slate-900">
            {revenue ? `$${revenue.value.toLocaleString()}` : '-'}
          </span>
        </div>
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-sky-500" />
            <span className="text-slate-500">Freelance</span>
          </div>
          <span className="font-semibold text-slate-900">
            {freelance ? `$${freelance.value.toLocaleString()}` : '-'}
          </span>
        </div>
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-700" />
            <span className="text-slate-500">Jobs</span>
          </div>
          <span className="font-semibold text-slate-900">
            {jobs ? `$${jobs.value.toLocaleString()}` : '-'}
          </span>
        </div>
      </div>
    </div>
  );
};

const RevenueOverviewCard = ({ cardRef }) => {
  const totalRevenue = 818000;

  return (
    <div
      ref={cardRef}
      className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Revenue Overview</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Monthly revenue breakdown by source
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="text-2xl font-bold tracking-tight text-slate-900">
            ${totalRevenue.toLocaleString()}
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-700">
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700">
              +18.2% from last year
            </span>
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:border-emerald-400 hover:text-emerald-700"
            >
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="colorFreelance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="colorJobs" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#059669" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="month"
              padding={{ left: 0, right: 0 }}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#64748b' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#64748b' }}
              tickFormatter={formatCurrency}
            />
            <Tooltip
              content={<RevenueTooltip />}
              cursor={{ stroke: '#e2e8f0', strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#colorRevenue)"
              dot={false}
              activeDot={{ r: 5 }}
            />
            <Area
              type="monotone"
              dataKey="freelance"
              stroke="#0ea5e9"
              strokeWidth={1.5}
              fill="url(#colorFreelance)"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="jobs"
              stroke="#059669"
              strokeWidth={1.5}
              fill="url(#colorJobs)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 flex items-center gap-4 text-[11px] text-slate-500">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>Total Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-sky-500" />
          <span>Freelance</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-700" />
          <span>Job Placements</span>
        </div>
      </div>
    </div>
  );
};

export default RevenueOverviewCard;

