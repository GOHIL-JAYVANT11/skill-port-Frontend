import React from 'react';
import {
  Users,
  Building2,
  Briefcase,
  FolderKanban,
  DollarSign,
  Shield,
  AlertTriangle,
  CalendarCheck2,
} from 'lucide-react';

const metrics = [
  {
    id: 'total-users',
    label: 'Total Users',
    value: '12,847',
    trend: '+12.5%',
    tone: 'positive',
    icon: Users,
  },
  {
    id: 'active-companies',
    label: 'Active Companies',
    value: '486',
    trend: '+15.3%',
    tone: 'positive',
    icon: Building2,
  },
  {
    id: 'active-jobs',
    label: 'Active Jobs',
    value: '1,247',
    trend: '+6.8%',
    tone: 'positive',
    icon: Briefcase,
  },
  {
    id: 'active-projects',
    label: 'Active Freelance Projects',
    value: '534',
    trend: '-3.1%',
    tone: 'negative',
    icon: FolderKanban,
  },
  {
    id: 'monthly-revenue',
    label: 'Monthly Revenue',
    value: '$98,250',
    trend: '+18.7%',
    tone: 'positive',
    icon: DollarSign,
  },
  {
    id: 'escrow-volume',
    label: 'Escrow Volume',
    value: '$412,900',
    trend: '+9.4%',
    tone: 'positive',
    icon: Shield,
  },
  {
    id: 'open-disputes',
    label: 'Open Disputes',
    value: '23',
    trend: '+1.2%',
    tone: 'warning',
    icon: AlertTriangle,
  },
  {
    id: 'meeting-conversion',
    label: 'Meeting Conversion Rate',
    value: '31.4%',
    trend: '+4.3%',
    tone: 'positive',
    icon: CalendarCheck2,
  },
];

const getTrendClasses = (tone) => {
  if (tone === 'positive') {
    return 'text-emerald-700';
  }
  if (tone === 'negative') {
    return 'text-rose-600';
  }
  if (tone === 'warning') {
    return 'text-amber-600';
  }
  return 'text-slate-600';
};

const getCardBackgroundClasses = (tone) => {
  if (tone === 'positive') {
    return 'from-emerald-50 to-emerald-100/40';
  }
  if (tone === 'negative') {
    return 'from-rose-50 to-rose-100/40';
  }
  if (tone === 'warning') {
    return 'from-amber-50 to-amber-100/40';
  }
  return 'from-slate-50 to-slate-100/40';
};

const DashboardStatsGrid = ({ cardsRef }) => {
  return (
    <div
      ref={cardsRef}
      className="mb-5 grid gap-3 md:grid-cols-4 xl:grid-cols-8"
    >
      {metrics.map((metric) => {
        const Icon = metric.icon;
        const trendClasses = getTrendClasses(metric.tone);
        const background = getCardBackgroundClasses(metric.tone);

        return (
          <div
            key={metric.id}
            className={`group flex flex-col justify-between rounded-2xl border border-slate-100 bg-gradient-to-br ${background} px-4 py-3 text-xs shadow-sm transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-md`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {metric.label}
                </div>
                <div className="text-2xl font-bold leading-tight tracking-tight text-slate-900">
                  {metric.value}
                </div>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/80 text-slate-600 shadow-sm">
                <Icon className="h-3 w-6" />
              </div>
            </div>
            <div className="mt-1 flex items-center gap-1 text-[11px]">
              <span className={`font-semibold ${trendClasses}`}>
                {metric.trend}
              </span>
              <span className="text-slate-500">vs last month</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStatsGrid;
