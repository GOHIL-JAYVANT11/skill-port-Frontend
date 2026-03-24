import React, { useRef, useState, useMemo } from 'react';
import DashboardHeader from '../Components/Dashboard/DashboardHeader.jsx';
import DashboardStatsGrid from '../Components/Dashboard/DashboardStatsGrid.jsx';
import RevenueOverviewCard from '../Components/Dashboard/RevenueOverviewCard.jsx';
import UserGrowthCard from '../Components/Dashboard/UserGrowthCard.jsx';
import MeetingsScheduleCard from '../Components/Dashboard/MeetingsScheduleCard.jsx';
import JobsProjectsOverviewCard from '../Components/Dashboard/JobsProjectsOverviewCard.jsx';
import TopPerformersCard from '../Components/Dashboard/TopPerformersCard.jsx';
import ActivityFeedCard from '../Components/Dashboard/ActivityFeedCard.jsx';
import {
  useDashboardHeaderAnimation,
  useDashboardStatsAnimation,
  useDashboardChartCardAnimation,
  useDashboardMeetingsAnimation,
  useDashboardStaggeredListAnimation,
} from '../lib/BTNGsapanimation.jsx';
import {
  getDashboardStats,
  getRevenueOverview,
  getUserGrowth,
  getMeetingsSchedule,
  getJobsAndProjectsOverview,
  getTopPerformers,
  getActivityFeed,
} from '../lib/dashboardData.js';

export const Dashboard = () => {
  const [refreshToken, setRefreshToken] = useState(0);

  const headerRef = useRef(null);
  const refreshButtonRef = useRef(null);
  const statsCardsRef = useRef(null);
  const revenueCardRef = useRef(null);
  const userGrowthCardRef = useRef(null);
  const meetingsCardRef = useRef(null);
  const jobsProjectsCardRef = useRef(null);
  const activityFeedListRef = useRef(null);
  const topPerformersListRef = useRef(null);

  const dashboardData = useMemo(() => {
    if (refreshToken >= 0) { 
      return {
        stats: getDashboardStats(),
        revenue: getRevenueOverview(),
        userGrowth: getUserGrowth(),
        meetings: getMeetingsSchedule(),
        jobsProjects: getJobsAndProjectsOverview(),
        topPerformers: getTopPerformers(),
        activityFeed: getActivityFeed(),
      };
    }
    return {};
  }, [refreshToken]);

  useDashboardHeaderAnimation(headerRef, refreshButtonRef, refreshToken);
  useDashboardStatsAnimation(statsCardsRef, refreshToken);
  useDashboardChartCardAnimation(revenueCardRef, refreshToken);
  useDashboardChartCardAnimation(userGrowthCardRef, refreshToken);
  useDashboardMeetingsAnimation(meetingsCardRef, refreshToken);
  useDashboardChartCardAnimation(jobsProjectsCardRef, refreshToken);
  useDashboardStaggeredListAnimation(activityFeedListRef, refreshToken);
  useDashboardStaggeredListAnimation(topPerformersListRef, refreshToken);

  const firstName = 'Super';

  const handleRefresh = () => {
    setRefreshToken((current) => current + 1);
  };

  return (
    <div className="flex h-full flex-col">
      <DashboardHeader
        firstName={firstName}
        onRefresh={handleRefresh}
        headerRef={headerRef}
        refreshButtonRef={refreshButtonRef}
      />
      <DashboardStatsGrid cardsRef={statsCardsRef} stats={dashboardData.stats} />
      <div className="grid gap-6 md:grid-cols-2">
        <RevenueOverviewCard cardRef={revenueCardRef} data={dashboardData.revenue} />
        <UserGrowthCard cardRef={userGrowthCardRef} data={dashboardData.userGrowth} />
      </div>
      <div className="mt-6">
        <MeetingsScheduleCard cardRef={meetingsCardRef} data={dashboardData.meetings} />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <JobsProjectsOverviewCard cardRef={jobsProjectsCardRef} data={dashboardData.jobsProjects} />
        <TopPerformersCard listRef={topPerformersListRef} performers={dashboardData.topPerformers} />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <ActivityFeedCard listRef={activityFeedListRef} activities={dashboardData.activityFeed} />
      </div>
    </div>
  );
};

export default Dashboard;
