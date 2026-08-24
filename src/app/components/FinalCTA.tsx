import React from 'react';
import Link from 'next/link';
import { ArrowRight, UserCircle, Search } from 'lucide-react';
import { TranslationKeys } from '@/lib/i18n';

export default function FinalCTA({ t }: { t: TranslationKeys }) {
  return (
    <section className="section-padding bg-background" aria-labelledby="final-cta-heading">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10">
        <div className="bg-gradient-to-br from-primary to-blue-700 rounded-3xl p-10 lg:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/5 rounded-full" />
          </div>
          <div className="relative">
            <p className="text-xs font-semibold text-white/70 uppercase tracking-widest mb-3">{t.finalCta.eyebrow}</p>
            <h2 id="final-cta-heading" className="text-3xl lg:text-5xl font-bold text-white mb-4">
              {t.finalCta.heading}
            </h2>
            <p className="text-base text-white/80 mb-8 max-w-lg mx-auto">
              {t.finalCta.subheading}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/sign-up-login-screen"
                className="flex items-center gap-2 px-7 py-3.5 bg-white text-primary font-bold rounded-xl hover:bg-white/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95 text-sm"
              >
                <UserCircle size={17} />
                {t.finalCta.createProfile}
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/find-jobs-page"
                className="flex items-center gap-2 px-7 py-3.5 border-2 border-white/40 text-white font-semibold rounded-xl hover:border-white/70 hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white text-sm"
              >
                <Search size={17} />
                {t.finalCta.exploreJobs}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}