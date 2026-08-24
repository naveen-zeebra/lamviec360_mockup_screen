'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/useLanguage';
import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';
import JobCard from '@/components/JobCard';
import { mockJobs } from '@/lib/mockData';
import {
  MapPin, DollarSign, Briefcase, Clock, Bookmark, BookmarkCheck,
  CheckCircle, Building2, Users, Globe, Share2, ChevronRight, Calendar, AlertCircle
} from 'lucide-react';

export default function JobDetailsClient() {
  const { language, changeLanguage, t } = useLanguage();
  const [isSaved, setIsSaved] = useState(false);
  const [hasApplied] = useState(false);
  const [isDeadlinePassed] = useState(false);

  // Using job-001 as the featured job for this detail page
  const job = mockJobs?.[0];
  const similarJobs = mockJobs?.slice(1, 4);

  const workModeColor = {
    Remote: 'bg-success-bg text-success-foreground',
    Hybrid: 'bg-info-bg text-info',
    'On-site': 'bg-muted text-muted-foreground',
  }?.[job?.workMode];

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar language={language} onLanguageChange={changeLanguage} t={t} activePage="/find-jobs-page" />
      <div className="pt-16">
        {/* Breadcrumb */}
        <div className="bg-card border-b border-border">
          <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 py-3">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
              <ChevronRight size={12} />
              <Link href="/find-jobs-page" className="hover:text-primary transition-colors">Tìm việc làm</Link>
              <ChevronRight size={12} />
              <span className="text-foreground font-medium truncate max-w-[200px]">{job?.title}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 py-6">
          <div className="flex gap-6 items-start">
            {/* Main Content */}
            <article className="flex-1 min-w-0">
              {/* Job Header Card */}
              <div className="bg-card border border-border rounded-xl p-6 mb-5">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-xl font-bold flex-shrink-0">
                    VN
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <h1 className="text-2xl font-bold text-foreground mb-1">{job?.title}</h1>
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Building2 size={14} />
                            <span className="font-medium text-foreground">{job?.company}</span>
                          </div>
                          {job?.isVerified && (
                            <span className="flex items-center gap-1 text-xs text-primary font-medium bg-info-bg px-2 py-0.5 rounded-pill">
                              <CheckCircle size={11} />
                              Đã xác minh
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {}}
                          className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          aria-label="Share job"
                        >
                          <Share2 size={17} />
                        </button>
                        <button
                          onClick={() => setIsSaved(!isSaved)}
                          className={`p-2 rounded-lg border transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95 ${
                            isSaved ? 'border-primary bg-info-bg text-primary' : 'border-border text-muted-foreground hover:text-primary hover:border-primary hover:bg-info-bg'
                          }`}
                          aria-label={isSaved ? 'Bỏ lưu việc làm này' : 'Lưu việc làm này'}
                        >
                          {isSaved ? <BookmarkCheck size={17} /> : <Bookmark size={17} />}
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-4">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin size={14} className="flex-shrink-0" />
                        <span>{job?.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <DollarSign size={14} className="flex-shrink-0" />
                        <span className="font-semibold text-foreground">{job?.salary}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Briefcase size={14} className="flex-shrink-0" />
                        <span>{job?.experience}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Clock size={14} className="flex-shrink-0" />
                        <span>Đăng {new Date(job.postedDate)?.toLocaleDateString('vi-VN')}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-pill ${workModeColor}`}>{job?.workMode}</span>
                      <span className="text-xs font-medium px-2.5 py-1 rounded-pill bg-muted text-muted-foreground">{job?.employmentType}</span>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar size={12} />
                        <span>Hạn nộp: {new Date(job.deadline)?.toLocaleDateString('vi-VN')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Apply CTA */}
                <div className="lg:hidden mt-5 flex gap-3">
                  {isDeadlinePassed ? (
                    <div className="flex-1 flex items-center justify-center gap-2 py-3 bg-muted text-muted-foreground text-sm font-semibold rounded-xl cursor-not-allowed">
                      <AlertCircle size={16} />
                      Đã hết hạn nộp
                    </div>
                  ) : hasApplied ? (
                    <Link href="/my-applications" className="flex-1 flex items-center justify-center gap-2 py-3 bg-success-bg text-success-foreground text-sm font-semibold rounded-xl">
                      <CheckCircle size={16} />
                      Đã ứng tuyển — Xem đơn
                    </Link>
                  ) : (
                    <Link
                      href="/sign-up-login-screen"
                      className="flex-1 flex items-center justify-center py-3 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
                    >
                      Ứng Tuyển Ngay
                    </Link>
                  )}
                </div>
              </div>

              {/* Job Description */}
              <div className="bg-card border border-border rounded-xl p-6 mb-5 space-y-6">
                <section aria-labelledby="description-heading">
                  <h2 id="description-heading" className="text-lg font-bold text-foreground mb-3">Mô Tả Công Việc</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{job?.description}</p>
                </section>

                <div className="border-t border-border" />

                <section aria-labelledby="responsibilities-heading">
                  <h2 id="responsibilities-heading" className="text-lg font-bold text-foreground mb-3">Trách Nhiệm</h2>
                  <ul className="space-y-2">
                    {job?.responsibilities?.map((resp, idx) => (
                      <li key={`resp-${job?.id}-${idx}`} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <CheckCircle size={15} className="text-success flex-shrink-0 mt-0.5" />
                        {resp}
                      </li>
                    ))}
                  </ul>
                </section>

                <div className="border-t border-border" />

                <section aria-labelledby="requirements-heading">
                  <h2 id="requirements-heading" className="text-lg font-bold text-foreground mb-3">Yêu Cầu</h2>
                  <ul className="space-y-2">
                    {job?.requirements?.map((req, idx) => (
                      <li key={`req-${job?.id}-${idx}`} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" aria-hidden="true" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </section>

                <div className="border-t border-border" />

                <section aria-labelledby="skills-heading">
                  <h2 id="skills-heading" className="text-lg font-bold text-foreground mb-3">Kỹ Năng Yêu Cầu</h2>
                  <div className="flex flex-wrap gap-2">
                    {job?.skills?.map((skill) => (
                      <span key={`skill-detail-${skill}`} className="px-3 py-1.5 bg-info-bg text-info text-sm font-medium rounded-lg border border-info/20">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>

                <div className="border-t border-border" />

                <section aria-labelledby="benefits-heading">
                  <h2 id="benefits-heading" className="text-lg font-bold text-foreground mb-3">Quyền Lợi</h2>
                  <ul className="space-y-2">
                    {job?.benefits?.map((benefit, idx) => (
                      <li key={`benefit-${job?.id}-${idx}`} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <CheckCircle size={15} className="text-success flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              {/* Company Info */}
              <div className="bg-card border border-border rounded-xl p-6 mb-5">
                <h2 className="text-lg font-bold text-foreground mb-4">Thông Tin Công Ty</h2>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-lg font-bold flex-shrink-0">
                    VN
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{job?.company}</h3>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Users size={13} />
                        <span>1,000–5,000 nhân viên</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Globe size={13} />
                        <span>Công nghệ thông tin</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin size={13} />
                        <span>{job?.location}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      Một trong những tập đoàn công nghệ hàng đầu Việt Nam, chuyên phát triển các sản phẩm và dịch vụ số phục vụ hàng triệu người dùng.
                    </p>
                  </div>
                </div>
              </div>

              {/* Similar Jobs */}
              <div>
                <h2 className="text-lg font-bold text-foreground mb-4">Việc Làm Tương Tự</h2>
                <div className="space-y-3">
                  {similarJobs?.map((sj) => (
                    <JobCard key={sj?.id} job={sj} variant="compact" />
                  ))}
                </div>
              </div>
            </article>

            {/* Sticky Apply Panel */}
            <aside className="hidden lg:block w-72 xl:w-80 flex-shrink-0">
              <div className="sticky top-24 bg-card border border-border rounded-xl p-5 space-y-4">
                <div>
                  <h2 className="font-bold text-foreground text-base mb-1">{job?.title}</h2>
                  <p className="text-sm text-muted-foreground">{job?.company}</p>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign size={15} className="text-muted-foreground flex-shrink-0" />
                    <span className="font-semibold text-foreground">{job?.salary}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin size={15} className="text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground">{job?.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase size={15} className="text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground">{job?.experience}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={15} className="text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground">Hạn: {new Date(job.deadline)?.toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 space-y-2.5">
                  {isDeadlinePassed ? (
                    <div className="w-full flex items-center justify-center gap-2 py-3 bg-muted text-muted-foreground text-sm font-semibold rounded-xl cursor-not-allowed" aria-label="Application period closed">
                      <AlertCircle size={16} />
                      Đã Hết Hạn Nộp
                    </div>
                  ) : hasApplied ? (
                    <Link
                      href="/my-applications"
                      className="w-full flex items-center justify-center gap-2 py-3 bg-success-bg text-success-foreground text-sm font-semibold rounded-xl border border-success/20 hover:bg-success/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <CheckCircle size={16} />
                      Đã Ứng Tuyển — Xem Đơn
                    </Link>
                  ) : (
                    <Link
                      href="/sign-up-login-screen"
                      className="w-full flex items-center justify-center py-3 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
                    >
                      Ứng Tuyển Ngay
                    </Link>
                  )}
                  <button
                    onClick={() => setIsSaved(!isSaved)}
                    className={`w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-xl border transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95 ${
                      isSaved
                        ? 'border-primary bg-info-bg text-primary' :'border-border text-foreground hover:border-primary hover:text-primary hover:bg-info-bg'
                    }`}
                    aria-label={isSaved ? 'Bỏ lưu việc làm' : 'Lưu việc làm'}
                  >
                    {isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                    {isSaved ? 'Đã Lưu' : 'Lưu Việc Làm'}
                  </button>
                </div>

                <div className="border-t border-border pt-3">
                  <p className="text-xs text-muted-foreground text-center">
                    Đăng ngày {new Date(job.postedDate)?.toLocaleDateString('vi-VN')}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-3 z-30">
        {isDeadlinePassed ? (
          <div className="flex items-center justify-center gap-2 py-3 bg-muted text-muted-foreground text-sm font-semibold rounded-xl cursor-not-allowed">
            <AlertCircle size={16} />
            Đã Hết Hạn Nộp
          </div>
        ) : hasApplied ? (
          <Link href="/my-applications" className="flex items-center justify-center gap-2 py-3 bg-success-bg text-success-foreground text-sm font-semibold rounded-xl border border-success/20">
            <CheckCircle size={16} />
            Đã Ứng Tuyển — Xem Đơn
          </Link>
        ) : (
          <Link
            href="/sign-up-login-screen"
            className="flex items-center justify-center py-3 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
          >
            Ứng Tuyển Ngay
          </Link>
        )}
      </div>
      <div className="lg:hidden pb-20" />
      <PublicFooter />
    </div>
  );
}