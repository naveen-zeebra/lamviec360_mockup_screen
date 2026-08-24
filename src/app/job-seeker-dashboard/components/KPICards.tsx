'use client';
import React from 'react';
import { Star, FileText, Calendar, Bookmark, TrendingUp, TrendingDown } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const kpiData = [
  {
    id: 'kpi-recommended',
    label: 'Việc Làm Đề Xuất',
    value: '47',
    change: '+12 tuần này',
    trend: 'up',
    icon: Star,
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
  },
  {
    id: 'kpi-applications',
    label: 'Đơn Ứng Tuyển',
    value: '12',
    change: '+3 tháng này',
    trend: 'up',
    icon: FileText,
    color: 'text-primary',
    bg: 'bg-info-bg',
    borderColor: 'border-blue-200',
  },
  {
    id: 'kpi-interviews',
    label: 'Phỏng Vấn',
    value: '3',
    change: '1 sắp tới',
    trend: 'up',
    icon: Calendar,
    color: 'text-success',
    bg: 'bg-success-bg',
    borderColor: 'border-green-200',
  },
  {
    id: 'kpi-saved',
    label: 'Việc Đã Lưu',
    value: '28',
    change: '-2 hết hạn',
    trend: 'down',
    icon: Bookmark,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
];

export default function KPICards() {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4" role="region" aria-label="Key metrics">
      {kpiData?.map((kpi) => {
        const Icon = kpi?.icon;
        const TrendIcon = kpi?.trend === 'up' ? TrendingUp : TrendingDown;
        return (
          <div
            key={kpi?.id}
            className={`bg-card border rounded-xl p-4 xl:p-5 ${kpi?.borderColor}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${kpi?.bg}`}>
                <Icon size={17} className={kpi?.color} />
              </div>
              <TrendIcon size={14} className={kpi?.trend === 'up' ? 'text-success' : 'text-error'} />
            </div>
            <div className="text-3xl font-bold text-foreground tab-number mb-1">{kpi?.value}</div>
            <div className="text-xs font-medium text-muted-foreground">{kpi?.label}</div>
            <div className={`text-xs font-medium mt-1 tab-number ${kpi?.trend === 'up' ? 'text-success' : 'text-error'}`}>
              {kpi?.change}
            </div>
          </div>
        );
      })}
    </div>
  );
}