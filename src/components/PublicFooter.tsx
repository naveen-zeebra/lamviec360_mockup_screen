import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { X as XIcon } from 'lucide-react';

// Simple inline SVG social icons to avoid lucide-react brand icon dependency
const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
  </svg>
);

export default function PublicFooter() {
  const columns = [
    {
      title: 'Cho Ứng Viên',
      links: [
        { label: 'Tìm Việc Làm', href: '/find-jobs-page' },
        { label: 'Việc Làm Đề Xuất', href: '/job-seeker-dashboard' },
        { label: 'Việc Đã Lưu', href: '/job-seeker-dashboard' },
        { label: 'Đơn Ứng Tuyển', href: '/my-applications' },
        { label: 'Tài Nguyên Nghề Nghiệp', href: '#career-resources' },
      ],
    },
    {
      title: 'Cho Doanh Nghiệp',
      links: [
        { label: 'Đăng Tuyển Dụng', href: '#' },
        { label: 'Tìm Ứng Viên', href: '#' },
        { label: 'Quản Lý Tuyển Dụng', href: '#' },
        { label: 'Giải Pháp Tuyển Dụng', href: '#' },
      ],
    },
    {
      title: 'Về LamViec360',
      links: [
        { label: 'Về Chúng Tôi', href: '#about' },
        { label: 'Liên Hệ', href: '#contact' },
        { label: 'Chính Sách Bảo Mật', href: '#privacy' },
        { label: 'Điều Khoản Sử Dụng', href: '#terms' },
        { label: 'Trung Tâm Hỗ Trợ', href: '#help' },
      ],
    },
  ];

  const socials = [
    { Icon: LinkedInIcon, label: 'LinkedIn', href: '#' },
    { Icon: FacebookIcon, label: 'Facebook', href: '#' },
    { Icon: XIcon, label: 'X (Twitter)', href: '#' },
    { Icon: YoutubeIcon, label: 'YouTube', href: '#' },
  ];

  return (
    <footer className="bg-foreground text-white" role="contentinfo">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AppLogo src="/assets/images/lamviec-logo-none-1787565498437.png" size={36} />
              <span className="font-bold text-lg text-white">LamViec360</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Nền tảng tuyển dụng hiện đại kết nối ứng viên tài năng với các công ty hàng đầu Việt Nam.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {socials?.map((social) => (
                <a
                  key={`social-${social?.label}`}
                  href={social?.href}
                  aria-label={social?.label}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  {social?.label === 'X (Twitter)' ? <XIcon size={16} /> : <social.Icon />}
                </a>
              ))}
            </div>
          </div>

          {columns?.map((col) => (
            <div key={`footer-col-${col?.title}`}>
              <h3 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">{col?.title}</h3>
              <ul className="space-y-2.5">
                {col?.links?.map((link) => (
                  <li key={`footer-link-${link?.label}`}>
                    <Link
                      href={link?.href}
                      className="text-sm text-white/60 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
                    >
                      {link?.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-white/50">© 2026 LamViec360. Tất cả quyền được bảo lưu.</p>
          <div className="flex items-center gap-4">
            <Link href="#privacy" className="text-xs text-white/50 hover:text-white/80 transition-colors">Bảo mật</Link>
            <Link href="#terms" className="text-xs text-white/50 hover:text-white/80 transition-colors">Điều khoản</Link>
            <Link href="#cookies" className="text-xs text-white/50 hover:text-white/80 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}