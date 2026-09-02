"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "../ds/Icon";
import { t } from "../../utils/lang";

const TABS = [
  { href: "/dashboard", icon: "layout-dashboard", labelKey: "Dashboard" },
  { href: "/jobs", icon: "search", labelKey: "Jobs" },
  { href: "/applications", icon: "briefcase", labelKey: "Applications" },
  { href: "/saved-jobs", icon: "heart", labelKey: "Saved" },
  { href: "/settings", icon: "user", labelKey: "Profile" },
];

export default function SeekerBottomNav({ lang }) {
  const pathname = usePathname();
  return (
    <nav className="lv-bottom-nav" aria-label={t(lang, "Primary")}>
      {TABS.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link key={tab.href} href={tab.href} className={`lv-bottom-nav-item ${active ? "active" : ""}`} aria-current={active ? "page" : undefined}>
            <Icon name={tab.icon} size={20} />
            <span>{t(lang, tab.labelKey)}</span>
          </Link>
        );
      })}
    </nav>
  );
}
