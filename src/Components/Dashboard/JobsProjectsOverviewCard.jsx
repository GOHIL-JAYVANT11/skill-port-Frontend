import React from 'react';
import { Briefcase, FolderKanban } from 'lucide-react';
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const jobCategories = [
  { name: 'Technology', value: 45, color: '#0ea5e9' },
  { name: 'Design', value: 20, color: '#6366f1' },
  { name: 'Marketing', value: 15, color: '#f97316' },
  { name: 'Finance', value: 12, color: '#22c55e' },
  { name: 'Others', value: 8, color: '#a855f7' },
];

const projectStatus = [
  { name: 'In Progress', value: 156, color: '#0ea5e9' },
  { name: 'Completed', value: 324, color: '#22c55e' },
  { name: 'On Hold', value: 34, color: '#facc15' },
  { name: 'Disputed', value: 12, color: '#f97373' },
];

const JobsTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }
  const item = payload[0];
  return (
    <div className="rounded-2xl border border-slate-100 bg-white px-3 py-2 text-xs shadow-lg shadow-sky-100">
      <div className="font-semibold text-slate-900">
        {item.name}
      </div>
      <div className="mt-1 text-slate-500">
        {item.value}% of total jobs
      </div>
    </div>
  );
};

const ProjectsTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }
  const item = payload[0];
  return (
    <div className="rounded-2xl border border-slate-100 bg-white px-3 py-2 text-xs shadow-lg shadow-emerald-100">
      <div className="font-semibold text-slate-900">
        {item.name}
      </div>
      <div className="mt-1 text-slate-500">
        {item.value} projects
      </div>
    </div>
  );
};

const JobsProjectsOverviewCard = ({ cardRef }) => {
  return (
    <div
      ref={cardRef}
      className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-700">
            <Briefcase className="h-3.5 w-3.5" />
            <span>Jobs & Projects Overview</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Category mix and project status across the platform
          </p>
        </div>
        <div className="flex flex-col items-end text-xs text-slate-500">
          <span>Total Jobs: 1,247</span>
          <span>Total Projects: 526</span>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700">
            <Briefcase className="h-3.5 w-3.5 text-slate-400" />
            <span>Jobs by Category</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-40 flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={jobCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={3}
                    dataKey="value"
                    isAnimationActive
                  >
                    {jobCategories.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={entry.color}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<JobsTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 text-[11px] text-slate-600">
              {jobCategories.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-semibold text-slate-900">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700">
            <FolderKanban className="h-3.5 w-3.5 text-slate-400" />
            <span>Project Status</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-40 flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={projectStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={3}
                    dataKey="value"
                    isAnimationActive
                  >
                    {projectStatus.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={entry.color}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<ProjectsTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 text-[11px] text-slate-600">
              {projectStatus.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-semibold text-slate-900">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsProjectsOverviewCard;

