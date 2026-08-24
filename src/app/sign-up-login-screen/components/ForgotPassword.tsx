'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, Mail, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

interface ForgotPasswordProps {
  onBack: () => void;
}

type ForgotView = 'email' | 'sent' | 'reset';

export default function ForgotPassword({ onBack }: ForgotPasswordProps) {
  const [view, setView] = useState<ForgotView>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [sentEmail, setSentEmail] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const emailForm = useForm<{ email: string }>();
  const resetForm = useForm<{ newPassword: string; confirmPassword: string }>();

  const handleEmailSubmit = async (data: { email: string }) => {
    setIsLoading(true);
    // Backend integration: POST /api/auth/forgot-password with email
    await new Promise(r => setTimeout(r, 1000));
    setSentEmail(data.email);
    setView('sent');
    setIsLoading(false);
  };

  const handleResetSubmit = async (data: { newPassword: string; confirmPassword: string }) => {
    setIsLoading(true);
    // Backend integration: POST /api/auth/reset-password with token + new password
    await new Promise(r => setTimeout(r, 1000));
    toast.success('Mật khẩu đã được đặt lại thành công!');
    onBack();
    setIsLoading(false);
  };

  if (view === 'sent') {
    return (
      <div className="animate-fade-in text-center">
        <div className="w-14 h-14 bg-info-bg rounded-2xl flex items-center justify-center mx-auto mb-5">
          <Mail size={26} className="text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Kiểm Tra Email Của Bạn</h1>
        <p className="text-sm text-muted-foreground mb-1">Chúng tôi đã gửi link đặt lại mật khẩu đến</p>
        <p className="text-sm font-semibold text-foreground mb-6">{sentEmail}</p>
        <p className="text-xs text-muted-foreground mb-6">
          Không nhận được email? Kiểm tra thư mục spam hoặc thử lại.
        </p>
        <button
          onClick={() => setView('reset')}
          className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring text-sm active:scale-95"
        >
          Đặt Mật Khẩu Mới (Demo)
        </button>
        <button onClick={onBack} className="w-full mt-3 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl">
          Quay lại đăng nhập
        </button>
      </div>
    );
  }

  if (view === 'reset') {
    const newPwd = resetForm.watch('newPassword', '');
    return (
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground mb-1">Đặt Mật Khẩu Mới</h1>
        <p className="text-sm text-muted-foreground mb-6">Tạo mật khẩu mạnh cho tài khoản của bạn</p>
        <form onSubmit={resetForm.handleSubmit(handleResetSubmit)} noValidate className="space-y-4">
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-foreground mb-1.5">
              Mật khẩu mới <span className="text-error">*</span>
            </label>
            <div className="relative">
              <input
                id="new-password"
                type={showNew ? 'text' : 'password'}
                placeholder="Tối thiểu 8 ký tự"
                className={`w-full px-4 py-3 pr-11 border rounded-xl text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${resetForm.formState.errors.newPassword ? 'border-error' : 'border-border'}`}
                {...resetForm.register('newPassword', { required: 'Vui lòng nhập mật khẩu mới', minLength: { value: 8, message: 'Tối thiểu 8 ký tự' } })}
              />
              <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none rounded p-0.5" aria-label={showNew ? 'Ẩn' : 'Hiện'}>
                {showNew ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            {resetForm.formState.errors.newPassword && <p role="alert" className="text-xs text-error mt-1.5">{resetForm.formState.errors.newPassword.message}</p>}
          </div>
          <div>
            <label htmlFor="confirm-new-password" className="block text-sm font-medium text-foreground mb-1.5">
              Xác nhận mật khẩu <span className="text-error">*</span>
            </label>
            <div className="relative">
              <input
                id="confirm-new-password"
                type={showConfirm ? 'text' : 'password'}
                placeholder="Nhập lại mật khẩu"
                className={`w-full px-4 py-3 pr-11 border rounded-xl text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${resetForm.formState.errors.confirmPassword ? 'border-error' : 'border-border'}`}
                {...resetForm.register('confirmPassword', { required: 'Vui lòng xác nhận mật khẩu', validate: v => v === newPwd || 'Mật khẩu không khớp' })}
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none rounded p-0.5" aria-label={showConfirm ? 'Ẩn' : 'Hiện'}>
                {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            {resetForm.formState.errors.confirmPassword && <p role="alert" className="text-xs text-error mt-1.5">{resetForm.formState.errors.confirmPassword.message}</p>}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-70 active:scale-95 text-sm"
            style={{ minHeight: '48px' }}
          >
            {isLoading ? <><Loader2 size={17} className="animate-spin" />Đang xử lý...</> : 'Đặt Lại Mật Khẩu'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground mb-1">Quên Mật Khẩu?</h1>
      <p className="text-sm text-muted-foreground mb-6">Nhập email của bạn để nhận link đặt lại mật khẩu</p>
      <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} noValidate className="space-y-4">
        <div>
          <label htmlFor="forgot-email" className="block text-sm font-medium text-foreground mb-1.5">
            Địa chỉ email <span className="text-error">*</span>
          </label>
          <input
            id="forgot-email"
            type="email"
            placeholder="ten@email.com"
            className={`w-full px-4 py-3 border rounded-xl text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${emailForm.formState.errors.email ? 'border-error' : 'border-border'}`}
            {...emailForm.register('email', { required: 'Vui lòng nhập địa chỉ email', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email không hợp lệ' } })}
          />
          {emailForm.formState.errors.email && <p role="alert" className="text-xs text-error mt-1.5">{emailForm.formState.errors.email.message}</p>}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-70 active:scale-95 text-sm"
          style={{ minHeight: '48px' }}
        >
          {isLoading ? <><Loader2 size={17} className="animate-spin" />Đang gửi...</> : 'Gửi Link Đặt Lại'}
        </button>
      </form>
      <button onClick={onBack} className="w-full mt-3 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl">
        Quay lại đăng nhập
      </button>
    </div>
  );
}