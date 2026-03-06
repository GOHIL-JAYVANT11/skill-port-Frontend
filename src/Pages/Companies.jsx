import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Plus,
  Search,
  Filter as FilterIcon,
  Building2,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import CompaniesTable from '../Components/Companies/CompaniesTable';
import CompaniesFilter from '../Components/Companies/CompaniesFilter';
import CompaniesExportData from '../Components/Companies/CompaniesExportData';
import {
  CompanyDetailsModal,
  AddCompanyModal,
  VerifyCompanyModal,
  RejectVerificationModal,
  AccountStatusModal,
  AdminNoteModal,
  PaymentsModal,
  DisputesModal,
  ActivityTimelineModal,
} from '../Components/Companies/CompaniesModals';
import {
  useHeaderExportButtonAnimation,
  useUserStatsCardsAnimation,
  useUserFiltersAnimation,
} from '../lib/BTNGsapanimation';
import { toast } from 'sonner';

let __recruitersCache = null;
let __recruitersPromise = null;
const loadRecruitersOnce = async (url, headers) => {
  if (__recruitersCache) return __recruitersCache;
  if (__recruitersPromise) return __recruitersPromise;
  __recruitersPromise = fetch(url, { method: 'GET', headers })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((json) => {
      const arr = Array.isArray(json?.data) ? json.data : [];
      __recruitersCache = arr;
      return __recruitersCache;
    })
    .finally(() => {
      __recruitersPromise = null;
    });
  return __recruitersPromise;
};

const Companies = () => {
  const headerRef = useRef(null);
  const exportButtonRef = useRef(null);
  const statsCardsRef = useRef(null);
  const filtersRowRef = useRef(null);

  useHeaderExportButtonAnimation(headerRef, exportButtonRef);
  useUserStatsCardsAnimation(statsCardsRef);
  useUserFiltersAnimation(filtersRowRef);

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    industry: 'All Industries',
    verificationStatus: 'All',
    accountStatus: 'All',
    commissionMin: '',
    commissionMax: '',
    joinedFrom: '',
    joinedTo: '',
    disputeMin: '',
    disputeMax: '',
    onlyHighRisk: false,
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isAddCompanyOpen, setIsAddCompanyOpen] = useState(false);

  const [selectedCompanyIds, setSelectedCompanyIds] = useState([]);
  const [addedCompanies, setAddedCompanies] = useState([]);
  const [activeCompany, setActiveCompany] = useState(null);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [accountStatusMode, setAccountStatusMode] = useState(null);
  const [isAccountStatusOpen, setIsAccountStatusOpen] = useState(false);
  const [isAdminNoteOpen, setIsAdminNoteOpen] = useState(false);
  const [isPaymentsOpen, setIsPaymentsOpen] = useState(false);
  const [isDisputesOpen, setIsDisputesOpen] = useState(false);
  const [isActivityOpen, setIsActivityOpen] = useState(false);

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getCookie = (name) => {
    try {
      return document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${name}=`))
        ?.split('=')[1];
    } catch {
      return '';
    }
  };

  const formatDate = (iso) => {
    if (!iso) return '';
    try {
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      });
    } catch {
      return iso;
    }
  };

  const mapRecruiterToCompany = (r) => {
    const cp = r?.companyProfile || {};
    const website =
      cp?.companyWebsite ||
      (cp?.socialLinks && cp.socialLinks.website) ||
      '';
    return {
      id: r?._id || r?.recId || '',
      name: cp?.companyName || r?.Fullname || 'Unknown',
      logoUrl: cp?.companyLogo || '',
      primaryRecruiter: r?.Fullname || '',
      primaryRole: cp?.designation || 'Recruiter',
      email: r?.email || '',
      phone: r?.number || '',
      industry: cp?.industry || 'General',
      location: cp?.companyLocation || '',
      verificationStatus: r?.isVerified ? 'Verified' : 'Pending',
      accountStatus: 'Active',
      isVerified: !!r?.isVerified,
      joinedDate: formatDate(r?.createdAt),
      website,
      description: cp?.companyDescription || '',
      verificationReviewedAt: formatDate(r?.updatedAt),
      riskTag: '',
      stats: {
        totalJobs: 0,
        totalProjects: 0,
        openJobs: 0,
        closedJobs: 0,
        activeProjects: 0,
        completedProjects: 0,
        activeHires: 0,
      },
      financials: {
        totalCommission: 0,
        totalPaid: 0,
        pendingCommission: 0,
        escrowIn: 0,
        escrowOut: 0,
        activeEscrows: 0,
        disputedEscrows: 0,
        payoutTime: '',
        lastPayout: '',
      },
      risk: {
        reports: 0,
        disputes: 0,
        warnings: 0,
        lastIncident: '',
        level: 'Low',
      },
      jobsPosted: [],
      projectsPosted: [],
      verificationDocuments: [],
      adminNotes: [],
      paymentsHistory: [],
      disputesHistory: [],
      activityTimeline: [],
    };
  };

  useEffect(() => {
    let alive = true;
    const run = async () => {
      try {
        setLoading(true);
        setError('');
        const base =
          import.meta.env.VITE_API_URL ||
          (typeof window !== 'undefined' ? window.API_BASE_URL : '') ||
          (typeof window !== 'undefined' ? window.location.origin : '');
        const url = `${base}/gknbvg/SkillPort-admin/ertqyuiok/get-all-recruiters`;
        const token =
          getCookie('AdminToken') ||
          import.meta.env.VITE_ADMIN_TOKEN ||
          (typeof window !== 'undefined' && window.ADMIN_TOKEN) ||
          (typeof window !== 'undefined' &&
            window.localStorage &&
            window.localStorage.getItem('admin_token')) ||
          '';
        const headers = {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };
        const arr = await loadRecruitersOnce(url, headers);
        if (!alive) return;
        const mapped = arr.map(mapRecruiterToCompany);
        setCompanies(mapped);
      } catch (err) {
        if (!alive) return;
        setError('Failed to load companies');
        setCompanies([]);
        toast.error('Failed to load companies');
      } finally {
        if (alive) setLoading(false);
      }
    };
    run();
    return () => {
      alive = false;
    };
  }, []);
 
  const allCompanies = useMemo(
    () => [...addedCompanies, ...companies],
    [addedCompanies, companies],
  );

  const filteredCompanies = useMemo(() => {
    return allCompanies.filter((company) => {
      const term = searchTerm.trim().toLowerCase();
      if (term) {
        const matchesSearch =
          company.name.toLowerCase().includes(term) ||
          company.email.toLowerCase().includes(term);
        if (!matchesSearch) {
          return false;
        }
      }

      if (
        filters.industry !== 'All Industries' &&
        company.industry !== filters.industry
      ) {
        return false;
      }

      if (
        filters.verificationStatus !== 'All' &&
        company.verificationStatus !== filters.verificationStatus
      ) {
        return false;
      }

      if (
        filters.accountStatus !== 'All' &&
        company.accountStatus !== filters.accountStatus
      ) {
        return false;
      }

      if (filters.onlyHighRisk && company.risk.level !== 'High') {
        return false;
      }

      return true;
    });
  }, [allCompanies, searchTerm, filters]);

  const stats = useMemo(() => {
    const total = allCompanies.length;
    const verified = allCompanies.filter(
      (c) => c.verificationStatus === 'Verified',
    ).length;
    const pending = allCompanies.filter(
      (c) => c.verificationStatus === 'Pending',
    ).length;
    const suspendedOrBlacklisted = allCompanies.filter(
      (c) => c.accountStatus === 'Suspended' || c.accountStatus === 'Blacklisted',
    ).length;

    return {
      total,
      verified,
      pending,
      suspendedOrBlacklisted,
    };
  }, [allCompanies]);

  const handleToggleSelectCompany = (companyId) => {
    setSelectedCompanyIds((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId],
    );
  };

  const handleToggleSelectAll = () => {
    setSelectedCompanyIds((prev) =>
      prev.length === filteredCompanies.length
        ? []
        : filteredCompanies.map((c) => c.id),
    );
  };

  const handleAddCompanySave = (newCompany, options) => {
    setAddedCompanies((prev) => [newCompany, ...prev]);
    const verified = options && options.verified;
    toast.success(
      verified
        ? 'Company added and verified successfully'
        : 'Company added successfully. Verification pending.',
    );
  };

  const openForCompany = (company, setter) => {
    setActiveCompany(company);
    setter(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div ref={headerRef}>
          <h1 className="text-xl font-semibold text-slate-900">
            Company Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage, verify and monitor all companies and recruiters on SkillPort.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            onClick={() => setIsExportOpen(true)}
            ref={exportButtonRef}
          >
            <ShieldCheck className="h-4 w-4 text-sky-600" />
            Export Companies
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-700"
            onClick={() => setIsAddCompanyOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Add Company
          </button>
        </div>
      </div>

      <div
        ref={statsCardsRef}
        className="grid gap-3 md:grid-cols-4"
      >
        <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Total Companies
              </div>
              <div className="mt-1 text-xl font-semibold text-slate-900">
                {stats.total}
              </div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50">
              <Building2 className="h-4 w-4 text-slate-500" />
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
                Verified Companies
              </div>
              <div className="mt-1 text-xl font-semibold text-emerald-800">
                {stats.verified}
              </div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-amber-100 bg-amber-50/70 px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-amber-800">
                Pending Verification
              </div>
              <div className="mt-1 text-xl font-semibold text-amber-900">
                {stats.pending}
              </div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-rose-100 bg-rose-50/70 px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-rose-800">
                Suspended / Blacklisted
              </div>
              <div className="mt-1 text-xl font-semibold text-rose-900">
                {stats.suspendedOrBlacklisted}
              </div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80">
              <AlertTriangle className="h-4 w-4 text-rose-600" />
            </div>
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
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search companies by name or email"
              className="h-9 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            onClick={() => setIsFilterOpen(true)}
          >
            <FilterIcon className="h-4 w-4 text-slate-500" />
            Filters
          </button>
        </div>
      </div>

      {loading && (
        <div className="rounded-2xl border border-slate-100 bg-white p-4 text-xs text-slate-600">
          Loading companies…
        </div>
      )}
      {!!error && !loading && (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-xs text-rose-700">
          {error}
        </div>
      )}

      <CompaniesTable
        companies={filteredCompanies}
        selectedCompanyIds={selectedCompanyIds}
        onToggleSelectCompany={handleToggleSelectCompany}
        onToggleSelectAll={handleToggleSelectAll}
        onOpenDetails={(company) => openForCompany(company, setIsDetailsOpen)}
        onVerify={(company) => openForCompany(company, setIsVerifyOpen)}
        onRejectVerification={(company) =>
          openForCompany(company, setIsRejectOpen)
        }
        onSuspend={(company) => {
          setAccountStatusMode('suspend');
          openForCompany(company, setIsAccountStatusOpen);
        }}
        onBlacklist={(company) => {
          setAccountStatusMode('blacklist');
          openForCompany(company, setIsAccountStatusOpen);
        }}
        onReactivate={(company) => {
          setAccountStatusMode('reactivate');
          openForCompany(company, setIsAccountStatusOpen);
        }}
        onViewJobs={(company) =>
          openForCompany(company, setIsDetailsOpen)
        }
        onViewProjects={(company) =>
          openForCompany(company, setIsDetailsOpen)
        }
        onViewPayments={(company) =>
          openForCompany(company, setIsPaymentsOpen)
        }
        onViewDisputes={(company) =>
          openForCompany(company, setIsDisputesOpen)
        }
        onAddAdminNote={(company) =>
          openForCompany(company, setIsAdminNoteOpen)
        }
        onViewTimeline={(company) =>
          openForCompany(company, setIsActivityOpen)
        }
      />

      {isFilterOpen && (
        <CompaniesFilter
          selectedFilters={filters}
          onChange={setFilters}
          onClose={() => setIsFilterOpen(false)}
          onApply={() => setIsFilterOpen(false)}
        />
      )}

      <CompaniesExportData
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        companies={allCompanies}
        filteredCompanies={filteredCompanies}
      />

      <AddCompanyModal
        isOpen={isAddCompanyOpen}
        onClose={() => setIsAddCompanyOpen(false)}
        onSave={handleAddCompanySave}
      />

      <CompanyDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        company={activeCompany}
      />
      <VerifyCompanyModal
        isOpen={isVerifyOpen}
        onClose={() => setIsVerifyOpen(false)}
        company={activeCompany}
      />
      <RejectVerificationModal
        isOpen={isRejectOpen}
        onClose={() => setIsRejectOpen(false)}
        company={activeCompany}
      />
      <AccountStatusModal
        isOpen={isAccountStatusOpen}
        onClose={() => setIsAccountStatusOpen(false)}
        company={activeCompany}
        mode={accountStatusMode}
      />
      <AdminNoteModal
        isOpen={isAdminNoteOpen}
        onClose={() => setIsAdminNoteOpen(false)}
        company={activeCompany}
      />
      <PaymentsModal
        isOpen={isPaymentsOpen}
        onClose={() => setIsPaymentsOpen(false)}
        company={activeCompany}
        items={activeCompany?.paymentsHistory || []}
      />
      <DisputesModal
        isOpen={isDisputesOpen}
        onClose={() => setIsDisputesOpen(false)}
        company={activeCompany}
        items={activeCompany?.disputesHistory || []}
      />
      <ActivityTimelineModal
        isOpen={isActivityOpen}
        onClose={() => setIsActivityOpen(false)}
        company={activeCompany}
        items={activeCompany?.activityTimeline || []}
      />
    </div>
  );
};

export default Companies;
