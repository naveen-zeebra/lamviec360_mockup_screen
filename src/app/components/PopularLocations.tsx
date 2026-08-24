import React from 'react';
import Link from 'next/link';
import { TranslationKeys } from '@/lib/i18n';


export default function PopularLocations({ t }: { t: TranslationKeys }) {
  const locations = [
    { id: 'loc-hcm', name: t.popularLocations.hcm, count: 4521, emoji: '🏙️' },
    { id: 'loc-hn', name: t.popularLocations.hanoi, count: 3214, emoji: '🏛️' },
    { id: 'loc-dn', name: t.popularLocations.danang, count: 876, emoji: '🌊' },
    { id: 'loc-hp', name: t.popularLocations.haiphong, count: 432, emoji: '⚓' },
    { id: 'loc-ct', name: t.popularLocations.cantho, count: 287, emoji: '🌾' },
    { id: 'loc-remote', name: t.popularLocations.remote, count: 1245, emoji: '🌐' },
  ];

  return (
    <section className="section-padding bg-background" aria-labelledby="locations-heading">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10">
        <div className="text-center mb-8">
          <h2 id="locations-heading" className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
            {t.popularLocations.heading}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {locations?.map((loc) => (
            <Link
              key={loc?.id}
              href="/find-jobs-page"
              className="group bg-card border border-border rounded-xl p-4 card-hover text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`${loc?.name} - ${loc?.count?.toLocaleString()} ${t.popularLocations.jobsSuffix}`}
            >
              <div className="text-3xl mb-2">{loc?.emoji}</div>
              <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors mb-1">{loc?.name}</h3>
              <p className="text-xs text-muted-foreground tab-number">{loc?.count?.toLocaleString()} {t.popularLocations.jobsSuffix}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}