"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "../../../components/ds";
import Icon from "../../../components/ds/Icon";
import OtpInput from "../../../components/ds/OtpInput";
import { useLang, t } from "../../../utils/lang";
import Toast, { useToast } from "../../../components/ds/Toast";
import NaukriShell from "../../../components/auth/NaukriShell";
import { beginLogin, completeLogin } from "../../../lib/companyStore";

const RESEND_SECONDS = 45;

function maskEmail(email) {
  if (!email || !email.includes("@")) return "your email";
  const [name, domain] = email.split("@");
  return `${name.slice(0, 1)}•••@${domain}`;
}

export default function EmployerLoginClient() {
  const [lang, setLang] = useLang();
  const router = useRouter();
  const [stage, setStage] = useState("password");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const [toast, setToast] = useToast();

  useEffect(() => {
    if (stage !== "otp" || seconds <= 0) return;
    const id = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [stage, seconds]);

  const bullets = [
    t(lang, "Publish jobs and reach qualified candidates."),
    t(lang, "Manage your whole candidate pipeline in one place."),
    t(lang, "Invite your team with role-based access."),
    t(lang, "Track hiring performance with real data."),
  ];

  const submitPassword = (e) => {
    e.preventDefault();
    if (!pw) {
      setErr(t(lang, "Enter your password."));
      return;
    }
    setErr("");
    beginLogin();
    setStage("otp");
    setSeconds(RESEND_SECONDS);
    setToast(t(lang, "We sent a 6-digit code to your email"));
  };

  const submitOtp = (e) => {
    e.preventDefault();
    if (code.length !== 6) {
      setErr(t(lang, "Enter the 6-digit code sent to your email."));
      return;
    }
    completeLogin();
    setToast(t(lang, "Signing you in…"));
    setTimeout(() => router.push("/company/overview"), 600);
  };

  return (
    <>
      <NaukriShell
        lang={lang}
        setLang={setLang}
        app="employer"
        title={t(lang, "Hire better talent.")}
        bullets={bullets}
        ctaText={t(lang, "Create Company Account")}
        ctaHref="/company-register"
      >
        {stage === "password" ? (
          <>
            <h1>{t(lang, "Employer Login")}</h1>
            <form onSubmit={submitPassword}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6, display: "block" }}>{t(lang, "Work Email")}</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="hr@company.com" />
              </div>

              <div style={{ marginBottom: 8 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6, display: "block" }}>{t(lang, "Password")}</label>
                <div style={{ position: "relative" }}>
                  <Input type={showPw ? "text" : "password"} value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••" />
                  <div onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 12, top: 12, fontSize: 13, color: "#4f46e5", cursor: "pointer", fontWeight: 500 }}>
                    {showPw ? t(lang, "Hide") : t(lang, "Show")}
                  </div>
                </div>
              </div>

              {err && (
                <p className="lv-error" role="alert" style={{ marginBottom: 12 }}>
                  <Icon name="alert-circle" size={16} />
                  <span>{err}</span>
                </p>
              )}

              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
                <a href="#" onClick={(e) => { e.preventDefault(); setToast(t(lang, "A reset link would be emailed to you")); }} style={{ fontSize: 12, color: "#4f46e5", fontWeight: 500 }}>
                  {t(lang, "Forgot Password?")}
                </a>
              </div>

              <button type="submit" className="lv-reg-submit" style={{ width: "100%", padding: "12px", color: "#fff", border: "none", borderRadius: "8px", fontSize: 16, fontWeight: 600, background: "#3b82f6", cursor: "pointer" }}>
                {t(lang, "Continue")}
              </button>
            </form>

            <div className="lv-reg-divider" style={{ margin: "24px 0" }}>Or</div>

            <button type="button" className="lv-reg-social" style={{ width: "100%", padding: "10px", background: "#fff", border: "1px solid #d1d5db", borderRadius: "24px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 15, fontWeight: 500, cursor: "pointer", color: "#374151" }} onClick={() => setToast(t(lang, "Social login demo"))}>
              <Icon name="chrome" size={18} style={{ color: "#4285F4" }} />
              {t(lang, "Sign in with Google")}
            </button>
          </>
        ) : (
          <>
            <h1>{t(lang, "Two-factor authentication")}</h1>
            <p style={{ color: "#6b7280", fontSize: 14, margin: "8px 0 20px" }}>
              {t(lang, "Enter the 6-digit code sent to")} <strong>{maskEmail(email)}</strong>. {t(lang, "2FA is required for company admins.")}
            </p>
            <form onSubmit={submitOtp} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <OtpInput value={code} onChange={(v) => { setCode(v); setErr(""); }} />
              {err && (
                <p className="lv-error" role="alert">
                  <Icon name="alert-circle" size={16} />
                  <span>{err}</span>
                </p>
              )}
              <Button type="submit" variant="primary" size="lg" style={{ width: "100%", justifyContent: "center" }}>
                {t(lang, "Verify & sign in")}
              </Button>
            </form>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, fontSize: 13, color: "#6b7280" }}>
              <button type="button" onClick={() => { setStage("password"); setCode(""); setErr(""); }} style={{ background: "none", border: "none", color: "#4f46e5", fontWeight: 600, cursor: "pointer" }}>
                {t(lang, "Back to password")}
              </button>
              {seconds > 0 ? (
                <span>{t(lang, "Resend code in")} {seconds}s</span>
              ) : (
                <button type="button" onClick={() => { setSeconds(RESEND_SECONDS); setToast(t(lang, "A new code has been sent")); }} style={{ background: "none", border: "none", color: "#4f46e5", fontWeight: 600, cursor: "pointer" }}>
                  {t(lang, "Resend code")}
                </button>
              )}
            </div>
            <p className="lv-auth-note" style={{ marginTop: 16 }}>{t(lang, "Prototype only — enter any 6 digits.")}</p>
          </>
        )}
      </NaukriShell>
      <Toast msg={toast} />
    </>
  );
}
