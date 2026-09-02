"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Select } from "../../../components/ds";
import Icon from "../../../components/ds/Icon";
import Toast, { useToast } from "../../../components/ds/Toast";
import { useLang, t } from "../../../utils/lang";
import { getProfile, saveProfile, getSettings, saveSettings, getAuth, logout, resetAll } from "../../../lib/seekerStore";

const TABS = ["Profile", "Preferences", "Notifications", "Privacy", "Account"];
const INDUSTRIES = ["Technology", "Retail & Commerce", "Media & Creative", "Transport & Logistics", "Manufacturing", "Finance & Banking", "Other"];
const EXPERIENCE_RANGES = ["Less than 1 year", "1-3 years", "3-5 years", "5-10 years", "10+ years"];
const WORK_MODES = ["Remote", "Hybrid", "On-site"];
const VISIBILITY_OPTIONS = ["Public to employers", "Private", "Hidden from current employer"];
const RESUME_VISIBILITY_OPTIONS = ["Visible when I apply", "Always visible to employers", "Hidden"];

function ChipInput({ label, values, onAdd, onRemove, placeholder }) {
  const [v, setV] = useState("");
  return (
    <div>
      <label style={{ fontSize: "var(--text-sm)", fontWeight: 600, display: "block", marginBottom: 6 }}>{label}</label>
      <div style={{ display: "flex", gap: 8 }}>
        <Input value={v} onChange={(e) => setV(e.target.value)} placeholder={placeholder} />
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            if (v.trim()) {
              onAdd(v.trim());
              setV("");
            }
          }}
        >
          Add
        </Button>
      </div>
      <div className="lv-job-tags" style={{ marginTop: 12 }}>
        {values.map((x) => (
          <span key={x} className="lv-chip">
            {x}
            <button type="button" aria-label={"Remove " + x} onClick={() => onRemove(x)}>
              <Icon name="x" size={12} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

function Switch({ on, onChange, label }) {
  return (
    <div className="lv-settings-toggle-row">
      <span>{label}</span>
      <button type="button" className={`lv-switch ${on ? "on" : ""}`} role="switch" aria-checked={on} aria-label={label} onClick={() => onChange(!on)}>
        <span />
      </button>
    </div>
  );
}

export default function SettingsClient() {
  const [lang] = useLang();
  const router = useRouter();
  const [tab, setTab] = useState("Profile");
  const [profile, setProfile] = useState(null);
  const [settings, setSettings] = useState(null);
  const [auth, setAuth] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [toast, setToast] = useToast();

  useEffect(() => {
    setProfile(getProfile());
    setSettings(getSettings());
    setAuth(getAuth());
  }, []);

  if (!profile || !settings || !auth) return null;

  const persist = (patch) => {
    const next = { ...profile, ...patch };
    setProfile(next);
    saveProfile(patch);
  };
  const persistSettings = (patch) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    saveSettings(patch);
    setToast(t(lang, "Saved"));
  };

  const updateEducation = (i, field, value) => {
    const list = profile.education.slice();
    list[i] = { ...list[i], [field]: value };
    persist({ education: list });
  };
  const updateExperience = (i, field, value) => {
    const list = profile.experience.slice();
    list[i] = { ...list[i], [field]: value };
    persist({ experience: list });
  };

  const onResumeChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setToast(t(lang, "File is larger than 10MB."));
      return;
    }
    persist({ resume: { fileName: file.name, uploadedAt: new Date().toISOString().slice(0, 10) } });
  };

  return (
    <div className="lv-page-container">
      <div className="lv-dash-welcome">
        <h1>{t(lang, "Profile & Settings")}</h1>
        <p>{t(lang, "Manage your profile, preferences, notifications and account.")}</p>
      </div>

      <div className="lv-auth-tabs lv-settings-tabs">
        {TABS.map((tb) => (
          <button key={tb} className={tab === tb ? "active" : ""} onClick={() => setTab(tb)}>
            {t(lang, tb)}
          </button>
        ))}
      </div>

      <div className="lv-onboard-card">
        {tab === "Profile" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div>
              <h3 style={{ marginBottom: 14 }}>{t(lang, "Personal")}</h3>
              <div className="lv-form-grid">
                <Input label={t(lang, "Full Name")} value={profile.personal.fullName} onChange={(e) => persist({ personal: { ...profile.personal, fullName: e.target.value } })} />
                <Input label={t(lang, "Phone")} value={profile.personal.phone} onChange={(e) => persist({ personal: { ...profile.personal, phone: e.target.value } })} />
                <Input label={t(lang, "Location")} value={profile.personal.location} onChange={(e) => persist({ personal: { ...profile.personal, location: e.target.value } })} />
              </div>
            </div>

            <div>
              <h3 style={{ marginBottom: 14 }}>{t(lang, "Professional")}</h3>
              <div className="lv-form-grid">
                <Input label={t(lang, "Current Job Title")} value={profile.professional.title} onChange={(e) => persist({ professional: { ...profile.professional, title: e.target.value } })} />
                <Select label={t(lang, "Experience")} value={profile.professional.experience} onChange={(e) => persist({ professional: { ...profile.professional, experience: e.target.value } })} options={EXPERIENCE_RANGES.map((v) => ({ value: v, label: t(lang, v) }))} />
                <Select label={t(lang, "Industry")} value={profile.professional.industry} onChange={(e) => persist({ professional: { ...profile.professional, industry: e.target.value } })} options={INDUSTRIES.map((v) => ({ value: v, label: t(lang, v) }))} />
              </div>
              <div style={{ marginTop: 16 }}>
                <ChipInput
                  label={t(lang, "Skills")}
                  values={profile.professional.skills}
                  placeholder={t(lang, "e.g. React")}
                  onAdd={(v) => persist({ professional: { ...profile.professional, skills: [...profile.professional.skills, v] } })}
                  onRemove={(v) => persist({ professional: { ...profile.professional, skills: profile.professional.skills.filter((x) => x !== v) } })}
                />
              </div>
              <div style={{ marginTop: 16 }}>
                <ChipInput
                  label={t(lang, "Languages")}
                  values={profile.languages}
                  placeholder={t(lang, "e.g. English")}
                  onAdd={(v) => persist({ languages: [...profile.languages, v] })}
                  onRemove={(v) => persist({ languages: profile.languages.filter((x) => x !== v) })}
                />
              </div>
            </div>

            <div>
              <h3 style={{ marginBottom: 14 }}>{t(lang, "Education")}</h3>
              {profile.education.map((ed, i) => (
                <div key={i} className="lv-repeat-card">
                  <div className="lv-form-grid">
                    <Input label={t(lang, "Degree")} value={ed.degree} onChange={(e) => updateEducation(i, "degree", e.target.value)} />
                    <Input label={t(lang, "Institution")} value={ed.institution} onChange={(e) => updateEducation(i, "institution", e.target.value)} />
                    <Input label={t(lang, "Graduation Year")} value={ed.year} onChange={(e) => updateEducation(i, "year", e.target.value)} />
                  </div>
                  <button type="button" className="lv-repeat-remove" onClick={() => persist({ education: profile.education.filter((_, idx) => idx !== i) })}>
                    <Icon name="trash-2" size={14} /> {t(lang, "Remove")}
                  </button>
                </div>
              ))}
              <Button type="button" variant="secondary" onClick={() => persist({ education: [...profile.education, { degree: "", institution: "", year: "" }] })}>
                <Icon name="plus" size={16} /> {t(lang, "Add education")}
              </Button>
            </div>

            <div>
              <h3 style={{ marginBottom: 14 }}>{t(lang, "Experience")}</h3>
              {profile.experience.map((ex, i) => (
                <div key={i} className="lv-repeat-card">
                  <div className="lv-form-grid">
                    <Input label={t(lang, "Company")} value={ex.company} onChange={(e) => updateExperience(i, "company", e.target.value)} />
                    <Input label={t(lang, "Job Title")} value={ex.title} onChange={(e) => updateExperience(i, "title", e.target.value)} />
                    <Input label={t(lang, "Start Date")} value={ex.start} onChange={(e) => updateExperience(i, "start", e.target.value)} />
                    <Input label={t(lang, "End Date")} value={ex.end} onChange={(e) => updateExperience(i, "end", e.target.value)} />
                  </div>
                  <button type="button" className="lv-repeat-remove" onClick={() => persist({ experience: profile.experience.filter((_, idx) => idx !== i) })}>
                    <Icon name="trash-2" size={14} /> {t(lang, "Remove")}
                  </button>
                </div>
              ))}
              <Button type="button" variant="secondary" onClick={() => persist({ experience: [...profile.experience, { company: "", title: "", start: "", end: "", responsibilities: "" }] })}>
                <Icon name="plus" size={16} /> {t(lang, "Add position")}
              </Button>
            </div>

            <div>
              <h3 style={{ marginBottom: 14 }}>{t(lang, "Resume")}</h3>
              {profile.resume.fileName && (
                <p className="lv-file-chip">
                  <Icon name="file-text" size={14} />
                  {profile.resume.fileName}
                </p>
              )}
              <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={onResumeChange} style={{ marginTop: 10 }} />
            </div>
          </div>
        )}

        {tab === "Preferences" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <ChipInput
              label={t(lang, "Preferred Roles")}
              values={profile.preferences.roles}
              placeholder={t(lang, "e.g. Frontend Engineer")}
              onAdd={(v) => persist({ preferences: { ...profile.preferences, roles: [...profile.preferences.roles, v] } })}
              onRemove={(v) => persist({ preferences: { ...profile.preferences, roles: profile.preferences.roles.filter((x) => x !== v) } })}
            />
            <ChipInput
              label={t(lang, "Preferred Locations")}
              values={profile.preferences.locations}
              placeholder={t(lang, "e.g. Ho Chi Minh City")}
              onAdd={(v) => persist({ preferences: { ...profile.preferences, locations: [...profile.preferences.locations, v] } })}
              onRemove={(v) => persist({ preferences: { ...profile.preferences, locations: profile.preferences.locations.filter((x) => x !== v) } })}
            />
            <div className="lv-form-grid">
              <Select label={t(lang, "Work Mode")} value={profile.preferences.workMode} onChange={(e) => persist({ preferences: { ...profile.preferences, workMode: e.target.value } })} options={WORK_MODES.map((v) => ({ value: v, label: t(lang, v) }))} />
              <Input label={t(lang, "Desired Salary")} value={profile.preferences.salary} onChange={(e) => persist({ preferences: { ...profile.preferences, salary: e.target.value } })} placeholder="25M - 35M VND" />
            </div>
          </div>
        )}

        {tab === "Notifications" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Switch label={t(lang, "Job recommendations")} on={settings.notifications.jobRecs} onChange={(v) => persistSettings({ notifications: { ...settings.notifications, jobRecs: v } })} />
            <Switch label={t(lang, "Application updates")} on={settings.notifications.appUpdates} onChange={(v) => persistSettings({ notifications: { ...settings.notifications, appUpdates: v } })} />
            <Switch label={t(lang, "Interview alerts")} on={settings.notifications.interviewAlerts} onChange={(v) => persistSettings({ notifications: { ...settings.notifications, interviewAlerts: v } })} />
            <Switch label={t(lang, "Marketing emails")} on={settings.notifications.marketing} onChange={(v) => persistSettings({ notifications: { ...settings.notifications, marketing: v } })} />
          </div>
        )}

        {tab === "Privacy" && (
          <div className="lv-form-grid">
            <Select label={t(lang, "Profile visibility")} value={settings.privacy.profileVisibility} onChange={(e) => persistSettings({ privacy: { ...settings.privacy, profileVisibility: e.target.value } })} options={VISIBILITY_OPTIONS.map((v) => ({ value: v, label: t(lang, v) }))} />
            <Select label={t(lang, "Resume visibility")} value={settings.privacy.resumeVisibility} onChange={(e) => persistSettings({ privacy: { ...settings.privacy, resumeVisibility: e.target.value } })} options={RESUME_VISIBILITY_OPTIONS.map((v) => ({ value: v, label: t(lang, v) }))} />
          </div>
        )}

        {tab === "Account" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div className="lv-form-grid">
              <Input label={t(lang, "Email")} value={auth.email} onChange={() => {}} />
              <Input label={t(lang, "Phone")} value={profile.personal.phone} onChange={(e) => persist({ personal: { ...profile.personal, phone: e.target.value } })} />
            </div>
            <div>
              <h3 style={{ marginBottom: 14 }}>{t(lang, "Change Password")}</h3>
              <div className="lv-form-grid">
                <Input label={t(lang, "Current password")} type="password" value="" onChange={() => {}} placeholder="••••••••" />
                <Input label={t(lang, "New password")} type="password" value="" onChange={() => {}} placeholder="••••••••" />
              </div>
              <div style={{ marginTop: 12 }}>
                <Button variant="secondary" onClick={() => setToast(t(lang, "Password updated"))}>
                  {t(lang, "Update Password")}
                </Button>
              </div>
            </div>
            <div style={{ borderTop: "1px solid var(--border-default)", paddingTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Button
                variant="secondary"
                onClick={() => {
                  logout();
                  router.push("/");
                }}
              >
                <Icon name="log-out" size={16} /> {t(lang, "Logout")}
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  resetAll();
                  setToast(t(lang, "Demo data reset"));
                  setTimeout(() => router.push("/"), 900);
                }}
              >
                {t(lang, "Reset demo data")}
              </Button>
            </div>
            <div style={{ borderTop: "1px solid var(--border-default)", paddingTop: 24 }}>
              {!confirmDelete ? (
                <Button variant="danger" onClick={() => setConfirmDelete(true)}>
                  <Icon name="trash-2" size={16} /> {t(lang, "Delete Account")}
                </Button>
              ) : (
                <div className="lv-error" role="alert" style={{ flexDirection: "column", alignItems: "flex-start", gap: 12 }}>
                  <span>{t(lang, "This will permanently delete your profile, applications and saved jobs. This cannot be undone.")}</span>
                  <div style={{ display: "flex", gap: 10 }}>
                    <Button variant="danger" size="sm" onClick={() => { resetAll(); router.push("/"); }}>
                      {t(lang, "Confirm Delete")}
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => setConfirmDelete(false)}>
                      {t(lang, "Cancel")}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Toast msg={toast} />
    </div>
  );
}
