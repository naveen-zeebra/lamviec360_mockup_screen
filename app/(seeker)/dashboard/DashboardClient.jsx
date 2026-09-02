"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../../../components/ds";
import Icon from "../../../components/ds/Icon";
import Skeleton from "../../../components/ds/Skeleton";
import ErrorState from "../../../components/ds/ErrorState";
import StageBadge from "../../../components/seeker/StageBadge";
import { useLang, t } from "../../../utils/lang";
import { JOBS, FILTER_VI } from "../../../lib/data";
import { getProfile, listApplications, listSavedJobs, listNotifications, computeCompleteness } from "../../../lib/seekerStore";

function useDashboardData() {
  const [state, setState] = useState({ loading: true, error: false, data: null });

  const load = () => {
    setState({ loading: true, error: false, data: null });
    setTimeout(() => {
      try {
        const profile = getProfile();
        const applications = listApplications();
        const savedJobs = listSavedJobs();
        const notifications = listNotifications();
        const completeness = computeCompleteness(profile);
        const recommended = JOBS.filter(
          (j) => (profile.professional.industry && j.industry === profile.professional.industry) || (profile.personal.location && j.location === profile.personal.location)
        ).slice(0, 4);
        setState({ loading: false, error: false, data: { profile, applications, savedJobs, notifications, completeness, recommended } });
      } catch (e) {
        setState({ loading: false, error: true, data: null });
      }
    }, 450);
  };

  useEffect(load, []);
  return [state, load];
}

export default function DashboardClient() {
  const [lang] = useLang();
  const [{ loading, error, data }, reload] = useDashboardData();

  if (error) {
    return (
      <div className="lv-page-container">
        <ErrorState title={t(lang, "Couldn't load your dashboard")} desc={t(lang, "Something went wrong reading your saved data.")} onRetry={reload} retryLabel={t(lang, "Try again")} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="lv-page-container">
        <div className="lv-preview-stats" style={{ marginBottom: 24 }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="lv-stat">
              <Skeleton width={60} height={12} />
              <Skeleton width={40} height={26} style={{ marginTop: 8 }} />
            </div>
          ))}
        </div>
        <Skeleton height={120} style={{ marginBottom: 24 }} />
        <Skeleton height={220} />
      </div>
    );
  }

  const { profile, applications, savedJobs, notifications, completeness, recommended } = data;
  const interviews = applications.filter((a) => a.stage === "Interview Scheduled");
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="lv-page-container">
      <div className="lv-dash-welcome">
        <h1>{t(lang, "Welcome back")}{profile.personal.fullName ? `, ${profile.personal.fullName.split(" ")[0]}` : ""}</h1>
        <p>{t(lang, "Here's what's happening with your job search.")}</p>
      </div>

      <div className="lv-preview-stats lv-dash-kpis">
        <div className="lv-stat">
          <span>{t(lang, "Recommended Jobs")}</span>
          <strong>{recommended.length}</strong>
        </div>
        <div className="lv-stat">
          <span>{t(lang, "Applications")}</span>
          <strong>{applications.length}</strong>
        </div>
        <div className="lv-stat">
          <span>{t(lang, "Interviews")}</span>
          <strong>{interviews.length}</strong>
        </div>
        <div className="lv-stat">
          <span>{t(lang, "Saved Jobs")}</span>
          <strong>{savedJobs.length}</strong>
        </div>
      </div>

      {completeness < 100 && (
        <div className="lv-completion-banner">
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <strong>{t(lang, "Profile Completion")}</strong>
              <span>{completeness}%</span>
            </div>
            <div className="lv-progress">
              <i style={{ width: `${completeness}%` }} />
            </div>
          </div>
          <Link href="/settings">
            <Button variant="primary" size="sm">
              {t(lang, "Complete Profile")}
            </Button>
          </Link>
        </div>
      )}

      <section id="recommended" className="lv-dash-section">
        <div className="lv-dash-section-head">
          <h2>{t(lang, "Recommended for you")}</h2>
          <Link href="/jobs" className="lv-job-view">
            {t(lang, "View all")} <Icon name="arrow-right" size={14} />
          </Link>
        </div>
        {recommended.length ? (
          <div className="lv-dash-cards-grid">
            {recommended.map((j) => (
              <Link key={j.id} href={`/job-detail?id=${j.id}`} className="lv-mini-job-card">
                <div className="lv-job-logo" style={{ width: 36, height: 36, fontSize: 12 }}>
                  {j.company.slice(0, 2).toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <strong style={{ display: "block", fontSize: "var(--text-sm)" }}>{lang === "VN" || lang === "VI" ? j.titleVi : j.title}</strong>
                  <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>{j.company} · {lang === "VN" || lang === "VI" ? j.locationVi : j.location}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="lv-empty">
            <h3>{t(lang, "No recommendations yet")}</h3>
            <p>{t(lang, "Complete your profile so we can match you with relevant jobs.")}</p>
          </div>
        )}
      </section>

      <div className="lv-dash-two-col">
        <section className="lv-dash-section">
          <div className="lv-dash-section-head">
            <h2>{t(lang, "Recent Applications")}</h2>
            <Link href="/applications" className="lv-job-view">
              {t(lang, "View all")} <Icon name="arrow-right" size={14} />
            </Link>
          </div>
          {applications.length ? (
            <div className="lv-dash-list">
              {applications.slice(0, 4).map((a) => {
                const job = JOBS.find((j) => j.id === a.jobId);
                if (!job) return null;
                return (
                  <Link key={a.id} href={`/applications/${a.id}`} className="lv-dash-row">
                    <div className="lv-job-logo" style={{ width: 36, height: 36, fontSize: 12 }}>
                      {job.company.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="lv-dash-row-info">
                      <strong>{lang === "VN" || lang === "VI" ? job.titleVi : job.title}</strong>
                      <span>{job.company} · {a.appliedDate}</span>
                    </div>
                    <StageBadge stage={a.stage} lang={lang} />
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="lv-empty">
              <h3>{t(lang, "No applications yet")}</h3>
              <p>{t(lang, "Find a role you like and apply in a few clicks.")}</p>
              <div style={{ marginTop: 16 }}>
                <Link href="/jobs">
                  <Button variant="secondary">{t(lang, "Find Jobs")}</Button>
                </Link>
              </div>
            </div>
          )}
        </section>

        <section className="lv-dash-section">
          <div className="lv-dash-section-head">
            <h2>{t(lang, "Upcoming Interviews")}</h2>
          </div>
          {interviews.length ? (
            <div className="lv-dash-list">
              {interviews.map((a) => {
                const job = JOBS.find((j) => j.id === a.jobId);
                if (!job) return null;
                return (
                  <div key={a.id} className="lv-dash-row">
                    <div className="lv-interview-date">
                      <Icon name="calendar" size={16} />
                    </div>
                    <div className="lv-dash-row-info">
                      <strong>{lang === "VN" || lang === "VI" ? job.titleVi : job.title}</strong>
                      <span>{job.company} · {a.interviewAt || a.appliedDate}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="lv-empty">
              <h3>{t(lang, "No interviews scheduled")}</h3>
              <p>{t(lang, "Interview invitations will appear here.")}</p>
            </div>
          )}

          <div className="lv-dash-section-head" style={{ marginTop: 28 }}>
            <h2>{t(lang, "Notifications")}</h2>
            <Link href="/notifications" className="lv-job-view">
              {unreadCount > 0 ? `${unreadCount} ${t(lang, "new")}` : t(lang, "View all")} <Icon name="arrow-right" size={14} />
            </Link>
          </div>
          {notifications.length ? (
            <div className="lv-dash-list">
              {notifications.slice(0, 3).map((n) => (
                <div key={n.id} className="lv-notif-row-mini">
                  {!n.read && <span className="lv-notif-dot" aria-label={t(lang, "Unread")} />}
                  <div>
                    <strong>{n.title}</strong>
                    <p>{n.message}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="lv-empty">
              <h3>{t(lang, "No notifications")}</h3>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
