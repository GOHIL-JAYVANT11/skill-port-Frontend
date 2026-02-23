import React, { useMemo, useRef } from 'react';
import { AlertTriangle, ArrowUpRight, LineChart } from 'lucide-react';
import { useCommissionAnalyticsAnimation } from '../../lib/BTNGsapanimation.jsx';

const CommissionAnalytics = ({ analytics, formatCurrency }) => {
  const containerRef = useRef(null);
  useCommissionAnalyticsAnimation(containerRef);

  const series = analytics.commissionSeries;

  const totals = useMemo(() => {
    const totalJob = series.reduce((sum, item) => sum + item.job, 0);
    const totalFreelance = series.reduce(
      (sum, item) => sum + item.freelance,
      0,
    );
    const total = totalJob + totalFreelance;
    return {
      totalJob,
      totalFreelance,
      total,
    };
  }, [series]);

  const jobPercent =
    totals.total === 0 ? 0 : Math.round((totals.totalJob / totals.total) * 100);
  const freelancePercent = 100 - jobPercent;

  const maxValue = useMemo(() => {
    return series.reduce(
      (max, item) =>
        Math.max(max, item.job || 0, item.freelance || 0),
      0,
    );
  }, [series]);

  const viewBoxWidth = 260;
  const viewBoxHeight = 80;

  const buildPath = (key) => {
    if (!series.length || maxValue === 0) {
      return '';
    }
    const step = series.length === 1 ? 0 : viewBoxWidth / (series.length - 1);
    return series
      .map((item, index) => {
        const value = item[key] || 0;
        const x = index * step;
        const y =
          viewBoxHeight -
          (value / maxValue) * (viewBoxHeight - 16) -
          4;
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  };

  const jobPath = buildPath('job');
  const freelancePath = buildPath('freelance');

  const donutRadiusOuter = 18;
  const donutRadiusInner = 14;

  return (
    <div
      ref={containerRef}
      className="rounded-2xl bg-slate-950 px-4 py-4 text-xs text-slate-50 shadow-lg ring-1 ring-slate-800/60"
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-300">
            <LineChart className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Commission Analytics
            </div>
            <div className="text-[11px] text-slate-500">
              Job hiring and freelance escrow commission performance.
            </div>
          </div>
        </div>
        <div className="inline-flex rounded-full bg-slate-900 px-2 py-1 text-[10px] font-semibold text-slate-300 ring-1 ring-slate-700/80">
          <span className="mr-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Live revenue insights
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="space-y-2">
          <div className="rounded-2xl bg-gradient-to-br from-emerald-500/20 via-emerald-500/10 to-slate-900 px-3 py-3 ring-1 ring-emerald-500/30">
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-emerald-200">
                Total Commission
              </div>
              <ArrowUpRight className="h-4 w-4 text-emerald-300" />
            </div>
            <div className="mt-1 text-lg font-semibold text-emerald-50">
              <span
                data-counter
                data-target={totals.total}
              >
                {totals.total.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="mt-1 text-[11px] text-emerald-100">
              Combined Job &amp; Freelance commission.
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-900 px-3 py-3 ring-1 ring-emerald-500/20">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Job Commission
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-50">
                <span
                  data-counter
                  data-target={totals.totalJob}
                >
                  {totals.totalJob.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="mt-1 text-[11px] text-slate-500">
                10% hiring commission.
              </div>
            </div>
            <div className="rounded-2xl bg-slate-900 px-3 py-3 ring-1 ring-sky-500/20">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Freelance Commission
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-50">
                <span
                  data-counter
                  data-target={totals.totalFreelance}
                >
                  {totals.totalFreelance.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="mt-1 text-[11px] text-slate-500">
                From escrow-based payouts.
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl bg-slate-900 px-3 py-3 ring-1 ring-slate-700/80">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Monthly Trend
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <span className="h-1.5 w-4 rounded-full bg-emerald-400" />
                  Job
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-1.5 w-4 rounded-full bg-sky-400" />
                  Freelance
                </span>
              </div>
            </div>
            <svg
              viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
              className="h-24 w-full"
            >
              <defs>
                <linearGradient
                  id="jobLine"
                  x1="0"
                  x2="1"
                  y1="0"
                  y2="0"
                >
                  <stop offset="0%" stopColor="#6ee7b7" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
                <linearGradient
                  id="freelanceLine"
                  x1="0"
                  x2="1"
                  y1="0"
                  y2="0"
                >
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
              </defs>
              <path
                d={jobPath}
                data-line-series="job"
                fill="none"
                stroke="url(#jobLine)"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <path
                d={freelancePath}
                data-line-series="freelance"
                fill="none"
                stroke="url(#freelanceLine)"
                strokeWidth="2.1"
                strokeLinecap="round"
                opacity={0.9}
              />
            </svg>
            <div className="mt-1 flex justify-between text-[10px] text-slate-500">
              {series.map((item) => (
                <span key={item.month}>{item.month}</span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900 px-3 py-3 ring-1 ring-slate-700/80">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Monthly Comparison
              </div>
              <span className="text-[10px] text-slate-500">
                Job vs Freelance
              </span>
            </div>
            <div className="flex h-24 items-end gap-2">
              {series.map((item) => {
                const jobHeight =
                  maxValue === 0 ? 0 : (item.job / maxValue) * 100;
                const freelanceHeight =
                  maxValue === 0 ? 0 : (item.freelance / maxValue) * 100;
                return (
                  <div
                    key={item.month}
                    className="flex flex-1 flex-col items-center gap-1"
                  >
                    <div className="flex h-full w-full items-end gap-1 rounded-full bg-slate-950/60 px-1 py-1">
                      <div
                        data-bar
                        className="flex-1 rounded-full bg-emerald-500"
                        style={{ height: `${Math.max(jobHeight, 8)}%` }}
                      />
                      <div
                        data-bar
                        className="flex-1 rounded-full bg-sky-500"
                        style={{ height: `${Math.max(freelanceHeight, 6)}%` }}
                      />
                    </div>
                    <div className="text-[9px] text-slate-500">
                      {item.month}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl bg-slate-900 px-3 py-3 ring-1 ring-slate-700/80">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Commission Distribution
              </div>
              <span className="text-[10px] text-slate-500">
                Job vs Freelance
              </span>
            </div>
            <div className="flex items-center gap-3">
              <svg
                viewBox="0 0 48 48"
                className="h-20 w-20"
              >
                <circle
                  cx="24"
                  cy="24"
                  r={donutRadiusOuter}
                  fill="none"
                  stroke="rgba(15,23,42,0.8)"
                  strokeWidth="6"
                />
                <circle
                  cx="24"
                  cy="24"
                  r={donutRadiusOuter}
                  fill="none"
                  stroke="url(#jobDonut)"
                  strokeWidth="6"
                  strokeDasharray={`${jobPercent} ${100 - jobPercent}`}
                  strokeDashoffset="25"
                  strokeLinecap="round"
                  data-donut-segment
                />
                <circle
                  cx="24"
                  cy="24"
                  r={donutRadiusInner}
                  fill="none"
                  stroke="rgba(15,23,42,0.8)"
                  strokeWidth="6"
                />
                <circle
                  cx="24"
                  cy="24"
                  r={donutRadiusInner}
                  fill="none"
                  stroke="url(#freelanceDonut)"
                  strokeWidth="6"
                  strokeDasharray={`${freelancePercent} ${
                    100 - freelancePercent
                  }`}
                  strokeDashoffset="60"
                  strokeLinecap="round"
                  data-donut-segment
                />
                <defs>
                  <linearGradient
                    id="jobDonut"
                    x1="0"
                    x2="1"
                    y1="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#6ee7b7" />
                    <stop offset="100%" stopColor="#22c55e" />
                  </linearGradient>
                  <linearGradient
                    id="freelanceDonut"
                    x1="0"
                    x2="1"
                    y1="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#0ea5e9" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="space-y-1 text-[11px]">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span>Job &amp; Internship</span>
                  </div>
                  <span className="font-semibold text-slate-50">
                    {jobPercent}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-sky-400" />
                    <span>Freelance</span>
                  </div>
                  <span className="font-semibold text-slate-50">
                    {freelancePercent}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900 px-3 py-3 ring-1 ring-slate-700/80">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Replacement Rate
                </div>
                <div className="mt-1 text-lg font-semibold text-slate-50">
                  {analytics.replacementRate}
                </div>
                <div className="mt-1 text-[11px] text-slate-500">
                  Hires needing replacement instead of refund.
                </div>
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Freelancer Success
                </div>
                <div className="mt-1 text-lg font-semibold text-slate-50">
                  {analytics.freelancerSuccessRate}
                </div>
                <div className="mt-1 text-[11px] text-slate-500">
                  Projects completed without disputes.
                </div>
              </div>
            </div>
            <div className="mt-3 rounded-xl bg-slate-950 px-3 py-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Suspicious Payments
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Flagged for manual review. No automatic refunds.
                    </div>
                  </div>
                </div>
                <div className="text-xl font-semibold text-amber-400">
                  {analytics.suspiciousPayments}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommissionAnalytics;

