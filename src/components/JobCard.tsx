'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Briefcase, Clock, Bookmark, BookmarkCheck, DollarSign, Building2 } from 'lucide-react';
import { Job } from '@/lib/mockData';


interface JobCardProps {
  job: Job;
  variant?: 'default' | 'featured' | 'compact';
  showMatchPercent?: boolean;
}

const companyColors: Record<string, string> = {
  'VNG Corporation': 'bg-blue-100 text-blue-700',
  'Tiki Corporation': 'bg-red-100 text-red-700',
  'Shopee Vietnam': 'bg-orange-100 text-orange-700',
  'MoMo': 'bg-purple-100 text-purple-700',
  'Grab Vietnam': 'bg-green-100 text-green-700',
  'Lazada Vietnam': 'bg-indigo-100 text-indigo-700',
  'FPT Software': 'bg-cyan-100 text-cyan-700',
  'ZaloPay': 'bg-blue-100 text-blue-800',
  'Sendo': 'bg-pink-100 text-pink-700',
  'Vingroup': 'bg-emerald-100 text-emerald-700',
};

export default function JobCard({ job, variant = 'default', showMatchPercent }: JobCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const initials = job.company.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const colorClass = companyColors[job.company] || 'bg-muted text-muted-foreground';

  const workModeColor = {
    Remote: 'bg-success-bg text-success-foreground',
    Hybrid: 'bg-info-bg text-info',
    'On-site': 'bg-muted text-muted-foreground',
  }[job.workMode];

  const postedDaysAgo = () => {
    const posted = new Date(job.postedDate);
    const now = new Date('2026-08-24');
    const diff = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Hôm nay';
    if (diff === 1) return '1 ngày trước';
    return `${diff} ngày trước`;
  };

  return (
    <article
      className="bg-card border border-border rounded-xl p-5 card-hover group relative"
      aria-label={`Job: ${job.title} at ${job.company}`}
    >
      {job.isFeatured && (
        <span className="absolute top-3 right-3 text-xs font-semibold bg-warning-bg text-warning-foreground px-2 py-0.5 rounded-pill">
          Nổi bật
        </span>
      )}

      <div className="flex items-start gap-3">
        {/* Company Logo */}
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${colorClass}`}>
          {initials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              {showMatchPercent && job.matchPercent && (
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-xs font-bold text-success-foreground bg-success-bg px-2 py-0.5 rounded-pill">
                    {job.matchPercent}% phù hợp
                  </span>
                </div>
              )}
              <h3 className="font-semibold text-foreground text-base leading-tight hover:text-primary transition-colors line-clamp-1">
                <Link href="/job-details-page" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">
                  {job.title}
                </Link>
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Building2 size={12} className="text-muted-foreground flex-shrink-0" />
                <span className="text-sm text-muted-foreground truncate">{job.company}</span>
                {job.isVerified && (
                  <span className="text-xs text-primary font-medium">✓ Đã xác minh</span>
                )}
              </div>
            </div>

            <button
              onClick={() => setIsSaved(!isSaved)}
              className="flex-shrink-0 p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-info-bg transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
              aria-label={isSaved ? `Bỏ lưu ${job.title}` : `Lưu ${job.title}`}
            >
              {isSaved ? (
                <BookmarkCheck size={18} className="text-primary animate-pulse-once" />
              ) : (
                <Bookmark size={18} />
              )}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-2.5">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin size={12} />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <DollarSign size={12} />
              <span className="font-medium text-foreground">{job.salary}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Briefcase size={12} />
              <span>{job.experience}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-2.5">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-pill ${workModeColor}`}>
              {job.workMode}
            </span>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-pill">
              {job.employmentType}
            </span>
            {job.skills.slice(0, 3).map((skill) => (
              <span key={`skill-${job.id}-${skill}`} className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-pill">
                {skill}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock size={12} />
              <span>{postedDaysAgo()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/job-details-page"
                className="px-3 py-1.5 text-xs font-semibold border border-border text-foreground hover:border-primary hover:text-primary rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Xem chi tiết
              </Link>
              <Link
                href="/sign-up-login-screen"
                className="px-3 py-1.5 text-xs font-semibold bg-primary text-primary-foreground rounded-md hover:bg-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
              >
                Ứng tuyển
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}