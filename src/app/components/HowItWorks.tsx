import React from 'react';
import { UserCircle, Search, Send, BarChart3 } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const steps = [
  {
    number: '01',
    icon: UserCircle,
    title: 'Tạo Hồ Sơ Của Bạn',
    description: 'Xây dựng hồ sơ chuyên nghiệp với kỹ năng, kinh nghiệm, học vấn và resume của bạn.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    number: '02',
    icon: Search,
    title: 'Khám Phá Việc Làm',
    description: 'Tìm kiếm và khám phá các cơ hội phù hợp với mục tiêu nghề nghiệp của bạn.',
    color: 'bg-green-50 text-green-600',
  },
  {
    number: '03',
    icon: Send,
    title: 'Ứng Tuyển Dễ Dàng',
    description: 'Ứng tuyển bằng hồ sơ và resume đã lưu của bạn chỉ với vài bước đơn giản.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    number: '04',
    icon: BarChart3,
    title: 'Theo Dõi Tiến Trình',
    description: 'Theo dõi trạng thái đơn ứng tuyển và nhận thông báo cập nhật kịp thời.',
    color: 'bg-orange-50 text-orange-600',
  },
];

export default function HowItWorks() {
  return (
    <section className="section-padding bg-muted/30" aria-labelledby="how-it-works-heading">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">Đơn Giản. Nhanh Chóng. Hiệu Quả.</p>
          <h2 id="how-it-works-heading" className="text-3xl lg:text-4xl font-bold text-foreground">
            Hành Trình Tìm Việc, Đơn Giản Hóa
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-border" aria-hidden="true" />

          {steps?.map((step, index) => {
            const Icon = step?.icon;
            return (
              <div key={`step-${step?.number}`} className="relative flex flex-col items-center text-center">
                <div className="relative mb-5">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${step?.color} relative z-10`}>
                    <Icon size={26} />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center z-20">
                    {index + 1}
                  </span>
                </div>
                <h3 className="font-bold text-foreground text-base mb-2">{step?.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step?.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}