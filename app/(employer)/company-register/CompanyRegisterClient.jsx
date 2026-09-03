"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input, Select } from "../../../components/ds";
import Icon from "../../../components/ds/Icon";
import { useLang, t } from "../../../utils/lang";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import Toast, { useToast } from "../../../components/ds/Toast";
import Check from "../../../components/ds/Check";
import { COMPANIES } from "../../../lib/data";

export default function CompanyRegisterClient() {
  const [lang, setLang] = useLang();
  const router = useRouter();
  const [f, setF] = useState({ co: "", name: "", email: "", pw: "", confirmPw: "", ind: "", size: "" });
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [agree, setAgree] = useState(false);
  const [err, setErr] = useState("");
  const [toast, setToast] = useToast();

  const set = (k) => (e) => {
    setF((v) => ({ ...v, [k]: e.target.value }));
    setErr("");
  };

  const submit = (e) => {
    e.preventDefault();
    if (!f.co.trim() || !f.name.trim() || !f.email.trim() || f.pw.length < 8) {
      setErr(t(lang, "Please fill all required fields and ensure password is at least 8 characters."));
      return;
    }
    if (f.pw !== f.confirmPw) {
      setErr(t(lang, "Passwords do not match."));
      return;
    }
    if (!agree) {
      setErr(t(lang, "Please accept the terms to continue."));
      return;
    }
    setToast(t(lang, "Sending a verification code…"));
    setTimeout(() => router.push("/company-verify-email"), 700);
  };

  return (
    <>
      <Header lang={lang} setLang={setLang} app="employer" />
      <main className="lv-reg-wrap">
        <div className="lv-reg-container" style={{ gridTemplateColumns: "1fr", maxWidth: 600, margin: "0 auto" }}>
          {/* Form Panel */}
          <div className="lv-reg-right" style={{ padding: "48px" }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <img src="/logo-cropped.png" alt="LàmViệc360" style={{ height: 32, marginBottom: 16 }} />
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{t(lang, "Create company account")}</h2>
              <p style={{ color: "#6b7280", fontSize: 14 }}>{t(lang, "Sign up to post jobs and manage candidates.")}</p>
            </div>

            <form onSubmit={submit}>
              <div className="lv-reg-row" style={{ marginBottom: 16 }}>
                <Input
                  label={t(lang, "Company name")}
                  type="text"
                  value={f.co}
                  onChange={set("co")}
                  placeholder="ABC Technologies"
                />
                <Input
                  label={t(lang, "Contact name")}
                  type="text"
                  value={f.name}
                  onChange={set("name")}
                  placeholder={t(lang, "Nguyen Van A")}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <Input
                  label={t(lang, "Work email")}
                  type="email"
                  value={f.email}
                  onChange={set("email")}
                  placeholder="hr@company.com"
                />
              </div>

              <div className="lv-reg-row" style={{ marginBottom: 16 }}>
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

              <div className="lv-reg-row" style={{ marginBottom: 16 }}>
                <Select
                  label={t(lang, "Industry")}
                  placeholder={t(lang, "Select an industry")}
                  value={f.ind}
                  onChange={set("ind")}
                  options={[...new Set(COMPANIES.map((c) => (lang === "VN" || lang === "VI" ? c.industryVi : c.industry)))].map((i) => ({ value: i, label: i }))}
                />
                <Select
                  label={t(lang, "Company size")}
                  placeholder={t(lang, "Select a size")}
                  value={f.size}
                  onChange={set("size")}
                  options={["1–10", "11–50", "51–200", "201–500", "500+"].map((s) => ({ value: s, label: s + " " + t(lang, "employees") }))}
                />
              </div>

              <Check
                label={t(lang, "I agree to the Terms of Service and Privacy Policy")}
                checked={agree}
                onChange={() => {
                  setAgree((v) => !v);
                  setErr("");
                }}
              />

              {err && (
                <p className="lv-error" role="alert" style={{ marginTop: 16, color: "var(--color-error)", fontSize: 14, display: "flex", gap: 6, alignItems: "center" }}>
                  <Icon name="alert-circle" size={16} />
                  <span>{err}</span>
                </p>
              )}

              <button type="submit" className="lv-reg-submit">
                {t(lang, "Create Company Account")}
              </button>
            </form>

            <p style={{ marginTop: 24, fontSize: 14, color: "#4b5563", textAlign: "center" }}>
              {t(lang, "Company already registered?")}{" "}
              <Link href="/employer-login" style={{ fontWeight: 600, color: "#111827" }}>
                {t(lang, "Log in")}
              </Link>
            </p>

          </div>
        </div>
      </main>
      <Footer lang={lang} setLang={setLang} app="employer" />
      <Toast msg={toast} />
    </>
  );
}
