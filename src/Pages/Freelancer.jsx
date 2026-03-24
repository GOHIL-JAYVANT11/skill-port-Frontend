import React, { useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  Briefcase,
  Download,
  Filter as FilterIcon,
  Search,
  User,
  Wallet,
} from 'lucide-react';
import FreelanceTable from '../Components/Freelancer/FreelanceTable';
import FreelanceFilter from '../Components/Freelancer/FreelanceFilter';
import FreelanceExportData from '../Components/Freelancer/FreelanceExportData';
import {
  ProjectDetailsModal,
  MilestonesModal,
  EscrowBreakdownModal,
  DisputeResolutionModal,
  PaymentOverrideModal,
  AdminNoteModal,
  ProjectActivityTimelineModal,
  ProjectChatModal,
} from '../Components/Freelancer/FreelanceModals';
import {
  useHeaderExportButtonAnimation,
  useUserStatsCardsAnimation,
  useUserFiltersAnimation,
} from '../lib/BTNGsapanimation';

const Freelancer = () => {
  const headerRef = useRef(null);
  const exportButtonRef = useRef(null);
  const statsCardsRef = useRef(null);
  const filtersRowRef = useRef(null);

  useHeaderExportButtonAnimation(headerRef, exportButtonRef);
  useUserStatsCardsAnimation(statsCardsRef);
  useUserFiltersAnimation(filtersRowRef);

  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: 'All',
    freelancer: 'All',
    client: 'All',
    budgetMin: '',
    budgetMax: '',
    escrowMin: '',
    escrowMax: '',
    progressMin: '',
    progressMax: '',
  });

  const [selectedProjectIds, setSelectedProjectIds] = useState([]);
  const [activeProject, setActiveProject] = useState(null);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isMilestonesOpen, setIsMilestonesOpen] = useState(false);
  const [isEscrowOpen, setIsEscrowOpen] = useState(false);
  const [isDisputeOpen, setIsDisputeOpen] = useState(false);
  const [isPaymentOverrideOpen, setIsPaymentOverrideOpen] = useState(false);
  const [isAdminNoteOpen, setIsAdminNoteOpen] = useState(false);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

 const projects = [
  {
    id: 'p1',
    name: 'Landing Page Design',
    client: 'StartupX',
    freelancer: 'Rahul Patel',
    totalBudget: 12000,
    currency: '₹',
    status: 'Active',
    progressPercent: 40,
    milestonesCompleted: 1,
    milestonesTotal: 3,
    escrow: {
      total: 10000,
      released: 4000,
      pending: 6000,
      onHold: 0,
    },
    milestones: [
      { id: 'm1', title: 'Wireframe', amount: 3000, status: 'Released' },
      { id: 'm2', title: 'UI Design', amount: 4000, status: 'In Review' },
      { id: 'm3', title: 'Final Delivery', amount: 5000, status: 'Pending' },
    ],
  },

  {
    id: 'p2',
    name: 'Portfolio Website',
    client: 'Amit Shah',
    freelancer: 'Neha Verma',
    totalBudget: 18000,
    currency: '₹',
    status: 'Completed',
    progressPercent: 100,
    milestonesCompleted: 3,
    milestonesTotal: 3,
    escrow: {
      total: 18000,
      released: 18000,
      pending: 0,
      onHold: 0,
    },
    milestones: [
      { id: 'm1', title: 'Setup', amount: 5000, status: 'Released' },
      { id: 'm2', title: 'Development', amount: 8000, status: 'Released' },
      { id: 'm3', title: 'Deploy', amount: 5000, status: 'Released' },
    ],
  },

  {
    id: 'p3',
    name: 'Mobile App UI Fix',
    client: 'CodeLabs',
    freelancer: 'Ankit Singh',
    totalBudget: 9000,
    currency: '₹',
    status: 'On hold',
    progressPercent: 60,
    milestonesCompleted: 2,
    milestonesTotal: 3,
    escrow: {
      total: 9000,
      released: 6000,
      pending: 3000,
      onHold: 0,
    },
    milestones: [
      { id: 'm1', title: 'Bug Fix', amount: 3000, status: 'Released' },
      { id: 'm2', title: 'UI Update', amount: 3000, status: 'Released' },
      { id: 'm3', title: 'Testing', amount: 3000, status: 'Pending' },
    ],
  },

  {
    id: 'p4',
    name: 'API Integration',
    client: 'FinTech Pvt Ltd',
    freelancer: 'Karan Mehta',
    totalBudget: 22000,
    currency: '₹',
    status: 'Disputed',
    progressPercent: 50,
    milestonesCompleted: 1,
    milestonesTotal: 3,
    escrow: {
      total: 20000,
      released: 7000,
      pending: 8000,
      onHold: 5000,
    },
    milestones: [
      { id: 'm1', title: 'Setup API', amount: 7000, status: 'Released' },
      { id: 'm2', title: 'Integration', amount: 8000, status: 'Disputed' },
      { id: 'm3', title: 'Testing', amount: 7000, status: 'Pending' },
    ],
  },

  {
    id: 'p5',
    name: 'Logo Design',
    client: 'Cafe Brew',
    freelancer: 'Priya Shah',
    totalBudget: 5000,
    currency: '₹',
    status: 'Active',
    progressPercent: 20,
    milestonesCompleted: 0,
    milestonesTotal: 2,
    escrow: {
      total: 5000,
      released: 0,
      pending: 5000,
      onHold: 0,
    },
    milestones: [
      { id: 'm1', title: 'Concept', amount: 2500, status: 'In Review' },
      { id: 'm2', title: 'Final Logo', amount: 2500, status: 'Pending' },
    ],
  },
];

  const filteredProjects = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return projects.filter((project) => {
      if (term) {
        const matchesSearch =
          project.name.toLowerCase().includes(term) ||
          project.client.toLowerCase().includes(term);
        if (!matchesSearch) {
          return false;
        }
      }

      if (filters.status !== 'All' && project.status !== filters.status) {
        return false;
      }

      if (filters.freelancer !== 'All' && project.freelancer !== filters.freelancer) {
        return false;
      }

      if (filters.client !== 'All' && project.client !== filters.client) {
        return false;
      }

      if (filters.budgetMin) {
        const value = Number(filters.budgetMin);
        if (!Number.isNaN(value) && project.totalBudget < value) {
          return false;
        }
      }

      if (filters.budgetMax) {
        const value = Number(filters.budgetMax);
        if (!Number.isNaN(value) && project.totalBudget > value) {
          return false;
        }
      }

      if (filters.escrowMin) {
        const value = Number(filters.escrowMin);
        if (!Number.isNaN(value) && project.escrow.total < value) {
          return false;
        }
      }

      if (filters.escrowMax) {
        const value = Number(filters.escrowMax);
        if (!Number.isNaN(value) && project.escrow.total > value) {
          return false;
        }
      }

      if (filters.progressMin) {
        const value = Number(filters.progressMin);
        if (!Number.isNaN(value) && project.progressPercent < value) {
          return false;
        }
      }

      if (filters.progressMax) {
        const value = Number(filters.progressMax);
        if (!Number.isNaN(value) && project.progressPercent > value) {
          return false;
        }
      }

      return true;
    });
  }, [projects, searchTerm, filters]);

  const stats = useMemo(() => {
    const total = projects.length;
    const active = projects.filter((project) => project.status === 'Active').length;
    const disputed = projects.filter(
      (project) => project.status === 'Disputed',
    ).length;
    const escrowTotal = projects.reduce(
      (sum, project) => sum + project.escrow.total,
      0,
    );

    return {
      total,
      active,
      disputed,
      escrowTotal,
    };
  }, [projects]);

  const allSelected =
    filteredProjects.length > 0 &&
    filteredProjects.every((project) => selectedProjectIds.includes(project.id));

  const appliedFilterCount = useMemo(() => {
    let count = 0;
    if (filters.status !== 'All') count += 1;
    if (filters.freelancer !== 'All') count += 1;
    if (filters.client !== 'All') count += 1;
    if (filters.budgetMin || filters.budgetMax) count += 1;
    if (filters.escrowMin || filters.escrowMax) count += 1;
    if (filters.progressMin || filters.progressMax) count += 1;
    return count;
  }, [filters]);

  const handleToggleProjectSelect = (projectId) => {
    setSelectedProjectIds((previous) =>
      previous.includes(projectId)
        ? previous.filter((id) => id !== projectId)
        : [...previous, projectId],
    );
  };

  const handleToggleAll = () => {
    setSelectedProjectIds((previous) => {
      if (allSelected) {
        const visibleIds = new Set(filteredProjects.map((project) => project.id));
        return previous.filter((id) => !visibleIds.has(id));
      }

      const idsToAdd = filteredProjects
        .map((project) => project.id)
        .filter((id) => !previous.includes(id));

      return [...previous, ...idsToAdd];
    });
  };

  const handleClearSelection = () => {
    setSelectedProjectIds([]);
  };

  const openForProject = (project, setter) => {
    setActiveProject(project);
    setter(true);
  };

  const totalProjectsInView = filteredProjects.length;

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div ref={headerRef}>
            <h1 className="text-3xl font-bold text-slate-900">
              Freelance Projects
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Monitor freelance projects, escrow, milestones, and disputes across SkillPort.
            </p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-[11px] font-medium text-rose-700">
              <AlertTriangle className="h-3 w-3" />
              <span>{stats.disputed} disputed project(s)</span>
            </div>
            <button
              type="button"
              ref={exportButtonRef}
              onClick={() => setIsExportOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-slate-800"
            >
              <Download className="h-4 w-4" />
              <span>Export Projects</span>
            </button>
          </div>
        </header>

        <div
          ref={statsCardsRef}
          className="grid gap-4 md:grid-cols-4"
        >
          <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Total Projects
              </div>
              <div className="mt-1 text-xl font-semibold text-slate-900">
                {stats.total}
              </div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50">
              <Briefcase className="h-4 w-4 text-slate-500" />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
                Active Projects
              </div>
              <div className="mt-1 text-xl font-semibold text-emerald-900">
                {stats.active}
              </div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80">
              <User className="h-4 w-4 text-emerald-600" />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-sky-100 bg-sky-50/70 px-4 py-3">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-sky-700">
                Amount In Escrow
              </div>
              <div className="mt-1 text-xl font-semibold text-sky-900">
                ₹{stats.escrowTotal.toLocaleString()}
              </div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80">
              <Wallet className="h-4 w-4 text-sky-600" />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-rose-100 bg-rose-50/80 px-4 py-3">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-rose-800">
                Disputed Projects
              </div>
              <div className="mt-1 text-xl font-semibold text-rose-900">
                {stats.disputed}
              </div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80">
              <AlertTriangle className="h-4 w-4 text-rose-600" />
            </div>
          </div>
        </div>

        <div
          ref={filtersRowRef}
          className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search projects by name or client"
                className="h-10 w-full rounded-full border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsFilterOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <FilterIcon className="h-4 w-4 text-slate-500" />
              <span>Filters</span>
              <span className="ml-1 inline-flex h-5 min-w-[1.5rem] items-center justify-center rounded-full bg-slate-900 text-[11px] font-semibold text-white">
                {appliedFilterCount}
              </span>
            </button>
          </div>
        </div>

        <FreelanceTable
          projects={filteredProjects}
          totalCount={projects.length}
          selectedProjectIds={selectedProjectIds}
          allSelected={allSelected}
          onToggleAll={handleToggleAll}
          onToggleProjectSelect={handleToggleProjectSelect}
          onClearSelection={handleClearSelection}
          onViewDetails={(project) => openForProject(project, setIsDetailsOpen)}
          onViewMilestones={(project) =>
            openForProject(project, setIsMilestonesOpen)
          }
          onViewEscrow={(project) => openForProject(project, setIsEscrowOpen)}
          onResolveDispute={(project) =>
            openForProject(project, setIsDisputeOpen)
          }
          onPaymentOverride={(project) =>
            openForProject(project, setIsPaymentOverrideOpen)
          }
          onAddAdminNote={(project) =>
            openForProject(project, setIsAdminNoteOpen)
          }
          onViewTimeline={(project) =>
            openForProject(project, setIsTimelineOpen)
          }
          onViewChat={(project) => openForProject(project, setIsChatOpen)}
        />

        <FreelanceExportData
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          projects={filteredProjects}
          totalProjects={totalProjectsInView}
        />

        <FreelanceFilter
          isOpen={isFilterOpen}
          selectedFilters={filters}
          onChange={setFilters}
          onClose={() => setIsFilterOpen(false)}
        />

        <ProjectDetailsModal
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          project={activeProject}
        />
        <MilestonesModal
          isOpen={isMilestonesOpen}
          onClose={() => setIsMilestonesOpen(false)}
          project={activeProject}
        />
        <EscrowBreakdownModal
          isOpen={isEscrowOpen}
          onClose={() => setIsEscrowOpen(false)}
          project={activeProject}
        />
        <DisputeResolutionModal
          isOpen={isDisputeOpen}
          onClose={() => setIsDisputeOpen(false)}
          project={activeProject}
        />
        <PaymentOverrideModal
          isOpen={isPaymentOverrideOpen}
          onClose={() => setIsPaymentOverrideOpen(false)}
          project={activeProject}
        />
        <AdminNoteModal
          isOpen={isAdminNoteOpen}
          onClose={() => setIsAdminNoteOpen(false)}
          project={activeProject}
        />
        <ProjectActivityTimelineModal
          isOpen={isTimelineOpen}
          onClose={() => setIsTimelineOpen(false)}
          project={activeProject}
        />
        <ProjectChatModal
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          project={activeProject}
        />
      </div>
    </div>
  );
};

export default Freelancer;
