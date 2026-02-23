import React, { useState } from 'react';
import { X, Check, ChevronDown, Search } from 'lucide-react';

const ROLE_OPTIONS = ['Job Seeker', 'Recruiter', 'Freelancer'];

const VERIFICATION_OPTIONS = ['Verified', 'Pending', 'Rejected', 'Not Applied'];

const ACCOUNT_STATUS_OPTIONS = ['Active', 'Pending', 'Blocked', 'Deleted'];

const SKILL_OPTIONS = [
  'React',
  'Node.js',
  'TypeScript',
  'JavaScript',
  'Python',
  'Django',
  'AWS',
  'Docker',
  'Java',
  'Spring Boot',
  'Kubernetes',
  'Go',
  'Rust',
  'Vue.js',
  'GraphQL',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'UI/UX Design',
  'Figma',
  'Sketch',
  'Adobe XD',
  'React Native',
  'iOS Development',
  'Android',
  'Machine Learning',
  'TensorFlow',
  'Content Writing',
  'SEO',
  'Marketing',
];

const toTag = (group, value) => `${group}:${value}`;

const normalizeFromTag = (tag) => {
  const [group, value] = tag.split(':');
  return { group, value };
};

const UserFilter = ({ selectedFilters, onChange }) => {
  const [skillsSearch, setSkillsSearch] = useState('');
  const [isSkillsOpen, setIsSkillsOpen] = useState(true);

  const tags = [
    ...(selectedFilters.roles || []).map((value) => toTag('Role', value)),
    ...(selectedFilters.verificationStatus || []).map((value) => toTag('Verification', value)),
    ...(selectedFilters.accountStatus || []).map((value) => toTag('Account', value)),
    ...(selectedFilters.skills || []).map((value) => toTag('Skill', value)),
  ];

  const handleToggle = (group, value) => {
    const key =
      group === 'Role'
        ? 'roles'
        : group === 'Verification'
          ? 'verificationStatus'
          : group === 'Account'
            ? 'accountStatus'
            : 'skills';

    const current = selectedFilters[key] || [];
    const exists = current.includes(value);
    const next = exists ? current.filter((item) => item !== value) : [...current, value];

    onChange({
      ...selectedFilters,
      [key]: next,
    });
  };

  const handleRemoveTag = (tag) => {
    const { group, value } = normalizeFromTag(tag);
    handleToggle(group, value);
  };

  return (
    <div className="mt-3 rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] text-white">
              ✓
            </span>
            <span>Filters</span>
            <span className="ml-1 rounded-full bg-white/60 px-2 py-0.5 text-[10px] text-emerald-700">
              {tags.length}
            </span>
          </div>
          <button
            type="button"
            disabled={!tags.length}
            onClick={() =>
              onChange(
                {
                  roles: [],
                  verificationStatus: [],
                  accountStatus: [],
                  skills: [],
                },
              )
            }
            className="text-xs font-medium text-slate-500 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Clear all
          </button>

          {!!tags.length && (
            <div className="flex flex-wrap gap-2  px-5 py-3">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
                >
                  <span>{tag.split(':')[1]}</span>
                  <X className="h-3 w-3" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>



      <div className="grid grid-cols-1 gap-6 px-5 py-4 md:grid-cols-4">
        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Role
          </div>
          <div className="space-y-2  space-x-2">
            {ROLE_OPTIONS.map((value) => {
              const isActive = selectedFilters.roles.includes(value);
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleToggle('Role', value)}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${isActive
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-300'
                    }`}
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full border ${isActive ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300 bg-white'
                      }`}
                  >
                    {isActive && <Check className="h-3 w-3" />}
                  </span>
                  <span>{value}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Verification Status
          </div>
          <div className="space-y-2  space-x-2">
            {VERIFICATION_OPTIONS.map((value) => {
              const isActive = selectedFilters.verificationStatus.includes(value);
              const colorClasses =
                value === 'Verified'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : value === 'Rejected'
                    ? 'border-rose-500 bg-rose-50 text-rose-700'
                    : 'border-slate-200 bg-white text-slate-600';

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleToggle('Verification', value)}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${isActive ? colorClasses : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full border ${isActive
                        ? value === 'Verified'
                          ? 'border-emerald-500 bg-emerald-500 text-white'
                          : value === 'Rejected'
                            ? 'border-rose-500 bg-rose-500 text-white'
                            : 'border-slate-500 bg-slate-500 text-white'
                        : 'border-slate-300 bg-white'
                      }`}
                  >
                    {isActive && <Check className="h-3 w-3" />}
                  </span>
                  <span>{value}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3 ">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Account Status
          </div>
          <div className="space-y-2  space-x-2">
            {ACCOUNT_STATUS_OPTIONS.map((value) => {
              const isActive = selectedFilters.accountStatus.includes(value);

              const colorClasses =
                value === 'Active'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : value === 'Pending'
                    ? 'border-amber-500 bg-amber-50 text-amber-700'
                    : value === 'Blocked'
                      ? 'border-rose-500 bg-rose-50 text-rose-700'
                      : 'border-slate-200 bg-white text-slate-600';

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleToggle('Account', value)}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${isActive ? colorClasses : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full border ${isActive
                        ? value === 'Active'
                          ? 'border-emerald-500 bg-emerald-500 text-white'
                          : value === 'Pending'
                            ? 'border-amber-500 bg-amber-500 text-white'
                            : value === 'Blocked'
                              ? 'border-rose-500 bg-rose-500 text-white'
                              : 'border-slate-500 bg-slate-500 text-white'
                        : 'border-slate-300 bg-white'
                      }`}
                  >
                    {isActive && <Check className="h-3 w-3" />}
                  </span>
                  <span>{value}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Joined Date
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex-1 items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-left text-xs font-medium text-slate-500 hover:bg-slate-100"
            >
              <span>From</span>
            </button>
            <button
              type="button"
              className="flex-1 items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-left text-xs font-medium text-slate-500 hover:bg-slate-100"
            >
              <span>To</span>
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 px-5 py-3">
        <button
          type="button"
          onClick={() => setIsSkillsOpen((previous) => !previous)}
          className="flex w-full items-center justify-between"
        >
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Skills Filter
          </div>
          <ChevronDown
            className={`h-4 w-4 text-slate-400 transition-transform ${isSkillsOpen ? 'rotate-180' : ''
              }`}
          />
        </button>

        {isSkillsOpen && (
          <div className="mt-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={skillsSearch}
                onChange={(event) => setSkillsSearch(event.target.value)}
                placeholder="Search skills..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/60"
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {SKILL_OPTIONS.filter((value) =>
                value.toLowerCase().includes(skillsSearch.toLowerCase()),
              ).map((value) => {
                const isActive = (selectedFilters.skills || []).includes(value);

                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleToggle('Skill', value)}
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${isActive
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                  >
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-full border ${isActive ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300 bg-white'
                        }`}
                    >
                      {isActive && <Check className="h-3 w-3" />}
                    </span>
                    <span>{value}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserFilter;
