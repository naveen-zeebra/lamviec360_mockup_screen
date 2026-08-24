import React from 'react';
import { Star, Search, UserCircle, Zap, BarChart3, Bell } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';
import { TranslationKeys } from '@/lib/i18n';


export default function JobSeekerBenefits({ t }: { t: TranslationKeys }) {
  const benefits = [
    { icon: Star, title: t.jobSeekerBenefits.b1Title, description: t.jobSeekerBenefits.b1Description, color: 'text-yellow-500 bg-yellow-50' },
    { icon: Search, title: t.jobSeekerBenefits.b2Title, description: t.jobSeekerBenefits.b2Description, color: 'text-blue-500 bg-blue-50' },
    { icon: UserCircle, title: t.jobSeekerBenefits.b3Title, description: t.jobSeekerBenefits.b3Description, color: 'text-purple-500 bg-purple-50' },
    { icon: Zap, title: t.jobSeekerBenefits.b4Title, description: t.jobSeekerBenefits.b4Description, color: 'text-green-500 bg-green-50' },
    { icon: BarChart3, title: t.jobSeekerBenefits.b5Title, description: t.jobSeekerBenefits.b5Description, color: 'text-orange-500 bg-orange-50' },
    { icon: Bell, title: t.jobSeekerBenefits.b6Title, description: t.jobSeekerBenefits.b6Description, color: 'text-pink-500 bg-pink-50' },
  ];

  return (
    <section className="section-padding bg-background" aria-labelledby="benefits-heading">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10">
        <div className="text-center mb-10">
          <h2 id="benefits-heading" className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
            {t.jobSeekerBenefits.heading}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits?.map((benefit) => {
            const Icon = benefit?.icon;
            return (
              <div
                key={`benefit-${benefit?.title}`}
                className="bg-card border border-border rounded-xl p-6 card-hover"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${benefit?.color}`}>
                  <Icon size={20} />
                </div>
                <h3 className="font-bold text-foreground text-base mb-2">{benefit?.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit?.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}