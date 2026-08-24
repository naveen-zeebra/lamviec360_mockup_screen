import React from 'react';

import { FileText, Mic, TrendingUp, DollarSign, Search, ArrowRight } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const resources = [
  { icon: FileText, title: 'Mẹo Viết CV', description: 'Tạo CV nổi bật thu hút nhà tuyển dụng với những mẹo thực tế từ chuyên gia.', color: 'bg-blue-50 text-blue-600', tag: 'Phổ biến' },
  { icon: Mic, title: 'Chuẩn Bị Phỏng Vấn', description: 'Chuẩn bị tốt cho buổi phỏng vấn với các câu hỏi thường gặp và cách trả lời hiệu quả.', color: 'bg-purple-50 text-purple-600', tag: 'Mới' },
  { icon: TrendingUp, title: 'Phát Triển Nghề Nghiệp', description: 'Lộ trình và chiến lược để thăng tiến trong sự nghiệp của bạn.', color: 'bg-green-50 text-green-600', tag: null },
  { icon: DollarSign, title: 'Hướng Dẫn Mức Lương', description: 'Hiểu rõ mức lương thị trường để đàm phán tốt hơn.', color: 'bg-emerald-50 text-emerald-600', tag: null },
  { icon: Search, title: 'Mẹo Tìm Việc', description: 'Chiến lược tìm kiếm việc làm hiệu quả trong thị trường cạnh tranh.', color: 'bg-orange-50 text-orange-600', tag: null },
];

export default function CareerResources() {
  return (
    <section id="career-resources" className="section-padding bg-muted/30" aria-labelledby="career-resources-heading">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10">
        <div className="text-center mb-10">
          <h2 id="career-resources-heading" className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Phát Triển Sự Nghiệp Với Nguồn Tài Nguyên Phù Hợp
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
                  Đọc thêm <ArrowRight size={12} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}