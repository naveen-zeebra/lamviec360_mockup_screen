import React from 'react';
import Link from 'next/link';
import { CheckCircle, Clock, Star, Calendar, Gift, Trophy, ArrowRight } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const timelineStages = [
  { icon: CheckCircle, label: 'Đã Nộp', color: 'text-info bg-info-bg border-info/30', active: true },
  { icon: Clock, label: 'Đang Xem Xét', color: 'text-warning-foreground bg-warning-bg border-warning/30', active: true },
  { icon: Star, label: 'Được Chọn', color: 'text-purple-700 bg-purple-50 border-purple-200', active: true },
  { icon: Calendar, label: 'Phỏng Vấn', color: 'text-blue-700 bg-blue-50 border-blue-200', active: false },
  { icon: Gift, label: 'Nhận Offer', color: 'text-success-foreground bg-success-bg border-success/30', active: false },
  { icon: Trophy, label: 'Được Tuyển', color: 'text-success-foreground bg-success-bg border-success/30', active: false },
];

export default function ApplicationTrackingPreview() {
  return (
    <section className="section-padding bg-background" aria-labelledby="tracking-preview-heading">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10">
        <div className="bg-card border border-border rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 id="tracking-preview-heading" className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Theo Dõi Mọi Đơn Ứng Tuyển Trong Một Nơi
              </h2>
              <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                Cập nhật thông tin từ lúc bạn nộp đơn cho đến quyết định tuyển dụng. Không bao giờ bỏ lỡ cập nhật quan trọng.
              </p>
              <Link
                href="/my-applications"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
              >
                Xem Trình Theo Dõi Đơn
                <ArrowRight size={16} />
              </Link>
            </div>

            <div>
              {/* Mock application card */}
              <div className="bg-muted/50 rounded-xl p-5 mb-4 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">
                    VN
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Senior Frontend Developer</p>
                    <p className="text-xs text-muted-foreground">VNG Corporation</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
                  {timelineStages?.map((stage, idx) => {
                    const Icon = stage?.icon;
                    return (
                      <div key={`timeline-stage-${idx}`} className="flex items-center gap-2 flex-shrink-0">
                        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium ${stage?.active ? stage?.color : 'text-muted-foreground bg-muted border-border opacity-50'}`}>
                          <Icon size={12} />
                          <span className="hidden sm:inline">{stage?.label}</span>
                        </div>
                        {idx < timelineStages?.length - 1 && (
                          <div className={`w-4 h-0.5 flex-shrink-0 ${stage?.active ? 'bg-primary' : 'bg-border'}`} aria-hidden="true" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Đây là ví dụ minh họa — dữ liệu thực sẽ hiển thị khi bạn đăng nhập
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}