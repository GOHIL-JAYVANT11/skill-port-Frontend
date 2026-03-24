import React, { useState } from 'react';
import { AlertTriangle, MoreHorizontal } from 'lucide-react';

const getPaymentStatusClasses = (status) => {
  if (status === 'Paid') {
    return 'bg-emerald-50 text-emerald-700 border-emerald-100';
  }
  if (status === 'Pending') {
    return 'bg-amber-50 text-amber-700 border-amber-100';
  }
  return 'bg-slate-50 text-slate-600 border-slate-100';
};

const getBadgeDotClasses = (status) => {
  if (status === 'Paid') {
    return 'bg-emerald-500';
  }
  if (status === 'Pending') {
    return 'bg-amber-500';
  }
  return 'bg-slate-400';
};

const JobPaymentsTable = ({ rows, formatCurrency }) => {
  const [activeMenuRowIndex, setActiveMenuRowIndex] = useState(null);

  const handleToggleMenu = (index) => {
    setActiveMenuRowIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="flex flex-col rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 text-xs text-slate-500">
        <div className="font-semibold text-slate-700">Job &amp; Internship Payments</div>
        <div>{rows.length} records</div>
      </div>
      <div className="max-h-[420px] overflow-x-auto overflow-y-auto">
        <table className="min-w-full border-separate border-spacing-0 text-left text-xs">
          <thead className="sticky top-0 z-10 bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wide text-slate-500 backdrop-blur">
            <tr>
              <th className="px-4 py-2">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
              </th>
              <th className="px-4 py-2">Transaction ID</th>
              <th className="px-4 py-2">Company</th>
              <th className="px-4 py-2">Candidate</th>
              <th className="px-4 py-2">Job Title</th>
              <th className="px-4 py-2 text-right">Monthly Salary</th>
              <th className="px-4 py-2 text-right">Commission %</th>
              <th className="px-4 py-2 text-right">Commission Amount</th>
              <th className="px-4 py-2">Payment Status</th>
              <th className="px-4 py-2">Hire Date</th>
              <th className="px-4 py-2">Replacement</th>
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
                  {payment.company}
                </td>
                <td className="px-4 py-2 align-top text-xs text-slate-800">
                  {payment.candidate}
                </td>
                <td className="px-4 py-2 align-top text-xs text-slate-700">
                  {payment.jobTitle}
                </td>
                <td className="px-4 py-2 align-top text-right text-xs text-slate-900">
                  {formatCurrency(payment.monthlySalary)}
                </td>
                <td className="px-4 py-2 align-top text-right text-xs text-slate-700">
                  {payment.commissionPercent}%
                </td>
                <td className="px-4 py-2 align-top text-right text-xs font-semibold text-slate-900">
                  {formatCurrency(payment.commissionAmount)}
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
                <td className="px-4 py-2 align-top text-xs text-slate-700">
                  {payment.hireDate}
                </td>
                <td className="px-4 py-2 align-top text-xs">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                      payment.replacementStatus === 'Normal'
                        ? 'bg-slate-50 text-slate-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {payment.replacementStatus !== 'Normal' && (
                      <AlertTriangle className="h-3 w-3" />
                    )}
                    {payment.replacementStatus}
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
                        View Hire Details
                      </button>
                      <button
                        type="button"
                        className="flex w-full items-center rounded-lg px-3 py-1.5 text-left hover:bg-slate-50"
                      >
                        View Interview Outcome
                      </button>
                      <button
                        type="button"
                        className="flex w-full items-center rounded-lg px-3 py-1.5 text-left hover:bg-slate-50"
                      >
                        Mark Commission as Paid
                      </button>
                      <button
                        type="button"
                        className="flex w-full items-center rounded-lg px-3 py-1.5 text-left hover:bg-slate-50"
                      >
                        Trigger Replacement Candidate
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
                        View Payment Activity Log
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={11}
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

export default JobPaymentsTable;

