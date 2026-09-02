"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge, Button } from "../../../../components/ds";
import Icon from "../../../../components/ds/Icon";
import StageBadge from "../../../../components/seeker/StageBadge";
import { useLang, t } from "../../../../utils/lang";
import { JOBS } from "../../../../lib/data";
import { getApplication, STAGE_TYPICAL } from "../../../../lib/seekerStore";

const HAPPY_PATH = ["Applied", "Under Review", "Shortlisted", "Interview Scheduled", "Offer Sent", "Hired"];

export default function ApplicationDetailClient({ id }) {
  const [lang] = useLang();
  const [app, setApp] = useState(undefined);

  useEffect(() => {
    setApp(getApplication(id));
  }, [id]);

  if (app === undefined) return null;

  if (!app) {
    return (
      <div className="lv-page-container">
        <div className="lv-empty">
          <h3>{t(lang, "Application not found")}</h3>
          <div style={{ marginTop: 16 }}>
            <Link href="/applications">
              <Button variant="secondary">{t(lang, "Back to Application Tracker")}</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const job = JOBS.find((j) => j.id === app.jobId);
  const title = job ? (lang === "VN" || lang === "VI" ? job.titleVi : job.title) : "";
  const isRejected = app.stage === "Rejected";
  const currentIndex = HAPPY_PATH.indexOf(app.stage);

  const reachedDate = (stage) => (app.timeline.find((tl) => tl.stage === stage) || {}).date;

  return (
    <div className="lv-page-container">
      <Link href="/applications" className="lv-job-view" style={{ marginBottom: 20, display: "inline-flex" }}>
        <Icon name="arrow-left" size={14} /> {t(lang, "Application Tracker")}
      </Link>

      <div className="lv-tracker-detail-head">
        <div className="lv-job-logo" style={{ width: 56, height: 56 }}>
          {job ? job.company.slice(0, 2).toUpperCase() : "—"}
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <h1 style={{ fontSize: "var(--text-xl)", marginBottom: 4 }}>{title}</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)" }}>
            {job ? job.company : ""} · {t(lang, "Applied")} {app.appliedDate}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <StageBadge stage={app.stage} lang={lang} />
          {app.closed && <Badge tone="neutral">{t(lang, "Position Closed")}</Badge>}
        </div>
      </div>

      <div className="lv-timeline">
        {isRejected
          ? app.timeline.map((tl, i) => (
              <div key={tl.stage} className={`lv-timeline-item done ${tl.stage === "Rejected" ? "rejected" : ""}`}>
                <span className="lv-timeline-dot">
                  <Icon name={tl.stage === "Rejected" ? "x" : "check"} size={12} />
                </span>
                <div className="lv-timeline-body">
                  <strong>{t(lang, tl.stage)}</strong>
                  <span>{tl.date}</span>
                </div>
              </div>
            ))
          : HAPPY_PATH.map((stage, i) => {
              const reached = i <= currentIndex;
              const isNext = i === currentIndex + 1;
              return (
                <div key={stage} className={`lv-timeline-item ${reached ? "done" : ""} ${i === currentIndex ? "current" : ""}`}>
                  <span className="lv-timeline-dot">{reached ? <Icon name="check" size={12} /> : i + 1}</span>
                  <div className="lv-timeline-body">
                    <strong>{t(lang, stage)}</strong>
                    {reached ? <span>{reachedDate(stage)}</span> : isNext && STAGE_TYPICAL[stage] ? <span className="lv-timeline-typical">{t(lang, STAGE_TYPICAL[stage])}</span> : <span>{t(lang, "Pending")}</span>}
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}
