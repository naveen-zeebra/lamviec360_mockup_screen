"use client";
import { useState } from "react";
import Link from "next/link";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import Icon from "../../../components/ds/Icon";
import { Button, Input } from "../../../components/ds";
import { useLang, t } from "../../../utils/lang";

export default function ForgotPasswordClient() {
  const [lang, setLang] = useLang();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setErr(t(lang, "Enter a valid email address."));
      return;
    }
    setSent(true);
  };

  return (
    <>
      <Header lang={lang} setLang={setLang} app="seeker" />
      <main className="lv-simple-auth">
        <div className="lv-simple-card">
          {sent ? (
            <>
              <div className="lv-simple-icon">
                <Icon name="mail-check" size={28} />
              </div>
              <div>
                <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, marginBottom: 8 }}>{t(lang, "Check your email")}</h1>
                <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", lineHeight: "var(--leading-relaxed)" }}>
                  {t(lang, "If an account exists for")} <strong>{email}</strong>, {t(lang, "a reset link has been sent.")}
                </p>
              </div>
              <Link href="/reset-password">
                <Button variant="primary" size="lg" style={{ width: "100%", justifyContent: "center" }}>
                  {t(lang, "Continue (open reset link)")}
                </Button>
              </Link>
            </>
          ) : (
            <>
              <div className="lv-simple-icon">
                <Icon name="key-round" size={28} />
              </div>
              <div>
                <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, marginBottom: 8 }}>{t(lang, "Forgot your password?")}</h1>
                <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", lineHeight: "var(--leading-relaxed)" }}>
                  {t(lang, "Enter your email and we'll send you a link to reset it.")}
                </p>
              </div>
              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <Input
                  label={t(lang, "Email")}
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErr("");
                  }}
                  placeholder="name@example.com"
                />
                {err && (
                  <p className="lv-error" role="alert">
                    <Icon name="alert-circle" size={16} />
                    <span>{err}</span>
                  </p>
                )}
                <Button type="submit" variant="primary" size="lg" style={{ width: "100%", justifyContent: "center" }}>
                  {t(lang, "Send Reset Link")}
                </Button>
              </form>
            </>
          )}
          <div style={{ textAlign: "center", fontSize: "var(--text-sm)" }}>
            <Link href="/login" style={{ fontWeight: 600 }}>
              {t(lang, "Back to Login")}
            </Link>
          </div>
        </div>
      </main>
      <Footer lang={lang} setLang={setLang} app="seeker" />
    </>
  );
}
