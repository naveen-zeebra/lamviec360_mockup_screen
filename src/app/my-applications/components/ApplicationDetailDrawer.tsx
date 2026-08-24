'use client';
import React, { useEffect } from 'react';
import { Application } from '@/lib/mockData';
import StatusBadge from '@/components/StatusBadge';
import {
  X, MapPin, DollarSign, Calendar, CheckCircle,
  Clock, Star, Mic, Gift, Trophy, XCircle, Building2
} from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface ApplicationDetailDrawerProps {
  application: Application;
  onClose: () => void;
}

const stageIcons: Record<string, React.ElementType> = {
  'Applied': CheckCircle,
  'Under Review': Clock,
  'Shortlisted': Star,
  'Interview Scheduled': Mic,
  'Offer Sent': Gift,
  'Hired': Trophy,
  'Rejected': XCircle,
};

const stageColors: Record<string, string> = {
  'Applied': 'text-info bg-info-bg border-info/30',
  'Under Review': 'text-warning-foreground bg-warning-bg border-warning/30',
  'Shortlisted': 'text-purple-700 bg-purple-50 border-purple-200',
  'Interview Scheduled': 'text-blue-700 bg-blue-50 border-blue-200',
  'Offer Sent': 'text-success-foreground bg-success-bg border-success/30',
  'Hired': 'text-success-foreground bg-success-bg border-success/30',
  'Rejected': 'text-error-foreground bg-error-bg border-error/30',
};

export default function ApplicationDetailDrawer({ application, onClose }: ApplicationDetailDrawerProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const initials = application.company.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
      {/* Backdrop */}
      <div className="flex-1 bg-foreground/40 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      {/* Drawer Panel */}
      <div className="w-full max-w-lg bg-card h-full overflow-y-auto shadow-modal animate-slide-up flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border sticky top-0 bg-card z-10">
          <h2 id="drawer-title" className="font-bold text-foreground text-base">Chi Tiết Đơn Ứng Tuyển</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close drawer"
          >
            <X size={19} />
          </button>
        </div>

        <div className="flex-1 p-5 space-y-5">
          {/* Job Info */}
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-foreground text-lg leading-tight">{application.jobTitle}</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Building2 size={13} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{application.company}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin size={12} />
                  <span>{application.location}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <DollarSign size={12} />
                  <span>{application.salary}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Application Meta */}
          <div className="bg-muted/50 rounded-xl p-4 grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Mã đơn</p>
              <p className="text-sm font-mono font-semibold text-foreground">{application.id.toUpperCase()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Trạng thái hiện tại</p>
              <StatusBadge status={application.status} size="sm" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Ngày nộp</p>
              <p className="text-sm font-semibold text-foreground tab-number">{new Date(application.appliedDate).toLocaleDateString('vi-VN')}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Cập nhật lần cuối</p>
              <p className="text-sm font-semibold text-foreground tab-number">{new Date(application.lastUpdated).toLocaleDateString('vi-VN')}</p>
            </div>
          </div>

          {/* Application Timeline */}
          <div>
            <h3 className="font-bold text-foreground text-sm mb-4">Tiến Trình Ứng Tuyển</h3>
            <ol className="relative space-y-0" aria-label="Application timeline">
              {application.timeline.map((stage, idx) => {
                const Icon = stageIcons[stage.stage] || CheckCircle;
                const colorClass = stageColors[stage.stage] || 'text-muted-foreground bg-muted border-border';
                const isLast = idx === application.timeline.length - 1;

                return (
                  <li key={`timeline-${application.id}-${idx}`} className="flex gap-3 relative">
                    {/* Connector */}
                    {!isLast && (
                      <div
                        className={`absolute left-[17px] top-8 bottom-0 w-0.5 ${stage.completed ? 'bg-success' : 'bg-border'}`}
                        aria-hidden="true"
                      />
                    )}

                    {/* Icon */}
                    <div className={`relative z-10 w-9 h-9 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      stage.active
                        ? 'border-primary bg-info-bg'
                        : stage.completed
                        ? 'border-success bg-success-bg' :'border-border bg-muted'
                    }`}>
                      <Icon size={15} className={stage.active ? 'text-primary' : stage.completed ? 'text-success' : 'text-muted-foreground'} />
                    </div>

                    {/* Content */}
                    <div className={`flex-1 pb-6 ${isLast ? 'pb-0' : ''}`}>
                      <div className="flex items-center justify-between gap-2">
                        <p className={`text-sm font-semibold ${stage.active ? 'text-primary' : stage.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {stage.stage}
                          {stage.active && (
                            <span className="ml-2 text-xs font-bold text-primary bg-info-bg px-1.5 py-0.5 rounded-pill">Hiện tại</span>
                          )}
                        </p>
                        {stage.date && (
                          <span className="text-xs text-muted-foreground tab-number flex-shrink-0">
                            {new Date(stage.date).toLocaleDateString('vi-VN')}
                          </span>
                        )}
                      </div>
                      {stage.note && (
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed bg-muted/60 rounded-lg p-2.5">
                          {stage.note}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-border space-y-2.5">
            {application.status === 'Interview Scheduled' && (
              <div className="flex items-center gap-2 p-3 bg-info-bg border border-info/20 rounded-xl">
                <Calendar size={15} className="text-primary flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-primary">Phỏng vấn sắp tới</p>
                  <p className="text-xs text-muted-foreground">28/08/2026 lúc 14:00 — Kỹ thuật</p>
                </div>
              </div>
            )}
            {application.status === 'Offer Sent' && (
              <div className="flex items-center gap-2 p-3 bg-success-bg border border-success/20 rounded-xl">
                <Gift size={15} className="text-success flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-success-foreground">Offer đang chờ phản hồi</p>
                  <p className="text-xs text-muted-foreground">Hạn chót: 30/08/2026</p>
                </div>
              </div>
            )}
            <button
              onClick={onClose}
              className="w-full py-2.5 border border-border text-foreground text-sm font-semibold rounded-xl hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}