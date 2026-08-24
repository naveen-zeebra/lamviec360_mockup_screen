import React from 'react';
import { CheckCircle, Clock, Star, Calendar, Gift, Trophy, XCircle } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';
import { TranslationKeys } from '@/lib/i18n';


export type ApplicationStatus = 'Applied' | 'Under Review' | 'Shortlisted' | 'Interview Scheduled' | 'Offer Sent' | 'Hired' | 'Rejected';

interface StatusBadgeProps {
  status: ApplicationStatus;
  t: TranslationKeys;
  size?: 'sm' | 'md';
}

export const statusLabelKeys: Record<ApplicationStatus, keyof TranslationKeys['applications']> = {
  'Applied': 'applied',
  'Under Review': 'underReview',
  'Shortlisted': 'shortlisted',
  'Interview Scheduled': 'interviewScheduled',
  'Offer Sent': 'offerSent',
  'Hired': 'hired',
  'Rejected': 'rejected',
};

const statusConfig: Record<ApplicationStatus, { labelKey: keyof TranslationKeys['applications']; icon: React.ElementType; className: string }> = {
  'Applied': { labelKey: 'applied', icon: CheckCircle, className: 'bg-info-bg text-info' },
  'Under Review': { labelKey: 'underReview', icon: Clock, className: 'bg-warning-bg text-warning-foreground' },
  'Shortlisted': { labelKey: 'shortlisted', icon: Star, className: 'bg-purple-50 text-purple-700' },
  'Interview Scheduled': { labelKey: 'interviewScheduled', icon: Calendar, className: 'bg-blue-50 text-blue-700' },
  'Offer Sent': { labelKey: 'offerSent', icon: Gift, className: 'bg-success-bg text-success-foreground' },
  'Hired': { labelKey: 'hired', icon: Trophy, className: 'bg-success-bg text-success-foreground' },
  'Rejected': { labelKey: 'rejected', icon: XCircle, className: 'bg-error-bg text-error-foreground' },
};

export default function StatusBadge({ status, t, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;
  const label = t.applications[config.labelKey];

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-pill ${config.className} ${
        size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1'
      }`}
      aria-label={`Status: ${label}`}
    >
      <Icon size={size === 'sm' ? 11 : 12} />
      {label}
    </span>
  );
}