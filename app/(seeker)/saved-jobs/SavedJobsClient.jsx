"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../../../components/ds";
import Icon from "../../../components/ds/Icon";
import JobRow from "../../../components/jobs/JobRow";
import Toast, { useToast } from "../../../components/ds/Toast";
import { useLang, t } from "../../../utils/lang";
import { JOBS } from "../../../lib/data";
import { listSavedJobs, toggleSavedJob } from "../../../lib/seekerStore";

export default function SavedJobsClient() {
  const [lang] = useLang();
  const [ids, setIds] = useState(null);
  const [toast, setToast] = useToast();

  useEffect(() => {
    setIds(listSavedJobs());
  }, []);

  if (ids === null) return null;
  const jobs = ids.map((id) => JOBS.find((j) => j.id === id)).filter(Boolean);

  const remove = (jobId) => {
    toggleSavedJob(jobId);
    setIds((prev) => prev.filter((id) => id !== jobId));
    setToast(t(lang, "Removed from saved jobs"));
  };

  return (
    <div className="lv-page-container">
      <div className="lv-dash-welcome">
        <h1>{t(lang, "Saved Jobs")}</h1>
        <p>{t(lang, "Jobs you've bookmarked to review or apply to later.")}</p>
      </div>

      {jobs.length ? (
        <div className="lv-job-list">
          {jobs.map((j) => (
            <div key={j.id} className="lv-jobrow" style={{ alignItems: "center" }}>
              <div className="lv-job-logo" style={{ width: 52, height: 52 }}>
                {j.company.slice(0, 2).toUpperCase()}
              </div>
              <div className="lv-jobrow-body">
                <h3 className="lv-job-title" style={{ marginBottom: "var(--space-2)" }}>
                  <Link href={`/job-detail?id=${j.id}`} style={{ color: "inherit" }}>
                    {lang === "VN" || lang === "VI" ? j.titleVi : j.title}
                  </Link>
                </h3>
                <div className="lv-job-meta" style={{ marginBottom: 0 }}>
                  <span>
                    <Icon name="map-pin" size={14} />
                    {lang === "VN" || lang === "VI" ? j.locationVi : j.location}
                  </span>
                  <span>
                    <Icon name="wallet" size={14} />
                    {j.salary}
                  </span>
                </div>
              </div>
              <div className="lv-jobrow-actions">
                <Link href={`/job-detail?id=${j.id}`}>
                  <Button variant="secondary" size="sm">
                    {t(lang, "View Job")}
                  </Button>
                </Link>
                <Link href={`/apply/${j.id}`}>
                  <Button variant="primary" size="sm">
                    {t(lang, "Apply")}
                  </Button>
                </Link>
                <button className="lv-job-save" aria-label={t(lang, "Remove")} onClick={() => remove(j.id)}>
                  <Icon name="trash-2" size={16} style={{ color: "var(--gray-400)" }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="lv-empty">
          <h3>{t(lang, "No saved jobs yet")}</h3>
          <p>{t(lang, "Tap the heart icon on any job to save it here.")}</p>
          <div style={{ marginTop: 20 }}>
            <Link href="/jobs">
              <Button variant="secondary">{t(lang, "Find Jobs")}</Button>
            </Link>
          </div>
        </div>
      )}
      <Toast msg={toast} />
    </div>
  );
}
