"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../../../components/ds";
import Icon from "../../../components/ds/Icon";
import { useLang, t } from "../../../utils/lang";
import Toast, { useToast } from "../../../components/ds/Toast";
import NaukriShell from "../../../components/auth/NaukriShell";
import { login } from "../../../lib/companyStore";

export default function EmployerLoginClient() {
  const [lang, setLang] = useLang();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [toast, setToast] = useToast();

  const bullets = [
    t(lang, "Publish jobs and reach qualified candidates."),
    t(lang, "Manage your whole candidate pipeline in one place."),
    t(lang, "Invite your team with role-based access."),
    t(lang, "Track hiring performance with real data.")
  ];

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
        <h1>{t(lang, "Employer Login")}</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login();
            setToast(t(lang, "Signing you in…"));
            setTimeout(() => router.push("/company/overview"), 600);
          }}
        >
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6, display: "block" }}>
              {t(lang, "Work Email")}
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hr@company.com"
            />
          </div>

          <div style={{ marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6, display: "block" }}>
              {t(lang, "Password")}
            </label>
            <div style={{ position: "relative" }}>
              <Input
                type={showPw ? "text" : "password"}
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="••••••••"
              />
              <div
                onClick={() => setShowPw(!showPw)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: 12,
                  fontSize: 13,
                  color: "#4f46e5",
                  cursor: "pointer",
                  fontWeight: 500
                }}
              >
                {showPw ? t(lang, "Hide") : t(lang, "Show")}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setToast(t(lang, "A reset link would be emailed to you"));
              }}
              style={{ fontSize: 12, color: "#4f46e5", fontWeight: 500 }}
            >
              {t(lang, "Forgot Password?")}
            </a>
          </div>

          <button type="submit" className="lv-reg-submit" style={{ width: "100%", padding: "12px", color: "#fff", border: "none", borderRadius: "8px", fontSize: 16, fontWeight: 600, background: "#3b82f6", cursor: "pointer" }}>
            {t(lang, "Login")}
          </button>

          {/* <div style={{ textAlign: "center", marginTop: 16 }}>
            <a href="#" style={{ fontSize: 14, color: "#4f46e5", fontWeight: 500 }} onClick={(e) => { e.preventDefault(); setToast(t(lang, "OTP Login Demo")); }}>
              {t(lang, "Use OTP to Login")}
            </a>
          </div> */}
        </form>

        <div className="lv-reg-divider" style={{ margin: "24px 0" }}>Or</div>

        <button type="button" className="lv-reg-social" style={{ width: "100%", padding: "10px", background: "#fff", border: "1px solid #d1d5db", borderRadius: "24px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 15, fontWeight: 500, cursor: "pointer", color: "#374151" }} onClick={() => setToast(t(lang, "Social login demo"))}>
          <Icon name="chrome" size={18} style={{ color: "#4285F4" }} />
          {t(lang, "Sign in with Google")}
        </button>
      </NaukriShell>
      <Toast msg={toast} />
    </>
  );
}
