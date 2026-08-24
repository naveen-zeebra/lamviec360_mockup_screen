'use client';
import React from 'react';
import Link from 'next/link';
import { Code2, Palette, Megaphone, TrendingUp, BarChart3, Users, Settings, Headphones, ArrowRight } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const categories = [
  { id: 'cat-software', name: 'Software Development', icon: Code2, count: 2847, color: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' },
  { id: 'cat-design', name: 'Design', icon: Palette, count: 634, color: 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white' },
  { id: 'cat-marketing', name: 'Marketing', icon: Megaphone, count: 891, color: 'bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white' },
  { id: 'cat-sales', name: 'Sales', icon: TrendingUp, count: 1203, color: 'bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white' },
  { id: 'cat-finance', name: 'Finance', icon: BarChart3, count: 567, color: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white' },
  { id: 'cat-hr', name: 'Human Resources', icon: Users, count: 423, color: 'bg-pink-50 text-pink-600 group-hover:bg-pink-600 group-hover:text-white' },
  { id: 'cat-engineering', name: 'Engineering', icon: Settings, count: 789, color: 'bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white' },
  { id: 'cat-support', name: 'Customer Support', icon: Headphones, count: 456, color: 'bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white' },
];

export default function JobCategories() {
  return (
    <section className="section-padding bg-background" aria-labelledby="categories-heading">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">Khám Phá Cơ Hội</p>
          <h2 id="categories-heading" className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Tìm Việc Phù Hợp Với Kỹ Năng
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Khám phá cơ hội việc làm trong các ngành nghề và lĩnh vực nghề nghiệp phổ biến.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories?.map((cat) => {
            const Icon = cat?.icon;
            return (
              <Link
                key={cat?.id}
                href="/find-jobs-page"
                className="group bg-card border border-border rounded-xl p-5 card-hover flex flex-col items-center text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`${cat?.name} - ${cat?.count?.toLocaleString()} việc làm`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 mb-3 ${cat?.color}`}>
                  <Icon size={22} />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1 group-hover:text-primary transition-colors">{cat?.name}</h3>
                <p className="text-xs text-muted-foreground tab-number">{cat?.count?.toLocaleString()} việc làm</p>
                <div className="flex items-center gap-1 mt-2 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Xem việc làm <ArrowRight size={12} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}