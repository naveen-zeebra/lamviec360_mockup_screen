import React from 'react';
import { Star, Search, UserCircle, Zap, BarChart3, Bell } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const benefits = [
  { icon: Star, title: 'Đề Xuất Việc Làm Cá Nhân Hóa', description: 'Khám phá cơ hội phù hợp dựa trên hồ sơ và hoạt động tìm việc của bạn.', color: 'text-yellow-500 bg-yellow-50' },
  { icon: Search, title: 'Tìm Kiếm Việc Làm Dễ Dàng', description: 'Tìm cơ hội bằng công cụ tìm kiếm mạnh mẽ với bộ lọc thông minh.', color: 'text-blue-500 bg-blue-50' },
  { icon: UserCircle, title: 'Hồ Sơ Chuyên Nghiệp', description: 'Tạo hồ sơ thể hiện đầy đủ kỹ năng và kinh nghiệm của bạn.', color: 'text-purple-500 bg-purple-50' },
  { icon: Zap, title: 'Ứng Tuyển Nhanh Chóng', description: 'Ứng tuyển nhanh chóng bằng hồ sơ đã lưu của bạn.', color: 'text-green-500 bg-green-50' },
  { icon: BarChart3, title: 'Theo Dõi Đơn Ứng Tuyển', description: 'Theo dõi mọi đơn ứng tuyển trong một nơi duy nhất.', color: 'text-orange-500 bg-orange-50' },
  { icon: Bell, title: 'Thông Báo Thông Minh', description: 'Cập nhật kịp thời về trạng thái đơn ứng tuyển và cơ hội mới.', color: 'text-pink-500 bg-pink-50' },
];

export default function JobSeekerBenefits() {
  return (
    <section className="section-padding bg-background" aria-labelledby="benefits-heading">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10">
        <div className="text-center mb-10">
          <h2 id="benefits-heading" className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Tất Cả Những Gì Bạn Cần Cho Hành Trình Tìm Việc
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