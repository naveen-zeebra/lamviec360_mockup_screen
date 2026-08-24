'use client';
import React from 'react';
import Link from 'next/link';
import { Bell, Briefcase, FileText, Calendar, Settings, ArrowRight } from 'lucide-react';
import { mockNotifications } from '@/lib/mockData';
import Icon from '@/components/ui/AppIcon';


const typeIcons = {
  job: Briefcase,
  application: FileText,
  interview: Calendar,
  system: Settings,
};

export default function NotificationsPreview() {
  const recent = mockNotifications?.slice(0, 3);
  const unreadCount = recent?.filter(n => !n?.isRead)?.length;

  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-foreground text-sm">Thông Báo</h2>
          {unreadCount > 0 && (
            <span className="w-5 h-5 bg-error text-white text-xs font-bold rounded-full flex items-center justify-center tab-number">
              {unreadCount}
            </span>
          )}
        </div>
        <Link href="#notifications" className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">
          Tất cả <ArrowRight size={12} />
        </Link>
      </div>
      <div className="space-y-2.5">
        {recent?.map((notif) => {
          const Icon = typeIcons?.[notif?.type] || Bell;
          return (
            <div
              key={`dash-notif-${notif?.id}`}
              className={`flex items-start gap-2.5 p-2.5 rounded-lg transition-colors cursor-pointer hover:bg-muted ${!notif?.isRead ? 'bg-info-bg/40' : ''}`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${!notif?.isRead ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                <Icon size={13} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground line-clamp-1">{notif?.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{notif?.message}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}