import React from 'react';
import { CheckCircle, Clock, Star, Calendar, Gift, Trophy, XCircle } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


type ApplicationStatus = 'Applied' | 'Under Review' | 'Shortlisted' | 'Interview Scheduled' | 'Offer Sent' | 'Hired' | 'Rejected';

interface StatusBadgeProps {
  status: ApplicationStatus;
  size?: 'sm' | 'md';
}

const statusConfig: Record<ApplicationStatus, { label: string; labelVi: string; icon: React.ElementType; className: string }> = {
  'Applied': { label: 'Applied', labelVi: 'Đã Nộp', icon: CheckCircle, className: 'bg-info-bg text-info' },
  'Under Review': { label: 'Under Review', labelVi: 'Đang Xem Xét', icon: Clock, className: 'bg-warning-bg text-warning-foreground' },
  'Shortlisted': { label: 'Shortlisted', labelVi: 'Được Chọn', icon: Star, className: 'bg-purple-50 text-purple-700' },
  'Interview Scheduled': { label: 'Interview', labelVi: 'Phỏng Vấn', icon: Calendar, className: 'bg-blue-50 text-blue-700' },
  'Offer Sent': { label: 'Offer Sent', labelVi: 'Nhận Offer', icon: Gift, className: 'bg-success-bg text-success-foreground' },
  'Hired': { label: 'Hired', labelVi: 'Được Tuyển', icon: Trophy, className: 'bg-success-bg text-success-foreground' },
  'Rejected': { label: 'Rejected', labelVi: 'Không Phù Hợp', icon: XCircle, className: 'bg-error-bg text-error-foreground' },
};

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-pill ${config.className} ${
        size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1'
      }`}
      aria-label={`Status: ${config.labelVi}`}
    >
      <Icon size={size === 'sm' ? 11 : 12} />
      {config.labelVi}
    </span>
  );
}