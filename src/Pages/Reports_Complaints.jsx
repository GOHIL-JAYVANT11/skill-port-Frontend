import React, { useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  Filter,
  Flag,
  Search,
  Shield,
  Users,
} from 'lucide-react';
import {
  useHeaderExportButtonAnimation,
  useUserStatsCardsAnimation,
  useUserFiltersAnimation,
} from '../lib/BTNGsapanimation.jsx';
import ReportsFilter from '../Components/Reports & Complaints/ReportsFilter.jsx';
import ReportsTable from '../Components/Reports & Complaints/ReportsTable.jsx';
import { ReportDetailsModal } from '../Components/Reports & Complaints/ReportModals.jsx';

const Reports_Complaints = () => {
  const headerRef = useRef(null);
  const actionButtonRef = useRef(null);
  const statsCardsRef = useRef(null);
  const filtersRowRef = useRef(null);

  useHeaderExportButtonAnimation(headerRef, actionButtonRef);
  useUserStatsCardsAnimation(statsCardsRef);
  useUserFiltersAnimation(filtersRowRef);

  const [searchTerm, setSearchTerm] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: 'All',
    priority: 'All',
    status: 'All',
    dateFrom: '',
    dateTo: '',
    reportedUser: '',
    repeatOffender: 'All',
  });
  const [selectedIds, setSelectedIds] = useState([]);
  const [activeReport, setActiveReport] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [reports, setReports] = useState(() => [
    {
      id: 'REP-001',
      reportedBy: 'Anita Sharma',
      reporterRole: 'Job Seeker',
      reportedEntity: 'TechCorp Inc.',
      reportedType: 'Company',
      type: 'Job',
      priority: 'High',
      status: 'Open',
      dateSubmitted: '2026-02-10',
      description:
        'Company cancelled the offer after acceptance and did not respond to follow-up messages.',
      evidence: ['offer_letter.pdf', 'email_thread.png'],
      relatedJob: 'Senior Frontend Engineer',
      relatedProject: '',
      relatedMeeting: 'Final HR Discussion',
      relatedPayment: '',
      warningCount: 2,
      previousReports: 3,
      riskScore: 82,
      fraudFlag: true,
    },
    {
      id: 'REP-002',
      reportedBy: 'Rahul Khanna',
      reporterRole: 'Freelancer',
      reportedEntity: 'BrightPath Learning',
      reportedType: 'Client',
      type: 'Freelance',
      priority: 'Medium',
      status: 'Under Review',
      dateSubmitted: '2026-02-11',
      description:
        'Client requested additional scope without updating the contract or budget.',
      evidence: ['scope_change_chat.png'],
      relatedJob: '',
      relatedProject: 'Learning Portal Optimization',
      relatedMeeting: 'Scope Clarification Call',
      relatedPayment: 'FL-TRX-102',
      warningCount: 1,
      previousReports: 1,
      riskScore: 61,
      fraudFlag: false,
    },
    {
      id: 'REP-003',
      reportedBy: 'Kavya Desai',
      reporterRole: 'Recruiter',
      reportedEntity: 'Rohan Verma',
      reportedType: 'User',
      type: 'User Misconduct',
      priority: 'High',
      status: 'Open',
      dateSubmitted: '2026-02-12',
      description:
        'User repeatedly no-showed scheduled interviews without prior notice.',
      evidence: ['no_show_calendar.png'],
      relatedJob: 'Backend Developer',
      relatedProject: '',
      relatedMeeting: 'Technical Round 1',
      relatedPayment: '',
      warningCount: 3,
      previousReports: 4,
      riskScore: 88,
      fraudFlag: true,
    },
    {
      id: 'REP-004',
      reportedBy: 'Meera Iyer',
      reporterRole: 'Freelancer',
      reportedEntity: 'UrbanWorks Studio',
      reportedType: 'Company',
      type: 'Payment',
      priority: 'Medium',
      status: 'Resolved',
      dateSubmitted: '2026-02-09',
      description:
        'Delay in release of escrow payment after delivery approval.',
      evidence: ['payment_receipt.png'],
      relatedJob: '',
      relatedProject: 'UX Research Sprint',
      relatedMeeting: '',
      relatedPayment: 'FL-TRX-103',
      warningCount: 0,
      previousReports: 1,
      riskScore: 55,
      fraudFlag: false,
    },
  ]);

  const stats = useMemo(() => {
    const totalReports = reports.length;
    const openCases = reports.filter((report) =>
      ['Open', 'Under Review'].includes(report.status),
    ).length;
    const resolvedCases = reports.filter(
      (report) => report.status === 'Resolved',
    ).length;
    const highPriority = reports.filter(
      (report) => report.priority === 'High',
    ).length;

    return {
      totalReports,
      openCases,
      resolvedCases,
      highPriority,
    };
  }, [reports]);

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      if (
        searchTerm &&
        !`${report.id} ${report.reportedBy} ${report.reportedEntity}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      if (filters.type !== 'All' && report.type !== filters.type) {
        return false;
      }
      if (
        filters.priority !== 'All' &&
        report.priority !== filters.priority
      ) {
        return false;
      }
      if (filters.status !== 'All' && report.status !== filters.status) {
        return false;
      }
      if (
        filters.reportedUser &&
        !`${report.reportedEntity}`.toLowerCase().includes(
          filters.reportedUser.toLowerCase(),
        )
      ) {
        return false;
      }
      if (filters.repeatOffender === 'Yes' && report.previousReports === 0) {
        return false;
      }
      if (filters.repeatOffender === 'No' && report.previousReports > 0) {
        return false;
      }
      return true;
    });
  }, [reports, searchTerm, filters]);

  const handleToggleSelect = (id) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.length === filteredReports.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredReports.map((report) => report.id));
    }
  };

  const handleUpdateStatus = (id, status) => {
    setReports((current) =>
      current.map((report) =>
        report.id === id
          ? {
              ...report,
              status,
            }
          : report,
      ),
    );
  };

  const handleAction = (action, report) => {
    if (action === 'open-menu' && report) {
      setActiveReport(report);
      setDetailsOpen(true);
      return;
    }
    if (action === 'bulk-resolve') {
      setReports((current) =>
        current.map((report) =>
          selectedIds.includes(report.id)
            ? {
                ...report,
                status: 'Resolved',
              }
            : report,
        ),
      );
      return;
    }
    if (action === 'bulk-suspend') {
      return;
    }
    if (action === 'bulk-export') {
      return;
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-4" ref={headerRef}>
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Reports &amp; Complaints
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Monitor and resolve platform issues and user complaints. Maintain
            trust, safety, and compliance across SkillPort.
          </p>
        </div>
        <button
          type="button"
          ref={actionButtonRef}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
        >
          <CreditCard className="h-4 w-4" />
          Export Reports
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4" ref={statsCardsRef}>
        <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-xs text-slate-600 shadow-sm">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Total Reports
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <div className="text-2xl font-semibold text-slate-900">
              {stats.totalReports}
            </div>
            <Shield className="h-4 w-4 text-slate-500" />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-xs text-slate-600 shadow-sm">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Open Cases
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <div className="text-2xl font-semibold text-amber-700">
              {stats.openCases}
            </div>
            <ArrowUpRight className="h-4 w-4 text-amber-500" />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-xs text-slate-600 shadow-sm">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Resolved Cases
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <div className="text-2xl font-semibold text-emerald-700">
              {stats.resolvedCases}
            </div>
            <ArrowDownRight className="h-4 w-4 text-emerald-500" />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-xs text-slate-600 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              High Priority Cases
            </div>
            {stats.highPriority > 0 && (
              <AlertTriangle className="h-3.5 w-3.5 text-rose-500" />
            )}
          </div>
          <div className="mt-2 text-2xl font-semibold text-rose-700">
            {stats.highPriority}
          </div>
        </div>
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
            placeholder="Search by user name, company, or report ID"
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
          <Flag className="h-4 w-4 text-rose-500" />
          <span>Trust &amp; Safety dashboard for all platform complaints.</span>
        </div>
      </div>

      <ReportsFilter
        filters={filters}
        onChange={setFilters}
        open={filtersOpen}
      />

      <ReportsTable
        reports={filteredReports}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
        onToggleSelectAll={handleToggleSelectAll}
        onAction={handleAction}
      />

      <ReportDetailsModal
        isOpen={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        report={activeReport}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

export default Reports_Complaints;
