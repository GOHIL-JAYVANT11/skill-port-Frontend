import React, { useState, useRef, useEffect } from 'react';
import { Download, Users, Briefcase, UserCheck, Code2, Search, Filter } from 'lucide-react';
import ExportData from '../Components/User/ExportData';
import UserFilter from '../Components/User/UserFilter';
import UserTable from '../Components/User/UserTable';
import UserProfile, { UserActivityLogModal } from '../Components/User/UserProfile';
import {
  RevokeVerificationModal,
  BlockUserModal,
  SoftDeleteUserModal,
  UserVerificationModal,
} from '../Components/User/OthersActivity';
import useHeaderExportButtonAnimation, { useUserStatsCardsAnimation, useUserFiltersAnimation } from '../lib/BTNGsapanimation';

export const User = () => {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    roles: [],
    verificationStatus: [],
    accountStatus: [],
    skills: [],
  });
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [selectedProfileUser, setSelectedProfileUser] = useState(null);
  const [activityLogUser, setActivityLogUser] = useState(null);
  const [revokeUser, setRevokeUser] = useState(null);
  const [blockUser, setBlockUser] = useState(null);
  const [softDeleteUser, setSoftDeleteUser] = useState(null);
  const [verificationUser, setVerificationUser] = useState(null);
  const headerRef = useRef(null);
  const exportButtonRef = useRef(null);
  const statsCardsRef = useRef(null);
  const filtersRef = useRef(null);

  useHeaderExportButtonAnimation(headerRef, exportButtonRef);
  useUserStatsCardsAnimation(statsCardsRef);
  useUserFiltersAnimation(filtersRef);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const mapApiUser = (u) => {
    const rolePrimary = Array.isArray(u?.Role) && u.Role.length ? u.Role[0] : 'Job Seeker';
    const roleSecondary = Array.isArray(u?.Role) && u.Role.length > 1 ? u.Role[1] : undefined;
    return {
      id: u?._id || '',
      name: u?.Fullname || 'Unknown',
      email: u?.email || '',
      phone: u?.number || '',
      location: u?.location || '',
      roles: rolePrimary,
      secondaryRole: roleSecondary,
      accountStatus: 'Active',
      verificationStatus: u?.isGoogleUser ? 'Verified' : 'Pending',
      joinedDate: u?.createdAt || '',
      lastActive: u?.updatedAt || '',
      skills: Array.isArray(u?.skill) ? u.skill : [],
      reportsCount: 0,
      warningsCount: 0,
    };
  };

  const mapApiRecruiter = (r) => ({
    id: r?._id || '',
    name: r?.Fullname || 'Unknown',
    email: r?.email || '',
    phone: r?.number || '',
    location: '',
    roles: 'Recruiter',
    secondaryRole: undefined,
    accountStatus: 'Active',
    verificationStatus: r?.isVerified ? 'Verified' : 'Pending',
    joinedDate: r?.createdAt || '',
    lastActive: r?.updatedAt || '',
    skills: [],
    reportsCount: 0,
    warningsCount: 0,
  });

  useEffect(() => {
    const controller = new AbortController();
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
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const base = import.meta.env.VITE_API_URL || '';
        const url = `${base}/gknbvg/SkillPort-admin/ertqyuiok/get-all-users`;
        const token =
          getCookie('AdminToken') ||
          import.meta.env.VITE_ADMIN_TOKEN ||
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
        const userArr = Array.isArray(json?.data?.users) ? json.data.users : [];
        const recArr = Array.isArray(json?.data?.recruiters) ? json.data.recruiters : [];
        const mapped = [...userArr.map(mapApiUser), ...recArr.map(mapApiRecruiter)];
        setUsers(mapped);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Failed to load users');
          setUsers([]);
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



  const totalUsers = users.length;
  const jobSeekersCount = users.filter((user) => user.roles === 'Job Seeker').length;
  const recruitersCount = users.filter((user) => user.roles === 'Recruiter').length;
  const freelancersCount = users.filter((user) => user.roles === 'Freelancer').length;

  const totalActiveFilters =
    selectedFilters.roles.length +
    selectedFilters.verificationStatus.length +
    selectedFilters.accountStatus.length +
    selectedFilters.skills.length;

  const filteredUsers = users.filter((user) => {
    if (activeFilter === 'job_seekers' && user.roles !== 'Job Seeker') {
      return false;
    }
    if (activeFilter === 'recruiters' && user.roles !== 'Recruiter') {
      return false;
    }
    if (activeFilter === 'freelancers' && user.roles !== 'Freelancer') {
      return false;
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query);
      if (!matchesSearch) {
        return false;
      }
    }

    if (selectedFilters.roles.length > 0 && !selectedFilters.roles.includes(user.roles)) {
      return false;
    }

    if (
      selectedFilters.verificationStatus.length > 0 &&
      !selectedFilters.verificationStatus.includes(user.verificationStatus)
    ) {
      return false;
    }

    if (
      selectedFilters.accountStatus.length > 0 &&
      !selectedFilters.accountStatus.includes(user.accountStatus)
    ) {
      return false;
    }

    if (selectedFilters.skills.length > 0) {
      const hasSkill = user.skills.some((skill) =>
        selectedFilters.skills.includes(skill),
      );
      if (!hasSkill) {
        return false;
      }
    }

    return true;
  });

  const allVisibleSelected =
    filteredUsers.length > 0 &&
    filteredUsers.every((user) => selectedUserIds.includes(user.id));

  const handleToggleUserSelect = (userId) => {
    setSelectedUserIds((previous) =>
      previous.includes(userId)
        ? previous.filter((id) => id !== userId)
        : [...previous, userId],
    );
  };

  const handleToggleAllVisible = () => {
    setSelectedUserIds((previous) => {
      if (allVisibleSelected) {
        const visibleIds = new Set(filteredUsers.map((user) => user.id));
        return previous.filter((id) => !visibleIds.has(id));
      }

      const idsToAdd = filteredUsers
        .map((user) => user.id)
        .filter((id) => !previous.includes(id));

      return [...previous, ...idsToAdd];
    });
  };

  const handleClearSelection = () => {
    setSelectedUserIds([]);
  };

  return (
    <div className="min-h-screen  ">
      <div className="max-w-7xl mx-auto">
        <header ref={headerRef} className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl mt-[-13px] font-bold text-slate-800">User Management</h1>
            <p className="mt-1 text-lg text-slate-500">
              Manage all users, recruiters, and freelancers on the platform.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsExportOpen(true)}
            ref={exportButtonRef}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-amber-500/30 hover:from-amber-600 hover:to-orange-600"
          >
            <Download className="w-4 h-4" />
            <span>Export Users</span>
          </button>
        </header>
        {loading && <div className="mt-4 text-sm text-slate-500">Loading users...</div>}
        {error && <div className="mt-4 text-sm text-rose-600">{error}</div>}

        <div className="mt-8">
          <div
            ref={statsCardsRef}
            className="grid grid-cols-1 gap-4 md:grid-cols-4"
          >
            <div className="flex items-center gap-4 rounded-2xl bg-white px-5 py-4 shadow-sm border border-slate-100">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-semibold text-slate-900">
                  {totalUsers}
                </div>
                <div className="text-xs font-medium text-slate-500">
                  Total Users
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-white px-5 py-4 shadow-sm border border-slate-100">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-semibold text-slate-900">
                  {jobSeekersCount}
                </div>
                <div className="text-xs font-medium text-slate-500">
                  Job Seekers
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-white px-5 py-4 shadow-sm border border-slate-100">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-semibold text-slate-900">
                  {recruitersCount}
                </div>
                <div className="text-xs font-medium text-slate-500">
                  Recruiters
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-white px-5 py-4 shadow-sm border border-slate-100">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-semibold text-slate-900">
                  {freelancersCount}
                </div>
                <div className="text-xs font-medium text-slate-500">
                  Freelancers
                </div>
              </div>
            </div>
          </div>

          <div
            ref={filtersRef}
            className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
          >
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium border transition-colors ${
                  activeFilter === 'all'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>All Users</span>
                <span
                  className={`ml-1 inline-flex h-5 min-w-[1.5rem] items-center justify-center rounded-full text-[11px] ${
                    activeFilter === 'all'
                      ? 'bg-white/10 border border-white/20'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {totalUsers}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('job_seekers')}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium border transition-colors ${
                  activeFilter === 'job_seekers'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Job Seekers</span>
                <span
                  className={`ml-1 inline-flex h-5 min-w-[1.5rem] items-center justify-center rounded-full text-[11px] ${
                    activeFilter === 'job_seekers'
                      ? 'bg-white/10 border border-white/20'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {jobSeekersCount}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('recruiters')}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium border transition-colors ${
                  activeFilter === 'recruiters'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>Recruiters</span>
                <span
                  className={`ml-1 inline-flex h-5 min-w-[1.5rem] items-center justify-center rounded-full text-[11px] ${
                    activeFilter === 'recruiters'
                      ? 'bg-white/10 border border-white/20'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {recruitersCount}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('freelancers')}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium border transition-colors ${
                  activeFilter === 'freelancers'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span>Freelancers</span>
                <span
                  className={`ml-1 inline-flex h-5 min-w-[1.5rem] items-center justify-center rounded-full text-[11px] ${
                    activeFilter === 'freelancers'
                      ? 'bg-white/10 border border-white/20'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {freelancersCount}
                </span>
              </button>
            </div>

            <div className="flex w-full items-center justify-between gap-3 md:w-80 md:justify-end">
              <button
                type="button"
                onClick={() => setIsAdvancedFilterOpen((prev) => !prev)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                  isAdvancedFilterOpen
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                <span className="ml-1 inline-flex h-5 min-w-[1.5rem] items-center justify-center rounded-full bg-slate-900 text-[11px] font-semibold text-white">
                  {totalActiveFilters}
                </span>
              </button>

              <div className="w-full md:w-auto md:flex-1">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or email..."
                  className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/60"
                />
              </div>
            </div>
          </div>
          </div>

          {isAdvancedFilterOpen && (
            <UserFilter
              selectedFilters={selectedFilters}
              onChange={setSelectedFilters}
            />
          )}

        <UserTable
          users={filteredUsers}
          totalCount={users.length}
          selectedUserIds={selectedUserIds}
          allSelected={allVisibleSelected}
          onToggleAll={handleToggleAllVisible}
          onToggleUserSelect={handleToggleUserSelect}
          onClearSelection={handleClearSelection}
          onOpenProfile={setSelectedProfileUser}
          onOpenActivityLog={setActivityLogUser}
          onOpenRevokeVerification={setRevokeUser}
          onOpenBlockUser={setBlockUser}
          onOpenSoftDeleteUser={setSoftDeleteUser}
          onOpenUserVerification={setVerificationUser}
        />
        </div>

        <ExportData
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          users={users}
        />
        <UserProfile
          isOpen={Boolean(selectedProfileUser)}
          onClose={() => setSelectedProfileUser(null)}
          user={selectedProfileUser}
          onOpenActivityLog={(user) => {
            setActivityLogUser(user);
            setSelectedProfileUser(null);
          }}
        />
        <UserActivityLogModal
          isOpen={Boolean(activityLogUser)}
          onClose={() => setActivityLogUser(null)}
          user={activityLogUser}
        />
        <RevokeVerificationModal
          isOpen={Boolean(revokeUser)}
          onClose={() => setRevokeUser(null)}
          user={revokeUser}
        />
        <BlockUserModal
          isOpen={Boolean(blockUser)}
          onClose={() => setBlockUser(null)}
          user={blockUser}
        />
        <SoftDeleteUserModal
          isOpen={Boolean(softDeleteUser)}
          onClose={() => setSoftDeleteUser(null)}
          user={softDeleteUser}
        />
        <UserVerificationModal
          isOpen={Boolean(verificationUser)}
          onClose={() => setVerificationUser(null)}
          user={verificationUser}
        />
      </div>
    </div>
  );
};

export default User;
