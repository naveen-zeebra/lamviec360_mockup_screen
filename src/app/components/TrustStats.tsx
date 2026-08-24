import React from 'react';
import { TranslationKeys } from '@/lib/i18n';

export default function TrustStats({ t }: { t: TranslationKeys }) {
  const stats = [
    { value: '10K+', label: t.trustStats.jobsOpen, color: 'text-primary' },
    { value: '5K+', label: t.trustStats.companiesPartner, color: 'text-success' },
    { value: '50K+', label: t.trustStats.candidatesRegistered, color: 'text-warning' },
    { value: '1M+', label: t.trustStats.applicationsSubmitted, color: 'text-error' },
  ];

  return (
    <section className="bg-card border-y border-border py-12" aria-label="Platform statistics">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10">
        <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">
          {t.trustStats.eyebrow}
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats?.map((stat) => (
            <div key={`stat-${stat?.label}`} className="text-center">
              <div className={`text-4xl lg:text-5xl font-bold tab-number mb-1.5 ${stat?.color}`}>{stat?.value}</div>
              <div className="text-sm text-muted-foreground font-medium">{stat?.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}