'use client';
import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Loader2, Globe } from 'lucide-react';
import { toast } from 'sonner';
import { TranslationKeys } from '@/lib/i18n';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginFormProps {
  t: TranslationKeys;
  onSwitchToRegister: () => void;
  onSwitchToForgot: () => void;
}

// Demo credentials
const DEMO_CREDENTIALS = { email: 'minhanh@lamviec360.vn', password: 'Demo@2026' };

export default function LoginForm({ t, onSwitchToRegister, onSwitchToForgot }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginFormData>({
    defaultValues: { rememberMe: false },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    // Backend integration: POST /api/auth/login with email + password
    await new Promise(r => setTimeout(r, 1200));
    if (data.email === DEMO_CREDENTIALS.email && data.password === DEMO_CREDENTIALS.password) {
      toast.success(t.authForms.loginSuccessToast);
      window.location.href = '/job-seeker-dashboard';
    } else {
      toast.error(t.authForms.loginErrorToast);
    }
    setIsLoading(false);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-foreground mb-1">{t.authentication.welcomeBack}</h1>
        <p className="text-sm text-muted-foreground">{t.authForms.loginSubtitle}</p>
      </div>

      {/* Google OAuth */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 py-3 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors mb-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
        aria-label="Continue with Google"
      >
        <Globe size={18} className="text-red-500" />
        {t.authentication.continueWithGoogle}
      </button>

      <div className="relative mb-5">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-3 text-xs text-muted-foreground">{t.authForms.orSignInWithEmail}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {/* Email */}
        <div>
          <label htmlFor="login-email" className="block text-sm font-medium text-foreground mb-1.5">
            {t.authentication.email} <span className="text-error" aria-label="required">*</span>
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder={t.authForms.emailPlaceholder}
            className={`w-full px-4 py-3 border rounded-xl text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all ${
              errors.email ? 'border-error focus-visible:ring-error' : 'border-border'
            }`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'login-email-error' : undefined}
            {...register('email', {
              required: t.authForms.errorEmailRequired,
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t.authForms.errorEmailInvalid },
            })}
          />
          {errors.email && (
            <p id="login-email-error" role="alert" className="text-xs text-error mt-1.5 flex items-center gap-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="login-password" className="block text-sm font-medium text-foreground">
              {t.authentication.password} <span className="text-error" aria-label="required">*</span>
            </label>
            <button
              type="button"
              onClick={onSwitchToForgot}
              className="text-xs text-primary hover:text-primary-dark font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              {t.authentication.forgotPassword}?
            </button>
          </div>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="••••••••"
              className={`w-full px-4 py-3 pr-11 border rounded-xl text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all ${
                errors.password ? 'border-error focus-visible:ring-error' : 'border-border'
              }`}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'login-password-error' : undefined}
              {...register('password', { required: t.authForms.errorPasswordRequired })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded p-0.5"
              aria-label={showPassword ? t.authForms.hidePasswordAria : t.authForms.showPasswordAria}
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
          {errors.password && (
            <p id="login-password-error" role="alert" className="text-xs text-error mt-1.5">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember Me */}
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-border text-primary focus:ring-ring focus:ring-2 cursor-pointer"
            aria-label="Remember me"
            {...register('rememberMe')}
          />
          <span className="text-sm text-muted-foreground">{t.authentication.rememberMe}</span>
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-70 disabled:cursor-not-allowed active:scale-95 text-sm"
          style={{ minHeight: '48px' }}
        >
          {isLoading ? (
            <>
              <Loader2 size={17} className="animate-spin" />
              {t.authForms.signingIn}
            </>
          ) : (
            t.authentication.login
          )}
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-5">
        {t.authentication.noAccount}{' '}
        <button
          onClick={onSwitchToRegister}
          className="text-primary font-semibold hover:text-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        >
          {t.authentication.register}
        </button>
      </p>

      {/* Demo Credentials */}
      <div className="mt-5 p-4 bg-muted/60 border border-border rounded-xl">
        <p className="text-xs font-semibold text-muted-foreground mb-2.5 uppercase tracking-wider">{t.authForms.demoAccountLabel}</p>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-muted-foreground">Email:</span>
            <div className="flex items-center gap-1.5">
              <code className="text-xs font-mono text-foreground bg-card px-2 py-0.5 rounded border border-border">{DEMO_CREDENTIALS.email}</code>
              <button
                type="button"
                onClick={() => setValue('email', DEMO_CREDENTIALS.email)}
                className="text-xs text-primary hover:text-primary-dark font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-1"
                aria-label="Use demo email"
              >
                {t.authForms.useLabel}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-muted-foreground">{t.authForms.demoPasswordLabel}</span>
            <div className="flex items-center gap-1.5">
              <code className="text-xs font-mono text-foreground bg-card px-2 py-0.5 rounded border border-border">{DEMO_CREDENTIALS.password}</code>
              <button
                type="button"
                onClick={() => setValue('password', DEMO_CREDENTIALS.password)}
                className="text-xs text-primary hover:text-primary-dark font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-1"
                aria-label="Use demo password"
              >
                {t.authForms.useLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}