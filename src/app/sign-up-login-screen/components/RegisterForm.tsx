'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { TranslationKeys } from '@/lib/i18n';

interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface RegisterFormProps {
  t: TranslationKeys;
  onSwitchToLogin: () => void;
  onSuccess: (email: string) => void;
}

function getPasswordStrength(password: string, t: TranslationKeys): { score: number; label: string; color: string } {
  if (!password) return { score: 0, label: '', color: '' };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  const levels = [
    { score: 1, label: t.authForms.strengthWeak, color: 'bg-error' },
    { score: 2, label: t.authForms.strengthMedium, color: 'bg-warning' },
    { score: 3, label: t.authForms.strengthGood, color: 'bg-blue-500' },
    { score: 4, label: t.authForms.strengthStrong, color: 'bg-success' },
  ];
  return levels[score - 1] || { score: 0, label: '', color: '' };
}

export default function RegisterForm({ t, onSwitchToLogin, onSuccess }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [watchedPassword, setWatchedPassword] = useState('');

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();
  const password = watch('password', '');

  const strength = getPasswordStrength(watchedPassword, t);

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    // Backend integration: POST /api/auth/register with user data
    await new Promise(r => setTimeout(r, 1400));
    toast.success(t.authForms.registerSuccessToast);
    onSuccess(data.email);
    setIsLoading(false);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">{t.authentication.createAccount}</h1>
        <p className="text-sm text-muted-foreground">{t.authForms.registerSubtitle}</p>
      </div>

      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 py-3 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors mb-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
        aria-label="Register with Google"
      >
        <svg className="text-red-500" aria-hidden="true" viewBox="0 0 48 48" width="18" height="18">
          <path fill="#EA4335" d="M24 9.554v3.446h6.946c3.54 0 6.517-1.224 6.517-2.642C30.517 7.224 27.483 6 24 6z" />
          <path fill="#4285F4" d="M4.521 24.07C4.521 21.854 6.096 19.28 8.006 17.37l6.947-6.947C13.904 8.364 15.479 6 17.594 6z" />
          <path fill="none" d="M0 24.07h4.479l6.947-6.947C6.517 6.224 8.092 6 10.106 6z" />
          <path fill="#FBBC05" d="M10.106 8.006l6.947 6.947H24c0-1.104-0.286-2.079-0.781-2.642z" />
          <path fill="none" d="M24 0v4.479l6.946-6.946C26.946 4.224 27.921 5.2 28 6z" />
          <path fill="#374151" d="M12.921 20.594L24 24l6.079-3.406z" />
          <path fill="none" d="M12.921 24l11.079-11L24 12z" />
        </svg>
        {t.authentication.continueWithGoogle}
      </button>

      <div className="relative mb-5">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-3 text-xs text-muted-foreground">{t.authForms.orSignUpWithEmail}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="reg-fullname" className="block text-sm font-medium text-foreground mb-1.5">
            {t.authentication.fullName} <span className="text-error" aria-label="required">*</span>
          </label>
          <input
            id="reg-fullname"
            type="text"
            autoComplete="name"
            placeholder={t.authForms.fullNamePlaceholder}
            className={`w-full px-4 py-3 border rounded-xl text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all ${errors.fullName ? 'border-error' : 'border-border'}`}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? 'reg-name-error' : undefined}
            {...register('fullName', { required: t.authForms.errorFullNameRequired, minLength: { value: 2, message: t.authForms.errorFullNameMinLength } })}
          />
          {errors.fullName && <p id="reg-name-error" role="alert" className="text-xs text-error mt-1.5">{errors.fullName.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="reg-email" className="block text-sm font-medium text-foreground mb-1.5">
            {t.authentication.email} <span className="text-error" aria-label="required">*</span>
          </label>
          <input
            id="reg-email"
            type="email"
            autoComplete="email"
            placeholder={t.authForms.emailPlaceholder}
            className={`w-full px-4 py-3 border rounded-xl text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all ${errors.email ? 'border-error' : 'border-border'}`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'reg-email-error' : undefined}
            {...register('email', {
              required: t.authForms.errorEmailRequired,
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t.authForms.errorEmailInvalid },
            })}
          />
          {errors.email && <p id="reg-email-error" role="alert" className="text-xs text-error mt-1.5">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="reg-password" className="block text-sm font-medium text-foreground mb-1.5">
            {t.authentication.password} <span className="text-error" aria-label="required">*</span>
          </label>
          <div className="relative">
            <input
              id="reg-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder={t.forgotPassword.newPasswordPlaceholder}
              className={`w-full px-4 py-3 pr-11 border rounded-xl text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all ${errors.password ? 'border-error' : 'border-border'}`}
              aria-invalid={!!errors.password}
              aria-describedby="reg-password-strength"
              {...register('password', {
                required: t.authForms.errorPasswordRequired,
                minLength: { value: 8, message: t.authForms.errorPasswordMinLength },
                onChange: (e) => setWatchedPassword(e.target.value),
              })}
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
          {errors.password && <p role="alert" className="text-xs text-error mt-1.5">{errors.password.message}</p>}
          {watchedPassword && (
            <div id="reg-password-strength" className="mt-2" aria-live="polite">
              <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={`strength-bar-${level}`}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${level <= strength.score ? strength.color : 'bg-border'}`}
                  />
                ))}
              </div>
              {strength.label && <p className="text-xs text-muted-foreground">{t.authForms.strengthLabel} <span className="font-medium text-foreground">{strength.label}</span></p>}
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="reg-confirm" className="block text-sm font-medium text-foreground mb-1.5">
            {t.authentication.confirmPassword} <span className="text-error" aria-label="required">*</span>
          </label>
          <div className="relative">
            <input
              id="reg-confirm"
              type={showConfirm ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder={t.forgotPassword.confirmPasswordPlaceholder}
              className={`w-full px-4 py-3 pr-11 border rounded-xl text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all ${errors.confirmPassword ? 'border-error' : 'border-border'}`}
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={errors.confirmPassword ? 'reg-confirm-error' : undefined}
              {...register('confirmPassword', {
                required: t.forgotPassword.errorConfirmRequired,
                validate: (v) => v === password || t.forgotPassword.errorPasswordMismatch,
              })}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded p-0.5"
              aria-label={showConfirm ? t.authForms.hideConfirmAria : t.authForms.showConfirmAria}
            >
              {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
          {errors.confirmPassword && <p id="reg-confirm-error" role="alert" className="text-xs text-error mt-1.5">{errors.confirmPassword.message}</p>}
        </div>

        {/* Terms */}
        <div>
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-border text-primary focus:ring-ring focus:ring-2 cursor-pointer mt-0.5"
              aria-invalid={!!errors.agreeToTerms}
              aria-describedby={errors.agreeToTerms ? 'terms-error' : undefined}
              {...register('agreeToTerms', { required: t.authForms.errorTermsRequired })}
            />
            <span className="text-sm text-muted-foreground leading-relaxed">
              {t.authentication.termsAgreement}{' '}
              <button type="button" className="text-primary hover:text-primary-dark font-medium underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">
                {t.authentication.termsOfService}
              </button>{' '}
              {t.authentication.and}{' '}
              <button type="button" className="text-primary hover:text-primary-dark font-medium underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">
                {t.authentication.privacyPolicy}
              </button>
            </span>
          </label>
          {errors.agreeToTerms && <p id="terms-error" role="alert" className="text-xs text-error mt-1.5">{errors.agreeToTerms.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-70 disabled:cursor-not-allowed active:scale-95 text-sm"
          style={{ minHeight: '48px' }}
        >
          {isLoading ? (
            <>
              <Loader2 size={17} className="animate-spin" />
              {t.authForms.creatingAccount}
            </>
          ) : (
            t.authentication.register
          )}
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-5">
        {t.authentication.haveAccount}{' '}
        <button
          onClick={onSwitchToLogin}
          className="text-primary font-semibold hover:text-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        >
          {t.authentication.login}
        </button>
      </p>
    </div>
  );
}