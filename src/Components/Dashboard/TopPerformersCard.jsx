import React from 'react';
import { Award, Star } from 'lucide-react';

const performers = [
  {
    id: 'p1',
    name: 'TechCorp Inc.',
    role: 'Top Company',
    type: 'Recruiter',
    metricLabel: 'Hires',
    metricValue: 47,
    change: '+23%',
    badge: 'Top Company',
  },
  {
    id: 'p2',
    name: 'StartupXYZ',
    role: 'High Growth',
    type: 'Recruiter',
    metricLabel: 'Hires',
    metricValue: 38,
    change: '+18%',
    badge: 'Rising Partner',
  },
  {
    id: 'p3',
    name: 'Sarah Chen',
    role: 'React Developer',
    type: 'Candidate',
    metricLabel: 'Projects',
    metricValue: 23,
    change: '+19%',
    badge: 'Rising Talent',
  },
  {
    id: 'p4',
    name: 'Mike Johns',
    role: 'UI/UX Designer',
    type: 'Candidate',
    metricLabel: 'Projects',
    metricValue: 19,
    change: '+15%',
    badge: 'Top Rated',
  },
];

const getInitials = (name) => {
  const parts = name.split(' ');
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
};

const TopPerformersCard = ({ listRef }) => {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-700">
            <Award className="h-3.5 w-3.5" />
            <span>Top Performers</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Candidates and companies driving the most successful outcomes.
          </p>
        </div>
        <button
          type="button"
          className="text-xs font-semibold text-slate-600 underline-offset-2 hover:text-emerald-700 hover:underline"
        >
          View All
        </button>
      </div>
      <div
        ref={listRef}
        className="space-y-3"
      >
        {performers.map((performer, index) => (
          <div
            key={performer.id}
            className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 px-3 py-2 text-xs text-slate-700 transition-colors hover:border-emerald-200 hover:bg-emerald-50/60"
            data-index={index}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 text-xs font-semibold text-white shadow-sm">
                {getInitials(performer.name)}
              </div>
              <div>
                <div className="flex items-center gap-1 text-xs font-semibold text-slate-900">
                  {performer.name}
                  <Star className="h-3 w-3 text-amber-400" />
                </div>
                <div className="text-[11px] text-slate-500">
                  {performer.role} • {performer.type}
                </div>
                <div className="mt-1 inline-flex items-center gap-2 text-[10px]">
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-700">
                    {performer.badge}
                  </span>
                  <span className="text-slate-400">
                    {performer.metricLabel}: {performer.metricValue}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right text-[11px]">
              <div className="font-semibold text-emerald-600">
                {performer.change}
              </div>
              <div className="text-slate-400">
                vs last month
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPerformersCard;

