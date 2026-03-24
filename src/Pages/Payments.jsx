import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  CalendarDays,
  CreditCard,
  DollarSign,
  Filter,
  Search,
  Users,
} from 'lucide-react';
import {
  useHeaderExportButtonAnimation,
  useUserStatsCardsAnimation,
  useUserFiltersAnimation,
} from '../lib/BTNGsapanimation.jsx';
import JobPaymentsTable from '../Components/Payments/JobPaymentsTable.jsx';
import FreelancePaymentsTable from '../Components/Payments/FreelancePaymentsTable.jsx';
import PaymentsFilter from '../Components/Payments/PaymentsFilter.jsx';
import CommissionAnalytics from '../Components/Payments/CommissionAnalytics.jsx';

const Payments = () => {
  const headerRef = useRef(null);
  const actionButtonRef = useRef(null);
  const statsCardsRef = useRef(null);
  const filtersRowRef = useRef(null);

  useHeaderExportButtonAnimation(headerRef, actionButtonRef);
  useUserStatsCardsAnimation(statsCardsRef);
  useUserFiltersAnimation(filtersRowRef);

  const [view, setView] = useState('job');
  const [searchTerm, setSearchTerm] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    status: 'All',
    companyOrClient: 'All',
    amountMin: '',
    amountMax: '',
    replacementStatus: 'All',
    disputeStatus: 'All',
  });
  const [detailView, setDetailView] = useState('payments');

  const [jobPayments, setJobPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch('http://localhost:4518/api/payments/all-payments');
        const data = await response.json();
        if (data && Array.isArray(data.data)) {
          const formattedPayments = data.data.map((payment) => ({
            id: payment._id,
            company: payment.recruiterId?.Fullname || 'N/A',
            candidate: payment.candidateId?.Fullname || 'N/A',
            jobTitle: payment.jobId?.jobtitle || 'N/A',
            monthlySalary: payment.monthlySalary || 0,
            commissionPercent: payment.commissionPercent || 0,
            commissionAmount: payment.commissionAmount || 0,
            paymentStatus: payment.status,
            hireDate: payment.createdAt ? new Date(payment.createdAt).toLocaleDateString() : 'N/A',
            replacementStatus: payment.replacementStatus || 'Normal',
          }));
          setJobPayments(formattedPayments);
        } else {
          setJobPayments([]);
        }
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchPayments();
  }, []);

  const freelancePayments = useMemo(
    () => [
      {
        id: 'FL-TRX-101',
        client: 'TechCorp Inc.',
        freelancer: 'Anita Sharma',
        projectTitle: 'Admin Dashboard Revamp',
        totalBudget: 450000,
        platformCommissionPercent: 12,
        escrowStatus: 'Locked',
        paymentStatus: 'In Progress',
        disputeStatus: 'None',
      },
      {
        id: 'FL-TRX-102',
        client: 'BrightPath Learning',
        freelancer: 'Rahul Khanna',
        projectTitle: 'Learning Portal Optimization',
        totalBudget: 220000,
        platformCommissionPercent: 10,
        escrowStatus: 'Released',
        paymentStatus: 'Paid',
        disputeStatus: 'None',
      },
      {
        id: 'FL-TRX-103',
        client: 'UrbanWorks Studio',
        freelancer: 'Meera Iyer',
        projectTitle: 'UX Research Sprint',
        totalBudget: 90000,
        platformCommissionPercent: 15,
        escrowStatus: 'Locked',
        paymentStatus: 'On Hold',
        disputeStatus: 'Under Review',
      },
    ],
    [],
  );

  const filteredJobPayments = useMemo(() => {
    return jobPayments.filter((payment) => {
      if (
        searchTerm &&
        !`${payment.company} ${payment.candidate} ${payment.jobTitle}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      if (filters.status !== 'All') {
        if (
          filters.status === 'Pending' &&
          payment.paymentStatus !== 'Pending'
        ) {
          return false;
        }
        if (
          filters.status === 'Paid' &&
          payment.paymentStatus !== 'Paid'
        ) {
          return false;
        }
      }
      if (
        filters.companyOrClient !== 'All' &&
        payment.company !== filters.companyOrClient
      ) {
        return false;
      }
      if (
        filters.replacementStatus !== 'All' &&
        payment.replacementStatus !== filters.replacementStatus
      ) {
        return false;
      }
      return true;
    });
  }, [jobPayments, searchTerm, filters]);

  const filteredFreelancePayments = useMemo(() => {
    return freelancePayments.filter((payment) => {
      if (
        searchTerm &&
        !`${payment.client} ${payment.freelancer} ${payment.projectTitle}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      if (filters.status !== 'All') {
        if (
          filters.status === 'Pending' &&
          payment.paymentStatus !== 'In Progress'
        ) {
          return false;
        }
        if (
          filters.status === 'Paid' &&
          payment.paymentStatus !== 'Paid'
        ) {
          return false;
        }
        if (
          filters.status === 'On Hold' &&
          payment.paymentStatus !== 'On Hold'
        ) {
          return false;
        }
      }
      if (
        filters.companyOrClient !== 'All' &&
        payment.client !== filters.companyOrClient
      ) {
        return false;
      }
      if (
        filters.disputeStatus !== 'All' &&
        payment.disputeStatus !== filters.disputeStatus
      ) {
        return false;
      }
      return true;
    });
  }, [freelancePayments, searchTerm, filters]);

  const jobStats = useMemo(() => {
    const totalCommission = jobPayments.reduce(
      (sum, payment) => sum + payment.commissionAmount,
      0,
    );
    const pendingCommission = jobPayments
      .filter((payment) => payment.paymentStatus === 'Pending')
      .reduce((sum, payment) => sum + payment.commissionAmount, 0);
    const totalHires = jobPayments.length;
    const replacementCases = jobPayments.filter(
      (payment) => payment.replacementStatus !== 'Normal',
    ).length;
    return {
      totalCommission,
      pendingCommission,
      totalHires,
      replacementCases,
    };
  }, [jobPayments]);

  const freelanceStats = useMemo(() => {
    const totalEscrow = freelancePayments.reduce(
      (sum, payment) => sum + payment.totalBudget,
      0,
    );
    const activeEscrow = freelancePayments
      .filter((payment) => payment.escrowStatus === 'Locked')
      .reduce((sum, payment) => sum + payment.totalBudget, 0);
    const releasedPayments = freelancePayments
      .filter((payment) => payment.escrowStatus === 'Released')
      .reduce((sum, payment) => sum + payment.totalBudget, 0);
    const disputedProjects = freelancePayments.filter(
      (payment) => payment.disputeStatus !== 'None',
    ).length;
    return {
      totalEscrow,
      activeEscrow,
      releasedPayments,
      disputedProjects,
    };
  }, [freelancePayments]);

  const analytics = useMemo(
    () => ({
      commissionSeries: [
        { month: 'Sep', job: 165000, freelance: 120000 },
        { month: 'Oct', job: 182000, freelance: 138000 },
        { month: 'Nov', job: 176000, freelance: 142000 },
        { month: 'Dec', job: 194000, freelance: 155000 },
        { month: 'Jan', job: 205000, freelance: 162000 },
        { month: 'Feb', job: 198000, freelance: 158000 },
      ],
      topCompanies: [
        { name: 'TechCorp Inc.', amount: 210000 },
        { name: 'BrightPath Learning', amount: 145000 },
        { name: 'UrbanWorks Studio', amount: 98000 },
      ],
      replacementRate: '7.5%',
      freelancerSuccessRate: '93%',
      suspiciousPayments: 2,
    }),
    [],
  );

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);

  const activeStats = view === 'job' ? jobStats : freelanceStats;

  const activeRows =
    view === 'job' ? filteredJobPayments : filteredFreelancePayments;

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-4" ref={headerRef}>
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Payments &amp; Commission Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Monitor and manage all commission-based transactions. No refunds, only
            replacements or escrow decisions.
          </p>
        </div>
        <button
          type="button"
          ref={actionButtonRef}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
        >
          <CreditCard className="h-4 w-4" />
          Export Transactions
        </button>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-full bg-slate-100 p-1 text-xs">
          <button
            type="button"
            onClick={() => setView('job')}
            className={`inline-flex items-center gap-1 rounded-full px-4 py-1.5 font-semibold transition ${
              view === 'job'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="h-4 w-4" />
            Job &amp; Internship Payments
          </button>
          <button
            type="button"
            onClick={() => setView('freelance')}
            className={`inline-flex items-center gap-1 rounded-full px-4 py-1.5 font-semibold transition ${
              view === 'freelance'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <DollarSign className="h-4 w-4" />
            Freelance Payments
          </button>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <span>No refund policy. Use replacements or escrow controls instead.</span>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4" ref={statsCardsRef}>
        {view === 'job' ? (
          <>
            <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-xs text-slate-600 shadow-sm">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Total Commission Collected
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <div className="text-2xl font-semibold text-slate-900">
                  {formatCurrency(activeStats.totalCommission)}
                </div>
                <ArrowUpRight className="h-4 w-4 text-emerald-500" />
              </div>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-xs text-slate-600 shadow-sm">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Pending Commission
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <div className="text-2xl font-semibold text-amber-700">
                  {formatCurrency(activeStats.pendingCommission)}
                </div>
                <ArrowDownRight className="h-4 w-4 text-amber-500" />
              </div>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-xs text-slate-600 shadow-sm">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Total Hires
              </div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">
                {activeStats.totalHires}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-xs text-slate-600 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Replacement Cases
                </div>
                {activeStats.replacementCases > 0 && (
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                )}
              </div>
              <div className="mt-2 text-2xl font-semibold text-amber-700">
                {activeStats.replacementCases}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-xs text-slate-600 shadow-sm">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Total Escrow Amount
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <div className="text-2xl font-semibold text-slate-900">
                  {formatCurrency(activeStats.totalEscrow)}
                </div>
                <ArrowUpRight className="h-4 w-4 text-emerald-500" />
              </div>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-xs text-slate-600 shadow-sm">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Active Escrow
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <div className="text-2xl font-semibold text-slate-900">
                  {formatCurrency(activeStats.activeEscrow)}
                </div>
                <ArrowUpRight className="h-4 w-4 text-sky-500" />
              </div>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-xs text-slate-600 shadow-sm">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Released Payments
              </div>
              <div className="mt-2 text-2xl font-semibold text-emerald-700">
                {formatCurrency(activeStats.releasedPayments)}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-xs text-slate-600 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Disputed Projects
                </div>
                {activeStats.disputedProjects > 0 && (
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                )}
              </div>
              <div className="mt-2 text-2xl font-semibold text-amber-700">
                {activeStats.disputedProjects}
              </div>
            </div>
          </>
        )}
      </div>

      <div
        className="mt-6 flex flex-wrap items-center justify-between gap-3"
        ref={filtersRowRef}
      >
        <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500 shadow-sm">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder={
              view === 'job'
                ? 'Search by company, candidate, or job title'
                : 'Search by client, freelancer, or project title'
            }
            className="h-6 flex-1 border-0 bg-transparent text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={() => setFiltersOpen((current) => !current)}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
        >
          <Filter className="h-4 w-4 text-slate-500" />
          <span>Filters</span>
        </button>
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <CalendarDays className="h-4 w-4 text-slate-400" />
          <span>Financial overview with a strict no-refund policy</span>
        </div>
      </div>

      <PaymentsFilter
        view={view}
        filters={filters}
        onChange={setFilters}
        open={filtersOpen}
      />

      <div className="mt-4 inline-flex rounded-full bg-slate-100 p-1 text-xs">
        <button
          type="button"
          onClick={() => setDetailView('payments')}
          className={`inline-flex items-center gap-1 rounded-full px-4 py-1.5 font-semibold transition ${
            detailView === 'payments'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="h-4 w-4" />
          <span>
            {view === 'job'
              ? 'Job & Internship Payments'
              : 'Freelance Payments'}
          </span>
        </button>
        <button
          type="button"
          onClick={() => setDetailView('analytics')}
          className={`inline-flex items-center gap-1 rounded-full px-4 py-1.5 font-semibold transition ${
            detailView === 'analytics'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Building2 className="h-4 w-4" />
          <span>Commission Analytics</span>
        </button>
        <button
          type="button"
          onClick={() => setDetailView('companies')}
          className={`inline-flex items-center gap-1 rounded-full px-4 py-1.5 font-semibold transition ${
            detailView === 'companies'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Building2 className="h-4 w-4" />
          <span>Most Profitable Companies</span>
        </button>
      </div>

      {detailView === 'payments' && (
        <div className="mt-6 flex-1">
          {view === 'job' ? (
            <JobPaymentsTable
              rows={activeRows}
              formatCurrency={formatCurrency}
            />
          ) : (
            <FreelancePaymentsTable
              rows={activeRows}
              formatCurrency={formatCurrency}
            />
          )}
        </div>
      )}

      {detailView === 'analytics' && (
        <div className="mt-6 flex-1">
          <CommissionAnalytics
            analytics={analytics}
            formatCurrency={formatCurrency}
          />
        </div>
      )}

      {detailView === 'companies' && (
        <div className="mt-6 flex-1 rounded-2xl border border-slate-100 bg-white px-4 py-3 text-xs text-slate-700 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-slate-50">
                <Building2 className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Most Profitable Companies
                </div>
                <div className="text-[11px] text-slate-500">
                  Sorted by total commission across jobs and freelance projects.
                </div>
              </div>
            </div>
          </div>
          <div className="max-h-[420px] overflow-y-auto rounded-2xl border border-slate-100 bg-slate-50">
            <table className="min-w-full border-separate border-spacing-0 text-left text-xs">
              <thead className="sticky top-0 z-10 bg-slate-100 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="w-16 px-4 py-2">Rank</th>
                  <th className="px-4 py-2">Company</th>
                  <th className="px-4 py-2 text-right">Total Commission</th>
                </tr>
              </thead>
              <tbody>
                {analytics.topCompanies.map((company, index) => (
                  <tr
                    key={company.name}
                    className="border-b border-slate-100 last:border-b-0 hover:bg-white"
                  >
                    <td className="px-4 py-2 text-[11px] font-semibold text-slate-500">
                      #{index + 1}
                    </td>
                    <td className="px-4 py-2 text-xs font-semibold text-slate-900">
                      {company.name}
                    </td>
                    <td className="px-4 py-2 text-right text-xs font-semibold text-slate-900">
                      {formatCurrency(company.amount)}
                    </td>
                  </tr>
                ))}
                {analytics.topCompanies.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-12 text-center text-xs text-slate-500"
                    >
                      No profitable companies data available yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
