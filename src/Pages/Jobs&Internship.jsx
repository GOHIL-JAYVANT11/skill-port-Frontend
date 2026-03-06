import React, { useState, useRef, useEffect } from 'react';
import {
  Download,
  Briefcase,
  UserCheck,
  Users,
  Search,
  Filter,
} from 'lucide-react';
import JobsTable from '../Components/Jobs&Internship/JobsTable';
import JobsFilter from '../Components/Jobs&Internship/JobsFilter';
import JobsExportData from '../Components/Jobs&Internship/JobsExportData';
import {
  JobDetailsModal,
  ApproveJobModal,
  RejectJobModal,
  RequestChangesModal,
  BlockJobModal,
  AdminNoteModal,
  ApplicantsModal,
  JobReportsModal,  
} from '../Components/Jobs&Internship/JobModals';
import useHeaderExportButtonAnimation, {
  useUserStatsCardsAnimation,
  useUserFiltersAnimation,
} from '../lib/BTNGsapanimation';

export const JobsAndInternship = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    jobType: 'All Job Types',
    status: 'All Status',
    locationType: 'All Locations',
    location: '',
    experienceLevel: 'All Levels',
    salaryMin: '',
    salaryMax: '',
    postedFrom: '',
    postedTo: '',
    showFlaggedOnly: false,
    skills: [],
  });
  const [selectedJobIds, setSelectedJobIds] = useState([]);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const [detailsJob, setDetailsJob] = useState(null);
  const [approveJob, setApproveJob] = useState(null);
  const [rejectJob, setRejectJob] = useState(null);
  const [requestChangesJob, setRequestChangesJob] = useState(null);
  const [blockJob, setBlockJob] = useState(null);
  const [adminNoteJob, setAdminNoteJob] = useState(null);
  const [applicantsJob, setApplicantsJob] = useState(null);
  const [reportsJob, setReportsJob] = useState(null);

  const headerRef = useRef(null);
  const exportButtonRef = useRef(null);
  const statsCardsRef = useRef(null);
  const filtersRef = useRef(null);

  useHeaderExportButtonAnimation(headerRef, exportButtonRef);
  useUserStatsCardsAnimation(statsCardsRef);
  useUserFiltersAnimation(filtersRef);

  const formatBudget = (salary, salaryType) => {
    if (!salary || (salary.minSalary == null && salary.maxSalary == null)) {
      return salaryType || 'Not specified';
    }
    const min = salary.minSalary != null ? salary.minSalary : null;
    const max = salary.maxSalary != null ? salary.maxSalary : null;
    const fmt = (v) => Number(v).toLocaleString('en-IN');
    if (min != null && max != null) {
      return `₹${fmt(min)} - ₹${fmt(max)}${salaryType ? ` / ${salaryType}` : ''}`;
    }
    if (min != null) {
      return `₹${fmt(min)}${salaryType ? ` / ${salaryType}` : ''}`;
    }
    return `₹${fmt(max)}${salaryType ? ` / ${salaryType}` : ''}`;
  };

  const mapApiJob = (item) => {
    const recruiter = item?.recId || {};
    const locationParts = [item?.City, item?.State, item?.Country].filter(Boolean);
    return {
      id: item?._id || '',
      title: item?.jobtitle || 'Untitled',
      company: recruiter?.Fullname || 'Unknown',
      location: locationParts.join(', ') || 'Not specified',
      type: item?.EmploymentType || 'Full-Time',
      status: 'Pending',
      locationType: item?.WorkMode || 'On-site',
      applicantsCount: 0,
      postedDate: item?.createdAt || item?.updatedAt || '',
      budget:
        item?.SalaryType === 'Negotiable'
          ? 'Negotiable'
          : formatBudget(item?.Salary, item?.SalaryType),
      experienceLevel: item?.Experience || '',
      recruiter: recruiter?.Fullname || '',
      recruiterEmail: recruiter?.email || '',
      skills: Array.isArray(item?.MandatorySkills) ? item.MandatorySkills : [],
      reportCount: 0,
      isFlagged: false,
      description: item?.JobDescription || '',
      applicants: [],
    };
  };

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const base = import.meta.env.VITE_API_URL || '';
        const url = `${base}/gknbvg/SkillPort-admin/ertqyuiok/get-all-job-posts`;
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
        const token =
          import.meta.env.VITE_ADMIN_TOKEN ||
          (getCookie && getCookie('AdminToken')) ||
          (typeof window !== 'undefined' && window.ADMIN_TOKEN) ||
          (typeof window !== 'undefined' &&
            window.localStorage &&
            window.localStorage.getItem('admin_token')) ||
          '';
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const json = await res.json();
        const items = Array.isArray(json?.data) ? json.data : [];
        const mapped = items.map(mapApiJob);
        setJobs(mapped);
        setTotalCount(mapped.length);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Failed to load jobs');
          setJobs([]);
          setTotalCount(0);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };
    
    const timer = setTimeout(() => {
        load();
    }, 300);

    return () => {
        clearTimeout(timer);
        controller.abort();
    };
  }, []);

  const filteredJobs = jobs.filter((job) => {
    if (activeTab === 'pending' && job.status !== 'Pending') {
      return false;
    }
    if (activeTab === 'approved' && job.status !== 'Approved') {
      return false;
    }
    if (activeTab === 'internships' && job.type !== 'Internship') {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (
        !job.title.toLowerCase().includes(q) &&
        !job.company.toLowerCase().includes(q)
      ) {
        return false;
      }
    }
    if (
      selectedFilters.jobType &&
      selectedFilters.jobType !== 'All Job Types' &&
      job.type !== selectedFilters.jobType
    ) {
      return false;
    }
    if (
      selectedFilters.status &&
      selectedFilters.status !== 'All Status' &&
      job.status !== selectedFilters.status
    ) {
      return false;
    }
    if (
      selectedFilters.locationType &&
      selectedFilters.locationType !== 'All Locations' &&
      job.locationType !== selectedFilters.locationType
    ) {
      return false;
    }
    if (selectedFilters.location && selectedFilters.location.trim()) {
      const loc = selectedFilters.location.toLowerCase();
      if (!job.location.toLowerCase().includes(loc)) {
        return false;
      }
    }
    if (
      selectedFilters.experienceLevel &&
      selectedFilters.experienceLevel !== 'All Levels' &&
      job.experienceLevel !== selectedFilters.experienceLevel
    ) {
      return false;
    }
    if (
      selectedFilters.skills.length &&
      !selectedFilters.skills.some((skill) => job.skills?.includes(skill))
    ) {
      return false;
    }
    if (selectedFilters.showFlaggedOnly && !job.isFlagged) {
      return false;
    }
    if (selectedFilters.postedFrom) {
      const from = new Date(selectedFilters.postedFrom);
      const posted = new Date(job.postedDate);
      if (posted < from) {
        return false;
      }
    }
    if (selectedFilters.postedTo) {
      const to = new Date(selectedFilters.postedTo);
      const posted = new Date(job.postedDate);
      if (posted > to) {
        return false;
      }
    }
    return true;
  });

  const allVisibleSelected =
    filteredJobs.length > 0 &&
    filteredJobs.every((job) => selectedJobIds.includes(job.id));

  const handleToggleAllVisible = () => {
    if (allVisibleSelected) {
      const remaining = selectedJobIds.filter(
        (id) => !filteredJobs.some((job) => job.id === id),
      );
      setSelectedJobIds(remaining);
    } else {
      const visibleIds = filteredJobs.map((job) => job.id);
      const merged = Array.from(new Set([...selectedJobIds, ...visibleIds]));
      setSelectedJobIds(merged);
    }
  };

  const handleToggleJobSelect = (jobId) => {
    setSelectedJobIds((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId],
    );
  };

  const handleClearSelection = () => {
    setSelectedJobIds([]);
  };

  const pendingCount = jobs.filter((job) => job.status === 'Pending').length;
  const approvedCount = jobs.filter((job) => job.status === 'Approved').length;
  const internshipsCount = jobs.filter((job) => job.type === 'Internship').length;
  const totalApplicants = jobs.reduce(
    (sum, job) => sum + (job.applicantsCount || 0),
    0,
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div ref={headerRef} className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
              <Briefcase className="h-3.5 w-3.5" />
              <span>Jobs & Internships</span>
            </div>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900">
              Jobs & Internships
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Review, approve, and manage all job postings on the platform.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[11px] text-white">
                {pendingCount}
              </span>
              <span>Pending review</span>
            </div>
            <button
              type="button"
              ref={exportButtonRef}
              onClick={() => setIsExportOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
            >
              <Download className="h-4 w-4" />
              <span>Export Jobs</span>
            </button>
          </div>
        </div>

        <div
          ref={statsCardsRef}
          className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Total Jobs
                </div>
                <div className="mt-2 text-2xl font-semibold text-slate-900">
                  {jobs.length}
                </div>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white">
                <Briefcase className="h-4 w-4" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Approved Jobs
                </div>
                <div className="mt-2 text-2xl font-semibold text-emerald-600">
                  {approvedCount}
                </div>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <UserCheck className="h-4 w-4" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Pending Jobs
                </div>
                <div className="mt-2 text-2xl font-semibold text-amber-600">
                  {pendingCount}
                </div>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                <Briefcase className="h-4 w-4" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Total Applicants
                </div>
                <div className="mt-2 text-2xl font-semibold text-slate-900">
                  {totalApplicants}
                </div>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white">
                <Users className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-2 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-2 pb-1">
            <div className="flex flex-wrap items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                  activeTab === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                All Jobs
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('pending')}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                  activeTab === 'pending'
                    ? 'bg-amber-100 text-amber-800'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Pending
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('approved')}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                  activeTab === 'approved'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Approved
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('internships')}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                  activeTab === 'internships'
                    ? 'bg-sky-100 text-sky-800'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Internships
                <span className="ml-1 rounded-full bg-sky-50 px-1.5 py-0.5 text-[10px] font-semibold text-sky-700">
                  {internshipsCount}
                </span>
              </button>
            </div>
          </div>

          <div
            ref={filtersRef}
            className="flex flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between"
          >
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jobs..."
                className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/60"
              />
            </div>
            <div className="flex items-center justify-between gap-3 md:w-auto">
              <button
                type="button"
                onClick={() => setIsAdvancedFilterOpen((open) => !open)}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold ${
                  isAdvancedFilterOpen
                    ? 'border-amber-500 bg-amber-50 text-amber-700'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-amber-300'
                }`}
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>

        {isAdvancedFilterOpen && (
          <JobsFilter
            selectedFilters={selectedFilters}
            onChange={setSelectedFilters}
            onClose={() => setIsAdvancedFilterOpen(false)}
            onApply={() => setIsAdvancedFilterOpen(false)}
          />
        )}

        <JobsTable
          jobs={filteredJobs}
          totalCount={totalCount}
          selectedJobIds={selectedJobIds}
          allSelected={allVisibleSelected}
          onToggleAll={handleToggleAllVisible}
          onToggleJobSelect={handleToggleJobSelect}
          onClearSelection={handleClearSelection}
          onOpenJobDetails={setDetailsJob}
          onOpenApplicants={setApplicantsJob}
          onOpenJobReports={setReportsJob}
          onApproveJob={setApproveJob}
          onRejectJob={setRejectJob}
          onRequestChanges={setRequestChangesJob}
          onBlockJob={setBlockJob}
          onAddAdminNote={setAdminNoteJob}
        />

        <JobsExportData
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          jobs={jobs}
        />

        <JobDetailsModal
          isOpen={Boolean(detailsJob)}
          onClose={() => setDetailsJob(null)}
          job={detailsJob}
        />
        <ApproveJobModal
          isOpen={Boolean(approveJob)}
          onClose={() => setApproveJob(null)}
          job={approveJob}
        />
        <RejectJobModal
          isOpen={Boolean(rejectJob)}
          onClose={() => setRejectJob(null)}
          job={rejectJob}
        />
        <RequestChangesModal
          isOpen={Boolean(requestChangesJob)}
          onClose={() => setRequestChangesJob(null)}
          job={requestChangesJob}
        />
        <BlockJobModal
          isOpen={Boolean(blockJob)}
          onClose={() => setBlockJob(null)}
          job={blockJob}
        />
        <AdminNoteModal
          isOpen={Boolean(adminNoteJob)}
          onClose={() => setAdminNoteJob(null)}
          job={adminNoteJob}
        />
        <ApplicantsModal
          isOpen={Boolean(applicantsJob)}
          onClose={() => setApplicantsJob(null)}
          job={applicantsJob}
        />
        <JobReportsModal
          isOpen={Boolean(reportsJob)}
          onClose={() => setReportsJob(null)}
          job={reportsJob}
        />
      </div>
    </div>
  );
};

export default JobsAndInternship;