"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Input } from "../../../components/ds";
import Icon from "../../../components/ds/Icon";
import { useLang, t } from "../../../utils/lang";
import Toast, { useToast } from "../../../components/ds/Toast";
import { registerDraft } from "../../../lib/seekerStore";


export default function RegisterClient() {
  const [lang, setLang] = useLang();
  const router = useRouter();
  const [f, setF] = useState({ name: "", email: "", pw: "", confirmPw: "" });
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [err, setErr] = useState("");
  const [toast, setToast] = useToast();

  const set = (k) => (e) => {
    setF((v) => ({ ...v, [k]: e.target.value }));
    setErr("");
  };

  const submit = (e) => {
    e.preventDefault();
    if (!f.name.trim() || !f.email.trim() || f.pw.length < 8) {
      setErr(t(lang, "Please enter your name, email and a password of at least 8 characters."));
      return;
    }
    if (f.pw !== f.confirmPw) {
      setErr(t(lang, "Passwords do not match."));
      return;
    }
    registerDraft(f.name.trim(), f.email.trim());
    router.push("/verify-email");
  };

  return (
    <>
      <main className="lv-reg-wrap">
        <div className="lv-reg-container">
          {/* Left Marketing Panel */}
          <div className="lv-reg-left">
            <div className="lv-reg-left-brand">
              <img src="/logo-cropped.png" alt="LàmViệc360" style={{ height: 28 }} />
              {/* <span style={{ fontSize: 20 }}>LàmViệc360</span> */}
            </div>

            <h1>{t(lang, "The AI platform for hiring and careers")}</h1>
            <p>
              {t(lang, "Get our all-in-one platform that simplifies the way you find jobs, connect with companies, and build your career path.")}
            </p>

            <div className="lv-reg-left-cards">
              <div className="lv-reg-left-card">
                <strong>35K+</strong>
                <span>{t(lang, "Companies hiring")}</span>
              </div>
              <div className="lv-reg-left-card">
                <strong>500K+</strong>
                <span>{t(lang, "Professionals matched")}</span>
              </div>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="lv-reg-right">
            <h2>{t(lang, "Create your account")}</h2>
            <p>{t(lang, "Sign up using the form, or the Google account you use.")}</p>

            <button type="button" className="lv-reg-social" onClick={() => setToast("Social login demo")}>
              <Icon name="chrome" size={18} style={{ color: "#4285F4" }} />
              {t(lang, "Sign up with Google")}
            </button>

            <div className="lv-reg-divider">or</div>

            <form onSubmit={submit}>
              <div style={{ marginBottom: 16 }}>
                <Input
                  label={t(lang, "Full name")}
                  type="text"
                  value={f.name}
                  onChange={set("name")}
                  placeholder="Sarah Vaughn"
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <Input
                  label={t(lang, "Email")}
                  type="email"
                  value={f.email}
                  onChange={set("email")}
                  placeholder="sarahvaughn42@gmail.com"
                />
              </div>

              <div className="lv-reg-row" style={{ marginBottom: 4 }}>
                <Input
                  label={t(lang, "Password")}
                  type={showPw ? "text" : "password"}
                  value={f.pw}
                  onChange={set("pw")}
                  placeholder="••••••••"
                  iconRight={<Icon name={showPw ? "eye-off" : "eye"} size={18} style={{ color: "#9ca3af" }} />}
                  onIconRightClick={() => setShowPw(!showPw)}
                />
                <Input
                  label={t(lang, "Confirm password")}
                  type={showConfirmPw ? "text" : "password"}
                  value={f.confirmPw}
                  onChange={set("confirmPw")}
                  placeholder="••••••••"
                  iconRight={<Icon name={showConfirmPw ? "eye-off" : "eye"} size={18} style={{ color: "#9ca3af" }} />}
                  onIconRightClick={() => setShowConfirmPw(!showConfirmPw)}
                />
              </div>

              <p className="lv-reg-hint">
                {t(lang, "Min 8 characters, including letters, numbers and special characters")}
              </p>

              {err && (
                <p className="lv-error" role="alert" style={{ marginTop: 16, color: "var(--color-error)", fontSize: 14, display: "flex", gap: 6, alignItems: "center" }}>
                  <Icon name="alert-circle" size={16} />
                  <span>{err}</span>
                </p>
              )}

              <button type="submit" className="lv-reg-submit">
                {t(lang, "Submit")}
              </button>
            </form>

            <p style={{ marginTop: 24, fontSize: 14, color: "#4b5563", textAlign: "center" }}>
              {t(lang, "Already have an account?")}{" "}
              <Link href="/login" style={{ fontWeight: 600, color: "#111827" }}>
                {t(lang, "Log in")}
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Toast msg={toast} />
    </>
  );
}
