'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import JobCard from '@/components/JobCard';
import { mockJobs } from '@/lib/mockData';

export default function RecommendedJobsSection() {
  const recommended = mockJobs?.filter(j => j?.matchPercent)?.slice(0, 4);

  return (
    <section aria-labelledby="recommended-section-heading">
      <div className="flex items-center justify-between mb-3">
        <h2 id="recommended-section-heading" className="font-bold text-foreground text-base">
          Việc Làm Đề Xuất Cho Bạn
        </h2>
        <Link
          href="/find-jobs-page"
          className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        >
          Xem tất cả <ArrowRight size={13} />
        </Link>
      </div>
      <div className="space-y-3">
        {recommended?.map((job) => (
          <JobCard key={job?.id} job={job} showMatchPercent />
        ))}
      </div>
    </section>
  );
}