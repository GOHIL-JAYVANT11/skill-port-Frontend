import React, { useMemo, useRef, useState } from 'react';
import { CalendarDays, Filter, Plus, Search } from 'lucide-react';
import {
  useHeaderExportButtonAnimation,
  useUserStatsCardsAnimation,
  useUserFiltersAnimation,
} from '../lib/BTNGsapanimation.jsx';
import MeetingTable from '../Components/Meeting/MeetingTable.jsx';
import MeetingFilter from '../Components/Meeting/MeetingFilter.jsx';
import {
  MeetingActivityTimelineModal,
  MeetingAdminNotesModal,
  MeetingCancelModal,
  MeetingCommissionModal,
  MeetingDetailsModal,
  MeetingOutcomeModal,
  MeetingInterviewOutcomeModal,
  MeetingRescheduleModal,
  MeetingRoomModal,
  GenerateSkillPortMeetingModal,
} from '../Components/Meeting/MeetingModals.jsx';

const Meeting = () => {
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
    status: 'All',
    candidate: 'All',
    recruiter: 'All',
    job: 'All',
    dateFrom: '',
    dateTo: '',
  });

  const [selectedIds, setSelectedIds] = useState([]);

  const [detailsMeeting, setDetailsMeeting] = useState(null);
  const [roomMeeting, setRoomMeeting] = useState(null);
  const [rescheduleMeeting, setRescheduleMeeting] = useState(null);
  const [cancelMeeting, setCancelMeeting] = useState(null);
  const [outcomeMeeting, setOutcomeMeeting] = useState(null);
  const [interviewOutcomeMeeting, setInterviewOutcomeMeeting] = useState(null);
  const [commissionMeeting, setCommissionMeeting] = useState(null);
  const [timelineMeeting, setTimelineMeeting] = useState(null);
  const [adminNotesMeeting, setAdminNotesMeeting] = useState(null);
  const [generateMeetingOpen, setGenerateMeetingOpen] = useState(false);

  const meetings = useMemo(() => {
    const base = [
      {
        id: 'mtg-001',
        title: 'Senior Frontend Interview',
        company: 'TechCorp Inc.',
        candidate: 'Anita Sharma',
        candidateRole: 'Frontend Engineer',
        recruiter: 'Rahul Verma',
        recruiterOrg: 'TechCorp Talent',
        scheduledAt: '2026-01-20T14:00:00',
        scheduledAtFormatted: '20 Jan 2026, 14:00',
        durationMinutes: 60,
        meetingType: 'Technical Interview',
        meetingMode: 'In-Platform Video',
        status: 'Scheduled',
        meetingTypeKey: 'Interview',
        timezone: 'IST',
        description:
          'Deep technical interview focused on React, performance optimisation and system design.',
        linkedJob: 'Senior Frontend Engineer',
        room: {
          link: 'https://meet.skillport.com/room/SP-FE-4821',
        },
        participants: {
          admin: 'Super Admin',
          candidateEmail: 'anita.sharma@example.com',
          recruiterEmail: 'rahul@techcorp.com',
        },
        agenda: [
          'Intro and role overview',
          'Portfolio walkthrough',
          'Live coding exercise',
          'System design discussion',
        ],
        commission: {
          currency: '₹',
          amount: 25000,
          status: 'Pending',
        },
        activityTimeline: [
          {
            id: '1',
            title: 'Meeting scheduled',
            subtitle: 'Created by Rahul Verma',
            meta: '10 Jan 2026, 10:30',
          },
          {
            id: '2',
            title: 'Reminder email sent',
            subtitle: 'To candidate and recruiter',
            meta: '19 Jan 2026, 14:00',
          },
        ],
      },
      {
        id: 'mtg-001',
        title: 'Senior Frontend Interview',
        company: 'TechCorp Inc.',
        candidate: 'Anita Sharma',
        candidateRole: 'Frontend Engineer',
        recruiter: 'Rahul Verma',
        recruiterOrg: 'TechCorp Talent',
        scheduledAt: '2026-01-20T14:00:00',
        scheduledAtFormatted: '20 Jan 2026, 14:00',
        durationMinutes: 60,
        meetingType: 'Technical Interview',
        meetingMode: 'In-Platform Video',
        status: 'Scheduled',
        meetingTypeKey: 'Interview',
        timezone: 'IST',
        description:
          'Deep technical interview focused on React, performance optimisation and system design.',
        linkedJob: 'Senior Frontend Engineer',
        room: {
          link: 'https://meet.skillport.com/room/SP-FE-4821',
        },
        participants: {
          admin: 'Super Admin',
          candidateEmail: 'anita.sharma@example.com',
          recruiterEmail: 'rahul@techcorp.com',
        },
        agenda: [
          'Intro and role overview',
          'Portfolio walkthrough',
          'Live coding exercise',
          'System design discussion',
        ],
        commission: {
          currency: '₹',
          amount: 25000,
          status: 'Pending',
        },
        activityTimeline: [
          {
            id: '1',
            title: 'Meeting scheduled',
            subtitle: 'Created by Rahul Verma',
            meta: '10 Jan 2026, 10:30',
          },
          {
            id: '2',
            title: 'Reminder email sent',
            subtitle: 'To candidate and recruiter',
            meta: '19 Jan 2026, 14:00',
          },
        ],
      },
      {
        id: 'mtg-001',
        title: 'Senior Frontend Interview',
        company: 'TechCorp Inc.',
        candidate: 'Anita Sharma',
        candidateRole: 'Frontend Engineer',
        recruiter: 'Rahul Verma',
        recruiterOrg: 'TechCorp Talent',
        scheduledAt: '2026-01-20T14:00:00',
        scheduledAtFormatted: '20 Jan 2026, 14:00',
        durationMinutes: 60,
        meetingType: 'Technical Interview',
        meetingMode: 'In-Platform Video',
        status: 'Scheduled',
        meetingTypeKey: 'Interview',
        timezone: 'IST',
        description:
          'Deep technical interview focused on React, performance optimisation and system design.',
        linkedJob: 'Senior Frontend Engineer',
        room: {
          link: 'https://meet.skillport.com/room/SP-FE-4821',
        },
        participants: {
          admin: 'Super Admin',
          candidateEmail: 'anita.sharma@example.com',
          recruiterEmail: 'rahul@techcorp.com',
        },
        agenda: [
          'Intro and role overview',
          'Portfolio walkthrough',
          'Live coding exercise',
          'System design discussion',
        ],
        commission: {
          currency: '₹',
          amount: 25000,
          status: 'Pending',
        },
        activityTimeline: [
          {
            id: '1',
            title: 'Meeting scheduled',
            subtitle: 'Created by Rahul Verma',
            meta: '10 Jan 2026, 10:30',
          },
          {
            id: '2',
            title: 'Reminder email sent',
            subtitle: 'To candidate and recruiter',
            meta: '19 Jan 2026, 14:00',
          },
        ],
      },
      {
        id: 'mtg-001',
        title: 'Senior Frontend Interview',
        company: 'TechCorp Inc.',
        candidate: 'Anita Sharma',
        candidateRole: 'Frontend Engineer',
        recruiter: 'Rahul Verma',
        recruiterOrg: 'TechCorp Talent',
        scheduledAt: '2026-01-20T14:00:00',
        scheduledAtFormatted: '20 Jan 2026, 14:00',
        durationMinutes: 60,
        meetingType: 'Technical Interview',
        meetingMode: 'In-Platform Video',
        status: 'Scheduled',
        meetingTypeKey: 'Interview',
        timezone: 'IST',
        description:
          'Deep technical interview focused on React, performance optimisation and system design.',
        linkedJob: 'Senior Frontend Engineer',
        room: {
          link: 'https://meet.skillport.com/room/SP-FE-4821',
        },
        participants: {
          admin: 'Super Admin',
          candidateEmail: 'anita.sharma@example.com',
          recruiterEmail: 'rahul@techcorp.com',
        },
        agenda: [
          'Intro and role overview',
          'Portfolio walkthrough',
          'Live coding exercise',
          'System design discussion',
        ],
        commission: {
          currency: '₹',
          amount: 25000,
          status: 'Pending',
        },
        activityTimeline: [
          {
            id: '1',
            title: 'Meeting scheduled',
            subtitle: 'Created by Rahul Verma',
            meta: '10 Jan 2026, 10:30',
          },
          {
            id: '2',
            title: 'Reminder email sent',
            subtitle: 'To candidate and recruiter',
            meta: '19 Jan 2026, 14:00',
          },
        ],
      },
      {
        id: 'mtg-001',
        title: 'Senior Frontend Interview',
        company: 'TechCorp Inc.',
        candidate: 'Anita Sharma',
        candidateRole: 'Frontend Engineer',
        recruiter: 'Rahul Verma',
        recruiterOrg: 'TechCorp Talent',
        scheduledAt: '2026-01-20T14:00:00',
        scheduledAtFormatted: '20 Jan 2026, 14:00',
        durationMinutes: 60,
        meetingType: 'Technical Interview',
        meetingMode: 'In-Platform Video',
        status: 'Scheduled',
        meetingTypeKey: 'Interview',
        timezone: 'IST',
        description:
          'Deep technical interview focused on React, performance optimisation and system design.',
        linkedJob: 'Senior Frontend Engineer',
        room: {
          link: 'https://meet.skillport.com/room/SP-FE-4821',
        },
        participants: {
          admin: 'Super Admin',
          candidateEmail: 'anita.sharma@example.com',
          recruiterEmail: 'rahul@techcorp.com',
        },
        agenda: [
          'Intro and role overview',
          'Portfolio walkthrough',
          'Live coding exercise',
          'System design discussion',
        ],
        commission: {
          currency: '₹',
          amount: 25000,
          status: 'Pending',
        },
        activityTimeline: [
          {
            id: '1',
            title: 'Meeting scheduled',
            subtitle: 'Created by Rahul Verma',
            meta: '10 Jan 2026, 10:30',
          },
          {
            id: '2',
            title: 'Reminder email sent',
            subtitle: 'To candidate and recruiter',
            meta: '19 Jan 2026, 14:00',
          },
        ],
      },
      {
        id: 'mtg-001',
        title: 'Senior Frontend Interview',
        company: 'TechCorp Inc.',
        candidate: 'Anita Sharma',
        candidateRole: 'Frontend Engineer',
        recruiter: 'Rahul Verma',
        recruiterOrg: 'TechCorp Talent',
        scheduledAt: '2026-01-20T14:00:00',
        scheduledAtFormatted: '20 Jan 2026, 14:00',
        durationMinutes: 60,
        meetingType: 'Technical Interview',
        meetingMode: 'In-Platform Video',
        status: 'Scheduled',
        meetingTypeKey: 'Interview',
        timezone: 'IST',
        description:
          'Deep technical interview focused on React, performance optimisation and system design.',
        linkedJob: 'Senior Frontend Engineer',
        room: {
          link: 'https://meet.skillport.com/room/SP-FE-4821',
        },
        participants: {
          admin: 'Super Admin',
          candidateEmail: 'anita.sharma@example.com',
          recruiterEmail: 'rahul@techcorp.com',
        },
        agenda: [
          'Intro and role overview',
          'Portfolio walkthrough',
          'Live coding exercise',
          'System design discussion',
        ],
        commission: {
          currency: '₹',
          amount: 25000,
          status: 'Pending',
        },
        activityTimeline: [
          {
            id: '1',
            title: 'Meeting scheduled',
            subtitle: 'Created by Rahul Verma',
            meta: '10 Jan 2026, 10:30',
          },
          {
            id: '2',
            title: 'Reminder email sent',
            subtitle: 'To candidate and recruiter',
            meta: '19 Jan 2026, 14:00',
          },
        ],
      },
      {
        id: 'mtg-001',
        title: 'Senior Frontend Interview',
        company: 'TechCorp Inc.',
        candidate: 'Anita Sharma',
        candidateRole: 'Frontend Engineer',
        recruiter: 'Rahul Verma',
        recruiterOrg: 'TechCorp Talent',
        scheduledAt: '2026-01-20T14:00:00',
        scheduledAtFormatted: '20 Jan 2026, 14:00',
        durationMinutes: 60,
        meetingType: 'Technical Interview',
        meetingMode: 'In-Platform Video',
        status: 'Scheduled',
        meetingTypeKey: 'Interview',
        timezone: 'IST',
        description:
          'Deep technical interview focused on React, performance optimisation and system design.',
        linkedJob: 'Senior Frontend Engineer',
        room: {
          link: 'https://meet.skillport.com/room/SP-FE-4821',
        },
        participants: {
          admin: 'Super Admin',
          candidateEmail: 'anita.sharma@example.com',
          recruiterEmail: 'rahul@techcorp.com',
        },
        agenda: [
          'Intro and role overview',
          'Portfolio walkthrough',
          'Live coding exercise',
          'System design discussion',
        ],
        commission: {
          currency: '₹',
          amount: 25000,
          status: 'Pending',
        },
        activityTimeline: [
          {
            id: '1',
            title: 'Meeting scheduled',
            subtitle: 'Created by Rahul Verma',
            meta: '10 Jan 2026, 10:30',
          },
          {
            id: '2',
            title: 'Reminder email sent',
            subtitle: 'To candidate and recruiter',
            meta: '19 Jan 2026, 14:00',
          },
        ],
      },
      {
        id: 'mtg-002',
        title: 'Backend Screening Call',
        company: 'BrightPath Learning',
        candidate: 'Karan Mehta',
        candidateRole: 'Backend Developer',
        recruiter: 'Priya Nair',
        recruiterOrg: 'BrightPath HR',
        scheduledAt: '2026-01-20T16:30:00',
        scheduledAtFormatted: '20 Jan 2026, 16:30',
        durationMinutes: 45,
        meetingType: 'Screening Interview',
        meetingMode: 'In-Platform Video',
        status: 'Live',
        meetingTypeKey: 'Screening',
        timezone: 'IST',
        description:
          'Initial screening to validate culture fit, communication and basic backend knowledge.',
        linkedJob: 'Backend Developer',
        room: {
          link: 'https://meet.skillport.com/room/SP-BE-1934',
        },
        participants: {
          admin: 'Meeting Moderator',
          candidateEmail: 'karan.mehta@example.com',
          recruiterEmail: 'priya@brightpath.com',
        },
        agenda: [
          'Candidate introduction',
          'Experience and previous projects',
          'Behavioural questions',
        ],
        commission: {
          currency: '₹',
          amount: 18000,
          status: 'Not started',
        },
        activityTimeline: [
          {
            id: '1',
            title: 'Meeting started',
            subtitle: 'All participants joined',
            meta: '20 Jan 2026, 16:32',
          },
        ],
      },
      {
        id: 'mtg-003',
        title: 'UX Design Portfolio Review',
        company: 'UrbanWorks Studio',
        candidate: 'Meera Iyer',
        candidateRole: 'Product Designer',
        recruiter: 'Devansh Shah',
        recruiterOrg: 'UrbanWorks Talent',
        scheduledAt: '2026-01-19T11:00:00',
        scheduledAtFormatted: '19 Jan 2026, 11:00',
        durationMinutes: 50,
        meetingType: 'Interview',
        meetingMode: 'In-Platform Video',
        status: 'Completed',
        meetingTypeKey: 'Interview',
        timezone: 'IST',
        description:
          'Portfolio review to understand design process, research depth and interaction design quality.',
        linkedJob: 'Product Designer',
        room: {
          link: 'https://meet.skillport.com/room/SP-UX-9281',
        },
        participants: {
          admin: 'Super Admin',
          candidateEmail: 'meera.iyer@example.com',
          recruiterEmail: 'devansh@urbanworks.com',
        },
        agenda: [
          'Portfolio walkthrough',
          'Case study discussion',
          'Questions from hiring manager',
        ],
        commission: {
          currency: '₹',
          amount: 22000,
          status: 'In progress',
        },
        activityTimeline: [
          {
            id: '1',
            title: 'Meeting completed',
            subtitle: 'Completed as per schedule',
            meta: '19 Jan 2026, 11:55',
          },
          {
            id: '2',
            title: 'Outcome recorded: On Hold',
            subtitle: 'Awaiting client feedback',
            meta: '19 Jan 2026, 12:15',
          },
        ],
      },
    ];

    return base;
  }, []);

  const meetingFilterOptions = useMemo(() => {
    const types = Array.from(new Set(meetings.map((meeting) => meeting.meetingTypeKey)));
    const statuses = Array.from(new Set(meetings.map((meeting) => meeting.status)));
    const candidates = Array.from(new Set(meetings.map((meeting) => meeting.candidate)));
    const recruiters = Array.from(new Set(meetings.map((meeting) => meeting.recruiter)));
    const jobs = Array.from(
      new Set(
        meetings
          .map((meeting) => meeting.linkedJob || meeting.linkedProject)
          .filter(Boolean),
      ),
    );

    return {
      types,
      statuses,
      candidates,
      recruiters,
      jobs,
    };
  }, [meetings]);

  const filteredMeetings = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    const from = filters.dateFrom ? new Date(filters.dateFrom) : null;
    const to = filters.dateTo ? new Date(filters.dateTo) : null;

    return meetings.filter((meeting) => {
      if (search) {
        const haystack = `${meeting.title} ${meeting.company} ${meeting.candidate} ${meeting.recruiter}`.toLowerCase();
        if (!haystack.includes(search)) {
          return false;
        }
      }

      if (filters.type !== 'All' && meeting.meetingTypeKey !== filters.type) {
        return false;
      }

      if (filters.status !== 'All' && meeting.status !== filters.status) {
        return false;
      }

      if (filters.candidate !== 'All' && meeting.candidate !== filters.candidate) {
        return false;
      }

      if (filters.recruiter !== 'All' && meeting.recruiter !== filters.recruiter) {
        return false;
      }

      if (
        filters.job !== 'All' &&
        filters.job !== (meeting.linkedJob || meeting.linkedProject)
      ) {
        return false;
      }

      if (from || to) {
        const scheduledDate = new Date(meeting.scheduledAt);
        if (from && scheduledDate < from) {
          return false;
        }
        if (to && scheduledDate > to) {
          return false;
        }
      }

      return true;
    });
  }, [meetings, searchTerm, filters]);

  const stats = useMemo(() => {
    const total = meetings.length;
    const scheduled = meetings.filter((meeting) => meeting.status === 'Scheduled').length;
    const completed = meetings.filter((meeting) => meeting.status === 'Completed').length;

    const today = new Date();
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      0,
      0,
      0,
    );
    const todayEnd = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      23,
      59,
      59,
    );

    const todayMeetings = meetings.filter((meeting) => {
      const date = new Date(meeting.scheduledAt);
      return date >= todayStart && date <= todayEnd;
    }).length;

    return {
      total,
      scheduled,
      completed,
      today: todayMeetings,
    };
  }, [meetings]);

  const totalCount = meetings.length;

  const allSelected =
    filteredMeetings.length > 0 &&
    filteredMeetings.every((meeting) => selectedIds.includes(meeting.id));

  const appliedFilterCount = useMemo(() => {
    let count = 0;
    if (filters.type !== 'All') count += 1;
    if (filters.status !== 'All') count += 1;
    if (filters.candidate !== 'All') count += 1;
    if (filters.recruiter !== 'All') count += 1;
    if (filters.job !== 'All') count += 1;
    if (filters.dateFrom) count += 1;
    if (filters.dateTo) count += 1;
    return count;
  }, [filters]);

  const handleToggleAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredMeetings.map((meeting) => meeting.id));
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
    );
  };

  const handleClearSelection = () => {
    setSelectedIds([]);
  };

  const handleGenerateMeetingClick = () => {
    setGenerateMeetingOpen(true);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-4" ref={headerRef}>
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Interview & Meeting Orchestrator
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Schedule, manage, conduct and track all interviews and meetings inside SkillPort.
          </p>
        </div>
        <button
          type="button"
          ref={actionButtonRef}
          onClick={handleGenerateMeetingClick}
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-slate-800"
        >
          <Plus className="h-4 w-4" />
          Generate SkillPort Meeting
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4" ref={statsCardsRef}>
        <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-xs text-slate-600 shadow-sm">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Total Meetings
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">
            {stats.total}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-xs text-slate-600 shadow-sm">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Scheduled
          </div>
          <div className="mt-2 text-2xl font-semibold text-sky-700">
            {stats.scheduled}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-xs text-slate-600 shadow-sm">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Completed
          </div>
          <div className="mt-2 text-2xl font-semibold text-emerald-700">
            {stats.completed}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-xs text-slate-600 shadow-sm">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Today&apos;s Meetings
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">
            {stats.today}
          </div>
        </div>
      </div>

      <div
        className="mt-6 flex flex-wrap items-center justify-between gap-3"
        ref={filtersRowRef}
      >
        <div className="flex flex-1 min-w-[220px] items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500 shadow-sm">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search meetings by candidate, recruiter, or company"
            className="h-6 flex-1 border-0 bg-transparent text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={() => setFiltersOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
        >
          <Filter className="h-4 w-4 text-slate-500" />
          <span>Filters</span>
          {appliedFilterCount > 0 && (
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-slate-900 px-1 text-[11px] font-semibold text-white">
              {appliedFilterCount}
            </span>
          )}
        </button>
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <CalendarDays className="h-4 w-4 text-slate-400" />
          <span>Centralised interviews, meetings and admin oversight</span>
        </div>
      </div>

      <MeetingTable
        meetings={filteredMeetings}
        totalCount={totalCount}
        selectedIds={selectedIds}
        allSelected={allSelected}
        onToggleAll={handleToggleAll}
        onToggleSelect={handleToggleSelect}
        onClearSelection={handleClearSelection}
        onViewDetails={setDetailsMeeting}
        onJoinLive={setRoomMeeting}
        onReschedule={setRescheduleMeeting}
        onCancel={setCancelMeeting}
        onMarkNoShow={setOutcomeMeeting}
        onRecordOutcome={setInterviewOutcomeMeeting}
        onViewCommission={setCommissionMeeting}
        onAddAdminNote={setAdminNotesMeeting}
        onViewTimeline={setTimelineMeeting}
      />

      <MeetingFilter
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        value={filters}
        onChange={setFilters}
        options={meetingFilterOptions}
      />

      <MeetingDetailsModal
        isOpen={Boolean(detailsMeeting)}
        onClose={() => setDetailsMeeting(null)}
        meeting={detailsMeeting}
      />
      <MeetingRoomModal
        isOpen={Boolean(roomMeeting)}
        onClose={() => setRoomMeeting(null)}
        meeting={roomMeeting}
      />
      <MeetingRescheduleModal
        isOpen={Boolean(rescheduleMeeting)}
        onClose={() => setRescheduleMeeting(null)}
        meeting={rescheduleMeeting}
      />
      <MeetingCancelModal
        isOpen={Boolean(cancelMeeting)}
        onClose={() => setCancelMeeting(null)}
        meeting={cancelMeeting}
      />
      <MeetingOutcomeModal
        isOpen={Boolean(outcomeMeeting)}
        onClose={() => setOutcomeMeeting(null)}
        meeting={outcomeMeeting}
      />
      <MeetingInterviewOutcomeModal
        isOpen={Boolean(interviewOutcomeMeeting)}
        onClose={() => setInterviewOutcomeMeeting(null)}
        meeting={interviewOutcomeMeeting}
      />
      <MeetingCommissionModal
        isOpen={Boolean(commissionMeeting)}
        onClose={() => setCommissionMeeting(null)}
        meeting={commissionMeeting}
      />
      <MeetingAdminNotesModal
        isOpen={Boolean(adminNotesMeeting)}
        onClose={() => setAdminNotesMeeting(null)}
        meeting={adminNotesMeeting}
      />
      <MeetingActivityTimelineModal
        isOpen={Boolean(timelineMeeting)}
        onClose={() => setTimelineMeeting(null)}
        meeting={timelineMeeting}
      />
      <GenerateSkillPortMeetingModal
        isOpen={generateMeetingOpen}
        onClose={() => setGenerateMeetingOpen(false)}
      />
    </div>
  );
};

export default Meeting;
