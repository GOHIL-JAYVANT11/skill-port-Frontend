import React, { useState } from 'react';
import { X, Check, Filter as FilterIcon } from 'lucide-react';

const JOB_TYPE_OPTIONS = [
  'All Job Types',
  'Full-Time',
  'Part-Time',
  'Internship',
  'Contract',
];

const STATUS_OPTIONS = [
  'All Status',
  'Approved',
  'Pending',
  'Rejected',
  'Draft',
  'Blocked',
];

const LOCATION_TYPE_OPTIONS = ['All Locations', 'Remote', 'On-site', 'Hybrid'];

const SKILL_OPTIONS = [
  'React',
  'Node.js',
  'TypeScript',
  'Python',
  'Java',
  'JavaScript',
  'C++',
  'AWS',
  'Docker',
  'Kubernetes',
  'MongoDB',
  'PostgreSQL',
  'GraphQL',
  'Machine Learning',
  'Data Science',
  'UI/UX Design',
  'Figma',
  'Product Management',
];

const EXPERIENCE_LEVEL_OPTIONS = [
  'All Levels',
  'Entry',
  'Junior',
  'Mid',
  'Senior',
  'Lead',
];

const JobsFilter = ({ selectedFilters, onChange, onClose, onApply }) => {
  const [skillsSearch, setSkillsSearch] = useState('');

  const filteredSkills = SKILL_OPTIONS.filter((skill) =>
    skill.toLowerCase().includes(skillsSearch.toLowerCase()),
  );

  const handleSelectChange = (field, value) => {
    onChange({
      ...selectedFilters,
      [field]: value,
    });
  };

  const handleInputChange = (field, value) => {
    onChange({
      ...selectedFilters,
      [field]: value,
    });
  };
  

  const handleToggleSkill = (skill) => {
    const current = selectedFilters.skills || [];
    const exists = current.includes(skill);
    const next = exists ? current.filter((item) => item !== skill) : [...current, skill];
    onChange({
      ...selectedFilters,
      skills: next,
    });
  };

  const handleToggleFlagged = () => {
    onChange({
      ...selectedFilters,
      showFlaggedOnly: !selectedFilters.showFlaggedOnly,
    });
  };

  const handleResetAll = () => {
    onChange({
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
  };

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-slate-900/40">
      <div className="flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50">
              <FilterIcon className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">
                Advanced Filters
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Job Type
            </div>
            <select
              value={selectedFilters.jobType}
              onChange={(e) => handleSelectChange('jobType', e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              {JOB_TYPE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Status
            </div>
            <select
              value={selectedFilters.status}
              onChange={(e) => handleSelectChange('status', e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Location Type
            </div>
            <select
              value={selectedFilters.locationType}
              onChange={(e) => handleSelectChange('locationType', e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              {LOCATION_TYPE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Location
            </div>
            <input
              type="text"
              value={selectedFilters.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="City or State..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Experience Level
            </div>
            <select
              value={selectedFilters.experienceLevel}
              onChange={(e) => handleSelectChange('experienceLevel', e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              {EXPERIENCE_LEVEL_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Salary Range (Yearly)
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                value={selectedFilters.salaryMin}
                onChange={(e) => handleInputChange('salaryMin', e.target.value)}
                placeholder="Min"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              <input
                type="number"
                value={selectedFilters.salaryMax}
                onChange={(e) => handleInputChange('salaryMax', e.target.value)}
                placeholder="Max"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Posted Date Range
            </div>
            <div className="flex gap-2">
              <input
                type="date"
                value={selectedFilters.postedFrom}
                onChange={(e) => handleInputChange('postedFrom', e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              <input
                type="date"
                value={selectedFilters.postedTo}
                onChange={(e) => handleInputChange('postedTo', e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-sm font-medium text-slate-700">
              Show Flagged Jobs Only
            </div>
            <button
              type="button"
              onClick={handleToggleFlagged}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                selectedFilters.showFlaggedOnly ? 'bg-emerald-500' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                  selectedFilters.showFlaggedOnly ? 'translate-x-4' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="space-y-2 pt-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Required Skills
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-3">
              <input
                type="text"
                value={skillsSearch}
                onChange={(e) => setSkillsSearch(e.target.value)}
                placeholder="Search skills..."
                className="mb-2 w-full rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
              />
              <div className="flex flex-wrap gap-1.5">
                {filteredSkills.map((value) => {
                  const isActive = selectedFilters.skills.includes(value);
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleToggleSkill(value)}
                      className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                        isActive
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                          isActive ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300 bg-white'
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
          </div>
        </div>

        <div className="border-t border-slate-100 px-5 py-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleResetAll}
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Reset All
          </button>
          <button
            type="button"
            onClick={onApply}
            className="flex-1 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobsFilter;
