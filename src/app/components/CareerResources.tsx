import React from 'react';

import { FileText, Mic, TrendingUp, DollarSign, Search, ArrowRight } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';
import { TranslationKeys } from '@/lib/i18n';


export default function CareerResources({ t }: { t: TranslationKeys }) {
  const resources = [
    { icon: FileText, title: t.careerResources.r1Title, description: t.careerResources.r1Description, color: 'bg-blue-50 text-blue-600', tag: t.careerResources.r1Tag },
    { icon: Mic, title: t.careerResources.r2Title, description: t.careerResources.r2Description, color: 'bg-purple-50 text-purple-600', tag: t.careerResources.r2Tag },
    { icon: TrendingUp, title: t.careerResources.r3Title, description: t.careerResources.r3Description, color: 'bg-green-50 text-green-600', tag: null },
    { icon: DollarSign, title: t.careerResources.r4Title, description: t.careerResources.r4Description, color: 'bg-emerald-50 text-emerald-600', tag: null },
    { icon: Search, title: t.careerResources.r5Title, description: t.careerResources.r5Description, color: 'bg-orange-50 text-orange-600', tag: null },
  ];

  return (
    <section id="career-resources" className="section-padding bg-muted/30" aria-labelledby="career-resources-heading">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10">
        <div className="text-center mb-10">
          <h2 id="career-resources-heading" className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
            {t.careerResources.heading}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {resources?.map((resource) => {
            const Icon = resource?.icon;
            return (
              <div key={`resource-${resource?.title}`} className="bg-card border border-border rounded-xl p-5 card-hover group relative">
                {resource?.tag && (
                  <span className="absolute top-3 right-3 text-xs font-semibold bg-primary text-white px-2 py-0.5 rounded-pill">
                    {resource?.tag}
                  </span>
                )}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${resource?.color}`}>
                  <Icon size={18} />
                </div>
                <h3 className="font-bold text-foreground text-sm mb-2">{resource?.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{resource?.description}</p>
                <button className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">
                  {t.careerResources.readMore} <ArrowRight size={12} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}