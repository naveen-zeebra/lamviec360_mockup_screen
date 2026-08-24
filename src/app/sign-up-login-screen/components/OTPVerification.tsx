'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Loader2, CheckCircle, Mail } from 'lucide-react';
import { toast } from 'sonner';

interface OTPVerificationProps {
  email: string;
  onSuccess: () => void;
}

export default function OTPVerification({ email, onSuccess }: OTPVerificationProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(''));
      inputRefs.current[5]?.focus();
    }
    e.preventDefault();
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length !== 6) {
      setError('Vui lòng nhập đầy đủ mã OTP 6 chữ số');
      return;
    }
    setIsLoading(true);
    setError('');
    // Backend integration: POST /api/auth/verify-otp with email + code
    await new Promise(r => setTimeout(r, 1200));
    if (code === '123456') {
      setIsSuccess(true);
      toast.success('Email đã được xác minh thành công!');
      setTimeout(onSuccess, 1500);
    } else {
      setError('Mã OTP không đúng. Vui lòng kiểm tra lại.');
    }
    setIsLoading(false);
  };

  const handleResend = async () => {
    setIsResending(true);
    // Backend integration: POST /api/auth/resend-otp with email
    await new Promise(r => setTimeout(r, 800));
    setCountdown(60);
    setOtp(['', '', '', '', '', '']);
    setError('');
    toast.success('Mã OTP mới đã được gửi!');
    setIsResending(false);
    inputRefs.current[0]?.focus();
  };

  if (isSuccess) {
    return (
      <div className="text-center animate-fade-in py-8">
        <div className="w-16 h-16 bg-success-bg rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-success" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">Email đã xác minh!</h2>
        <p className="text-sm text-muted-foreground">Đang chuyển hướng đến trang đăng nhập...</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-7">
        <div className="w-14 h-14 bg-info-bg rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Mail size={26} className="text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Xác Minh Email</h1>
        <p className="text-sm text-muted-foreground">
          Chúng tôi đã gửi mã xác minh 6 chữ số đến
        </p>
        <p className="text-sm font-semibold text-foreground mt-0.5">{email}</p>
      </div>

      <div className="mb-2">
        <label className="block text-sm font-medium text-foreground mb-3 text-center">
          Nhập mã OTP
        </label>
        <div className="flex gap-2 justify-center" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={`otp-digit-${index}`}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`w-11 h-12 text-center text-lg font-bold border rounded-xl bg-background text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all ${
                error ? 'border-error' : digit ? 'border-primary' : 'border-border'
              }`}
              aria-label={`OTP digit ${index + 1}`}
            />
          ))}
        </div>
        {error && (
          <p role="alert" className="text-xs text-error mt-2 text-center">{error}</p>
        )}
        <p className="text-xs text-muted-foreground text-center mt-2">Demo: nhập 123456</p>
      </div>

      <button
        onClick={handleVerify}
        disabled={isLoading || otp.join('').length !== 6}
        className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60 disabled:cursor-not-allowed active:scale-95 text-sm mt-5"
        style={{ minHeight: '48px' }}
      >
        {isLoading ? (
          <>
            <Loader2 size={17} className="animate-spin" />
            Đang xác minh...
          </>
        ) : (
          'Xác Minh Email'
        )}
      </button>

      <div className="text-center mt-4">
        {countdown > 0 ? (
          <p className="text-sm text-muted-foreground tab-number">
            Gửi lại mã sau <span className="font-semibold text-foreground">{countdown}s</span>
          </p>
        ) : (
          <button
            onClick={handleResend}
            disabled={isResending}
            className="text-sm text-primary font-semibold hover:text-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded disabled:opacity-60"
          >
            {isResending ? 'Đang gửi...' : 'Gửi lại mã OTP'}
          </button>
        )}
      </div>
    </div>
  );
}