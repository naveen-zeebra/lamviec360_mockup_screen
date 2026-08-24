'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import { LayoutDashboard, Search, Star, Bookmark, FileText, Bell, Mic, User, Settings, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface PortalSidebarProps {
  t: { navigation: Record<string, string> };
  unreadCount?: number;
}

export default function PortalSidebar({ t, unreadCount = 0 }: PortalSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const companySiteUrl = process.env.NEXT_PUBLIC_COMPANY_SITE_URL || '/company';

  const navItems = [
    { href: '/job-seeker-dashboard', label: t.navigation.dashboard, icon: LayoutDashboard, badge: null },
    { href: '/find-jobs-page', label: t.navigation.findJobs, icon: Search, badge: null },
    { href: '#recommended', label: t.navigation.recommended, icon: Star, badge: null },
    { href: '#saved', label: t.navigation.savedJobs, icon: Bookmark, badge: '28' },
    { href: '/my-applications', label: t.navigation.applications, icon: FileText, badge: '6' },
    { href: '#notifications', label: t.navigation.notifications, icon: Bell, badge: unreadCount > 0 ? String(unreadCount) : null },
    { href: '#interview-prep', label: t.navigation.interviewPrep, icon: Mic, badge: 'soon', isComingSoon: true },
  ];

  const bottomItems = [
    { href: '#profile', label: t.navigation.myProfile, icon: User },
    { href: '#settings', label: t.navigation.settings, icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === '/job-seeker-dashboard' && pathname === '/job-seeker-dashboard') return true;
    if (href === '/my-applications' && pathname === '/my-applications') return true;
    if (href === '/find-jobs-page' && pathname === '/find-jobs-page') return true;
    return false;
  };

  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 z-40 flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-60'
      }`}
      aria-label="Portal navigation"
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-3 border-b border-sidebar-border flex-shrink-0">
        <Link href="/job-seeker-dashboard" className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md" aria-label="LamViec360 Dashboard">
          <AppLogo src="/assets/images/lamviec-logo-none-1787565498437.png" size={32} />
          {!isCollapsed && (
            <span className="font-bold text-base text-foreground truncate">LamViec360</span>
          )}
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5" aria-label="Main navigation">
        {!isCollapsed && (
          <p className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Menu</p>
        )}
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={`sidebar-${item.href}-${item.label}`}
              href={item.href}
              title={isCollapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring group ${
                active
                  ? 'bg-info-bg text-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              aria-current={active ? 'page' : undefined}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.badge === 'soon' ? (
                    <span className="text-xs bg-warning-bg text-warning-foreground font-medium px-1.5 py-0.5 rounded-pill">
                      Soon
                    </span>
                  ) : item.badge ? (
                    <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-pill tab-number ${
                      item.href === '#notifications' ? 'bg-error text-white' : 'bg-muted text-muted-foreground'
                    }`}>
                      {item.badge}
                    </span>
                  ) : null}
                </>
              )}
              {isCollapsed && item.badge && item.badge !== 'soon' && (
                <span className="absolute left-8 top-1 w-4 h-4 bg-error text-white text-xs rounded-full flex items-center justify-center tab-number">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        <div className="border-t border-border my-2" />

        {!isCollapsed && (
          <p className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Account</p>
        )}
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={`sidebar-bottom-${item.label}`}
              href={item.href}
              title={isCollapsed ? item.label : undefined}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Icon size={18} className="flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Company Site + Collapse */}
      <div className="flex-shrink-0 p-2 border-t border-sidebar-border space-y-1">
        {!isCollapsed && (
          <a
            href={companySiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            <ExternalLink size={14} />
            <span>Company Site</span>
          </a>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight size={16} /> : (
            <>
              <ChevronLeft size={16} />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}