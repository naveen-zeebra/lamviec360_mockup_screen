'use client';
import React, { useState } from 'react';
import { useLanguage } from '@/lib/useLanguage';
import PortalSidebar from '@/components/PortalSidebar';
import PortalTopbar from '@/components/PortalTopbar';
import KPICards from './KPICards';
import ProfileCompletionCard from './ProfileCompletionCard';
import RecommendedJobsSection from './RecommendedJobsSection';
import RecentApplications from './RecentApplications';
import NotificationsPreview from './NotificationsPreview';
import AIInterviewCard from './AIInterviewCard';
import ComingSoonModal from '@/components/ComingSoonModal';
import { mockNotifications } from '@/lib/mockData';

export default function DashboardClient() {
  const { language, changeLanguage, t } = useLanguage();
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const unreadCount = mockNotifications?.filter(n => !n?.isRead)?.length;

  return (
    <div className="min-h-screen bg-background flex">
      <PortalSidebar t={t} unreadCount={unreadCount} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-60'}`}>
        <PortalTopbar language={language} onLanguageChange={changeLanguage} t={t} sidebarCollapsed={sidebarCollapsed} />

        <main className="flex-1 pt-16 p-4 lg:p-6 xl:p-8 max-w-screen-2xl w-full mx-auto" aria-label="Dashboard content">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">{t.dashboard.greeting('Nguyễn Minh Anh')}</h1>
            <p className="text-sm text-muted-foreground mt-1">{t.dashboard.subheading}</p>
          </div>

          {/* KPI Cards */}
          <KPICards t={t} />

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
            {/* Left — 2 cols */}
            <div className="lg:col-span-2 space-y-5">
              <RecommendedJobsSection t={t} />
              <RecentApplications t={t} language={language} />
            </div>

            {/* Right — 1 col */}
            <div className="space-y-5">
              <ProfileCompletionCard t={t} />
              <NotificationsPreview t={t} />
              <AIInterviewCard onOpenModal={() => setIsComingSoonOpen(true)} t={t} />
            </div>
          </div>
        </main>
      </div>

      <ComingSoonModal isOpen={isComingSoonOpen} onClose={() => setIsComingSoonOpen(false)} t={t} />
    </div>
  );
}