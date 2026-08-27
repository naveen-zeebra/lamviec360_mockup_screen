import Link from "next/link";
import { Badge } from "../ds";
import Icon from "../ds/Icon";
import { useLang, t } from "../../utils/lang";

export default function CompanyCard({ c, lang }) {
  return (
    <div className="lv-company-card">
      <div className="lv-company-logo" aria-hidden="true">
        {c.name.slice(0, 2).toUpperCase()}
      </div>
      <div className="lv-company-name">{c.name}</div>
      {c.verified && (
        <div>
          <Badge tone="brand">
            <Icon name="shield-check" size={11} /> {t(lang, "Verified Company")}
          </Badge>
        </div>
      )}
      <div className="lv-company-meta">
        <span>
          <Icon name="building-2" size={14} />
          {(lang === "VN" || lang === "VI" ? c.industryVi : c.industry)}
        </span>
        <span>
          <Icon name="map-pin" size={14} />
          {(lang === "VN" || lang === "VI" ? c.locationVi : c.location)}
        </span>
      </div>
      <div className="lv-company-foot">
        <strong style={{ fontSize: "var(--text-sm)" }}>
          {c.openJobs} {t(lang, "Open Jobs")}
        </strong>
        <Link href={`/jobs?company=${encodeURIComponent(c.name)}`} className="lv-job-view">
          {t(lang, "View Company")} <Icon name="arrow-right" size={14} />
        </Link>
      </div>
    </div>
  );
}
