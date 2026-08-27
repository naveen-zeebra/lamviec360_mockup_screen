"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ds";
import Icon from "../ds/Icon";
import { SEEKER_NAV, EMPLOYER_NAV, LANGS, useLang, t } from "../../utils/lang";

function LangPicker({ lang, setLang, dark }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="lv-dropdown">
      <button
        className={`lv-lang-btn ${dark ? "on-dark" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t(lang, "Choose language")}
      >
        <Icon name="globe" size={14} />
        {lang}
        <Icon name="chevron-down" size={14} />
      </button>
      {open && (
        <div className="lv-dropdown-menu" role="listbox">
          {LANGS.map((l) => (
            <button
              key={l.code}
              role="option"
              aria-selected={lang === l.code}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header({ lang, setLang, app = "seeker" }) {
  const emp = app === "employer";
  const nav = emp ? EMPLOYER_NAV : SEEKER_NAV;
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 8);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  const switchHref = emp ? "/" : "/employers";
  const switchLabel = emp ? t(lang, "Job Seeker") : t(lang, "Employer / Company");
  const loginHref = emp ? "/employer-login" : "/login";
  const registerHref = emp ? "/company-register" : "/register";
  const loginLabel = emp ? t(lang, "Employer Login") : t(lang, "Login");
  const ctaLabel = emp ? t(lang, "Get Started") : t(lang, "Create Account");

  return (
    <header className={`lv-header ${scrolled ? "lv-header-scrolled" : ""} ${emp ? "lv-header-emp" : ""}`}>
      <div className="lv-header-inner">
        <Link href={emp ? "/employers" : "/"} className="lv-logo" aria-label={t(lang, "LàmViệc360 — Home")}>
          <img src="/logo-cropped.png" alt="LàmViệc360" />
        </Link>
        <nav className="lv-nav" aria-label={t(lang, "Main navigation")}>
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className={pathname === n.href ? "active" : ""} aria-current={pathname === n.href ? "page" : undefined}>
              {t(lang, n.labelKey)}
            </Link>
          ))}
        </nav>
        <div className="lv-header-actions">
          <LangPicker lang={lang} setLang={setLang} />
          <Link href={switchHref} className="lv-switch-link">
            {switchLabel} <Icon name="arrow-right" size={14} />
          </Link>
          <Link href={loginHref} className="lv-login-link">
            {loginLabel}
          </Link>
          <Button variant="primary" size="md" style={{ whiteSpace: "nowrap", flexShrink: 0 }} onClick={() => router.push(registerHref)}>
            {ctaLabel}
          </Button>
          <button className="lv-burger" aria-label={t(lang, "Open menu")} aria-expanded={mobileOpen} onClick={() => setMobileOpen((v) => !v)}>
            <Icon name={mobileOpen ? "x" : "menu"} size={24} />
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="lv-mobile-menu">
          <Link href={switchHref} className="lv-switch-link lv-switch-link-mobile">
            {switchLabel} <Icon name="arrow-right" size={14} />
          </Link>
          {nav.map((n) => (
            <Link key={n.href} href={n.href}>
              {t(lang, n.labelKey)}
            </Link>
          ))}
          <div className="lv-mobile-divider"></div>
          <Link href={loginHref}>{loginLabel}</Link>
          <div style={{ display: "flex", gap: "var(--space-2)", padding: "var(--space-2) 0" }}>
            {LANGS.map((l) => (
              <button key={l.code} className="lv-quick-filter" style={{ fontWeight: lang === l.code ? 700 : 400 }} onClick={() => setLang(l.code)}>
                {l.label}
              </button>
            ))}
          </div>
          <Button variant="primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => router.push(registerHref)}>
            {ctaLabel}
          </Button>
        </div>
      )}
    </header>
  );
}
