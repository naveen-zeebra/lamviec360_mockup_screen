'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Grid3X3, ArrowRight, TrendingUp } from 'lucide-react';

interface HeroSectionProps {
  t: { jobs: Record<string, string>; authentication: Record<string, string> };
}

const popularSearches = ['Frontend Developer', 'Product Manager', 'UI/UX Designer', 'Data Analyst', 'Backend Engineer'];

export default function HeroSection({ t }: HeroSectionProps) {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  return (
    <section className="hero-gradient min-h-[calc(100vh-4rem)] flex items-center pt-16 relative overflow-hidden" aria-label="Hero section">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 py-16 lg:py-20 w-full">
        <div className="max-w-3xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white/90 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-pill mb-6">
            <TrendingUp size={13} />
            Cơ hội tiếp theo của bạn bắt đầu ở đây
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
            Tìm Việc Làm Phù Hợp.
            <br />
            <span className="text-yellow-300">Xây Dựng Tương Lai.</span>
          </h1>

          <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-xl mx-auto">
            Khám phá cơ hội việc làm phù hợp, kết nối với các công ty hàng đầu và quản lý toàn bộ hành trình tìm việc với LamViec360.
          </p>

          {/* Search Box */}
          <div className="bg-card rounded-2xl p-2 shadow-modal mb-6">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-muted rounded-xl">
                <Search size={18} className="text-muted-foreground flex-shrink-0" />
                <input
                  type="text"
                  placeholder={t.jobs.jobTitle}
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  aria-label="Job title, skills or keywords"
                />
              </div>
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-muted rounded-xl">
                <MapPin size={18} className="text-muted-foreground flex-shrink-0" />
                <input
                  type="text"
                  placeholder={t.jobs.location}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  aria-label="Location"
                />
              </div>
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-muted rounded-xl">
                <Grid3X3 size={18} className="text-muted-foreground flex-shrink-0" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-foreground focus:outline-none cursor-pointer"
                  aria-label="Job Category"
                >
                  <option value="">{t.jobs.category}</option>
                  <option value="software">Software Development</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="finance">Finance</option>
                  <option value="hr">Human Resources</option>
                </select>
              </div>
              <Link
                href="/find-jobs-page"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95 whitespace-nowrap"
              >
                <Search size={16} />
                Tìm Việc
              </Link>
            </div>
          </div>

          {/* Popular Searches */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <span className="text-xs text-white/60 font-medium">Tìm kiếm phổ biến:</span>
            {popularSearches.map((search) => (
              <Link
                key={`popular-${search}`}
                href="/find-jobs-page"
                className="text-xs text-white/80 bg-white/10 hover:bg-white/20 px-3 py-1 rounded-pill transition-colors"
              >
                {search}
              </Link>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/sign-up-login-screen"
              className="flex items-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95"
            >
              Tạo Hồ Sơ Của Bạn
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/find-jobs-page"
              className="flex items-center gap-2 px-6 py-3 border-2 border-white/40 text-white font-semibold rounded-xl hover:border-white/70 hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Khám Phá Việc Làm
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}