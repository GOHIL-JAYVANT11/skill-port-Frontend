import React, { useState } from 'react';
import { AlertTriangle, MoreHorizontal } from 'lucide-react';

const getPaymentStatusClasses = (status) => {
  if (status === 'Paid') {
    return 'bg-emerald-50 text-emerald-700 border-emerald-100';
  }
  if (status === 'In Progress') {
    return 'bg-amber-50 text-amber-700 border-amber-100';
  }
  if (status === 'On Hold') {
    return 'bg-rose-50 text-rose-700 border-rose-100';
  }
  return 'bg-slate-50 text-slate-600 border-slate-100';
};

const getBadgeDotClasses = (status) => {
  if (status === 'Paid') {
    return 'bg-emerald-500';
  }
  if (status === 'In Progress') {
    return 'bg-amber-500';
  }
  if (status === 'On Hold') {
    return 'bg-rose-500';
  }
  return 'bg-slate-400';
};

const FreelancePaymentsTable = ({ rows, formatCurrency }) => {
  const [activeMenuRowIndex, setActiveMenuRowIndex] = useState(null);

  const handleToggleMenu = (index) => {
    setActiveMenuRowIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="flex flex-col rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 text-xs text-slate-500">
        <div className="font-semibold text-slate-700">Freelance Payments</div>
        <div>{rows.length} records</div>
      </div>
      <div className="max-h-[420px] overflow-x-auto overflow-y-auto">
        <table className="min-w-full border-separate border-spacing-0 text-left text-xs">
          <thead className="sticky top-0 z-10 bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wide text-slate-500 backdrop-blur">
            <tr>
              <th className="px-4 py-2">Transaction ID</th>
              <th className="px-4 py-2">Client</th>
              <th className="px-4 py-2">Freelancer</th>
              <th className="px-4 py-2">Project Title</th>
              <th className="px-4 py-2 text-right">Total Budget</th>
              <th className="px-4 py-2 text-right">Platform %</th>
              <th className="px-4 py-2">Escrow Status</th>
              <th className="px-4 py-2">Payment Status</th>
              <th className="px-4 py-2">Dispute</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((payment, index) => (
              <tr
                key={payment.id}
                className="border-b border-slate-50 last:border-b-0 hover:bg-slate-50/80"
              >
                <td className="px-4 py-2 align-top font-mono text-[11px] text-slate-500">
                  {payment.id}
                </td>
                <td className="px-4 py-2 align-top text-xs text-slate-800">
                  {payment.client}
                </td>
                <td className="px-4 py-2 align-top text-xs text-slate-800">
                  {payment.freelancer}
                </td>
                <td className="px-4 py-2 align-top text-xs text-slate-700">
                  {payment.projectTitle}
                </td>
                <td className="px-4 py-2 align-top text-right text-xs text-slate-900">
                  {formatCurrency(payment.totalBudget)}
                </td>
                <td className="px-4 py-2 align-top text-right text-xs text-slate-700">
                  {payment.platformCommissionPercent}%
                </td>
                <td className="px-4 py-2 align-top text-xs">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                      payment.escrowStatus === 'Locked'
                        ? 'bg-slate-900 text-slate-50'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    {payment.escrowStatus}
                  </span>
                </td>
                <td className="px-4 py-2 align-top">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${getPaymentStatusClasses(
                      payment.paymentStatus,
                    )}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${getBadgeDotClasses(
                        payment.paymentStatus,
                      )}`}
                    />
                    {payment.paymentStatus}
                  </span>
                </td>
                <td className="px-4 py-2 align-top text-xs">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                      payment.disputeStatus === 'None'
                        ? 'bg-slate-50 text-slate-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {payment.disputeStatus !== 'None' && (
                      <AlertTriangle className="h-3 w-3" />
                    )}
                    {payment.disputeStatus}
                  </span>
                </td>
                <td className="relative px-4 py-2 align-top text-right text-xs">
                  <button
                    type="button"
                    onClick={() => handleToggleMenu(index)}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                  {activeMenuRowIndex === index && (
                    <div className="absolute right-0 z-20 mt-2 w-64 rounded-2xl border border-slate-100 bg-white p-2 text-left text-xs text-slate-800 shadow-xl">
                      <div className="px-3 pb-1 pt-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                        Actions
                      </div>
                      <button
                        type="button"
                        className="flex w-full items-center rounded-lg px-3 py-1.5 text-left hover:bg-slate-50"
                      >
                        View Project Details
                      </button>
                      <button
                        type="button"
                        className="flex w-full items-center rounded-lg px-3 py-1.5 text-left hover:bg-slate-50"
                      >
                        View Milestone Breakdown
                      </button>
                      <button
                        type="button"
                        className="flex w-full items-center rounded-lg px-3 py-1.5 text-left hover:bg-slate-50"
                      >
                        Hold Escrow
                      </button>
                      <button
                        type="button"
                        className="flex w-full items-center rounded-lg px-3 py-1.5 text-left hover:bg-slate-50"
                      >
                        Release Escrow
                      </button>
                      <button
                        type="button"
                        className="flex w-full items-center rounded-lg px-3 py-1.5 text-left hover:bg-slate-50"
                      >
                        View Dispute Details
                      </button>
                      <button
                        type="button"
                        className="flex w-full items-center rounded-lg px-3 py-1.5 text-left hover:bg-slate-50"
                      >
                        Add Internal Admin Note
                      </button>
                      <button
                        type="button"
                        className="flex w-full items-center rounded-lg px-3 py-1.5 text-left hover:bg-slate-50"
                      >
                        View Transaction Timeline
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={10}
                  className="px-4 py-12 text-center text-xs text-slate-500"
                >
                  No transactions match the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FreelancePaymentsTable;

