"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Icon from "../ds/Icon";
import { LANGS, t } from "../../utils/lang";
import { unreadNotificationCount, logout, getAuth } from "../../lib/seekerStore";

const NAV = [
  { href: "/dashboard", labelKey: "Dashboard" },
  { href: "/jobs", labelKey: "Find Jobs" },
  { href: "/dashboard#recommended", labelKey: "Recommended" },
  { href: "/applications", labelKey: "Applications" },
  { href: "/saved-jobs", labelKey: "Saved Jobs" },
];

export default function SeekerHeader({ lang, setLang }) {
  const pathname = usePathname();
  const router = useRouter();
  const [unread, setUnread] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    setUnread(unreadNotificationCount());
    setName(getAuth().name || "");
    setMenuOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const initials = (name || "U")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="lv-header lv-header-scrolled" style={{ position: "sticky" }}>
      <div className="lv-header-inner">
        <Link href="/dashboard" className="lv-logo" aria-label={t(lang, "LàmViệc360 — Dashboard")}>
          <img src="/logo-cropped.png" alt="LàmViệc360" />
        </Link>
        <nav className="lv-nav" aria-label={t(lang, "Seeker navigation")}>
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={pathname === n.href.split("#")[0] ? "active" : ""}
              aria-current={pathname === n.href.split("#")[0] ? "page" : undefined}
            >
              {t(lang, n.labelKey)}
            </Link>
          ))}
        </nav>
        <div className="lv-header-actions">
          <Link href="/notifications" className="lv-bell" aria-label={t(lang, "Notifications") + (unread ? `, ${unread} unread` : "")}>
            <Icon name="bell" size={20} />
            {unread > 0 && <span className="lv-bell-badge">{unread > 9 ? "9+" : unread}</span>}
          </Link>
          <div className="lv-dropdown">
            <button className="lv-avatar-btn" onClick={() => setMenuOpen((v) => !v)} aria-haspopup="menu" aria-expanded={menuOpen}>
              <span className="lv-avatar-circle">{initials}</span>
            </button>
            {menuOpen && (
              <div className="lv-dropdown-menu" role="menu">
                <button role="menuitem" onClick={() => router.push("/settings")}>
                  <Icon name="user" size={14} style={{ marginRight: 8 }} /> {t(lang, "Profile")}
                </button>
                <button role="menuitem" onClick={() => router.push("/settings")}>
                  <Icon name="settings" size={14} style={{ marginRight: 8 }} /> {t(lang, "Settings")}
                </button>
                <button role="menuitem" onClick={() => router.push("/ai-interview-prep")}>
                  <Icon name="sparkles" size={14} style={{ marginRight: 8 }} /> {t(lang, "AI Interview Prep")}
                </button>
                <div className="lv-mobile-divider" />
                <button
                  role="menuitem"
                  onClick={() => {
                    logout();
                    router.push("/");
                  }}
                >
                  <Icon name="log-out" size={14} style={{ marginRight: 8 }} /> {t(lang, "Logout")}
                </button>
              </div>
            )}
          </div>
          <button className="lv-burger" aria-label={t(lang, "Open menu")} aria-expanded={mobileOpen} onClick={() => setMobileOpen((v) => !v)}>
            <Icon name={mobileOpen ? "x" : "menu"} size={24} />
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="lv-mobile-menu">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>
              {t(lang, n.labelKey)}
            </Link>
          ))}
          <div className="lv-mobile-divider" />
          <Link href="/settings">{t(lang, "Settings")}</Link>
          <div style={{ display: "flex", gap: "var(--space-2)", padding: "var(--space-2) 0" }}>
            {LANGS.map((l) => (
              <button key={l.code} className="lv-quick-filter" style={{ fontWeight: lang === l.code ? 700 : 400 }} onClick={() => setLang(l.code)}>
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
