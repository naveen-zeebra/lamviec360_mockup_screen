import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, DollarSign } from 'lucide-react';
import { mockJobs } from '@/lib/mockData';
import { TranslationKeys } from '@/lib/i18n';

export default function RecommendedPreview({ t }: { t: TranslationKeys }) {
  const recommended = mockJobs?.filter(j => j?.matchPercent)?.slice(0, 3);

  return (
    <section className="section-padding bg-muted/30" aria-labelledby="recommended-preview-heading">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">{t.recommendedPreview.eyebrow}</p>
            <h2 id="recommended-preview-heading" className="text-3xl lg:text-4xl font-bold text-foreground">
              {t.recommendedPreview.heading}
            </h2>
            <p className="text-base text-muted-foreground mt-2">
              {t.recommendedPreview.subheading}
            </p>
          </div>
          <Link
            href="/sign-up-login-screen"
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            {t.recommendedPreview.viewAll} <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recommended?.map((job) => (
            <div key={`rec-prev-${job?.id}`} className="bg-card border border-border rounded-xl p-5 card-hover relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary rounded-l-xl" aria-hidden="true" />
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-bold text-success-foreground bg-success-bg px-2.5 py-1 rounded-pill">
                  {t.recommendedPreview.matchLabel(job?.matchPercent ?? 0)}
                </span>
                <span className="text-xs text-muted-foreground">{job?.workMode}</span>
              </div>
              <h3 className="font-bold text-foreground text-base mb-1">{job?.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{job?.company}</p>
              <div className="flex flex-col gap-1.5 mb-4">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin size={12} />
                  <span>{job?.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <DollarSign size={12} />
                  <span className="font-medium text-foreground">{job?.salary}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {job?.skills?.slice(0, 4)?.map((skill) => (
                  <span key={`rec-skill-${job?.id}-${skill}`} className="text-xs bg-info-bg text-info px-2 py-0.5 rounded-pill font-medium">
                    {skill}
                  </span>
                ))}
              </div>
              <Link
                href="/sign-up-login-screen"
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
              >
                {t.recommendedPreview.applyNow}
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/sign-up-login-screen"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-info-bg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {t.recommendedPreview.createProfileCta}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}