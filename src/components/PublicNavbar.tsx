'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import LanguageSelector from './LanguageSelector';
import { Language } from '@/lib/i18n';
import { Menu, X, ExternalLink } from 'lucide-react';

interface PublicNavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  t: { navigation: Record<string, string>; authentication: Record<string, string> };
  isAuthenticated?: boolean;
  activePage?: string;
}

export default function PublicNavbar({ language, onLanguageChange, t, isAuthenticated, activePage }: PublicNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(!false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => setIsScrolled(window.scrollY > 0);
  //   window.addEventListener('scroll', handleScroll, { passive: true });
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  const navLinks = [
    { href: '/', label: t.navigation.home },
    { href: '/find-jobs-page', label: t.navigation.findJobs },
    { href: '#companies', label: t.navigation.companies },
    // { href: '#career-resources', label: t.navigation.careerResources },
    // { href: '#about', label: t.navigation.aboutUs },
  ];

  // COMPANY_SITE_URL — configurable via environment variable
  const companySiteUrl = process.env.NEXT_PUBLIC_COMPANY_SITE_URL || '/company';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-card shadow-sticky border-b border-border' : 'bg-transparent'
        }`}
      role="banner"
    >
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md" aria-label="LamViec360 - Go to homepage">
            <AppLogo src="/assets/images/lamviec-logo-none-1787565498437.png" size={40} width={138} />
            {/* <span className="font-bold text-lg text-foreground hidden sm:block">LamViec360</span> */}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={`nav-${link.href}`}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${activePage === link.href
                    ? 'text-primary bg-info-bg'
                    : isScrolled
                      ? 'text-foreground hover:text-primary hover:bg-muted'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-2">


            <LanguageSelector currentLanguage={language} onLanguageChange={onLanguageChange} />

            {isAuthenticated ? (
              <Link
                href="/job-seeker-dashboard"
                className="px-3 py-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
              >
                {t.navigation.dashboard}
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-up-login-screen"
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isScrolled
                      ? 'text-foreground hover:text-primary'
                      : 'text-white/90 hover:text-white'
                    }`}
                >
                  {t.authentication.login}
                </Link>
                <Link
                  href="/sign-up-login-screen"
                  className="px-4 py-1.5 text-sm font-semibold bg-primary text-primary-foreground rounded-md hover:bg-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
                >
                  {t.authentication.register}
                </Link>
              </>
            )}

            <a
              href={companySiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isScrolled
                  ? 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
                  : 'border-white/40 text-white/80 hover:text-white hover:border-white/60'
                }`}
              aria-label="Go to Company Site"
            >
              {t.navigation.companySite}
              <ExternalLink size={13} />
            </a>
          </div>

          {/* Mobile Right */}
          <div className="flex lg:hidden items-center gap-2">
            <LanguageSelector currentLanguage={language} onLanguageChange={onLanguageChange} variant="minimal" />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isScrolled ? 'text-foreground hover:bg-muted' : 'text-white hover:bg-white/10'
                }`}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border shadow-modal animate-slide-up" role="navigation" aria-label="Mobile navigation">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={`mobile-nav-${link.href}`}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-border my-2" />
            <a
              href={companySiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md transition-colors"
            >
              {t.navigation.companySite}
              <ExternalLink size={13} />
            </a>
            <div className="border-t border-border my-2" />
            <Link
              href="/sign-up-login-screen"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-sm font-medium text-foreground hover:text-primary rounded-md transition-colors"
            >
              {t.authentication.login}
            </Link>
            <Link
              href="/sign-up-login-screen"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-sm font-semibold text-center bg-primary text-primary-foreground rounded-md hover:bg-primary-dark transition-colors mt-1"
            >
              {t.authentication.register}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}