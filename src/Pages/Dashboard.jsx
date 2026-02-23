import React, { useRef, useState } from 'react';
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
  useDashboardQuickActionsAnimation,
} from '../lib/BTNGsapanimation.jsx';

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
      <DashboardStatsGrid cardsRef={statsCardsRef} />
      <div className="grid gap-6 md:grid-cols-2">
        <RevenueOverviewCard cardRef={revenueCardRef} />
        <UserGrowthCard cardRef={userGrowthCardRef} />
      </div>
      <div className="mt-6">
        <MeetingsScheduleCard cardRef={meetingsCardRef} />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <JobsProjectsOverviewCard cardRef={jobsProjectsCardRef} />
        <TopPerformersCard listRef={topPerformersListRef} />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <ActivityFeedCard listRef={activityFeedListRef} />
        {/* <QuickActionsCard cardRef={quickActionsCardRef} /> */}
      </div>
    </div>
  );
};

export default Dashboard;
