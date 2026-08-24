'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';
import { mockApplications } from '@/lib/mockData';

export default function RecentApplications() {
  const recent = mockApplications?.slice(0, 4);

  return (
    <section aria-labelledby="recent-apps-heading">
      <div className="flex items-center justify-between mb-3">
        <h2 id="recent-apps-heading" className="font-bold text-foreground text-base">
          Đơn Ứng Tuyển Gần Đây
        </h2>
        <Link
          href="/my-applications"
          className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        >
          Xem tất cả <ArrowRight size={13} />
        </Link>
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {recent?.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">Bạn chưa nộp đơn ứng tuyển nào.</p>
            <Link href="/find-jobs-page" className="inline-flex mt-3 text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
              Khám phá việc làm
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {recent?.map((app) => (
              <div key={app?.id} className="flex items-center justify-between px-4 py-3.5 hover:bg-muted/50 transition-colors group">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {app?.company?.split(' ')?.map(w => w?.[0])?.join('')?.slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{app?.jobTitle}</p>
                    <p className="text-xs text-muted-foreground truncate">{app?.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                  <StatusBadge status={app?.status} size="sm" />
                  <span className="text-xs text-muted-foreground hidden sm:block tab-number">
                    {new Date(app.appliedDate)?.toLocaleDateString('vi-VN')}
                  </span>
                  <Link
                    href="/my-applications"
                    className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  >
                    Chi tiết
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}