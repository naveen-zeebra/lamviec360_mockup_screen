import React from 'react';
import Link from 'next/link';


const locations = [
  { id: 'loc-hcm', name: 'Hồ Chí Minh', count: 4521, emoji: '🏙️' },
  { id: 'loc-hn', name: 'Hà Nội', count: 3214, emoji: '🏛️' },
  { id: 'loc-dn', name: 'Đà Nẵng', count: 876, emoji: '🌊' },
  { id: 'loc-hp', name: 'Hải Phòng', count: 432, emoji: '⚓' },
  { id: 'loc-ct', name: 'Cần Thơ', count: 287, emoji: '🌾' },
  { id: 'loc-remote', name: 'Remote', count: 1245, emoji: '🌐' },
];

export default function PopularLocations() {
  return (
    <section className="section-padding bg-background" aria-labelledby="locations-heading">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10">
        <div className="text-center mb-8">
          <h2 id="locations-heading" className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Khám Phá Việc Làm Theo Địa Điểm
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {locations?.map((loc) => (
            <Link
              key={loc?.id}
              href="/find-jobs-page"
              className="group bg-card border border-border rounded-xl p-4 card-hover text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`${loc?.name} - ${loc?.count?.toLocaleString()} việc làm`}
            >
              <div className="text-3xl mb-2">{loc?.emoji}</div>
              <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors mb-1">{loc?.name}</h3>
              <p className="text-xs text-muted-foreground tab-number">{loc?.count?.toLocaleString()} việc làm</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}