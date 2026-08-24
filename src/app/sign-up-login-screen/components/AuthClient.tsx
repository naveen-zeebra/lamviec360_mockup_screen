'use client';
import React, { useState } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import LanguageSelector from '@/components/LanguageSelector';
import { useLanguage } from '@/lib/useLanguage';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import OTPVerification from './OTPVerification';
import ForgotPassword from './ForgotPassword';
import Link from 'next/link';
import { ArrowLeft, Briefcase, Users, TrendingUp } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


type AuthView = 'login' | 'register' | 'otp' | 'forgot';

export default function AuthClient() {
  const { language, changeLanguage, t } = useLanguage();
  const [view, setView] = useState<AuthView>('login');
  const [registeredEmail, setRegisteredEmail] = useState('');

  const handleRegisterSuccess = (email: string) => {
    setRegisteredEmail(email);
    setView('otp');
  };

  const brandStats = [
    { icon: Briefcase, value: '10K+', label: 'Việc làm đang tuyển' },
    { icon: Users, value: '50K+', label: 'Ứng viên đăng ký' },
    { icon: TrendingUp, value: '5K+', label: 'Công ty đối tác' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Brand Panel — Left */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[40%] hero-gradient flex-col justify-between p-10 xl:p-14 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="relative">
          <Link href="/" className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-md" aria-label="Back to LamViec360 homepage">
            <AppLogo src="/assets/images/lamviec-logo-none-1787565498437.png" size={40} />
            <span className="font-bold text-xl text-white">LamViec360</span>
          </Link>
        </div>
        <div className="relative">
          <h1 className="text-3xl xl:text-4xl font-bold text-white leading-tight mb-4">
            Tìm Việc Làm Phù Hợp.
            <br />
            <span className="text-yellow-300">Xây Dựng Tương Lai.</span>
          </h1>
          <p className="text-white/75 text-base leading-relaxed mb-8">
            Tham gia cùng hàng nghìn ứng viên đang tìm kiếm cơ hội nghề nghiệp mơ ước trên LamViec360.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {brandStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={`auth-stat-${stat.label}`} className="bg-white/10 rounded-xl p-4 text-center">
                  <Icon size={20} className="text-white/70 mx-auto mb-1.5" />
                  <div className="text-xl font-bold text-white tab-number">{stat.value}</div>
                  <div className="text-xs text-white/60 mt-0.5">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="relative">
          <p className="text-xs text-white/40">© 2026 LamViec360. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>

      {/* Form Panel — Right */}
      <div className="flex-1 flex flex-col bg-background">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-card">
          <Link href="/" className="flex items-center gap-2" aria-label="Back to homepage">
            <AppLogo src="/assets/images/lamviec-logo-none-1787565498437.png" size={30} />
            <span className="font-bold text-base text-foreground">LamViec360</span>
          </Link>
          <LanguageSelector currentLanguage={language} onLanguageChange={changeLanguage} />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-10 xl:p-14">
          <div className="w-full max-w-md">
            {/* Language selector — desktop */}
            <div className="hidden lg:flex justify-end mb-6">
              <LanguageSelector currentLanguage={language} onLanguageChange={changeLanguage} />
            </div>

            {/* Back to home link for non-login views */}
            {view !== 'login' && view !== 'register' && (
              <button
                onClick={() => setView('login')}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              >
                <ArrowLeft size={15} />
                Quay lại đăng nhập
              </button>
            )}

            {view === 'login' && (
              <LoginForm
                t={t}
                onSwitchToRegister={() => setView('register')}
                onSwitchToForgot={() => setView('forgot')}
              />
            )}
            {view === 'register' && (
              <RegisterForm
                t={t}
                onSwitchToLogin={() => setView('login')}
                onSuccess={handleRegisterSuccess}
              />
            )}
            {view === 'otp' && (
              <OTPVerification
                email={registeredEmail}
                onSuccess={() => setView('login')}
              />
            )}
            {view === 'forgot' && (
              <ForgotPassword onBack={() => setView('login')} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}