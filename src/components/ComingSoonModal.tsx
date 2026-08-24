'use client';
import React, { useEffect } from 'react';
import { X, Sparkles, CheckCircle, Bell } from 'lucide-react';
import { TranslationKeys } from '@/lib/i18n';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: TranslationKeys;
}

export default function ComingSoonModal({ isOpen, onClose, t }: ComingSoonModalProps) {
  const features = t.interviewPreparation.features;
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="coming-soon-title"
    >
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative bg-card rounded-2xl shadow-modal w-full max-w-md animate-slide-up">
        <div className="coming-soon-bg rounded-t-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={20} className="text-yellow-400" />
              <span className="text-sm font-semibold text-yellow-400 uppercase tracking-wider">{t.interviewPreparation.comingSoon}</span>
            </div>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
          <h2 id="coming-soon-title" className="text-2xl font-bold mt-3">
            {t.interviewPreparation.title}
          </h2>
          <p className="text-white/80 text-sm mt-2">
            {t.interviewPreparation.description}
          </p>
        </div>

        <div className="p-6">
          <h3 className="font-semibold text-foreground text-sm mb-3">{t.interviewPreparation.featuresTitle}</h3>
          <ul className="space-y-2.5">
            {features.map((feature) => (
              <li key={`feature-${feature}`} className="flex items-center gap-2.5 text-sm text-foreground">
                <CheckCircle size={15} className="text-success flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-5 space-y-2.5">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
            >
              {t.common.gotIt}
            </button>
            <button
              className="w-full py-2.5 border border-border text-foreground font-medium rounded-lg hover:bg-muted transition-colors flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Bell size={15} />
              {t.interviewPreparation.notifyMe}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}