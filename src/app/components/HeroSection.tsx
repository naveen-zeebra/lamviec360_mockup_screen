'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ArrowRight } from 'lucide-react';
import { TranslationKeys } from '@/lib/i18n';

interface HeroSectionProps {
  t: TranslationKeys;
}

export default function HeroSection({ t }: HeroSectionProps) {
  const [keyword, setKeyword] = useState('');

  return (
    <section className="bg-white min-h-[calc(100vh-4rem)] flex items-center pt-16 relative overflow-hidden" aria-label="Hero section">
      <div className="relative max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 py-16 lg:py-20 w-full">
        <div className="max-w-xl mx-auto text-center flex flex-col items-center gap-7">
          {/* Eyebrow */}
          <p className="text-xs font-semibold text-primary uppercase tracking-widest">
            {t.hero.eyebrow}
          </p>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight tracking-tight">
            {t.hero.headline1}
            <br />
            <span className="text-primary">{t.hero.headlineHighlight}</span>
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
            {t.hero.subtext}
          </p>

          {/* Search */}
          <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-1.5 bg-card border border-border rounded-2xl sm:rounded-pill p-2 sm:pl-5 shadow-modal">
            <div className="flex-1 flex items-center gap-3 px-2 sm:px-0">
              <Search size={18} className="text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                placeholder={t.jobs.jobTitle}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none py-2.5 sm:py-3"
                aria-label={t.jobs.jobTitle}
              />
            </div>
            <Link
              href="/find-jobs-page"
              className="flex-shrink-0 flex items-center justify-center px-6 py-3 bg-primary text-white text-sm font-semibold rounded-xl sm:rounded-pill hover:bg-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95 whitespace-nowrap"
            >
              {t.jobs.search}
            </Link>
          </div>

          {/* Secondary action */}
          <Link
            href="/find-jobs-page"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            {t.hero.browseAllJobs}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
