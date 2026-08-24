'use client';
import React from 'react';
import Link from 'next/link';
import { CheckCircle, Circle } from 'lucide-react';
import { TranslationKeys } from '@/lib/i18n';

const completionPercent = 85;

export default function ProfileCompletionCard({ t }: { t: TranslationKeys }) {
  const completionItems = [
    { label: t.dashboard.itemPersonalInfo, done: true },
    { label: t.dashboard.itemCareerInfo, done: true },
    { label: t.dashboard.itemWorkExperience, done: true },
    { label: t.dashboard.itemEducation, done: true },
    { label: t.dashboard.itemSkills, done: true },
    { label: t.dashboard.itemResume, done: false },
    { label: t.dashboard.itemPhoto, done: false },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-foreground text-sm">{t.dashboard.profileCompletionHeading}</h2>
        <span className="text-sm font-bold text-primary tab-number">{completionPercent}%</span>
      </div>
      <div className="mb-4">
        <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden" role="progressbar" aria-valuenow={completionPercent} aria-valuemin={0} aria-valuemax={100} aria-label={`Profile ${completionPercent}% complete`}>
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1.5">{t.dashboard.profileCompletionHint}</p>
      </div>
      <div className="space-y-2 mb-4">
        {completionItems?.map((item) => (
          <div key={`profile-item-${item?.label}`} className="flex items-center gap-2">
            {item?.done ? (
              <CheckCircle size={14} className="text-success flex-shrink-0" />
            ) : (
              <Circle size={14} className="text-muted-foreground flex-shrink-0" />
            )}
            <span className={`text-xs ${item?.done ? 'text-foreground' : 'text-muted-foreground'}`}>{item?.label}</span>
            {!item?.done && (
              <span className="ml-auto text-xs text-warning-foreground bg-warning-bg px-1.5 py-0.5 rounded-pill font-medium">{t.dashboard.missing}</span>
            )}
          </div>
        ))}
      </div>
      <Link
        href="#profile"
        className="w-full flex items-center justify-center py-2.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
      >
        {t.dashboard.completeNow}
      </Link>
    </div>
  );
}