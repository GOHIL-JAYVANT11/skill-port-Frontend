// ================= UTIL FUNCTIONS =================
const random = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const formatCurrency = (value) => {
  if (value >= 1000) {
    return `₹${(value / 1000).toFixed(1)}k`;
  }
  return `₹${value}`;
};

const formatNumber = (value) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }
  return value.toString();
};

// ================= DASHBOARD STATS =================
export const getDashboardStats = () => {
  const users = random(20, 35);
  const revenue = random(25000, 40000);

  return {
    totalUsers: {
      value: formatNumber(users),
      change: '+5%',
      changeType: 'positive',
    },
    activeCompanies: {
      value: formatNumber(random(5, 12)),
      change: '+3%',
      changeType: 'positive',
    },
    activeJobs: {
      value: formatNumber(random(8, 18)),
      change: '+4%',
      changeType: 'positive',
    },
    activeFreelanceProjects: {
      value: formatNumber(random(6, 15)),
      change: '+2%',
      changeType: 'positive',
    },
    monthlyRevenue: {
      value: formatCurrency(revenue), // ₹25k–₹40k
      change: '+10%',
      changeType: 'positive',
    },
    escrowVolume: {
      value: formatCurrency(random(8000, 20000)),
      change: '+6%',
      changeType: 'positive',
    },
    openDisputes: {
      value: formatNumber(random(0, 3)),
      change: '0%',
      changeType: 'neutral',
    },
    meetingConversionRate: {
      value: `${random(15, 30)}%`,
      change: '+2%',
      changeType: 'positive',
    },
  };
};

// ================= REVENUE OVERVIEW =================
export const getRevenueOverview = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  let lastMonthRevenue = 0;

  const data = months.map((month, i) => {
    // Simulate growing revenue over the months
    const freelance = random(3000 + i * 2000, 5000 + i * 2500);
    const jobPlacements = random(2000 + i * 1500, 3000 + i * 1800);
    const total = freelance + jobPlacements;

    if (i === months.length - 1) {
      lastMonthRevenue = total;
    }

    return {
      month,
      'Total Revenue': total,
      Freelance: freelance,
      'Job Placements': jobPlacements,
    };
  });

  return {
    totalRevenue: lastMonthRevenue,
    sources: [
      { name: 'Total Revenue', color: '#22c55e' },
      { name: 'Freelance', color: '#38bdf8' },
      { name: 'Job Placements', color: '#a78bfa' },
    ],
    data,
  };
};

// ================= USER GROWTH =================
export const getUserGrowth = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  let totalNew = 0;

  const data = months.map((month, i) => {
    const candidates = random(5 + i * 2, 10 + i * 3);
    const jobs = random(2 + i, 5 + i * 2);
    const freelancers = random(3 + i, 8 + i * 2);

    if (i === months.length - 1) {
      totalNew = candidates + jobs + freelancers;
    }

    return { month, Candidates: candidates, Jobs: jobs, Freelancers: freelancers };
  });

  return {
    totalNew: `+${totalNew} this month`,
    breakdown: 'Candidates, jobs, freelance signups',
    sources: [
      { name: 'Candidates', color: '#22c55e' },
      { name: 'Jobs', color: '#f97316' },
      { name: 'Freelancers', color: '#38bdf8' },
    ],
    data,
  };
};

// ================= MEETINGS =================
export const getMeetingsSchedule = () => {
  const scheduled = random(15, 25);
  const completed = random(10, scheduled);

  return {
    scheduled,
    completed,
    completionRate: `${Math.round((completed / scheduled) * 100)}%`,
    schedule: [
      { time: '10:00', title: 'Frontend Interview', subtitle: 'React Dev', status: 'Confirmed' },
      { time: '11:30', title: 'UI Review', subtitle: 'Client Meeting', status: 'Pending' },
      { time: '02:00', title: 'Project Kickoff', subtitle: 'StartupX', status: 'Completed' },
    ],
    weeklyData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => {
      const sch = random(3, 8);
      const com = random(2, sch);
      return { day, scheduled: sch, completed: com, rate: Math.round((com / sch) * 100) };
    }),
  };
};

// ================= JOBS & PROJECTS =================
export const getJobsAndProjectsOverview = () => ({
  totalJobs: 18,
  totalProjects: 12,
  jobsByCategory: [
    { name: 'Technology', value: 40, color: '#3b82f6' },
    { name: 'Design', value: 25, color: '#8b5cf6' },
    { name: 'Marketing', value: 20, color: '#ec4899' },
    { name: 'Others', value: 15, color: '#f59e0b' },
  ],
  projectStatus: [
    { name: 'In Progress', value: 6, color: '#3b82f6' },
    { name: 'Completed', value: 4, color: '#22c55e' },
    { name: 'On Hold', value: 1, color: '#f97316' },
    { name: 'Disputed', value: 1, color: '#ef4444' },
  ],
});

// ================= TOP PERFORMERS =================
export const getTopPerformers = () => ([
  {
    initials: 'SX',
    name: 'StartupX',
    role: 'Top Recruiter',
    hires: random(5, 10),
    change: `+${random(5, 15)}%`,
    changeType: 'positive',
  },
  {
    initials: 'NV',
    name: 'Neha Verma',
    role: 'Frontend Developer',
    projects: random(3, 7),
    change: `+${random(4, 12)}%`,
    changeType: 'positive',
  },
]);

// ================= ACTIVITY FEED =================
export const getActivityFeed = () => ([
  {
    initials: 'TC',
    title: 'New job posted',
    subtitle: 'React Developer',
    time: `${random(5, 15)} min ago`,
  },
  {
    initials: 'DX',
    title: 'Dispute opened',
    subtitle: 'Payment issue',
    time: `${random(20, 59)} min ago`,
  },
  {
    initials: 'AS',
    title: 'Offer accepted',
    subtitle: 'UI Designer',
    time: `${random(1, 4)} hours ago`,
  },
]);