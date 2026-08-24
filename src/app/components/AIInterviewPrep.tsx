'use client';
import React from 'react';
import { Sparkles, CheckCircle, Lock } from 'lucide-react';
import { TranslationKeys } from '@/lib/i18n';

interface AIInterviewPrepProps {
  onOpenModal: () => void;
  t: TranslationKeys;
}

export default function AIInterviewPrep({ onOpenModal, t }: AIInterviewPrepProps) {
  const features = t.interviewPreparation.features;
  return (
    <section className="section-padding coming-soon-bg" aria-labelledby="ai-interview-heading">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-300 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-pill mb-6">
            <Sparkles size={13} />
            {t.interviewPreparation.comingSoon}
          </div>
          <h2 id="ai-interview-heading" className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {t.interviewPreparation.title}
          </h2>
          <p className="text-base text-white/70 mb-8 leading-relaxed">
            {t.interviewPreparation.cardDescription}
          </p>
          <div className="grid grid-cols-2 gap-3 mb-8 max-w-sm mx-auto">
            {features.map((feature) => (
              <div key={`ai-feature-${feature}`} className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2.5 text-left">
                <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
                <span className="text-xs text-white/80 font-medium">{feature}</span>
              </div>
            ))}
          </div>
          <button
            onClick={onOpenModal}
            className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-foreground font-semibold rounded-xl hover:bg-yellow-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 active:scale-95"
            aria-label="AI Interview Preparation - Coming Soon. Click to learn more."
          >
            <Lock size={16} />
            {t.interviewPreparation.comingSoon} — {t.common.learnMore}
          </button>
        </div>
      </div>
    </section>
  );
}