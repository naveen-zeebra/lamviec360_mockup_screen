'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

import LanguageSelector from './LanguageSelector';
import { Language } from '@/lib/i18n';
import { Bell, ChevronDown, User, Settings, HelpCircle, LogOut, ExternalLink } from 'lucide-react';
import { mockNotifications } from '@/lib/mockData';
import { TranslationKeys } from '@/lib/i18n';

interface PortalTopbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  t: TranslationKeys;
  sidebarCollapsed?: boolean;
}

export default function PortalTopbar({ language, onLanguageChange, t, sidebarCollapsed }: PortalTopbarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const companySiteUrl = process.env.NEXT_PUBLIC_COMPANY_SITE_URL || '/company';

  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setIsProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setIsNotifOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 z-30 bg-card border-b border-border h-16 flex items-center transition-all duration-300 ${
        sidebarCollapsed ? 'left-16' : 'left-60'
      }`}
      role="banner"
    >
      <div className="flex items-center justify-between w-full px-4 lg:px-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground hidden md:block">
            {t.portalTopbar.greetingPrefix} <span className="font-semibold text-foreground">Nguyễn Minh Anh</span> 👋
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Company Site */}
          <a
            href={companySiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium border border-border rounded-md text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Go to Company Site"
          >
            {t.navigation.companySite}
            <ExternalLink size={13} />
          </a>

          {/* Language */}
          <LanguageSelector currentLanguage={language} onLanguageChange={onLanguageChange} />

          {/* Notifications */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`Notifications, ${unreadCount} unread`}
              aria-expanded={isNotifOpen}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-error text-white text-xs font-bold rounded-full flex items-center justify-center tab-number">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-80 bg-card border border-border rounded-xl shadow-modal z-50 animate-fade-in">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <h3 className="font-semibold text-foreground text-sm">{t.portalTopbar.notifications}</h3>
                  <button className="text-xs text-primary hover:text-primary-dark font-medium">{t.portalTopbar.markAllRead}</button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {mockNotifications.slice(0, 4).map((notif) => (
                    <div
                      key={`notif-${notif.id}`}
                      className={`px-4 py-3 border-b border-border last:border-0 hover:bg-muted transition-colors cursor-pointer ${
                        !notif.isRead ? 'bg-info-bg/30' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${!notif.isRead ? 'bg-primary' : 'bg-transparent'}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground line-clamp-1">{notif.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{notif.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notif.timestamp.split('T')[0]}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 border-t border-border">
                  <Link href="#notifications" className="text-sm text-primary hover:text-primary-dark font-medium" onClick={() => setIsNotifOpen(false)}>
                    {t.portalTopbar.viewAllNotifications}
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1.5 rounded-md hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Profile menu"
              aria-expanded={isProfileOpen}
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
                NM
              </div>
              <ChevronDown size={14} className={`text-muted-foreground transition-transform duration-200 hidden sm:block ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-52 bg-card border border-border rounded-xl shadow-modal z-50 py-1 animate-fade-in">
                <div className="px-4 py-3 border-b border-border">
                  <p className="font-semibold text-foreground text-sm">Nguyễn Minh Anh</p>
                  <p className="text-xs text-muted-foreground">minhanh@gmail.com</p>
                </div>
                {[
                  { label: t.navigation.myProfile, icon: User, href: '#profile' },
                  { label: t.navigation.settings, icon: Settings, href: '#settings' },
                  { label: t.portalTopbar.helpSupport, icon: HelpCircle, href: '#help' },
                ].map((item) => (
                  <Link
                    key={`profile-menu-${item.label}`}
                    href={item.href}
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                  >
                    <item.icon size={15} className="text-muted-foreground" />
                    {item.label}
                  </Link>
                ))}
                <div className="border-t border-border mt-1 pt-1">
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-error-bg transition-colors">
                    <LogOut size={15} />
                    {t.portalTopbar.logout}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}