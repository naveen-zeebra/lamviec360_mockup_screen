'use client';
import React, { useState } from 'react';
import { useLanguage } from '@/lib/useLanguage';
import PortalSidebar from '@/components/PortalSidebar';
import PortalTopbar from '@/components/PortalTopbar';
import StatusBadge, { statusLabelKeys, ApplicationStatus } from '@/components/StatusBadge';
import ApplicationDetailDrawer from './ApplicationDetailDrawer';
import { mockApplications, mockNotifications, Application } from '@/lib/mockData';
import { Search, Filter, ChevronDown, FileText, MapPin, DollarSign, Calendar } from 'lucide-react';
import { TranslationKeys } from '@/lib/i18n';

type StatusTab = 'all' | 'Applied' | 'Under Review' | 'Shortlisted' | 'Interview Scheduled' | 'Offer Sent' | 'Rejected';

const tabKeys: { key: StatusTab; labelKey: keyof TranslationKeys['applications'] }[] = [
  { key: 'all', labelKey: 'all' },
  { key: 'Applied', labelKey: 'applied' },
  { key: 'Under Review', labelKey: 'underReview' },
  { key: 'Shortlisted', labelKey: 'shortlisted' },
  { key: 'Interview Scheduled', labelKey: 'interviewScheduled' },
  { key: 'Offer Sent', labelKey: 'offerSent' },
  { key: 'Rejected', labelKey: 'rejected' },
];

export default function MyApplicationsClient() {
  const { language, changeLanguage, t } = useLanguage();
  const locale = language === 'vi' ? 'vi-VN' : 'en-US';
  const tabs = tabKeys.map(tab => ({ key: tab.key, label: t.applications[tab.labelKey] }));
  const [activeTab, setActiveTab] = useState<StatusTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

  const filteredApps = mockApplications.filter((app) => {
    const matchesTab = activeTab === 'all' || app.status === activeTab;
    const matchesSearch =
      !searchQuery ||
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getTabCount = (tab: StatusTab) => {
    if (tab === 'all') return mockApplications.length;
    return mockApplications.filter(a => a.status === tab).length;
  };

  const handleViewDetail = (app: Application) => {
    setSelectedApp(app);
    setIsDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <PortalSidebar t={t} unreadCount={unreadCount} />

      <div className="flex-1 flex flex-col lg:pl-60 transition-all duration-300">
        <PortalTopbar language={language} onLanguageChange={changeLanguage} t={t} />

        <main className="flex-1 pt-16 p-4 lg:p-6 xl:p-8 max-w-screen-2xl w-full mx-auto" aria-label="My Applications">
          {/* Page Header */}
          <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t.myApplications.heading}</h1>
              <p className="text-sm text-muted-foreground mt-1 tab-number">
                {t.myApplications.totalCount(mockApplications.length)}
              </p>
            </div>
          </div>

          {/* Search + Filter Bar */}
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <div className="flex-1 min-w-[220px] flex items-center gap-2 px-3 py-2.5 border border-border rounded-xl bg-card focus-within:ring-2 focus-within:ring-ring focus-within:border-primary transition-all">
              <Search size={15} className="text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                placeholder={t.myApplications.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 text-sm bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                aria-label="Search applications"
              />
            </div>
            <div className="flex items-center gap-2 px-3 py-2.5 border border-border rounded-xl bg-card text-sm text-muted-foreground cursor-pointer hover:bg-muted transition-colors">
              <Filter size={14} />
              <span>{t.myApplications.filters}</span>
              <ChevronDown size={13} />
            </div>
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide mb-5 bg-card border border-border rounded-xl p-1" role="tablist" aria-label="Application status filters">
            {tabs.map((tab) => {
              const count = getTabCount(tab.key);
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={`tab-${tab.key}`}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    isActive
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {tab.label}
                  {count > 0 && (
                    <span className={`tab-number text-xs px-1.5 py-0.5 rounded-pill font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Applications List */}
          {filteredApps.length === 0 ? (
            <div className="bg-card border border-border rounded-xl p-12 text-center">
              <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText size={24} className="text-muted-foreground" />
              </div>
              <h3 className="font-bold text-foreground text-base mb-2">
                {activeTab === 'all' ? t.myApplications.emptyAllHeading : t.myApplications.emptyStatusHeading(tabs.find(tb => tb.key === activeTab)?.label ?? '')}
              </h3>
              <p className="text-sm text-muted-foreground mb-5 max-w-sm mx-auto">
                {activeTab === 'all' ? t.myApplications.emptyAllBody : t.myApplications.emptyStatusBody}
              </p>
              {activeTab === 'all' && (
                <a href="/find-jobs-page" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95">
                  {t.myApplications.exploreJobs}
                </a>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredApps.map((app) => (
                <ApplicationCard key={app.id} app={app} onViewDetail={handleViewDetail} t={t} locale={locale} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {filteredApps.length > 0 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground tab-number">
                {t.myApplications.showingCount(filteredApps.length, mockApplications.length)}
              </p>
              <div className="flex items-center gap-1">
                <button disabled className="px-3 py-2 text-sm border border-border rounded-lg text-muted-foreground opacity-40 cursor-not-allowed">{t.findJobs.previous}</button>
                <button className="w-9 h-9 text-sm rounded-lg font-medium bg-primary text-white tab-number" aria-current="page">1</button>
                <button disabled className="px-3 py-2 text-sm border border-border rounded-lg text-muted-foreground opacity-40 cursor-not-allowed">{t.findJobs.next}</button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Application Detail Drawer */}
      {isDrawerOpen && selectedApp && (
        <ApplicationDetailDrawer
          application={selectedApp}
          onClose={() => { setIsDrawerOpen(false); setSelectedApp(null); }}
          t={t}
          language={language}
        />
      )}
    </div>
  );
}

// ── Inline ApplicationCard component ──────────────────────────────────────────
function ApplicationCard({ app, onViewDetail, t, locale }: { app: Application; onViewDetail: (app: Application) => void; t: TranslationKeys; locale: string }) {
  const initials = app.company.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  const companyColors: Record<string, string> = {
    'VNG Corporation': 'bg-blue-100 text-blue-700',
    'Tiki Corporation': 'bg-red-100 text-red-700',
    'Shopee Vietnam': 'bg-orange-100 text-orange-700',
    'MoMo': 'bg-purple-100 text-purple-700',
    'Grab Vietnam': 'bg-green-100 text-green-700',
    'ZaloPay': 'bg-blue-100 text-blue-800',
  };
  const colorClass = companyColors[app.company] || 'bg-muted text-muted-foreground';

  return (
    <article
      className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-card-hover transition-all duration-200 cursor-pointer group"
      onClick={() => onViewDetail(app)}
      aria-label={`Application: ${app.jobTitle} at ${app.company}, status: ${app.status}`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${colorClass}`}>
          {initials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="min-w-0">
              <h3 className="font-bold text-foreground text-base leading-tight group-hover:text-primary transition-colors">
                {app.jobTitle}
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">{app.company}</p>
            </div>
            <StatusBadge status={app.status} t={t} />
          </div>

          <div className="flex flex-wrap gap-3 mt-2.5">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin size={12} />
              <span>{app.location}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <DollarSign size={12} />
              <span>{app.salary}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar size={12} />
              <span>{t.myApplications.appliedOn(new Date(app.appliedDate).toLocaleDateString(locale))}</span>
            </div>
          </div>

          {/* Mini Timeline */}
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
              {app.timeline.map((stage, idx) => (
                <div key={`mini-timeline-${app.id}-${idx}`} className="flex items-center gap-1 flex-shrink-0">
                  <div className={`w-2 h-2 rounded-full ${stage.completed ? (stage.active ? 'bg-primary' : 'bg-success') : 'bg-muted'}`} aria-hidden="true" />
                  <span className={`text-xs font-medium ${stage.active ? 'text-primary' : stage.completed ? 'text-muted-foreground' : 'text-muted'}`}>
                    {t.applications[statusLabelKeys[stage.stage as ApplicationStatus] || 'applied']}
                  </span>
                  {idx < app.timeline.length - 1 && (
                    <div className={`w-4 h-0.5 ${stage.completed ? 'bg-success' : 'bg-border'}`} aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 hidden sm:flex flex-col items-end gap-2">
          <p className="text-xs text-muted-foreground tab-number">
            {t.myApplications.updatedOn(new Date(app.lastUpdated).toLocaleDateString(locale))}
          </p>
          <button
            onClick={(e) => { e.stopPropagation(); onViewDetail(app); }}
            className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-2 py-1 hover:bg-info-bg"
          >
            {t.jobCard.viewDetails}
          </button>
        </div>
      </div>
    </article>
  );
}