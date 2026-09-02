"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge, Button } from "../../../components/ds";
import Icon from "../../../components/ds/Icon";
import StageBadge from "../../../components/seeker/StageBadge";
import { useLang, t } from "../../../utils/lang";
import { JOBS } from "../../../lib/data";
import { listApplications } from "../../../lib/seekerStore";

export default function ApplicationsClient() {
  const [lang] = useLang();
  const [applications, setApplications] = useState(null);

  useEffect(() => {
    setApplications(listApplications());
  }, []);

  if (applications === null) return null;

  return (
    <div className="lv-page-container">
      <div className="lv-dash-welcome">
        <h1>{t(lang, "Application Tracker")}</h1>
        <p>{t(lang, "Follow the progress of every job you've applied to.")}</p>
      </div>

      {applications.length ? (
        <div className="lv-tracker-list">
          {applications.map((a) => {
            const job = JOBS.find((j) => j.id === a.jobId);
            if (!job) return null;
            const title = lang === "VN" || lang === "VI" ? job.titleVi : job.title;
            return (
              <Link key={a.id} href={`/applications/${a.id}`} className="lv-tracker-card">
                <div className="lv-job-logo" style={{ width: 48, height: 48 }}>
                  {job.company.slice(0, 2).toUpperCase()}
                </div>
                <div className="lv-tracker-card-body">
                  <strong>{title}</strong>
                  <span>{job.company} · {t(lang, "Applied")} {a.appliedDate}</span>
                </div>
                <div className="lv-tracker-card-status">
                  <StageBadge stage={a.stage} lang={lang} />
                  {a.closed && <Badge tone="neutral">{t(lang, "Position Closed")}</Badge>}
                </div>
                <Icon name="chevron-right" size={18} style={{ color: "var(--text-tertiary)" }} />
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="lv-empty">
          <h3>{t(lang, "No applications yet")}</h3>
          <p>{t(lang, "Once you apply to a job, you'll be able to track its status here.")}</p>
          <div style={{ marginTop: 20 }}>
            <Link href="/jobs">
              <Button variant="secondary">{t(lang, "Find Jobs")}</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
