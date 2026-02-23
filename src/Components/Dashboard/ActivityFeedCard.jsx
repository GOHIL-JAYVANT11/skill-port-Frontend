import React from 'react';
import {
  Activity,
  Briefcase,
  FileWarning,
  UserCheck,
} from 'lucide-react';

const activities = [
  {
    id: 'a1',
    icon: Briefcase,
    title: 'New job posted by TechCorp',
    description: 'Senior React Developer • ₹18L CTC',
    meta: '2 min ago',
    tone: 'primary',
  },
  {
    id: 'a2',
    icon: FileWarning,
    title: 'Dispute opened for Project X',
    description: 'Payment mismatch reported by freelancer',
    meta: '12 min ago',
    tone: 'warning',
  },
  {
    id: 'a3',
    icon: UserCheck,
    title: 'Candidate accepted offer',
    description: 'Anita Sharma • Product Designer at UrbanWorks',
    meta: '35 min ago',
    tone: 'success',
  },
  {
    id: 'a4',
    icon: Activity,
    title: 'Meeting scheduled',
    description: 'Final HR discussion for Backend Engineer',
    meta: '1 hr ago',
    tone: 'neutral',
  },
];

const getDotClasses = (tone) => {
  if (tone === 'primary') {
    return 'bg-sky-500';
  }
  if (tone === 'warning') {
    return 'bg-amber-500';
  }
  if (tone === 'success') {
    return 'bg-emerald-500';
  }
  return 'bg-slate-400';
};

const ActivityFeedCard = ({ listRef }) => {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-700">
            <Activity className="h-3.5 w-3.5 text-emerald-500" />
            <span>Live Activity Feed</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Real-time signal from jobs, projects and user actions.
          </p>
        </div>
        <span className="text-[11px] text-emerald-600">
          Live
        </span>
      </div>
      <div
        ref={listRef}
        className="relative space-y-3 text-xs text-slate-700"
      >
        <div className="pointer-events-none absolute left-3 top-1 bottom-1 w-px bg-slate-200" />
        {activities.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="relative flex items-start gap-3 rounded-2xl px-3 py-2 transition-colors hover:bg-slate-50"
              data-index={index}
            >
              <div className="relative mt-0.5 flex flex-col items-center">
                <div className={`z-10 flex h-6 w-6 items-center justify-center rounded-full border border-white bg-slate-900 text-[11px] text-white shadow-sm`}>
                  <Icon className="h-3 w-3" />
                </div>
                <div
                  className={`absolute inset-0 -z-10 rounded-full ${getDotClasses(
                    item.tone,
                  )} opacity-10`}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-semibold text-slate-900">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {item.meta}
                  </div>
                </div>
                <div className="mt-0.5 text-[11px] text-slate-500">
                  {item.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityFeedCard;

