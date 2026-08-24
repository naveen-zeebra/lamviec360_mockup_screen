'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import JobCard from '@/components/JobCard';
import { mockJobs } from '@/lib/mockData';

interface FeaturedJobsProps {
  t: { jobs: Record<string, string> };
}

export default function FeaturedJobs({ t }: FeaturedJobsProps) {
  const featuredJobs = mockJobs.slice(0, 6);

  return (
    <section className="section-padding bg-muted/30" aria-labelledby="featured-jobs-heading">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">Cơ Hội Nổi Bật</p>
            <h2 id="featured-jobs-heading" className="text-3xl lg:text-4xl font-bold text-foreground">
              Việc Làm Bạn Có Thể Quan Tâm
            </h2>
            <p className="text-base text-muted-foreground mt-2">
              Khám phá các cơ hội được chọn lọc từ các công ty đang tuyển dụng.
            </p>
          </div>
          <Link
            href="/find-jobs-page"
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors whitespace-nowrap"
          >
            Xem tất cả <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {featuredJobs.map((job) => (
            <JobCard key={job.id} job={job} variant="featured" />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/find-jobs-page"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
          >
            Khám Phá Tất Cả Việc Làm
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}